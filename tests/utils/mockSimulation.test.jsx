import { describe, it, expect } from 'vitest';
import { runMockSimulation } from '@/utils/mockSimulation.js';

describe('mockSimulation utility', () => {
    it('returns simulation results object', async () => {
        const constraints = [
            [{ type: 'parameter', value: 'glucose_g_L' }, { type: 'operator', value: '<=' }, { type: 'value', value: '50' }]
        ];
        const objectives = [
            { type: 'maximize', parameter: 'titer_g_L' }
        ];

        const result = await runMockSimulation(constraints, objectives);

        expect(result).toHaveProperty('objectiveValues');
        expect(result).toHaveProperty('constraintsSatisfied');
        expect(result).toHaveProperty('convergenceData');
        expect(result).toHaveProperty('metadata');
    });

    it('generates convergence data array', async () => {
        const result = await runMockSimulation([], []);

        expect(Array.isArray(result.convergenceData)).toBe(true);
        expect(result.convergenceData.length).toBeGreaterThan(0);
    });

    it('simulates delay (returns promise)', async () => {
        const start = Date.now();
        await runMockSimulation([], []);
        const duration = Date.now() - start;

        expect(duration).toBeGreaterThanOrEqual(2000); // 2 second delay
    });
});
