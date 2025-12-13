import Pagination from "./Pagination";
import LoadingSkeleton from "./LoadingSkeleton";
export default function PokemonTable({
  pokemonList,
  currentPage,
  limit,
  totalPages,
  loading,
  onPageChange,
  onSelectPokemon,
  selectedPokemon,
}) {
  if (loading) {
    return <LoadingSkeleton rows={8} />;
  }
  if (!pokemonList.length) {
    return <p className="text-gray-500 text-center text-lg">No Pokemon found.</p>;
  }

  return (
    <>
      <table className="table">
        <thead className="">
          <tr>
            <th className="border p-2 text-center">Sr. No</th>
            <th className="border p-2 text-center">Pokemon Name</th>
          </tr>
        </thead>
        <tbody>
          {pokemonList.map((pokemon, index) => (
            <tr
              key={pokemon.name}
              className={`transition ${
                selectedPokemon?.name === pokemon.name
                  ? "bg-blue-100"
                  : "hover:bg-gray-50"
              }`}
            >
              <td className="border p-2 text-center">
                {(currentPage - 1) * limit + index + 1}
              </td>
              <td
                className="border p-2 capitalize text-blue-600 cursor-pointer text-center hover:underline"
                onClick={() => onSelectPokemon(pokemon)}
              >
                {pokemon.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
}
