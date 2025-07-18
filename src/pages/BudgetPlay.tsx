import { useParams, useSearchParams } from 'react-router-dom';
import Switch from '../components/Budget/Switch';
import Slider from '../components/Budget/Slider';
import BudgetSelector from '../components/Budget/BudgetSelector';
import InputSection from '../components/Budget/InputSection';
import { SocialType } from '../types/api.types';
import { useQuery } from '@tanstack/react-query';
import AsyncStateWrapper from '../components/AsyncWrapper';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { BudgetItem } from '../types/budget.types';
import { apartmentControlMap, SOLO_BUDGET } from '../utils/budgetMaps';
import {
  calculateBudget,
  calculateBudgetPart,
  findKeyByValue,
  getBudgetMap,
  getTagIndicator,
  isFullyPriced,
  roundToTwoDecimals,
  updateBudgetStructure,
} from '../utils/budget';
import Modal from '../components/Basic/Modal';
import NewsletterModal from '../components/Basic/NewsletterModal';
import { useMapStore } from '../stores/mapStore';
import { trackPageview } from '../utils/analytics';
import SettingsButton from '../components/Basic/SettingsButton';
import { fetchBudgets, fetchCurrency, fetchFeel, fetchPrices } from '../utils/apiCalls';
import { getBudgetLabel } from '../utils/map';
import BackButton from '../components/Basic/BackButton';

interface BudgetControls {
  apartmentLocation: string;
  apartmentSize: string;
  apartmentPrice: string;
  apartmentTerm: string;
  food: string;
  transport: string;
  out: string;
  clothes: string;
  preschool?: string;
}

const budgetControlsDefault: BudgetControls = {
  apartmentLocation: 'Central location',
  apartmentSize: 'Smaller apartment',
  apartmentPrice: 'Average',
  apartmentTerm: 'Long term',
  food: 'Medium',
  transport: 'Medium',
  out: 'Medium',
  clothes: 'Medium',
  preschool: 'Off',
};

