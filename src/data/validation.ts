import * as z from 'zod';

const currencyEnum = ['EUR', 'GBP', 'USD'] as const;

const ChildSchema = z.object({
  name: z.string().max(80).optional(),
  age: z.number().min(1).max(20),
  motherIsEarner: z.boolean().optional(),
});
const NoMotherChildSchema = z.object({
  name: z.string().max(80).optional(),
  age: z.number().min(1).max(20),
});

const DependentSchema = z
  .object({
    hasSpouse: z.boolean(),
    spouseDependent: z.boolean().optional(),
    children: z.array(ChildSchema),
  })
  .superRefine((data, ctx) => {
    if (data.spouseDependent && !data.hasSpouse) {
      ctx.addIssue({
        code: 'custom',
        message: "You cannot have a dependent spouse if you don't have dependents.",
        path: ['spouseDependent'],
      });
    }
  });

const EarnerSchema = z.object({
  income: z.number().min(15000, { message: 'Income must be at least 15,000' }),
  currency: z.enum(currencyEnum),
  accountantCost: z.number().min(80, { message: 'Monthly accountant costs must be at least 80' }),
  expensesCost: z.number().min(100, { message: 'Monthly business expenses must be at least 100' }),
  isUSCitizen: z.boolean(),
});

const PortugalEarnerSchema = z.object({
  income: z.number().min(15000, { message: 'Income must be at least 15,000' }),
  currency: z.enum(currencyEnum),
  accountantCost: z.number().min(80, { message: 'Monthly accountant costs must be at least 80' }),
  expensesCost: z.number().min(100, { message: 'Monthly business expenses must be at least 100' }),
  isUSCitizen: z.boolean(),
  age: z
    .number()
    .min(18, { message: 'Can not be younger than 18' })
    .max(70, { message: 'Can not be older than 70' }),
});

const ItalyEarnerSchema = z
  .object({
    income: z.number().min(15000, { message: 'Income must be at least 15,000' }),
    currency: z.enum(currencyEnum),
    accountantCost: z.number().min(80, { message: 'Monthly accountant costs must be at least 80' }),
    expensesCost: z
      .number()
      .min(100, { message: 'Monthly business expenses must be at least 100' }),
    workType: z.string().optional(),
    isStartup: z.boolean().optional(),
    isSpecialist: z.boolean().optional(),
    isUSCitizen: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.income <= 85000 && (!data.workType || data.workType.trim() === '')) {
      ctx.addIssue({
        code: 'custom',
        path: ['workType'],
        message: 'Work type is required and cannot be empty',
      });
    }
  });

const SimpleDependentSchema = z
  .object({
    hasSpouse: z.boolean(),
    spouseDependent: z.boolean().optional(),
    children: z.array(NoMotherChildSchema),
  })
  .superRefine((data, ctx) => {
    if (data.spouseDependent && !data.hasSpouse) {
      ctx.addIssue({
        code: 'custom',
        message: "You cannot have a dependent spouse if you don't have dependents.",
        path: ['spouseDependent'],
      });
    }
  });

const SpainSchema = z.object({
  earners: z.array(EarnerSchema).min(1).max(2, 'We support up to two income earners'),
  dependents: DependentSchema,
});

const PortugalSchema = z.object({
  earners: z.array(PortugalEarnerSchema).min(1).max(2, 'We support up to two income earners'),
  dependents: SimpleDependentSchema,
});

const ItalySchema = z.object({
  earners: z.array(ItalyEarnerSchema).min(1).max(2, 'We support up to two income earners'),
  dependents: SimpleDependentSchema,
});

export const getSchema = (country: string) => {
  if (country === 'Spain') return SpainSchema;
  if (country === 'Italy') return ItalySchema;

  return PortugalSchema;
};
