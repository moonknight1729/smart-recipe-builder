import React, { useEffect, useState } from "react";
import IngredientForm from "./components/IngredientForm";
import IngredientList from "./components/IngredientList";
import ServingsControl from "./components/ServingsControl";
import SaveLoadControls from "./components/SaveLoadControls";
import ThemeToggle from "./components/ThemeToggle";
import type { Ingredient } from "./types";

const LOCAL_STORAGE_KEY = "smart-recipe";

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [baseServings, setBaseServings] = useState(1);
  const [currentServings, setCurrentServings] = useState<number | "">(
    baseServings
  );
  const [instructions, setInstructions] = useState("");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setIngredients(parsed.ingredients || []);
        setBaseServings(parsed.baseServings || 1);
        setCurrentServings(parsed.currentServings || 1);
        setInstructions(parsed.instructions || "");
      } catch (error) {
        console.error("Failed to load from localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        ingredients,
        baseServings,
        currentServings,
        instructions,
      })
    );
  }, [ingredients, baseServings, currentServings, instructions]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // const handleReorderIngredients = (newList: Ingredient[]) => {
  //   setIngredients(newList);
  // };
  const handleEditIngredient = (updatedIngredient: Ingredient) => {
    setIngredients((prev) =>
      prev.map((ing) =>
        ing.id === updatedIngredient.id ? updatedIngredient : ing
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-[#333] dark:text-gray-100">
          🍽️ Smart Recipe Builder
        </h1>

        <ThemeToggle isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#444] dark:text-gray-200">
              🍛 Servings Control
            </h2>
            <ServingsControl
              baseServings={baseServings}
              currentServings={currentServings}
              setCurrentServings={setCurrentServings}
            />
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#444] dark:text-gray-200">
              ➕ Add Ingredient
            </h2>
            <IngredientForm onAdd={handleAddIngredient} />
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-[#444] dark:text-gray-200">
            🧾 Ingredient List
          </h2>
          <IngredientList
            ingredients={ingredients}
            baseServings={baseServings}
            currentServings={
              typeof currentServings === "number"
                ? currentServings
                : baseServings
            }
            onDelete={handleDeleteIngredient}
            onEdit={handleEditIngredient}
          />
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-[#444] dark:text-gray-200">
            💾 Save & Load
          </h2>
          <SaveLoadControls
            ingredients={ingredients}
            baseServings={baseServings}
            currentServings={
              typeof currentServings === "number" ? currentServings : 1
            }
            instructions={instructions}
            setIngredients={setIngredients}
            setBaseServings={setBaseServings}
            setCurrentServings={setCurrentServings}
            setInstructions={setInstructions}
          />
        </div>
      </div>
    </div>
  );

  function handleAddIngredient(ingredient: Ingredient) {
    setIngredients((prev) => [...prev, ingredient]);
  }

  function handleDeleteIngredient(id: string) {
    setIngredients((prev) => prev.filter((ing) => ing.id !== id));
  }
};

export default App;
