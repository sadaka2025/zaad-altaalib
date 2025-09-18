export default function LyaoutArticle({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-blue-600 text-white p-4 text-center font-bold text-xl">
        Mon Blog
      </header>
      <main className="container mx-auto p-5">{children}</main>
      <footer className="bg-gray-800 text-white p-4 mt-10 text-center">
        © 2025 Mon Blog
      </footer>
    </div>
  );
}
