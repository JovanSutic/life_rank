import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Switch from '../components/Budget/Switch';
import Slider from '../components/Budget/Slider';
import BudgetSelector from '../components/Budget/BudgetSelector';
import InputSection from '../components/Budget/InputSection';
import axios from 'axios';
import { SocialType, type Budget, type Price } from '../types/api.types';
import { useQuery } from '@tanstack/react-query';
import AsyncStateWrapper from '../components/AsyncWrapper';
import { useEffect, useMemo, useState } from 'react';
import type { BudgetItem } from '../types/budget.types';
import { SOLO_BUDGET } from '../components/Budget/budgetMaps';
import { calculateBudget, getBudgetMap, updateBudgetStructure } from '../utils/budget';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

interface BudgetControls {
  apartmentLocation: string;
  apartmentSize: string;
  apartmentPrice: string;
  food: string;
  transport: string;
  goingOut: string;
  clothes: string;
}

const budgetControlsDefault: BudgetControls = {
  apartmentLocation: 'Central location',
  apartmentSize: 'Smaller apartment',
  apartmentPrice: 'Average',
  food: 'Medium',
  transport: 'Medium',
  goingOut: 'Medium',
  clothes: 'Medium',
};

async function fetchBudgets(cityId: number): Promise<Budget[]> {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/social_lifestyle?cityId=${cityId}`
    );
    return res.data.data;
  } catch (error) {
    console.error('Failed to fetch budgets:', error);
    throw error;
  }
}

async function fetchPrices(cityId: number): Promise<Price[]> {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/prices?sortBy=productId&order=asc&cityId=${cityId}&limit=60&priceType=CURRENT`
    );
    return res.data.data;
  } catch (error) {
    console.error('Failed to fetch prices:', error);
    throw error;
  }
}

