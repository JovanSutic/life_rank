import type { FormValues } from '../components/SaveNet/SaveNetForm';
import type {
  CurrencyString,
  Dependents,
  PersonalIncomes,
  ReportUserData,
} from '../types/api.types';

export const flowCounties: string[] = ['Spain'];

export const prepData = (data: FormValues, cityId: number): ReportUserData => {
  const dependents: Dependents[] = data.dependents.children.map((item) => ({
    type: 'kid',
    isDependent: true,
    age: item.age,
  }));
  const incomes: PersonalIncomes[] = data.earners.map((item) => ({
    isUSCitizen: item.isUSCitizen,
    currency: item.currency.toLowerCase() as CurrencyString,
    income: item.income,
  }));

  if (data.dependents.hasSpouse && data.dependents.spouseDependent) {
    dependents.push({ type: 'spouse', isDependent: true });
  }
  return {
    cityId,
    isWorkingMom: Boolean(data.dependents.children.find((item) => item.motherIsEarner)),
    dependents,
    incomes,
  };
};
