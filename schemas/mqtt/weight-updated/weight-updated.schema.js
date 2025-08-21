import schema from 'fluent-json-schema';

const weightUpdatedSchema = schema
  .object()
  .description('A weight updated message for a container site')
  .additionalProperties(
    schema
      .anyOf([schema.string(), schema.number()])
      .description('Additional client defined properties'),
  )
  .prop(
    'd',
    schema
      .object()
      .description('The data of the update')
      .required()
      .prop(
        'ts',
        schema
          .string()
          .format('date-time')
          .description('The timestamp of the update in ISO 8601 format')
          .required(),
      )
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
    'm',
    schema
      .object()
      .description('Metadata about the update')
      .required()
      .prop(
        'pts',
        schema
          .string()
          .format('date-time')
          .description(
            'The timestamp the message was published in ISO 8601 format',
          )
          .required(),
      )
      .prop(
        'ptse',
        schema
          .number()
          .description(
            'The milliseconds since the epoch of when the message was published',
          )
          .required(),
      ),
  );

export default weightUpdatedSchema;
