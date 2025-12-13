export default function ErrorMessage({ message }) {
  return (
    <div className="p-3 bg-red-100 text-red-700 rounded">
      {message}
    </div>
  );
}