function BudgetPlay() {
  const { name } = useParams();
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get('id');
  const id = idParam ? parseInt(idParam, 10) : null;
  const navigate = useNavigate();

  const [budgetControls, setBudgetControls] = useState<BudgetControls>(budgetControlsDefault);

  const [budgetType, setBudgetType] = useState<SocialType>(SocialType.SOLO);
  const [currentBudget, setCurrentBudget] = useState<Record<SocialType, number>>({
    SOLO: 0,
    PAIR: 0,
    FAMILY: 0,
  });
  const [currentStructure, setCurrentStructure] = useState<BudgetItem[]>(SOLO_BUDGET);

  const {
    data: budgets,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ['GET_BUDGETS', id],
    queryFn: () => fetchBudgets(id as number),
    enabled: !!id,
    retry: 2,
  });

  const {
    data: prices,
    isLoading: pricesIsLoading,
    isFetching: pricesIsFetching,
    isError: pricesIsError,
    error: pricesError,
  } = useQuery({
    queryKey: ['GET_CITY_CURRENT_PRICES', id],
    queryFn: () => fetchPrices(id as number),
    enabled: !!id,
    retry: 2,
  });

  useEffect(() => {
    if (budgets) {
      setCurrentBudget({
        SOLO: budgets.find((item) => item.type === SocialType.SOLO)?.avg_price || 0,
        PAIR: budgets.find((item) => item.type === SocialType.PAIR)?.avg_price || 0,
        FAMILY: budgets.find((item) => item.type === SocialType.FAMILY)?.avg_price || 0,
      });
    }
  }, [budgets]);

  const structureHash = useMemo(() => {
    return currentStructure.map((i) => `${i.productId}:${i.quantity}:${i.type || ''}`).join('|');
  }, [currentStructure]);

  useEffect(() => {
    if (
      prices &&
      currentBudget.FAMILY !== 0 &&
      currentBudget.PAIR !== 0 &&
      currentBudget.SOLO !== 0
    ) {
      const newBudget = calculateBudget(currentStructure, prices);
      setCurrentBudget({
        ...currentBudget,
        [budgetType]: newBudget,
      });
    }
  }, [structureHash, currentBudget.FAMILY]);

  return (
    <div className="flex flex-col min-h-screen w-full px-2">
      <AsyncStateWrapper
        isLoading={isLoading || isFetching || pricesIsLoading || pricesIsFetching}
        isError={isError || pricesIsError}
        error={error || pricesError}
      >
        <div className="sticky top-0 z-20 bg-white pb-4 pt-6 px-4 lg:px-0 flex flex-col w-full lg:w-[860px] mx-auto text-center">
          <div className="absolute left-1 top-4 lg:top-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-blue-600 hover:text-blue-800 transition cursor-pointer"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-1" />
              Back
            </button>
          </div>

          <h1 className="text-2xl font-semibold text-gray-800 mb-2 mt-6 lg:mt-0">
            Budget Overview for {name}
          </h1>

          <p className="text-sm text-gray-600 mb-4">
            Explore how much life in <strong>{name}</strong> might cost. Choose your household type
            and customize your lifestyle using the controls below.
          </p>

          <BudgetSelector
            budgets={{
              SOLO: currentBudget.SOLO,
              PAIR: currentBudget.PAIR,
              FAMILY: currentBudget.FAMILY,
            }}
            onChange={(type) => {
              setBudgetType(type);
              setCurrentStructure(getBudgetMap(type)!);
              setCurrentBudget({
                SOLO: budgets?.find((item) => item.type === SocialType.SOLO)?.avg_price || 0,
                PAIR: budgets?.find((item) => item.type === SocialType.PAIR)?.avg_price || 0,
                FAMILY: budgets?.find((item) => item.type === SocialType.FAMILY)?.avg_price || 0,
              });
              if (type === SocialType.FAMILY) {
                setBudgetControls({ ...budgetControlsDefault, apartmentSize: 'Bigger apartment' });
              } else {
                setBudgetControls(budgetControlsDefault);
              }
            }}
          />
        </div>

        <div className="flex flex-col w-full lg:w-[860px] mx-auto text-center px-2 pt-1 gap-6">
          <InputSection
            name="Apartment Budget"
            description="Select your preferred living area to update your rent estimate"
          >
            <Switch
              options={['Central location', 'Outer areas']}
              onChange={(value) => {
                setBudgetControls({ ...budgetControls, apartmentLocation: value });
                if (value === 'Outer areas') {
                  const structure = updateBudgetStructure(
                    budgetType,
                    'apartment_outer',
                    currentStructure
                  );
                  setCurrentStructure(structure);
                }
                if (value === 'Central location') {
                  const structure = updateBudgetStructure(
                    budgetType,
                    'apartment_central',
                    currentStructure
                  );
                  setCurrentStructure(structure);
                }
              }}
              value={budgetControls.apartmentLocation}
            />
            <Switch
              options={['Smaller apartment', 'Bigger apartment']}
              onChange={(value) => {
                setBudgetControls({ ...budgetControls, apartmentSize: value });
                if (value === 'Smaller apartment') {
                  const structure = updateBudgetStructure(
                    budgetType,
                    'apartment_small',
                    currentStructure
                  );
                  setCurrentStructure(structure);
                }
                if (value === 'Bigger apartment') {
                  const structure = updateBudgetStructure(
                    budgetType,
                    'apartment_big',
                    currentStructure
                  );
                  setCurrentStructure(structure);
                }
              }}
              value={budgetControls.apartmentSize}
            />
            <p className="text-sm text-center text-gray-500 mt-2">
              Something here to make an introduction to that is down.
            </p>
            <Slider
              options={['Low price', 'Average', 'High price']}
              value={budgetControls.apartmentPrice}
              color="blue"
              onChange={(value) => {
                setBudgetControls({
                  ...budgetControls,
                  apartmentPrice: value,
                });
                if (value === 'High price') {
                  const structure = updateBudgetStructure(
                    budgetType,
                    'apartment_high',
                    currentStructure
                  );
                  setCurrentStructure(structure);
                }
                if (value === 'Average') {
                  const structure = updateBudgetStructure(
                    budgetType,
                    'apartment_avg',
                    currentStructure
                  );
                  setCurrentStructure(structure);
                }
                if (value === 'Low price') {
                  const structure = updateBudgetStructure(
                    budgetType,
                    'apartment_low',
                    currentStructure
                  );
                  setCurrentStructure(structure);
                }
              }}
            />
          </InputSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InputSection
              name="Food Budget"
              description="Adjust how often you eat out or order food instead of cooking at home"
            >
              <Slider
                options={['Low', 'Medium', 'High']}
                value={budgetControls.food}
                color="gray"
                onChange={(value) => {
                  setBudgetControls({
                    ...budgetControls,
                    food: value,
                  });
                  if (value === 'Low') {
                    const structure = updateBudgetStructure(
                      budgetType,
                      'food_low',
                      currentStructure
                    );
                    setCurrentStructure(structure);
                  }
                  if (value === 'Medium') {
                    const structure = updateBudgetStructure(
                      budgetType,
                      'food_medium',
                      currentStructure
                    );
                    setCurrentStructure(structure);
                  }
                  if (value === 'High') {
                    const structure = updateBudgetStructure(
                      budgetType,
                      'food_high',
                      currentStructure
                    );
                    setCurrentStructure(structure);
                  }
                }}
              />
            </InputSection>

            <InputSection
              name="Transport Budget"
              description="Set your preferred way of getting around — like using ride-hailing or public transport."
            >
              <Slider
                options={['Low', 'Medium', 'High']}
                value={budgetControls.transport}
                color="gray"
                onChange={(value) => {
                  setBudgetControls({
                    ...budgetControls,
                    transport: value,
                  });
                  if (value === 'Low') {
                    const structure = updateBudgetStructure(
                      budgetType,
                      'transport_low',
                      currentStructure
                    );
                    setCurrentStructure(structure);
                  }
                  if (value === 'Medium') {
                    const structure = updateBudgetStructure(
                      budgetType,
                      'transport_medium',
                      currentStructure
                    );
                    setCurrentStructure(structure);
                  }
                  if (value === 'High') {
                    const structure = updateBudgetStructure(
                      budgetType,
                      'transport_high',
                      currentStructure
                    );
                    setCurrentStructure(structure);
                  }
                }}
              />
            </InputSection>

            <InputSection
              name="Going Out Budget"
              description="Choose how frequently you go out for drinks, entertainment, or nightlife."
            >
              <Slider
                options={['Low', 'Medium', 'High']}
                value={budgetControls.goingOut}
                color="gray"
                onChange={(value) => {
                  setBudgetControls({
                    ...budgetControls,
                    goingOut: value,
                  });
                  if (value === 'Low') {
                    const structure = updateBudgetStructure(
                      budgetType,
                      'out_low',
                      currentStructure
                    );
                    setCurrentStructure(structure);
                  }
                  if (value === 'Medium') {
                    const structure = updateBudgetStructure(
                      budgetType,
                      'out_medium',
                      currentStructure
                    );
                    setCurrentStructure(structure);
                  }
                  if (value === 'High') {
                    const structure = updateBudgetStructure(
                      budgetType,
                      'out_high',
                      currentStructure
                    );
                    setCurrentStructure(structure);
                  }
                }}
              />
            </InputSection>

            <InputSection
              name="Clothing Budget"
              description="Control how much you plan to spend on new clothes and fashion each month."
            >
              <Slider
                options={['Low', 'Medium', 'High']}
                value={budgetControls.clothes}
                color="gray"
                onChange={(value) => {
                  setBudgetControls({
                    ...budgetControls,
                    clothes: value,
                  });
                  if (value === 'Low') {
                    const structure = updateBudgetStructure(
                      budgetType,
                      'clothes_low',
                      currentStructure
                    );
                    setCurrentStructure(structure);
                  }
                  if (value === 'Medium') {
                    const structure = updateBudgetStructure(
                      budgetType,
                      'clothes_medium',
                      currentStructure
                    );
                    setCurrentStructure(structure);
                  }
                  if (value === 'High') {
                    const structure = updateBudgetStructure(
                      budgetType,
                      'clothes_high',
                      currentStructure
                    );
                    setCurrentStructure(structure);
                  }
                }}
              />
            </InputSection>
          </div>
        </div>
      </AsyncStateWrapper>
    </div>
  );
}

export default BudgetPlay;
