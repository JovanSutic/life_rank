/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { ReportUserData } from '../../types/api.types';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { getBaseData, getStepItems, prepData, formatCurrency } from '../../utils/saveNet';
import { getSchema } from '../../data/validation';
import type { FormItem } from '../../types/city.types';
import { currencyMap } from '../../utils/budgetMaps';
import InfoModals from './InfoModals';
import Modal from '../Basic/Modal';
import { Button } from '../Basic/Button';
import { useAccountantCostOverride } from './useAccountantCostOverride';

interface SaveNetFormProps {
  sendData: (data: ReportUserData) => void;
  cityId: number;
  country: string;
}

const getNestedValue = (obj: any, path: string) => {
  // eslint-disable-next-line no-useless-escape
  const parts = path.split(/[\.\[\]]/).filter(Boolean);
  let current = obj;
  for (const part of parts) {
    if (current === undefined || current === null) {
      return undefined;
    }
    const index = parseInt(part, 10);
    if (!isNaN(index)) {
      current = current[index];
    } else {
      current = current[part];
    }
  }
  return current;
};

const StepIndicator: React.FC<{ step: number; total: number }> = ({ step, total }) => {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="w-full py-2">
      <div className="text-xs text-gray-600 mb-1">
        Step {step} of {total}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="h-2 rounded-full bg-blue-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

function SaveNetForm({ sendData, cityId, country }: SaveNetFormProps) {
  const totalSteps = 3;
  const [step, setStep] = useState(1);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('');

  const schema = getSchema(country);

  type FormValues = z.infer<typeof schema>;
  const [step1] = getStepItems(country);
  const { baseEarner } = getBaseData(country);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    trigger,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: {
      earners: [baseEarner],
      dependents: { hasSpouse: false, spouseDependent: false, children: [] },
    },
  });

  const {
    fields: earnerFields,
    append: appendEarner,
    remove: removeEarner,
  } = useFieldArray({
    control,
    name: 'earners',
  });

  const children = watch('dependents.children');
  const earners = watch('earners');
  const watchedValues = watch();

  const {
    fields: childFields,
    append: appendChild,
    remove: removeChild,
  } = useFieldArray({
    control,
    name: 'dependents.children',
  });

  const onNext = async () => {
    let fieldsToValidate: (keyof FormValues)[] = [];
    if (step === 1) {
      fieldsToValidate = ['earners'];
    } else if (step === 2) {
      fieldsToValidate = ['dependents'];
    }

    const valid = await trigger(fieldsToValidate as any);
    if (!valid) return;
    setStep((s) => Math.min(totalSteps, s + 1));
  };

  const onBack = () => setStep((s) => Math.max(1, s - 1));

  const onEditStep = (target: number) => setStep(target);

  const onSubmit = (data: FormValues) => {
    const fullData = prepData(data, cityId, country);
    reset();
    sendData(fullData);
  };

  const accountingOverride = useAccountantCostOverride(earners, country);

  const canAddEarner = earnerFields.length < 2;
  const hasSpouse = watch('dependents.hasSpouse');
  const spouseDependent = watch('dependents.spouseDependent');

  useEffect(() => {
    trigger('dependents.spouseDependent');
  }, [hasSpouse, trigger]);

  useEffect(() => {
    if (earnerFields.length > 1 && spouseDependent) {
      setValue('dependents.spouseDependent', false, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [earnerFields.length, spouseDependent]);

  useEffect(() => {
    if (accountingOverride.length) {
      accountingOverride.forEach((item) => {
        if (item.isViolation && isValid) {
          setValue(`earners.${item.index}.accountantCost`, item.value);
        }
      });
    }
  }, [accountingOverride, isValid]);

  const renderField = (item: FormItem, idx?: number) => {
    if (item.condition) {
      const dependsOnPath =
        idx !== undefined
          ? `earners[${idx}].${item.condition.dependsOn}`
          : item.condition.dependsOn;
      const dependsOnValue = getNestedValue(watchedValues, dependsOnPath);
      if (!item.condition.assertionFunction(dependsOnValue)) return null;
    }

    const fieldName =
      idx !== undefined ? `earners[${idx}].${item.name}` : `dependents.${item.name}`;
    const error =
      idx !== undefined
        ? (errors.earners as any)?.[idx]?.[item.name]?.message
        : (errors.dependents as any)?.[item.name]?.message;

    const label = (
      <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
        {item.label}
        {item.tooltip && (
          <InformationCircleIcon
            className="h-4 w-4 ml-1 text-gray-400 hover:text-blue-600 transition cursor-pointer"
            onClick={() => {
              setModalType(item.name);
              setIsModal(true);
            }}
          />
        )}
      </label>
    );

    switch (item.type) {
      case 'text':
      case 'number':
        return (
          <div key={fieldName} className="flex-1">
            {label}
            <div className="relative">
              <input
                type={item.type}
                step="0.01"
                placeholder={item.label}
                {...register(fieldName as any, { valueAsNumber: item.type === 'number' })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              {item.name !== 'age' && (
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
                  {currencyMap[watchedValues.earners[idx || 0].currency]}
                </span>
              )}
            </div>
            {error && <p className="text-xs text-red-500 mt-1">{String(error)}</p>}
          </div>
        );

      case 'select':
        return (
          <div key={fieldName} className="flex-1">
            {label}
            <select
              {...register(fieldName as any)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              {item.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {error && <p className="text-xs text-red-500 mt-1">{String(error)}</p>}
          </div>
        );

      case 'checkbox':
        return (
          <div key={fieldName} className="flex items-center gap-3">
            <input
              type="checkbox"
              id={`earners[${idx}].${item.name}`}
              {...register(fieldName as any)}
              className="w-5 h-5 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <label
                  htmlFor={`earners[${idx}].${item.name}`}
                  className="text-sm font-medium text-gray-700 cursor-pointer mr-2"
                >
                  {item.label}
                </label>
                {item.tooltip && (
                  <InformationCircleIcon
                    className="h-4 w-4 text-gray-400 hover:text-blue-600 cursor-pointer transition mt-0.5 shrink-0"
                    onClick={() => {
                      setModalType(item.name);
                      setIsModal(true);
                    }}
                  />
                )}
              </div>
              {error && <p className="text-xs text-red-500 mt-1">{String(error)}</p>}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <Modal
        show={isModal}
        close={() => {
          setIsModal(false);
          setModalType('');
        }}
      >
        <InfoModals modalType={modalType} />
      </Modal>
      <StepIndicator step={step} total={totalSteps} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && (
          <section className="pb-12 md:pb-0 mb-10 md:mb-2">
            <h2 className="text-base font-medium text-gray-800 mb-2">Your Income Details</h2>
            <p className="text-sm text-gray-600 mb-4">
              We only ask for details needed to calculate your taxes accurately — nothing more. All
              data stays private and is never stored.
            </p>
            <div className="space-y-6">
              {earnerFields.map((f, idx) => (
                <div
                  key={f.id}
                  className="p-4 rounded-lg bg-white shadow-md border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Earner {idx + 1}</div>
                    {earnerFields.length > 1 && (
                      <button
                        type="button"
                        className="cursor-pointer ml-auto text-sm text-red-600"
                        onClick={() => removeEarner(idx)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {step1.map((item) => renderField(item, idx))}
                  </div>
                </div>
              ))}
              <div className="pt-2 flex flex-col items-center justify-center gap-4">
                <p className="text-gray-500 text-sm text-center">
                  Are you calculating for a couple or family? You can add a second income earner
                  below.
                </p>
                <Button
                  onClick={() => appendEarner(baseEarner)}
                  disabled={!canAddEarner}
                  variant="neutral"
                  className="w-full md:w-[320px]"
                >
                  Add second earner
                </Button>
              </div>
            </div>
          </section>
        )}

        {step === 2 && (
          <section>
            <h2 className="text-base font-medium text-gray-800 mb-2">Family & Dependents</h2>
            <p className="text-sm text-gray-600 mb-4">
              We factor in dependents to identify tax reliefs and deductions you may qualify for.
              Your data stays private and is never stored.
            </p>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-end gap-3">
                  <input
                    id="hasSpouse"
                    type="checkbox"
                    {...register('dependents.hasSpouse' as const)}
                    className="w-5 h-5 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="hasSpouse"
                    className="text-sm font-medium text-gray-700 cursor-pointer inline-flex items-start gap-1 flex-wrap"
                  >
                    <span>I have dependents</span>
                  </label>
                </div>
                {errors.dependents?.hasSpouse && (
                  <p className="text-xs text-red-500 mt-1">
                    {String(errors.dependents?.hasSpouse?.message)}
                  </p>
                )}

                <div className="flex items-end gap-3">
                  <input
                    id="spouseDependent"
                    type="checkbox"
                    {...register('dependents.spouseDependent' as const)}
                    className="w-5 h-5 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="spouseDependent"
                    className="text-sm font-medium text-gray-700 cursor-pointer inline-flex items-start gap-1 flex-wrap"
                  >
                    <span>Dependent spouse (financially dependent)</span>
                  </label>
                </div>
                {errors.dependents?.spouseDependent && (
                  <p className="text-xs text-red-500 mt-1">
                    {String(errors.dependents?.spouseDependent?.message)}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-base font-medium text-gray-800">Children</div>
                  <div className="text-sm text-gray-500">Add dependent children (ages)</div>
                </div>

                <div className="space-y-3">
                  {childFields.map((c, i) => {
                    const ageVal = children?.[i]?.age;
                    return (
                      <div
                        key={c.id}
                        className="p-3 border border-gray-300 rounded-xl bg-white shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-gray-800">Child {i + 1}</div>
                          <button
                            type="button"
                            className="text-sm text-red-600 hover:text-red-800 cursor-pointer transition"
                            onClick={() => removeChild(i)}
                          >
                            Remove
                          </button>
                        </div>

                        <label
                          htmlFor={`dependents.children.${i}.age`}
                          className="block text-xs font-medium text-gray-700 mb-1"
                        >
                          Age
                        </label>
                        <input
                          id={`dependents.children.${i}.age`}
                          type="number"
                          min={0}
                          {...register(`dependents.children.${i}.age` as const, {
                            valueAsNumber: true,
                          })}
                          className="w-28 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {country === 'Spain' &&
                          typeof ageVal === 'number' &&
                          ageVal > 0 &&
                          ageVal < 3 && (
                            <div className="mt-3">
                              <label
                                htmlFor={`dependents.children.${i}.motherIsEarner`}
                                className="inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                              >
                                <input
                                  id={`dependents.children.${i}.motherIsEarner`}
                                  type="checkbox"
                                  {...register(`dependents.children.${i}.motherIsEarner` as const)}
                                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                Is the mother one of the income earners?
                              </label>
                            </div>
                          )}

                        {errors.dependents?.children?.[i]?.age && (
                          <p className="text-xs text-red-500 mt-1">
                            {String(errors.dependents?.children?.[i]?.age?.message)}
                          </p>
                        )}
                      </div>
                    );
                  })}

                  <div>
                    <Button onClick={() => appendChild({ name: '', age: 0 })} variant="secondary">
                      Add child
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {step === 3 && (
          <section>
            <h2 className="text-base font-medium text-gray-800 mb-2">Review Your Details</h2>
            <p className="text-sm text-gray-600 mb-4">
              Take a moment to confirm your inputs. You can go back and edit any step — your
              progress will be saved.
            </p>

            <div className="space-y-4">
              <div className="p-4 border border-gray-400 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">Income earner(s)</div>
                    <div className="mt-2 text-sm text-gray-700">
                      {watch('earners').map((e, i) => (
                        <div key={i} className="mb-1">
                          <strong>{`Person ${i + 1}`}</strong> —{' '}
                          {formatCurrency(e.income, e.currency)}
                          {e.isUSCitizen ? '· US citizen' : ''}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="text-sm text-blue-600 cursor-pointer"
                      onClick={() => onEditStep(1)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-gray-400 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">Dependents</div>

                    <div className="mt-2 text-sm text-gray-700 space-y-1">
                      <div>
                        Spouse dependent: {watch('dependents.spouseDependent') ? 'Yes' : 'No'}
                      </div>
                      <div>Children: {watch('dependents.children').length}</div>
                      {watch('dependents.children').map((c, i) => (
                        <div key={i} className="ml-2">
                          Child {i + 1}: {c.age} yrs
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="text-sm text-blue-600 cursor-pointer"
                      onClick={() => onEditStep(2)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <Button type="submit">Confirm & Calculate</Button>
              </div>
            </div>
          </section>
        )}

        <div className="fixed left-0 right-0 bottom-0 py-4 px-4 md:px-0 bg-white sm:static sm:bg-transparent">
          <div className="max-w-xl mx-auto flex md:justify-center gap-3 pt-6 border-t border-gray-300">
            {step > 1 && (
              <Button
                onClick={onBack}
                variant="neutral"
                className={`${step === 2 ? 'flex-1' : 'w-full md:w-[320px]'}`}
              >
                Back
              </Button>
            )}
            {step < totalSteps && (
              <Button
                onClick={onNext}
                className={`${step === 2 ? 'flex-1' : 'w-full md:w-[320px]'}`}
              >
                Next step
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default SaveNetForm;
