import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-center min-h-screen flex-col">
      <div className="flex-center flex-col border border-primary bg-white h-96 w-1/2 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-primary mb-3 ">
          Welcome to Pokemon Explorer!
        </h1>
        <p className="text-lg text-gray-600 mb-5">
          Discover, explore, and track your favorite Pokemon!
        </p>

        <Link href="/poke" passHref>
          <button className="btn btn-primary">Go to Pokemon List</button>
        </Link>
      </div>
    </div>
  );
}
