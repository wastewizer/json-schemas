import schema from 'fluent-json-schema';

const weightUpdatedSchema = schema
  .object()
  .prop(
    'weightKg',
    schema
      .number()
      .required()
      .description('The current estimated weight in kilograms'),
  )
  .prop(
    'maxWeightKg',
    schema.number().required().description('The maximum weight in kilograms'),
  )
  .prop(
    'timestamp',
    schema
      .string()
      .format('date-time')
      .required()
      .description('The timestamp of the update'),
  );

export default weightUpdatedSchema;
