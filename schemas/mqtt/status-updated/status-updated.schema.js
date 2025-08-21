import schema from 'fluent-json-schema';

const statusUpdatedSchema = schema
  .object()
  .description('A status updated message for a container site')
  .prop(
    'msgID',
    schema
      .string()
      .description(
        'A static message ID in the format 000000000000000000000000-status',
      ),
  )
  .prop('msgVer', schema.string().description('The message version, e.g., 1.0'))
  .prop(
    'gwID',
    schema.string().description('The gateway ID that sent the message'),
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
