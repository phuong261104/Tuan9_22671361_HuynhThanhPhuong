import React, { useReducer } from 'react';

const initialState = { count: 0 };

const reducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        case 'reset':
            return { count: 0 };
        default:
            throw new Error('Unknown action');
    }
}

const Counter = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div className="flex flex-col items-center justify-center mt-3 bg-gray-100 px-2 py-3 bg-gray-500 rounded-2xl border">
            <h1 className="text-4xl font-bold mb-6 text-blue-600">Count: {state.count}</h1>
            <div className="space-x-4">
                <button
                    onClick={() => dispatch({ type: 'decrement' })}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow"
                >
                    -
                </button>
                <button
                    onClick={() => dispatch({ type: 'increment' })}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow"
                >
                    +
                </button>
                <button
                    onClick={() => dispatch({ type: 'reset' })}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

export default Counter;
