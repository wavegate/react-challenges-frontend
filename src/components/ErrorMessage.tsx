export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className={`px-4 py-2 rounded-md bg-red-50 text-red-700`}>
      {message}
    </div>
  );
}
