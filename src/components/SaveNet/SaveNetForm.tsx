import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Tooltip from '../Basic/Tooltip';
import type { ReportUserData } from '../../types/api.types';
import { prepData } from '../../utils/saveNet';
import { useMapStore } from '../../stores/mapStore';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

// -----------------------------
// Zod schema & Types
// -----------------------------
const currencyEnum = ['EUR', 'GBP', 'USD'] as const;
type Currency = (typeof currencyEnum)[number];

const ChildSchema = z.object({
  name: z.string().max(80).optional(),
  age: z.number().min(1).max(20),
  motherIsEarner: z.boolean().optional(),
});

const DependentSchema = z.object({
  hasSpouse: z.boolean(),
  spouseDependent: z.boolean().optional(),
  children: z.array(ChildSchema),
});

const EarnerSchema = z.object({
  label: z.string().min(1).max(60).optional(),
  income: z.number().min(15000, { message: 'Income must be at least 15,000' }),
  currency: z.enum(currencyEnum),
  isUSCitizen: z.boolean(),
});

const FormSchema = z.object({
  earners: z.array(EarnerSchema).min(1).max(2, 'We support up to two income earners'),
  dependents: DependentSchema,
});

export type FormValues = z.infer<typeof FormSchema>;

// -----------------------------
// Helper components
// -----------------------------
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
export default function SaveNetForm({
  sendData,
  cityId,
  defaultValues,
}: {
  sendData: (data: ReportUserData) => void;
  cityId: number;
  defaultValues: ReportUserData | null;
}) {
  const totalSteps = 3;
  const [step, setStep] = useState(defaultValues ? 3 : 1);
  const { setSaveNetData } = useMapStore();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    defaultValues: !defaultValues
      ? {
          earners: [{ label: 'Person 1', income: 0, currency: 'EUR', isUSCitizen: false }],
          dependents: { hasSpouse: false, spouseDependent: false, children: [] },
        }
      : {
          earners: defaultValues.incomes.map((item, index) => ({
            label: `Person ${index + 1}`,
            income: item.income,
            currency: item.currency.toUpperCase() as Currency,
            isUSCitizen: item.isUSCitizen,
          })),
          dependents: {
            hasSpouse: Boolean(defaultValues.dependents.find((item) => item.type === 'spouse')),
            spouseDependent: Boolean(
              defaultValues.dependents.find((item) => item.type === 'spouse')?.isDependent
            ),
            children: defaultValues.dependents.filter((item) => item.type === 'kid'),
          },
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

  const {
    fields: childFields,
    append: appendChild,
    remove: removeChild,
  } = useFieldArray({
    control,
    name: 'dependents.children',
  });

  const onNext = async () => {
    const valid = await trigger();
    if (!valid) return;
    setStep((s) => Math.min(totalSteps, s + 1));
  };

  const onBack = () => setStep((s) => Math.max(1, s - 1));

  const onEditStep = (target: number) => setStep(target);

  const onSubmit = (data: FormValues) => {
    const fullData = prepData(data, cityId);
    setSaveNetData(fullData);
    reset();

    sendData(fullData);
  };

  // UX helpers
  const canAddEarner = earnerFields.length < 2;

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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs mb-1">Expected annual income</label>
                      <input
                        type="number"
                        step="0.01"
                        {...register(`earners.${idx}.income` as const, { valueAsNumber: true })}
                        className="w-full p-2 border rounded"
                        placeholder="0"
                      />
                      {errors.earners?.[idx]?.income && (
                        <p className="text-xs text-red-500">
                          {String(errors.earners?.[idx]?.income?.message)}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs mb-1">Currency</label>
                      <select
                        {...register(`earners.${idx}.currency` as const)}
                        className="w-full p-2 border rounded"
                      >
                        {currencyEnum.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        {...register(`earners.${idx}.isUSCitizen` as const)}
                        className="w-4 h-4"
                      />
                      <span>US citizen</span>
                    </label>
                    <Tooltip text="We use this to check if U.S. federal and self-employment taxes may apply to your income.">
                      <InformationCircleIcon className="h-4 w-4 inline-block stroke-black" />
                    </Tooltip>

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
                </div>
              ))}

              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  disabled={!canAddEarner}
                  onClick={() =>
                    appendEarner({
                      label: `Person ${earnerFields.length + 1}`,
                      income: 0,
                      currency: 'EUR',
                      isUSCitizen: false,
                    })
                  }
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

              {/* Spouse */}
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register('dependents.spouseDependent' as const)}
                    className="w-4 h-4"
                  />
                  Dependent spouse (financially dependent)
                </label>
              </div>

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
                          <strong>{e.label ?? `Person ${i + 1}`}</strong> — {e.income} {e.currency}{' '}
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
                          Child {i + 1}: {c.age} yrs {c.motherIsEarner ? '· Mother is earner' : ''}
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
                  className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 cursor-pointer text-white"
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
                className="flex-1 py-2 rounded border cursor-pointer"
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
