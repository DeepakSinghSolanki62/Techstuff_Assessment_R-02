'use client';

import { useEffect, useState } from 'react';
import PokemonTable from '@/components/PokemonTable';
import PokemonDetails from '@/components/PokemonDetails';

export default function PokePage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const limit = 10;
  const totalPokemon = 1302;
  const totalPages = Math.ceil(totalPokemon / limit);

  useEffect(() => {
    fetchPokemon();
  }, [currentPage]);

  const fetchPokemon = async () => {
    try {
      setLoading(true);
      setError('');

      const offset = (currentPage - 1) * limit;
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );

      if (!res.ok) throw new Error('Failed to fetch Pokemon');

      const data = await res.json();
      setPokemonList(data.results);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">Pokemon Data Explorer</h1>

      {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Table */}
        <div className="md:col-span-2">
          <PokemonTable
            pokemonList={pokemonList}
            currentPage={currentPage}
            limit={limit}
            totalPages={totalPages}
            loading={loading}
            onPageChange={setCurrentPage}
            onSelectPokemon={setSelectedPokemon}
            selectedPokemon={selectedPokemon}
          />
        </div>

        {/* Details */}
        <div>
          {selectedPokemon && (
            <PokemonDetails pokemonUrl={selectedPokemon.url} />
          )}
        </div>
      </div>
    </div>
  );
}
