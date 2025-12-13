export default function LoadingSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-2 animate-pulse">
      {[...Array(rows)].map((_, i) => (
        <div
          key={i}
          className="skeleton h-4 w-3/4"
        />
      ))}
    </div>
  );
}
