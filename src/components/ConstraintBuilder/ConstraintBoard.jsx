import React, { useState } from 'react';

export default function ConstraintBoard({ tokens, onRemoveToken, onDone }) {
    // validate and submit constraints
    const handleDone = () => {
        const filledTokens = tokens.filter( t => t.type !== 'placeholder' );

        // must have at least 3 tokens
        if ( filledTokens.length < 3 ) {
            onDone?.({ isValid: false, error: "Constraint must have at least 3 tokens!" });
            return;
        }

        // must have a comparison operator
        const comparisonOps = ['=', '<', '<=', '>', '>='];
        const hasComparisonOp = filledTokens.some(
            t => t.type === 'operator' && comparisonOps.includes(t.value)
        );
        if ( !hasComparisonOp ) {
            onDone?.({ isValid: false, error: "Constraint must include a comparison operator!" });
            return;
        }

        // valid! return witho
        const constraint = filledTokens.map( token => {
            return ({
                type: token.type,
                value: token.value,
            });
        });
        onDone?.({ isValid: true, constraint });
    };

    return (
        <div
          data-testid="constraint-board"
          className="constraint-board"
        >
          <div className="tokens-container">
            { tokens.map( ( token ) => (
                <div
                  key={ token.id }
                  data-testid={token.type === 'placeholder' ? 'placeholder' : 'token'}
                  className={ `token token-${ token.type }` }
                  onClick={ () => {
                    if ( token.type !== 'placeholder' ) {
                        onRemoveToken(token.id);
                    }
                  }}
                  style={{
                      cursor: token.type !== 'placeholder' ? 'pointer' : 'default',
                  }}
                >
                  { token.type === 'placeholder' ? '__' : token.value }
                </div>
             ))}
            </div>
          <button
            data-testid="done-button"
            className="done-button"
            onClick={ handleDone }
          >
            Done
          </button>
        </div>
    );
}
