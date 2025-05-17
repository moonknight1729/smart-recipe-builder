import React from 'react';

interface Props {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<Props> = ({ isDark, toggleTheme }) => {
  return (
    <div className="flex justify-end mb-4">
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md shadow"
      >
        {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
    </div>
  );
};

export default ThemeToggle;
