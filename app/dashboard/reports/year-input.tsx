// app/ui/reports/year-input.tsx
'use client';

import { useState } from 'react';

export default function YearInput({
                                      initialYear,
                                      onYearChange
                                  }: {
    initialYear: number;
    onYearChange: (year: number) => void;
}) {
    const [year, setYear] = useState(initialYear);

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newYear = parseInt(e.target.value);
        if (!isNaN(newYear)) {
            setYear(newYear);
            onYearChange(newYear);
        }
    };

    return (
        <div className="mb-4">
            <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                Год отчета:
            </label>
            <input
                type="number"
                id="year"
                min="2000"
                max="2100"
                value={year}
                onChange={handleYearChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
        </div>
    );
}