function BudgetPlay() {
  const { name } = useParams();
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get('id');
  const id = idParam ? parseInt(idParam, 10) : null;
  const {
    currency: currencyName,
    currencyIndex,
    newsLetterShow,
    toggleNewsletterShow,
  } = useMapStore();

  const [budgetControls, setBudgetControls] = useState<BudgetControls>(budgetControlsDefault);
  const [isModal, setIsModal] = useState<boolean>(false);

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

  const {
    data: feel,
    isLoading: feelIsLoading,
    isFetching: feelIsFetching,
    isError: feelIsError,
    error: feelError,
  } = useQuery({
    queryKey: ['GET_BUDGET_CITY_FEEL', id],
    queryFn: () => fetchFeel(id as number),
    enabled: !!id,
    retry: 2,
  });

  const { data: currency } = useQuery({
    queryKey: ['GET_CURRENCY'],
    queryFn: () => fetchCurrency(),
    retry: 2,
    staleTime: 60 * 60 * 1000,
  });

  const shortIncrease: null | number = useMemo(() => {
    return feel ? getTagIndicator(feel.tags!, 'shortIncrease') : null;
  }, [feel?.id]);

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
      let change = '';
      if (
        position === 'apartmentLocation' ||
        position === 'apartmentSize' ||
        position === 'apartmentPrice' ||
        position === 'apartmentTerm'
      ) {
        change = findKeyByValue(apartmentControlMap, value)!;
      } else {
        change = `${position}_${value.toLowerCase()}`;
      }

      structure = updateBudgetStructure(budgetType, change, currentStructure);

      if (position === 'apartmentTerm') {
        setBudgetControls({
          ...budgetControls,
          apartmentPrice: 'Average',
          [position]: value,
        });
      } else {
        setBudgetControls({
          ...budgetControls,
          [position]: value,
        });
      }

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
        setBudgetControls({
          ...budgetControlsDefault,
          apartmentSize: 'Bigger apartment',
          preschool: 'On',
        });
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
      const addition: number =
        budgetControls.apartmentTerm === 'Short term' && shortIncrease
          ? shortIncrease * calculateBudgetPart('apartment', currentStructure, prices) -
            calculateBudgetPart('apartment', currentStructure, prices)
          : 0;
      const newBudget = roundToTwoDecimals(calculateBudget(currentStructure, prices) + addition);
      setCurrentBudget({
        ...currentBudget,
        [budgetType]: newBudget,
      });
    }
  }, [structureHash, currentBudget.FAMILY]);

  const partsAmount = useMemo(() => {
    if (prices) {
      return {
        apartment:
          budgetControls.apartmentTerm === 'Short term' && shortIncrease
            ? roundToTwoDecimals(
                shortIncrease * calculateBudgetPart('apartment', currentStructure, prices)
              )
            : calculateBudgetPart('apartment', currentStructure, prices),
        food: calculateBudgetPart('food', currentStructure, prices),
        transport: calculateBudgetPart('transport', currentStructure, prices),
        out: calculateBudgetPart('out', currentStructure, prices),
        clothes: calculateBudgetPart('clothes', currentStructure, prices),
        preschool: calculateBudgetPart('preschool', currentStructure, prices),
      };
    }

    return {
      apartment: 0,
      food: 0,
      transport: 0,
      out: 0,
      clothes: 0,
    };
  }, [structureHash, prices?.length]);

  useEffect(() => {
    trackPageview(`/budget/${name}`);
  }, []);

  return (
    <>
      <article>
        <title>{`Budget needed in ${name} | LifeRank`}</title>
        <meta
          name="description"
          content={`Budget needed in ${name} for expats and nomads looking for peaceful & affordable places`}
        />
        <meta
          name="keywords"
          content={`${name}, budget, budgeting, expenses, rent expenses, food expenses, life expenses`}
        />
      </article>
      <div className="relative flex flex-col min-h-screen w-full px-2 pb-6">
        <Modal show={isModal}>
          <h3 className="text-xl font-semibold mb-6 text-center">Budget Categories Explained</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>
              <strong>🏠 Housing & Utilities:</strong> Rent, utilities, internet, mobile plans.
            </li>
            <li>
              <strong>🍽️ Food & Essentials:</strong> Groceries, restaurants, food orders, basic home
              & personal items.
            </li>
            <li>
              <strong>🚕 Transport:</strong> Public transit, taxis, gas, parking, ride-hailing.
            </li>
            <li>
              <strong>🎭 Leisure & Fun:</strong> Bars, events, activities, local experiences.
            </li>
            <li>
              <strong>👕 Clothing:</strong> Apparel, shoes, seasonal wear.
            </li>
            <li>
              <strong>🏫 Preschool:</strong> Only for families, preschool expenses.
            </li>
          </ul>
          <div className="my-6">
            <p className="text-xs text-gray-600 mb-2">
              The budgets presented here are intended as **general guidance** based on average
              spending patterns. They do not include luxury goods, high-end services, or large
              one-time purchases.
            </p>

            <p className="text-xs text-gray-600">
              You can customize budgets for different lifestyles: solo travelers, couples, or
              families. Adjust the settings to see how expenses might change depending on your
              situation.
            </p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setIsModal(false)}
              className="flex items-center text-sm text-black hover:bg-gray-300 transition cursor-pointer py-2 px-4 bg-gray-200 rounded-lg"
            >
              Close
            </button>
          </div>
        </Modal>
        <NewsletterModal show={newsLetterShow} onClose={toggleNewsletterShow} />
        <AsyncStateWrapper
          isLoading={
            isLoading ||
            isFetching ||
            pricesIsLoading ||
            pricesIsFetching ||
            feelIsLoading ||
            feelIsFetching
          }
          isError={isError || pricesIsError || feelIsError}
          error={error || pricesError || feelError}
        >
          <div className="sticky top-0 z-20 bg-white pb-4 pt-6 px-4 lg:px-0 flex flex-col w-full lg:w-[764px] mx-auto text-center">
            {currency && <SettingsButton currency={currency} type="dark" />}
            <BackButton />

            <h1 className="text-lg lg:text-2xl font-semibold text-gray-800 mb-2 mt-8 lg:mt-0">
              Explore Your Monthly Budget in {name}
            </h1>

            <button
              onClick={() => setIsModal(true)}
              className="text-sm text-blue-600 underline mb-6"
            >
              get more info about the budget
            </button>

            <BudgetSelector
              budgets={{
                SOLO: currentBudget.SOLO,
                PAIR: currentBudget.PAIR,
                FAMILY: currentBudget.FAMILY,
              }}
              currency={currencyName}
              index={currencyIndex}
              onChange={handleTypeChange}
            />
          </div>

          <div className="flex flex-col w-full lg:w-[764px] mx-auto text-center px-2 pt-1 gap-6">
            <InputSection
              name="🏠 Housing & Utilities"
              amount={getBudgetLabel(currencyName, currencyIndex, partsAmount.apartment, false)}
              onClick={() => setIsModal(!isModal)}
            >
              <div className="w-full lg:w-[328px]">
                <Switch
                  options={['Central location', 'Outer areas']}
                  name="apartmentLocation"
                  onChange={handleControlChange}
                  value={budgetControls.apartmentLocation}
                  color="gray"
                />
              </div>
              <div className="w-full lg:w-[328px]">
                <Switch
                  options={['Smaller apartment', 'Bigger apartment']}
                  name="apartmentSize"
                  onChange={handleControlChange}
                  value={budgetControls.apartmentSize}
                  color="gray"
                />
              </div>

              {shortIncrease && (
                <div className="w-full lg:w-[328px]">
                  <Switch
                    options={['Long term', 'Short term']}
                    name="apartmentTerm"
                    onChange={handleControlChange}
                    value={budgetControls.apartmentTerm}
                    color="gray"
                  />
                </div>
              )}

              {isFullPrice && (
                <>
                  <p className=" w-full text-sm text-center text-gray-500">Housing price level</p>
                  <Slider
                    options={['Low price', 'Average', 'High price']}
                    name="apartmentPrice"
                    value={budgetControls.apartmentPrice}
                    color="gray"
                    disabled={budgetControls.apartmentTerm === 'Short term'}
                    onChange={handleControlChange}
                  />
                </>
              )}
            </InputSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InputSection
                name="🍽️ Food & Essentials"
                amount={getBudgetLabel(currencyName, currencyIndex, partsAmount.food, false)}
                onClick={() => setIsModal(!isModal)}
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
                name="🚕 Transport"
                amount={getBudgetLabel(currencyName, currencyIndex, partsAmount.transport, false)}
                onClick={() => setIsModal(!isModal)}
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
                name="🎭 Leisure & Fun"
                amount={getBudgetLabel(currencyName, currencyIndex, partsAmount.out, false)}
                onClick={() => setIsModal(!isModal)}
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
                name="👕 Clothing"
                amount={getBudgetLabel(currencyName, currencyIndex, partsAmount.clothes, false)}
                onClick={() => setIsModal(!isModal)}
              >
                <Slider
                  options={['Low', 'Medium', 'High']}
                  name="clothes"
                  value={budgetControls.clothes}
                  color="gray"
                  onChange={handleControlChange}
                />
              </InputSection>

              {budgetType === 'FAMILY' && (
                <InputSection
                  name="🏫 Preschool"
                  amount={getBudgetLabel(
                    currencyName,
                    currencyIndex,
                    partsAmount.preschool!,
                    false
                  )}
                  onClick={() => setIsModal(!isModal)}
                >
                  <Switch
                    options={['On', 'Off']}
                    name="preschool"
                    value={budgetControls.preschool!}
                    color="gray"
                    onChange={handleControlChange}
                  />
                </InputSection>
              )}
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 rounded-md shadow-sm text-sm">
              <p className="font-semibold mb-1">Newsletter</p>
              <p className="text-xs lg:text-sm mb-2">
                If you find this interesting you should definitely subscribe to out newsletter and
                enjoy our weekly insights.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={toggleNewsletterShow}
                  className="inline-block cursor-pointer px-4 py-1.5 rounded-lg bg-blue-500 text-white font-semibold text-sm hover:bg-blue-700"
                >
                  📧 Subscribe to our newsletter
                </button>
              </div>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-md shadow-sm mb-6 text-sm">
              <p className="font-semibold mb-1">Note on Accuracy and Personalization</p>
              <p className="text-xs lg:text-sm">
                The figures provided here are based on publicly available data and common spending
                patterns. Our average/medium budgets reflects a relaxed, comfortable lifestyle — not
                the lowest possible cost. Your actual expenses may vary depending on your personal
                habits, priorities, and pace of life.
              </p>
            </div>
          </div>
        </AsyncStateWrapper>
      </div>
    </>
  );
}

export default BudgetPlay;
