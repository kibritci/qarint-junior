import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
      <p className="text-gray-500 mb-6">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-red-600 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
