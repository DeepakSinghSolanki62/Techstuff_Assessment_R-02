import { useEffect, useState } from 'react';
import TypeTabs from './TypeTabs';
import LoadingSkeleton from './LoadingSkeleton';
import ErrorMessage from './ErrorMessage';

export default function PokemonDetails({ pokemonUrl }) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDetails();
  }, [pokemonUrl]);

 const fetchDetails = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await fetch(pokemonUrl);
      if (!res.ok) throw new Error('Failed to load Pokemon details');

      const data = await res.json();
      setPokemon(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSkeleton rows={6} />;
  if (error) return <ErrorMessage message={error} />;
  if (!pokemon) return null;

  return (
    <div className="card p-4">
      <h2 className="section-title ">
        {pokemon.name}
      </h2>

      <TypeTabs
        types={pokemon.types}
        movesCount={pokemon.moves.length}
        gameIndexCount={pokemon.game_indices.length}
      />
    </div>
  );
}
