export default function Alert({ message }: { message: string }) {
  return (
    <div className={`px-4 py-2 bg-red-50 text-red-700 rounded-md`}>
      {message}
    </div>
  );
}
