import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const CounterRedux = () => {
    const count = useSelector((state) => state.count);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-6 text-blue-600">Count: {count}</h1>
            <div className="space-x-4">
                <button
                    onClick={() => dispatch({ type: 'DECREMENT' })}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                >
                    -
                </button>
                <button
                    onClick={() => dispatch({ type: 'INCREMENT' })}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                >
                    +
                </button>
                <button
                    onClick={() => dispatch({ type: 'RESET' })}
                    className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

export default CounterRedux;
