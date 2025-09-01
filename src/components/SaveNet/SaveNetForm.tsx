/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { ReportUserData } from '../../types/api.types';
import Tooltip from '../Basic/Tooltip';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { getBaseData, getStepItems, prepData } from '../../utils/saveNet';
import { getSchema } from '../../data/validation';
import type { FormItem } from '../../types/city.types';

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

// -----------------------------
// Main Component
// -----------------------------

function SaveNetForm({ sendData, cityId, country }: SaveNetFormProps) {
  const totalSteps = 3;
  const [step, setStep] = useState(1);

  const schema = getSchema(country);

  type FormValues = z.infer<typeof schema>;
  const [step1] = getStepItems(country);
  const { baseEarner } = getBaseData(country);

  console.log(baseEarner);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
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
    console.log(valid);
    console.log(errors);
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

  // Helper function to render an individual field
  const renderField = (item: FormItem, idx?: number) => {
    // New logic: Check if a condition exists and if it is met.
    if (item.condition) {
      const dependsOnPath =
        idx !== undefined
          ? `earners[${idx}].${item.condition.dependsOn}`
          : item.condition.dependsOn;

      // Use the new helper function to safely get the nested value
      const dependsOnValue = getNestedValue(watchedValues, dependsOnPath);

      // Call the assertion function to determine if the field should be rendered
      if (!item.condition.assertionFunction(dependsOnValue)) {
        return null; // Don't render if the assertion is false
      }
    }

    const fieldName =
      idx !== undefined ? `earners[${idx}].${item.name}` : `dependents.${item.name}`;
    const error =
      idx !== undefined
        ? (errors.earners as any)?.[idx]?.[item.name]?.message
        : (errors.dependents as any)?.[item.name]?.message;

    switch (item.type) {
      case 'text':
      case 'number':
        return (
          <div key={fieldName} className="flex-1">
            <label className="block text-xs mb-1">
              {item.label}
              {item.tooltip && (
                <Tooltip text={item.tooltip}>
                  <InformationCircleIcon className="h-4 w-4 inline-block stroke-black" />
                </Tooltip>
              )}
            </label>
            <input
              type={item.type}
              step="0.01"
              {...register(fieldName as any, { valueAsNumber: item.type === 'number' })}
              className="w-full p-2 border rounded"
              placeholder={item.label}
            />
            {error && <p className="text-xs text-red-500">{String(error)}</p>}
          </div>
        );
      case 'select':
        return (
          <div key={fieldName} className="flex-1">
            <label className="block text-xs mb-1">
              {item.label}
              {item.tooltip && (
                <Tooltip text={item.tooltip}>
                  <InformationCircleIcon className="h-4 w-4 inline-block stroke-black" />
                </Tooltip>
              )}
            </label>
            <select {...register(fieldName as any)} className="w-full p-2 border rounded">
              {item.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {error && <p className="text-xs text-red-500">{String(error)}</p>}
          </div>
        );
      case 'checkbox':
        return (
          <div key={fieldName} className="flex-1 flex items-end">
            <label className="flex items-center gap-2 mr-2">
              <input type="checkbox" {...register(fieldName as any)} className="w-4 h-4" />
              <span>{item.label}</span>
            </label>
            {item.tooltip && (
              <Tooltip text={item.tooltip}>
                <InformationCircleIcon className="h-5 w- inline-block stroke-black" />
              </Tooltip>
            )}
            {error && <p className="text-xs text-red-500">{String(error)}</p>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <StepIndicator step={step} total={totalSteps} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && (
          <section className="pb-12 md:pb-0">
            <h2 className="text-lg font-semibold mb-3">Income earner(s)</h2>
            <p className="text-sm text-gray-600 mb-4">
              Tell us about the income. We'll use this to calculate taxes and convert if needed.
            </p>
            <div className="space-y-6">
              {earnerFields.map((f, idx) => (
                <div key={f.id} className="p-4 rounded-lg bg-white shadow-md">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {step1.map((item) => renderField(item, idx))}
                  </div>
                </div>
              ))}
              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  disabled={!canAddEarner}
                  onClick={() => appendEarner(baseEarner)}
                  className={`w-full md:w-[300px] py-2 rounded-lg ${canAddEarner ? 'cursor-pointer bg-blue-500 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                >
                  Add another earner
                </button>
              </div>
            </div>
          </section>
        )}

        {step === 2 && (
          <section>
            <h2 className="text-lg font-semibold mb-3">Dependents</h2>
            <p className="text-sm text-gray-600 mb-4">
              Tell us who depends on the income — spouse, kids. We only ask for ages (not full DOB)
              to determine eligibility for age-based benefits.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register('dependents.hasSpouse' as const)}
                    className="w-4 h-4"
                  />
                  I have dependents
                </label>
              </div>
              {errors.dependents?.hasSpouse && (
                <p className="text-xs text-red-500">
                  {String(errors.dependents?.hasSpouse?.message)}
                </p>
              )}

              {/* Spouse */}
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    disabled={earnerFields.length > 1}
                    {...register('dependents.spouseDependent' as const)}
                    className="w-4 h-4"
                  />
                  Dependent spouse (financially dependent)
                </label>
              </div>
              {errors.dependents?.spouseDependent && (
                <p className="text-xs text-red-500">
                  {String(errors.dependents?.spouseDependent?.message)}
                </p>
              )}

              {/* Children management */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Children</div>
                  <div className="text-xs text-gray-500">Add dependent children (ages)</div>
                </div>

                <div className="space-y-3">
                  {childFields.map((c, i) => {
                    const ageVal = children?.[i]?.age;
                    return (
                      <div key={c.id} className="p-3 border rounded-lg bg-white">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">Child {i + 1}</div>
                          <button
                            type="button"
                            className="text-sm text-red-600 cursor-pointer"
                            onClick={() => removeChild(i)}
                          >
                            Remove
                          </button>
                        </div>

                        <label className="block text-xs mt-2">Age</label>
                        <input
                          type="number"
                          min={0}
                          {...register(`dependents.children.${i}.age` as const, {
                            valueAsNumber: true,
                          })}
                          className="w-28 p-2 border rounded"
                        />

                        {/* Only show mother question if age < 3 */}
                        {typeof ageVal === 'number' && ageVal < 3 && ageVal > 0 && (
                          <div className="mt-3">
                            <label className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                {...register(`dependents.children.${i}.motherIsEarner` as const)}
                                className="w-4 h-4"
                              />
                              Is the mother one of the income earners?
                            </label>
                          </div>
                        )}

                        {errors.dependents?.children?.[i]?.age && (
                          <p className="text-xs text-red-500">
                            {String(errors.dependents?.children?.[i]?.age?.message)}
                          </p>
                        )}
                      </div>
                    );
                  })}

                  <div>
                    <button
                      type="button"
                      onClick={() => appendChild({ name: '', age: 0 })}
                      className="px-3 py-2 cursor-pointer rounded bg-gray-100"
                    >
                      Add child
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {step === 3 && (
          <section>
            <h2 className="text-lg font-semibold mb-3">Review & submit</h2>
            <p className="text-sm text-gray-600 mb-4">
              Check your data. Tap Edit to go back to a step and change values. Your progress will
              be preserved.
            </p>

            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">Income earner(s)</div>
                    <div className="mt-2 text-sm text-gray-700">
                      {watch('earners').map((e, i) => (
                        <div key={i} className="mb-1">
                          <strong>{`Person ${i + 1}`}</strong> — {e.income} {e.currency}{' '}
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

              <div className="p-4 border rounded-lg">
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
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 cursor-pointer text-white"
                >
                  Confirm & Calculate
                </button>
              </div>
            </div>
          </section>
        )}

        <div className="fixed left-0 right-0 bottom-0 py-4 px-4 md:px-0 bg-white border-t sm:static sm:bg-transparent sm:border-0">
          <div className="max-w-xl mx-auto flex md:justify-center gap-3">
            {step > 1 && (
              <button
                type="button"
                onClick={onBack}
                className="flex-1 py-2 rounded-lg border cursor-pointer"
              >
                Back
              </button>
            )}
            {step < totalSteps && (
              <button
                type="button"
                onClick={onNext}
                className={`${step > 1 ? 'flex-1' : 'w-full md:w-[300px]'} py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white cursor-pointer`}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default SaveNetForm;
