import schema from 'fluent-json-schema';

const statusUpdatedSchema = schema
  .object()
  .description('A status updated message for a container site')
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
        's',
        schema
          .enum(['ONLINE', 'OFFLINE', 'DAMAGED'])
          .description('The status of the container site')
          .required(),
      )
      .prop(
        'sc',
        schema
          .number()
          .description(
            'The status code of the container site - ONLINE=1, OFFLINE=2, DAMAGED=3',
          )
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
  )
  .prop(
    'tse',
    schema
      .number()
      .description('The milliseconds since the epoch of the update')
      .required(),
  );

export default statusUpdatedSchema;
