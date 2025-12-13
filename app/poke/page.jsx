"use client";

import { useCallback, useEffect, useState } from "react";
import PokemonTable from "@/components/PokemonTable";
import PokemonDetails from "@/components/PokemonDetails";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Pagination from "@/components/Pagination";

export default function PokePage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const limit = 10;
  const totalPokemon = 1302;

  const fetchPokemons = useCallback(async (currentPage = 1) => {
    setLoading(true);
    setError("");
    try {
      const offset = (currentPage - 1) * limit;
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      );
      if (!res.ok) throw new Error("Failed to fetch Pokémon");
      const data = await res.json();
      const detailedPokemons = await Promise.all(
        data.results.map(async (p) => {
          const r = await fetch(p.url);
          if (!r.ok) throw new Error("Failed to fetch Pokémon details");
          return r.json();
        })
      );
      setPokemonList(detailedPokemons);
      setSelectedPokemon(detailedPokemons[0] || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPokemons(currentPage);
  }, [currentPage, fetchPokemons]);

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 flex items-center gap-2 mb-6">
        Pokemon Data Explorer
      </h1>

      {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <LoadingSkeleton rows={10} />
        ) : (
          <>
            {/* Table */}
            <div className="md:col-span-2">
              <PokemonTable
                pokemonList={pokemonList}
                loading={loading}
                onSelectPokemon={setSelectedPokemon}
                selectedPokemon={selectedPokemon}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalPokemon / limit)}
                onPageChange={handlePageChange}
              />
            </div>

            {/* Details */}
            <div>
              {selectedPokemon && <PokemonDetails pokemon={selectedPokemon} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
