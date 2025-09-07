// src/pages/PdfsPage.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function PdfsPage() {
  const [activeTab, setActiveTab] = useState('list');

  // ----------------- 🔹 LOGIQUE LISTE -----------------
  const [files, setFiles] = useState([]);
  const [currentPath, setCurrentPath] = useState(''); // "" = racine

  useEffect(() => {
    async function fetchFiles() {
      const { data, error } = await supabase.storage
        .from('pdf')
        .list(currentPath, {
          limit: 100,
          sortBy: { column: 'name', order: 'asc' },
        });

      if (error) {
        console.error('❌ Erreur lors du listing:', error);
      } else {
        setFiles(data);
      }
    }

    fetchFiles();
  }, [currentPath]);

  // ✅ Générer l’URL publique
  const getFileUrl = (fileName) => {
    const fullPath = currentPath ? `${currentPath}/${fileName}` : fileName;
    return supabase.storage.from('pdf').getPublicUrl(fullPath).data.publicUrl;
  };

  // ✅ Remonter d’un dossier
  const goBack = () => {
    const parent = currentPath.split('/').slice(0, -1).join('/');
    setCurrentPath(parent);
  };

  // ----------------- 🔹 LOGIQUE UPLOAD -----------------
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert('Sélectionne un fichier !');
    const { error } = await supabase.storage
      .from('pdf')
      .upload(`uploads/${file.name}`, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('❌ Erreur upload:', error);
      alert("Erreur lors de l'upload !");
    } else {
      alert('✅ Upload réussi !');
      setFile(null);
      setActiveTab('list'); // 🔄 retour automatique à la liste
    }
  };

  // ----------------- 🔹 RENDER -----------------
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📑 Gestion des PDFs</h1>

      {/* ✅ Navbar interne */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('list')}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'list'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          📂 Liste
        </button>

        <button
          onClick={() => setActiveTab('upload')}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'upload'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          ⬆️ Upload
        </button>
      </div>

      {/* ✅ Contenu selon onglet */}
      {activeTab === 'list' && (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">📂 Explorer PDFs</h2>

          {currentPath && (
            <button
              onClick={goBack}
              className="mb-4 px-3 py-1 bg-gray-200 rounded"
            >
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
                          currentPath
                            ? `${currentPath}/${file.name}`
                            : file.name
                        )
                      }
                      className="text-green-600 underline"
                    >
                      📂 {file.name}
                    </button>
                  </li>
                ) : (
                  // 📄 Fichier PDF
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
      )}

      {activeTab === 'upload' && (
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-4">⬆️ Uploader un PDF</h2>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4"
          />
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Upload
          </button>
        </div>
      )}
    </div>
  );
}
