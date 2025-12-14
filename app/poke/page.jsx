"use client";

import { useCallback, useEffect, useState } from "react";
import PokemonTable from "@/components/PokemonTable";
import PokemonDetails from "@/components/PokemonDetails";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Pagination from "@/components/Pagination";

const PokePage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isloading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const limit = 10;
  const totalPokemon = 1302;

  const fetchPokemons = useCallback(async (currentPage = 1) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const offset = (currentPage - 1) * limit;
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      );
      if (!res.ok) throw new Error("Failed to fetch Pokémon");
      const data = await res.json();
      const detailedPokemons = await Promise.all(
        data.results.map(async (p) => {
          const res = await fetch(p.url);
          if (!res.ok) throw new Error("Failed to fetch Pokémon details");
          return res.json();
        })
      );
      setPokemonList(detailedPokemons);
      setSelectedPokemon(detailedPokemons[0] || null);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
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

      {errorMessage && (
        <p className="text-red-500 font-semibold mb-4">{errorMessage}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isloading ? (
          <LoadingSkeleton rows={10} />
        ) : (
          <>
            {/* Table */}
            <div className="md:col-span-2">
              <PokemonTable
                pokemonList={pokemonList}
                loading={isloading}
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
};

export default PokePage;
