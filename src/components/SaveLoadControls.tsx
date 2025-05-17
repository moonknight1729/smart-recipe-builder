import React from 'react';
import type { ChangeEvent } from 'react';
import type { Ingredient } from '../types';

interface Props {
  ingredients: Ingredient[];
  baseServings: number;
  currentServings: number;
  instructions: string;
  setIngredients: (i: Ingredient[]) => void;
  setBaseServings: (n: number) => void;
  setCurrentServings: (n: number) => void;
  setInstructions: (s: string) => void;
}

const SaveLoadControls: React.FC<Props> = ({
  ingredients,
  baseServings,
  currentServings,
  instructions,
  setIngredients,
  setBaseServings,
  setCurrentServings,
  setInstructions,
}) => {
  const handleSave = () => {
    const recipe = { baseServings, currentServings, ingredients, instructions };
    const blob = new Blob([JSON.stringify(recipe, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'recipe.json';
    link.click();
  };

  const handleLoad = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = JSON.parse(event.target?.result as string);
        if (!content.ingredients || !Array.isArray(content.ingredients)) throw new Error();
        setIngredients(content.ingredients);
        setBaseServings(content.baseServings);
        setCurrentServings(content.currentServings);
        setInstructions(content.instructions);
      } catch {
        alert('Invalid recipe file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <button
        onClick={handleSave}
        className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6 py-2 rounded-2xl shadow transition"
      >
        💾 Save Recipe
      </button>
      <label className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-2 rounded-2xl shadow transition cursor-pointer">
        📂 Load Recipe
        <input
          type="file"
          accept="application/json"
          onChange={handleLoad}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default SaveLoadControls;
