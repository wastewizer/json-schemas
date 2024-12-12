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
        weightKg: 100,
        maxWeightKg: 200,
        timestamp: new Date().toISOString(),
      }),
    );
  });

  it('should fail without a weightKg', () => {
    const isValid = ajv.validate(weightUpdatedSchema.valueOf(), {
      maxWeightKg: 200,
      timestamp: new Date().toISOString(),
    });

    assert.ok(isValid === false);
    assert.equal(
      ajv.errors[0].message,
      "must have required property 'weightKg'",
    );
  });

  it('should fail without a maxWeightKg', () => {
    const isValid = ajv.validate(weightUpdatedSchema.valueOf(), {
      weightKg: 100,
      timestamp: new Date().toISOString(),
    });

    assert.ok(isValid === false);
    assert.equal(
      ajv.errors[0].message,
      "must have required property 'maxWeightKg'",
    );
  });

  it('should fail without a timestamp', () => {
    const isValid = ajv.validate(weightUpdatedSchema.valueOf(), {
      weightKg: 100,
      maxWeightKg: 200,
    });

    assert.ok(isValid === false);
    assert.equal(
      ajv.errors[0].message,
      "must have required property 'timestamp'",
    );
  });
});
