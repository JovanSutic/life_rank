import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Switch from '../components/Budget/Switch';
import Slider from '../components/Budget/Slider';
import BudgetSelector from '../components/Budget/BudgetSelector';
import InputSection from '../components/Budget/InputSection';
import axios from 'axios';
import { SocialType, type Budget, type Price } from '../types/api.types';
import { useQuery } from '@tanstack/react-query';
import AsyncStateWrapper from '../components/AsyncWrapper';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { BudgetItem } from '../types/budget.types';
import { apartmentControlMap, SOLO_BUDGET } from '../components/Budget/budgetMaps';
import {
  calculateBudget,
  findKeyByValue,
  getBudgetMap,
  isFullyPriced,
  updateBudgetStructure,
} from '../utils/budget';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

interface BudgetControls {
  apartmentLocation: string;
  apartmentSize: string;
  apartmentPrice: string;
  food: string;
  transport: string;
  out: string;
  clothes: string;
}

const budgetControlsDefault: BudgetControls = {
  apartmentLocation: 'Central location',
  apartmentSize: 'Smaller apartment',
  apartmentPrice: 'Average',
  food: 'Medium',
  transport: 'Medium',
  out: 'Medium',
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

  const isFullPrice = useMemo(() => {
    if (prices?.length) {
      return isFullyPriced(prices);
    }
    return false;
  }, [prices?.length]);

  const handleControlChange = useCallback(
    (value: string, position: string) => {
      let structure = null;
      if (
        position === 'apartmentLocation' ||
        position === 'apartmentSize' ||
        position === 'apartmentPrice'
      ) {
        const change = findKeyByValue(apartmentControlMap, value)!;
        structure = updateBudgetStructure(budgetType, change, currentStructure);
      } else {
        const change = `${position}_${value.toLowerCase()}`;
        structure = updateBudgetStructure(budgetType, change, currentStructure);
      }
      setBudgetControls({
        ...budgetControls,
        [position]: value,
      });

      if (structure) {
        setCurrentStructure(structure);
      }
    },
    [budgetType, structureHash]
  );

  const handleTypeChange = useCallback(
    (type: SocialType) => {
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
    },
    [budgets?.length]
  );

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
    <div className="flex flex-col min-h-screen w-full px-2 pb-6">
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
            Explore Your Monthly Budget in {name}
          </h1>

          <p className="text-sm lg:text-md text-gray-600 mb-6">
            This tool lets you experiment with your lifestyle choices to see how they affect your
            overall monthly budget. Adjust your spending on housing, food, transport, entertainment,
            and more — shift priorities based on what matters most to you.
          </p>

          <BudgetSelector
            budgets={{
              SOLO: currentBudget.SOLO,
              PAIR: currentBudget.PAIR,
              FAMILY: currentBudget.FAMILY,
            }}
            onChange={handleTypeChange}
          />
        </div>

        <div className="flex flex-col w-full lg:w-[860px] mx-auto text-center px-2 pt-1 gap-6">
          <InputSection
            name="Apartment Budget"
            description="Choose your preferred apartment size and location to tailor your housing estimate. Whether you want something central or more affordable on the outskirts, this helps shape your monthly rent expectations."
          >
            <Switch
              options={['Central location', 'Outer areas']}
              name="apartmentLocation"
              onChange={handleControlChange}
              value={budgetControls.apartmentLocation}
            />
            <Switch
              options={['Smaller apartment', 'Bigger apartment']}
              name="apartmentSize"
              onChange={handleControlChange}
              value={budgetControls.apartmentSize}
            />
            {isFullPrice && (
              <>
                <p className="text-sm text-center text-gray-500 mt-2">
                  Adjust for apartment quality and cost — from more affordable, modest options to
                  higher-end places within your chosen size and location.
                </p>
                <Slider
                  options={['Low price', 'Average', 'High price']}
                  name="apartmentPrice"
                  value={budgetControls.apartmentPrice}
                  color="blue"
                  onChange={handleControlChange}
                />
              </>
            )}
          </InputSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InputSection
              name="Food Budget"
              description="Tweak your budget based on how much you eat out vs. cook — think everyday meals, not high-end dining."
            >
              <Slider
                options={['Low', 'Medium', 'High']}
                name="food"
                value={budgetControls.food}
                color="gray"
                onChange={handleControlChange}
              />
            </InputSection>

            <InputSection
              name="Commute Budget"
              description="Adjust your budget for regular transport needs — public transit, ride-hailing, or occasional driving."
            >
              <Slider
                options={['Low', 'Medium', 'High']}
                name="transport"
                value={budgetControls.transport}
                color="gray"
                onChange={handleControlChange}
              />
            </InputSection>

            <InputSection
              name="Budget for Fun"
              description="Set your budget for regular nights out — not including big splurges or buying rounds for the whole bar."
            >
              <Slider
                options={['Low', 'Medium', 'High']}
                name="out"
                value={budgetControls.out}
                color="gray"
                onChange={handleControlChange}
              />
            </InputSection>

            <InputSection
              name="Clothing Budget"
              description="Adjust how much you plan to spend on standard clothing and fashion — excluding high-end or luxury items."
            >
              <Slider
                options={['Low', 'Medium', 'High']}
                name="clothes"
                value={budgetControls.clothes}
                color="gray"
                onChange={handleControlChange}
              />
            </InputSection>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-md shadow-sm mb-6 text-sm">
            <p className="font-semibold mb-1">Note on Accuracy and Personalization</p>
            <p>
              The figures provided are estimates based on publicly available price data and general
              spending patterns. Your actual costs may vary significantly depending on your personal
              habits, lifestyle choices, and local market conditions. This tool is meant to guide
              and inform — not to deliver exact predictions.
            </p>
          </div>
        </div>
      </AsyncStateWrapper>
    </div>
  );
}

export default BudgetPlay;
