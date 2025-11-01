import { describe, it, expect } from 'vitest';
import { validateConstraint } from '@/utils/constraintValidator.js';

describe('constraintValidator', () => {
    it('validates a simple valid constraint', () => {
        const tokens = [
            { type: 'parameter', value: 'glucose_g_L' },
            { type: 'operator', value: '<=' },
            { type: 'value', value: 50 }
        ];
        const result = validateConstraint(tokens);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    it('it validates 2 parameters and an operator', () => {
        const tokens = [
            { type: 'parameter', value: 'glucose_g_L' },
            { type: 'operator', value: '+' },
            { type: 'parameter', value: 'fructose_g_L' },
            { type: 'operator', value: '<=' },
            { type: 'value', value: 50 }
        ];
        const result = validateConstraint(tokens);
        expect(result.isValid).toBe(true);
    });

    it('it rejects an empty constraint', () => {
        const tokens = [ {type: 'placeholder', value: null} ];
        const result = validateConstraint(tokens);
        expect(result.isValid).toBe(false);
    });

    it('rejects constraints with less than 3 tokens', () => {
        const tokens = [
            { type: 'parameter', value: 'glucose_g_L' },
            { type: 'operator', value: '<=' }
        ];
        const result = validateConstraint(tokens);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Constraint must have at least 3 tokens!');
    });

    it('rejects constraints without a comparison operator', () => {
        const tokens = [
            { type: 'parameter', value: 'glucose_g_L' },
            { type: 'operator', value: '+' },
            { type: 'value', value: 5 }
        ];
        const result = validateConstraint(tokens);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Constraint must contain the following comparison operators: <=, >=, =, <, >');
    });

    it('rejects consequtive operators', () => {
        const tokens = [
            { type: 'parameter', value: 'glucose_g_L' },
            { type: 'operator', value: '+' },
            { type: 'operator', value: '<=' },
            { type: 'value', value: 50 }
        ];
        const result = validateConstraint(tokens);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Two operators cannot be next to each other!');
    });

    it('rejects constraints ending with an operator', () => {
        const tokens = [
            { type: 'parameter', value: 'glucose_g_L' },
            { type: 'operator', value: '<=' }
        ];
        const result = validateConstraint(tokens);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Constraint cannot end with an operator!');
    });

});
