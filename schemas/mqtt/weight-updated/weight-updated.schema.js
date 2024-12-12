import schema from 'fluent-json-schema';

const weightUpdatedSchema = schema
  .object()
  .description('A weight updated message for a container site')
  .prop(
    'd',
    schema
      .object()
      .description('The data of the update')
      .required()
      .prop(
        'w',
        schema
          .number()
          .description('The current estimated weight in kilograms')
          .required(),
      )
      .prop(
        'mw',
        schema
          .number()
          .description('The maximum weight in kilograms')
          .required(),
      ),
  )

  .prop(
    'ts',
    schema
      .string()
      .format('date-time')
      .description('The timestamp of the update in ISO 8601 format')
      .required(),
  );

export default weightUpdatedSchema;
