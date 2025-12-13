import LoadingSkeleton from "./LoadingSkeleton";
export default function PokemonTable({
  pokemonList,
  loading,
  onSelectPokemon,
  selectedPokemon,
}) {
  if (loading) {
    return <LoadingSkeleton rows={8} />;
  }
  if (!pokemonList.length) {
    return (
      <p className="text-gray-500 text-center text-lg">No Pokemon found.</p>
    );
  }

  return (
    <>
      <table className="table">
        <thead className="">
          <tr>
            <th className="border p-2 text-center w-1/6">Sr. No</th>
            <th className="border p-2 text-center">Pokemon Name</th>
          </tr>
        </thead>
        <tbody>
          {pokemonList.map((pokemon, index) => (
            <tr
              key={pokemon.id}
              className={`transition ${
                selectedPokemon?.name === pokemon.name
                  ? "bg-blue-200"
                  : index % 2 === 0
                  ? "bg-white hover:bg-gray-50"
                  : "bg-blue-50/20 hover:bg-gray-50"
 
              }`}
            >
              <td className="border p-2 text-center">{pokemon.id}</td>
              <td
                className="border p-2 capitalize text-blue-600 flex justify-center items-center gap-2 cursor-pointer text-center hover:underline"
                onClick={() => onSelectPokemon(pokemon)}
              >
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="w-11 h-11"
                />
                {pokemon.name}
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </>
  );
}
