import React from 'react';

interface Props {
  baseServings: number;
  currentServings: number;
  setCurrentServings: (value: number) => void;
}

const ServingsControl: React.FC<Props> = ({ baseServings, currentServings, setCurrentServings }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newServings = parseInt(e.target.value);
    if (!isNaN(newServings) && newServings > 0) {
      setCurrentServings(newServings);
    }
  };

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow mb-4">
      <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">🍽️ Adjust Servings</h2>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="text-gray-600 dark:text-gray-300">
          <strong>Base Servings:</strong> {baseServings}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={1}
            value={currentServings}
            onChange={handleChange}
            className="w-24 px-3 py-2 rounded-xl border border-gray-600 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 "
          />
          <span className="text-gray-700 dark:text-gray-300">servings</span>
        </div>
      </div>
    </div>
  );
};

export default ServingsControl;
