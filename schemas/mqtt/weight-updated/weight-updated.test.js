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
        d: {
          w: 100,
          mw: 200,
        },
        ts: new Date().toISOString(),
      }),
    );
  });

  it('should fail without a weight', () => {
    const isValid = ajv.validate(weightUpdatedSchema.valueOf(), {
      d: {
        mw: 200,
      },
      ts: new Date().toISOString(),
    });

    assert.ok(isValid === false);
    assert.equal(ajv.errors[0].message, "must have required property 'w'");
  });

  it('should fail without a max weight', () => {
    const isValid = ajv.validate(weightUpdatedSchema.valueOf(), {
      d: {
        w: 100,
      },
      ts: new Date().toISOString(),
    });

    assert.ok(isValid === false);
    assert.equal(ajv.errors[0].message, "must have required property 'mw'");
  });

  it('should fail without a timestamp', () => {
    const isValid = ajv.validate(weightUpdatedSchema.valueOf(), {
      d: {
        w: 100,
        mw: 200,
      },
    });

    assert.ok(isValid === false);
    assert.equal(ajv.errors[0].message, "must have required property 'ts'");
  });
});
