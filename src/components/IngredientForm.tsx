import React, { useState } from 'react';
import type { Ingredient } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  onAdd: (ingredient: Ingredient) => void;
}

const IngredientForm: React.FC<Props> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [unit, setUnit] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || quantity === '' || quantity <= 0 || !unit.trim()) {
      alert('Please fill all fields correctly.');
      return;
    }

    const newIngredient: Ingredient = {
      id: uuidv4(),
      name: name.trim(),
      quantity: Number(quantity),
      unit: unit.trim(),
    };

    onAdd(newIngredient);
    setName('');
    setQuantity('');
    setUnit('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 md:flex-row md:items-end"
    >
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Ingredient Name
        </label>
        <input
          type="text"
          placeholder="e.g. Sugar"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
        />
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Quantity
        </label>
        <input
          type="number"
          placeholder="e.g. 200"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
        />
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Unit
        </label>
        <input
          type="text"
          placeholder="e.g. g, ml"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
        />
      </div>

      <button
        type="submit"
        className="mt-2 md:mt-0 bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition font-semibold"
      >
        Add
      </button>
    </form>
  );
};

export default IngredientForm;
