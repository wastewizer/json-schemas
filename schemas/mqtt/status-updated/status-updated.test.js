import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

import statusUpdatedSchema from './status-updated.schema.js';

describe('statusUpdatedSchema', () => {
  const ajv = new Ajv();
  addFormats(ajv);
  it('should pass with a valid schema', () => {
    assert.ok(
      ajv.validate(statusUpdatedSchema.valueOf(), {
        msgID: 'msgId',
        msgVer: '1.0',
        gwID: 'scalable-systems-group',
        d: {
          s: 'ONLINE',
          sc: 1,
        },
        m: {
          pts: new Date().toISOString(),
          ptse: Date.now(),
        },
      }),
    );
  });

  it('should fail without a status', () => {
    const isValid = ajv.validate(statusUpdatedSchema.valueOf(), {
      d: {
        sc: 1,
      },
      m: {
        pts: new Date().toISOString(),
        ptse: Date.now(),
      },
    });

    assert.ok(isValid === false);
    assert.equal(ajv.errors[0].message, "must have required property 's'");
  });

  it('should fail without a status code', () => {
    const isValid = ajv.validate(statusUpdatedSchema.valueOf(), {
      d: {
        s: 'ONLINE',
      },
      m: {
        pts: new Date().toISOString(),
        ptse: Date.now(),
      },
    });

    assert.ok(isValid === false);
    assert.equal(ajv.errors[0].message, "must have required property 'sc'");
  });

  it('should fail without a publish timestamp', () => {
    const isValid = ajv.validate(statusUpdatedSchema.valueOf(), {
      d: {
        ts: new Date().toISOString(),
        s: 'ONLINE',
        sc: 1,
      },
      m: {
        ptse: Date.now(),
      },
    });

    assert.ok(isValid === false);
    assert.equal(ajv.errors[0].message, "must have required property 'pts'");
  });

  it('should fail without a publish time since epoch', () => {
    const isValid = ajv.validate(statusUpdatedSchema.valueOf(), {
      d: {
        ts: new Date().toISOString(),
        s: 'ONLINE',
        sc: 1,
      },
      m: {
        pts: new Date().toISOString(),
      },
    });

    assert.ok(isValid === false);
    assert.equal(ajv.errors[0].message, "must have required property 'ptse'");
  });
});
