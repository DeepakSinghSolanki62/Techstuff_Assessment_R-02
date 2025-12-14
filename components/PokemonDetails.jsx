import TypeTabs from "@/components/TypeTabs";

const PokemonDetails = ({ pokemon }) => {
  if (!pokemon) return null;

  return (
    <div className="card p-4">
      <div className="bg-blue-500 rounded-lg flex justify-center p-4">
        <img
          src={pokemon?.sprites.front_default}
          alt={pokemon?.name}
          className="w-32 h-32"
        />
      </div>

      <div className="p-4">
        <h2 className="section-title ">{pokemon?.name}</h2>

        <TypeTabs types={pokemon?.types} />
      </div>
    </div>
  );
}

export default PokemonDetails