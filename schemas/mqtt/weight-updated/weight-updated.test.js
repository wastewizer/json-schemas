import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

import weightUpdatedSchema from './weight-updated.schema.js';

describe('weightUpdatedSchema', () => {
  const ajv = new Ajv();
  addFormats(ajv);
  it('should pass with a valid schema', () => {
    assert.ok(
      ajv.validate(weightUpdatedSchema.valueOf(), {
        msgID: 'msgId',
        msgVer: '1.0',
        gwID: 'scalable-systems-group',
        d: {
          ts: new Date().toISOString(),
          w: 100,
          mw: 200,
        },
        m: {
          pts: new Date().toISOString(),
          ptse: Date.now(),
        },
      }),
    );
  });

  it('should fail without a timestamp', () => {
    const isValid = ajv.validate(weightUpdatedSchema.valueOf(), {
      d: {
        w: 100,
        mw: 200,
      },
      m: {
        pts: new Date().toISOString(),
        ptse: Date.now(),
      },
    });

    assert.ok(isValid === false);
    assert.equal(ajv.errors[0].message, "must have required property 'ts'");
  });

  it('should fail without a weight', () => {
    const isValid = ajv.validate(weightUpdatedSchema.valueOf(), {
      d: {
        ts: new Date().toISOString(),
        mw: 200,
      },
      m: {
        pts: new Date().toISOString(),
        ptse: Date.now(),
      },
    });

    assert.ok(isValid === false);
    assert.equal(ajv.errors[0].message, "must have required property 'w'");
  });

  it('should fail without a max weight', () => {
    const isValid = ajv.validate(weightUpdatedSchema.valueOf(), {
      d: {
        ts: new Date().toISOString(),
        w: 100,
      },
      m: {
        pts: new Date().toISOString(),
        ptse: Date.now(),
      },
    });

    assert.ok(isValid === false);
    assert.equal(ajv.errors[0].message, "must have required property 'mw'");
  });

  it('should fail without a publish timestamp', () => {
    const isValid = ajv.validate(weightUpdatedSchema.valueOf(), {
      d: {
        ts: new Date().toISOString(),
        w: 100,
        mw: 200,
      },
      m: {
        ptse: Date.now(),
      },
    });

    assert.ok(isValid === false);
    assert.equal(ajv.errors[0].message, "must have required property 'pts'");
  });

  it('should fail without a publish time since epoch', () => {
    const isValid = ajv.validate(weightUpdatedSchema.valueOf(), {
      d: {
        ts: new Date().toISOString(),
        w: 100,
        mw: 200,
      },
      m: {
        pts: new Date().toISOString(),
      },
    });

    assert.ok(isValid === false);
    assert.equal(ajv.errors[0].message, "must have required property 'ptse'");
  });
});
