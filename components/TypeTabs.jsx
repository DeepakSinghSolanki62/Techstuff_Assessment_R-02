import { useEffect, useState } from "react";

const TypeTabs = ({ types }) => {
  const [activeTab, setActiveTab] = useState(null);
  const [gameIndexCount, setGameIndexCount] = useState(0);
  const [movesCount, setMovesCount] = useState(0);

  useEffect(() => {
    if (types?.length > 0) {
      setActiveTab(types[0].type.name);
    }
  }, [types]);

  useEffect(() => {
    if (!activeTab) return;
    async function fetchTypeData() {
      const res = await fetch(`https://pokeapi.co/api/v2/type/${activeTab}`);
      const data = await res.json();

      setGameIndexCount(data?.game_indices.length);
      setMovesCount(data?.moves.length);
    }

    fetchTypeData();
  }, [activeTab]);

  return (
    <div>
      {/* TYPE TABS */}
      <div className="flex gap-2 mb-3 flex-wrap">
        {types.map((t) => (
          <button
            key={t.type.name}
            onClick={() => setActiveTab(t.type.name)}
            className={`px-3 py-1 rounded-full text-sm capitalize transition-all duration-200 ${
              activeTab === t?.type?.name
                ? "bg-primary text-white"
                : "bg-blue-200 text-blue-700 hover:bg-blue-300"
            }`}
          >
            {t?.type?.name}
          </button>
        ))}
      </div>

      {/* STATS */}
      <div className="text-sm bg-gray-50 p-3 rounded-sm">
        <p className="pb-2">
          <strong>Game Indices:</strong>{" "}
          <span className="font-semibold text-blue-600">{gameIndexCount}</span>
        </p>
        <p>
          <strong>Total Moves:</strong>{" "}
          <span className="font-semibold text-blue-600">{movesCount}</span>
        </p>
      </div>
    </div>
  );
};

export default TypeTabs;
