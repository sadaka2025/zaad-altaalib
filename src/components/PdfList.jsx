import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function PdfList() {
  const [files, setFiles] = useState([]);
  const [currentPath, setCurrentPath] = useState(""); // "" = racine

  useEffect(() => {
    async function fetchFiles() {
      const { data, error } = await supabase.storage
        .from("pdfs")
        .list(currentPath, {
          limit: 100,
          sortBy: { column: "name", order: "asc" },
        });

      if (error) {
        console.error("❌ Erreur lors du listing:", error);
      } else {
        setFiles(data);
      }
    }

    fetchFiles();
  }, [currentPath]);

  // ✅ Générer l’URL publique
  const getFileUrl = (fileName) => {
    const fullPath = currentPath ? `${currentPath}/${fileName}` : fileName;
    return supabase.storage.from("pdfs").getPublicUrl(fullPath).data.publicUrl;
  };

  // ✅ Remonter d’un dossier
  const goBack = () => {
    const parent = currentPath.split("/").slice(0, -1).join("/");
    setCurrentPath(parent);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">📂 Explorer PDFs</h1>

      {currentPath && (
        <button onClick={goBack} className="mb-4 px-3 py-1 bg-gray-200 rounded">
          ⬅️ Retour
        </button>
      )}

      {files.length === 0 ? (
        <p>Aucun fichier trouvé.</p>
      ) : (
        <ul className="space-y-2">
          {files.map((file) =>
            file.metadata === null ? (
              // 📂 Dossier
              <li key={file.name}>
                <button
                  onClick={() =>
                    setCurrentPath(
                      currentPath ? `${currentPath}/${file.name}` : file.name
                    )
                  }
                  className="text-green-600 underline"
                >
                  📂 {file.name}
                </button>
              </li>
            ) : (
              // 📄 Fichier PDF avec son URL affichée
              <li key={file.name} className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <a
                    href={getFileUrl(file.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    📄 {file.name}
                  </a>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(getFileUrl(file.name))
                    }
                    className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Copier URL
                  </button>
                </div>
                <p className="text-xs text-gray-500 break-all">
                  {getFileUrl(file.name)}
                </p>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}
