import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center flex-col">
      <h1 className="text-3xl font-bold text-gray-800 mb-1">
        Welcome to Pokemon Explorer!
      </h1>
      <p className="text-lg text-gray-600 mb-3">
        Discover, explore, and track your favorite Pokemon!
      </p>

      <Link href="/poke" passHref>
        <button className="btn btn-primary">Go to Pokemon List</button>
      </Link>
    </div>
  );
}
