/**
 * mock simulation that generates fake optimization results
 * simulates a 2-second optimization process
 */
export async function runMockSimulation(constraints, objectives) {
    // simulate 2-second computation
    await new Promise(resolve => setTimeout(resolve, 2000));

    // generate mock results
    return {
        objectiveValues: objectives.map(obj => ({
            name: obj.parameter,
            value: Math.random() * 100,
            target: obj.type,
            achieved: true
        })),
        constraintsSatisfied: constraints.map(c => {
            const paramToken = c.find(t => t.type === 'parameter');
            const opToken = c.find(t => t.type === 'operator');
            const valToken = c.find(t => t.type === 'value');

            return {
                constraint: `${paramToken?.value || 'unknown'} ${opToken?.value || '?'} ${valToken?.value || '?'}`,
                value: Math.random() * 100,
                satisfied: true
            };
        }),
        convergenceData: [
            { iteration: 0, value: 20 + Math.random() * 5 },
            { iteration: 1, value: 30 + Math.random() * 5 },
            { iteration: 2, value: 40 + Math.random() * 5 },
            { iteration: 3, value: 45 + Math.random() * 5 },
            { iteration: 4, value: 48 + Math.random() * 2 }
        ],
        metadata: {
            iterations: 5,
            computationTime: '2.0s',
            status: 'Optimal solution found'
        }
    };
}
