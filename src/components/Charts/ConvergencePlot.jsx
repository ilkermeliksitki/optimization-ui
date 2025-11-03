import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

export default function ConvergencePlot({ data }) {
    if (!data || data.length === 0) {
        return (
            <div
                data-testid="convergence-plot"
                className="h-64 bg-gray-50 rounded flex items-center justify-center border-2 border-dashed border-gray-300"
            >
                <p className="text-gray-400">
                    No convergence data available
               </p>
            </div>
        );
    }

    return (
        <div data-testid="convergence-plot" className="w-full">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">
                Convergence Plot
            </h4>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                        dataKey="iteration"
                        label={{ value: 'Iteration', position: 'insideBottom', offset: -5 }}
                        stroke="#6b7280"
                    />
                    <YAxis
                        label={{ value: 'Objective Value', angle: -90, position: 'insideLeft' }}
                        stroke="#6b7280"
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px'
                        }}
                    />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6', r: 4 }}
                        activeDot={{ r: 6 }}
                        name="Objective Value"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
