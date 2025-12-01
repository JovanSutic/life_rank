import * as z from 'zod';

const currencyEnum = ['EUR', 'GBP', 'USD'] as const;

const BaseChildSchema = z.object({
  name: z.string().max(80).optional(),
  age: z.number().min(1).max(20),
});

const ChildSchema = BaseChildSchema.extend({
  motherIsEarner: z.boolean().optional(),
});

const ChildUnionSchema = z.union([ChildSchema, BaseChildSchema]);
const BaseEarnerSchema = z.object({
  income: z.number().min(15000, { message: 'Income must be at least 15,000' }),
  currency: z.enum(currencyEnum),
  accountantCost: z.number().min(80, { message: 'Monthly accountant costs must be at least 80' }),
  expensesCost: z.number().optional(),
  isUSCitizen: z.boolean(),
});

const BaseEarnerSchemaFlat = z.object({
  income: z.number().min(15000),
  currency: z.enum(currencyEnum),
  accountantCost: z.number().min(0),
  expensesCost: z.number().optional(),
  isUSCitizen: z.boolean(),
});

const applyCostLogicAndValidation = (
  schema: typeof BaseEarnerSchemaFlat,
  incomeThreshold: number,
  minAccountantCost: number
) => {
  return schema.superRefine((data, ctx) => {
    if (data.income > incomeThreshold && data.accountantCost < minAccountantCost) {
      ctx.addIssue({
        code: 'custom',
        path: ['accountantCost'],
        message: `Monthly accountant costs must be at least ${minAccountantCost} for this income level.`,
      });
    }
  });
};

const BaseDependentSchema = z
  .object({
    hasSpouse: z.boolean(),
    spouseDependent: z.boolean().optional(),
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

const SpainEarnerSchema = BaseEarnerSchema;

const CzechEarnersSchema = BaseEarnerSchema.extend({
  accountantCost: z.number(),
}).superRefine((data, ctx) => {
  if (data.income > 81000 && data.accountantCost < 80) {
    ctx.addIssue({
      code: 'custom',
      message: 'Monthly accountant costs must be at least 80',
      path: ['accountantCost'],
    });
  }
});

const PortugalEarnerSchema = BaseEarnerSchema.extend({
  age: z
    .number()
    .min(18, { message: 'Can not be younger than 18' })
    .max(70, { message: 'Can not be older than 70' }),
});

const ItalyEarnerSchema = BaseEarnerSchema.extend({
  workType: z.string().optional(),
  isStartup: z.boolean().optional(),
  isSpecialist: z.boolean().optional(),
  isUSCitizen: z.boolean().optional(),
}).superRefine((data, ctx) => {
  if (data.income <= 85000 && (!data.workType || data.workType.trim() === '')) {
    ctx.addIssue({
      code: 'custom',
      path: ['workType'],
      message: 'Work type is required and cannot be empty',
    });
  }
});

const SerbianEarnerBase = BaseEarnerSchemaFlat.extend({
  age: z
    .number()
    .min(18, { message: 'Can not be younger than 18' })
    .max(70, { message: 'Can not be older than 70' }),
  isIndependent: z.boolean().optional(),
});

const SerbianEarnersSchema = applyCostLogicAndValidation(SerbianEarnerBase, 50000, 100);

const RomaniaEarnersSchema = applyCostLogicAndValidation(BaseEarnerSchemaFlat, 25000, 120);

const SpainSchema = z.object({
  earners: z.array(SpainEarnerSchema).min(1).max(2, 'We support up to two income earners'),
  dependents: BaseDependentSchema.extend({
    children: z.array(ChildUnionSchema),
  }),
});

const BulgariaSchema = z.object({
  earners: z.array(SpainEarnerSchema).min(1).max(2, 'We support up to two income earners'),
  dependents: BaseDependentSchema.extend({
    children: z.array(BaseChildSchema),
  }),
});

const SerbianSchema = z.object({
  earners: z.array(SerbianEarnersSchema).min(1).max(2, 'We support up to two income earners'),
  dependents: BaseDependentSchema.extend({
    children: z.array(BaseChildSchema),
  }),
});

const CzechSchema = z.object({
  earners: z.array(CzechEarnersSchema).min(1).max(2, 'We support up to two income earners'),
  dependents: BaseDependentSchema.extend({
    children: z.array(BaseChildSchema),
  }),
});

const PortugalSchema = z.object({
  earners: z.array(PortugalEarnerSchema).min(1).max(2, 'We support up to two income earners'),
  dependents: BaseDependentSchema.extend({
    children: z.array(BaseChildSchema),
  }),
});

const ItalySchema = z.object({
  earners: z.array(ItalyEarnerSchema).min(1).max(2, 'We support up to two income earners'),
  dependents: BaseDependentSchema.extend({
    children: z.array(BaseChildSchema),
  }),
});

const RomaniaSchema = z.object({
  earners: z.array(RomaniaEarnersSchema).min(1).max(2, 'We support up to two income earners'),
  dependents: BaseDependentSchema.extend({
    children: z.array(BaseChildSchema),
  }),
});

export const getSchema = (country: string) => {
  if (country === 'Bulgaria') return BulgariaSchema;
  if (country === 'Spain') return SpainSchema;
  if (country === 'Italy') return ItalySchema;
  if (country === 'Czech Republic') return CzechSchema;
  if (country === 'Romania') return RomaniaSchema;
  if (country === 'Serbia') return SerbianSchema;
  return PortugalSchema;
};
