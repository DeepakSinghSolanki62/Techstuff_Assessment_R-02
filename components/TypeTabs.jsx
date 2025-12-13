import { useState } from 'react';

export default function TypeTabs({
  types,
  movesCount,
  gameIndexCount,
}) {
  const [activeTab, setActiveTab] = useState(types[0].type.name);

  return (
    <div>
      <div className="flex gap-2 mb-3 flex-wrap">
        {types.map((t) => (
          <button
            key={t.type.name}
            onClick={() => setActiveTab(t.type.name)}
            className={`px-3 py-1 rounded transition-all duration-200 ${
              activeTab === t.type.name
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {t.type.name}
          </button>
        ))}
      </div>

      <div className="text-sm bg-gray-50 p-3 rounded transition-opacity">
        <p className='pb-2'><strong>Game Indices:</strong> {gameIndexCount}</p>
        <p><strong>Total Moves:</strong> {movesCount}</p>
      </div>
    </div>
  );
}
