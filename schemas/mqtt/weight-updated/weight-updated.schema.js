import schema from 'fluent-json-schema';

const weightUpdatedSchema = schema
  .object()
  .prop(
    'd',
    schema
      .object()
      .prop(
        'w',
        schema
          .number()
          .required()
          .description('The current estimated weight in kilograms'),
      )
      .prop(
        'mw',
        schema
          .number()
          .required()
          .description('The maximum weight in kilograms'),
      ),
  )

  .prop(
    'ts',
    schema
      .string()
      .format('date-time')
      .required()
      .description('The timestamp of the update in ISO 8601 format'),
  );

export default weightUpdatedSchema;
