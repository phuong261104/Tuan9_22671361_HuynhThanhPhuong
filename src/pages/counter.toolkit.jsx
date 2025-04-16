import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { counterSlice } from '../redux/storeToolkit';

const { increment, decrement, reset } = counterSlice.actions;

function CounterToolkit() {
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-6 text-blue-600">Count: {count}</h1>
            <div className="space-x-4">
                <button
                    onClick={() => dispatch(decrement())}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                >
                    -
                </button>
                <button
                    onClick={() => dispatch(increment())}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                >
                    +
                </button>
                <button
                    onClick={() => dispatch(reset())}
                    className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

export default CounterToolkit;
