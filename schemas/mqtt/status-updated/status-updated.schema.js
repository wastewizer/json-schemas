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

export default statusUpdatedSchema;
