/**
 * validates a constraint build from the tokens
 * @param {Array} tokens - array of tokens {type: string, value: any}
 * @returns {Object} {isValid: boolean, error: string[]}
 */

export const validateConstraint = (tokens) => {
    const errors = [];
    
    // filter out placeholders
    const filled = tokens.filter(t => t.type !== 'placeholder');

    if (filled.length === 0) {
        errors.push('Constraint is empty.');
        return { isValid: false, errors };
    }

    // must have at least 3 tokens for a valid constraint
    if (filled.length < 3) {
        errors.push('Constraint must have at least 3 tokens!');
    }

    // check for comparison operator
    const comparisonOps = ['=', '<', '<=', '>', '>='];
    const hasComparison = filled.some(
        t => t.type === 'operator' && comparisonOps.includes(t.value)
    );

    if (!hasComparison) {
        errors.push('Constraint must contain the following comparison operators: <=, >=, =, <, >');
    }

    // cannot have consecutive operators
    for (let i = 0; i < filled.length - 1; i++) {
        if (filled[i].type === 'operator' && filled[i + 1].type === 'operator') {
            errors.push('Two operators cannot be next to each other!');
            break;
        }
    }

    // must end with parameter or value, not operator
    const lastToken = filled[filled.length - 1];
    if (lastToken.type === 'operator') {
        errors.push('Constraint cannot end with an operator!');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}
