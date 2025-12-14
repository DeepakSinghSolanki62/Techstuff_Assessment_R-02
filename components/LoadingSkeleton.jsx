export default function LoadingSkeleton({ rows = 5,  }) {
  return (
    <div className="space-y-2 w-full animate-pulse md:col-span-2"  >
      {[...Array(rows)].map((_, i) => (
        <div
          key={i}
          className="skeleton h-4 w-3/4"
        />
      ))}
    </div>
  );
}
