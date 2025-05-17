import React, { useRef, useState } from 'react';
import type { Ingredient } from '../types';

interface Props {
  ingredients: Ingredient[];
  baseServings: number;
  currentServings: number;
  onDelete: (id: string) => void;
  onEdit: (updated: Ingredient) => void;
}

const IngredientList: React.FC<Props> = ({
  ingredients,
  baseServings,
  currentServings,
  onDelete,
  onEdit,
}) => {
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const adjustQuantity = (qty: number) => (qty / baseServings) * currentServings;

  const openEditDialog = (ingredient: Ingredient) => {
    setEditingIngredient(ingredient);
    dialogRef.current?.showModal();
  };

  const handleEditSave = () => {
    if (editingIngredient) {
      onEdit(editingIngredient);
      dialogRef.current?.close();
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Ingredients</h2>

      {ingredients.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400">No ingredients added yet.</div>
      ) : (
        <ul className="space-y-3">
          {ingredients.map((ingredient) => (
            <li
              key={ingredient.id}
              className="flex justify-between items-center px-4 py-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="text-gray-800 dark:text-gray-100">
                <span className="font-medium">{ingredient.name}</span> –{' '}
                <span className="text-blue-600 dark:text-blue-400">
                  {adjustQuantity(ingredient.quantity).toFixed(2)} {ingredient.unit}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditDialog(ingredient)}
                  className="text-sm text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(ingredient.id)}
                  className="text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400 font-medium transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Edit Dialog */}
      <dialog ref={dialogRef} className="rounded-xl p-6 max-w-md w-full dark:bg-gray-900 bg-white">
        <form
          method="dialog"
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleEditSave();
          }}
        >
          <h3 className="text-lg font-semibold mb-2 dark:text-white">Edit Ingredient</h3>
          <input
            type="text"
            value={editingIngredient?.name || ''}
            onChange={(e) =>
              setEditingIngredient((prev) => prev && { ...prev, name: e.target.value })
            }
            className="px-4 py-2 rounded-lg border border-gray-300 dark:bg-gray-800 dark:text-white"
            placeholder="Name"
            required
          />
          <input
            type="number"
            value={editingIngredient?.quantity || ''}
            onChange={(e) =>
              setEditingIngredient((prev) => prev && { ...prev, quantity: Number(e.target.value) })
            }
            className="px-4 py-2 rounded-lg border border-gray-300 dark:bg-gray-800 dark:text-white"
            placeholder="Quantity"
            required
          />
          <input
            type="text"
            value={editingIngredient?.unit || ''}
            onChange={(e) =>
              setEditingIngredient((prev) => prev && { ...prev, unit: e.target.value })
            }
            className="px-4 py-2 rounded-lg border border-gray-300 dark:bg-gray-800 dark:text-white"
            placeholder="Unit"
            required
          />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => dialogRef.current?.close()} className="text-sm">
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Save
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default IngredientList;
