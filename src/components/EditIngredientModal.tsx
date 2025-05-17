import React, { useState, useEffect } from 'react';
import type { Ingredient } from '../types';

interface Props {
  ingredient: Ingredient | null;
  onClose: () => void;
  onSave: (updatedIngredient: Ingredient) => void;
}

const EditIngredientModal: React.FC<Props> = ({ ingredient, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [unit, setUnit] = useState('');

  useEffect(() => {
    if (ingredient) {
      setName(ingredient.name);
      setQuantity(ingredient.quantity);
      setUnit(ingredient.unit);
    }
  }, [ingredient]);

  if (!ingredient) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || quantity === '' || quantity <= 0 || !unit.trim()) {
      alert('Please fill all fields correctly.');
      return;
    }
    onSave({ ...ingredient, name: name.trim(), quantity: Number(quantity), unit: unit.trim() });
    onClose();
  };

  return (
<div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center z-50">


      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-80 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Edit Ingredient</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingredient Name"
            className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
          />
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Quantity"
            className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
          />
          <input
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            placeholder="Unit (e.g. g, ml)"
            className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-300 dark:bg-gray-600 dark:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditIngredientModal;
