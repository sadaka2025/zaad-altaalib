// src/components/PdfManager.jsx
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ariqdghgxknuvowhgftt.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyaXFkZ2hneGtudXZvd2hnZnR0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTk5Njg4NiwiZXhwIjoyMDcxNTcyODg2fQ.5GvrFHXupLjQqdQxxucik6JkSpt2GUgUpy8gdJk';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function PdfManager() {
  const [pdfList, setPdfList] = useState([]);
  const [uploading, setUploading] = useState(false);

  // 🔹 Fonction récursive pour lister fichiers et sous-dossiers
  const fetchPdfsRecursive = async (folder = '') => {
    try {
      const { data, error } = await supabase.storage.from('pdf').list(folder, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      });

      if (error) throw error;

      const filesWithUrls = [];

      for (const item of data) {
        // @ts-ignore
        if (item.type === 'folder') {
          const subFiles = await fetchPdfsRecursive(`${folder}${item.name}/`);
          filesWithUrls.push(...subFiles);
        } else {
          const { data: publicUrl } = supabase.storage
            .from('pdf')
            .getPublicUrl(`${folder}${item.name}`);
          filesWithUrls.push({
            name: item.name,
            path: `${folder}${item.name}`,
            url: publicUrl.publicUrl,
          });
        }
      }

      return filesWithUrls;
    } catch (err) {
      console.error('❌ Erreur fetch PDFs:', err.message);
      return [];
    }
  };

  // 🔹 Récupérer la liste complète
  const fetchPdfs = async () => {
    const allFiles = await fetchPdfsRecursive();
    setPdfList(allFiles);
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  // 🔹 Upload depuis l'UI
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const { error } = await supabase.storage
        .from('pdf')
        .upload(file.name, file, {
          upsert: true,
          contentType: 'application/pdf',
        });

      if (error) throw error;
    } catch (err) {
      console.error('❌ Erreur upload:', err.message);
    } finally {
      setUploading(false);
      e.target.value = null; // reset input
      fetchPdfs(); // rafraîchir la liste
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        📂 Gestionnaire de PDFs (Supabase)
      </h2>

      {/* Bouton Upload stylé */}
      <label className="inline-block px-4 py-2 bg-blue-600 text-white font-bold rounded cursor-pointer mb-4">
        📤 Upload PDF
        <input
          type="file"
          accept=".pdf"
          onChange={handleUpload}
          disabled={uploading}
          className="hidden"
        />
      </label>
      {uploading && <p>⏳ Upload en cours...</p>}

      {/* Liste des fichiers */}
      <ul className="space-y-2">
        {pdfList.map((pdf, index) => (
          <li key={index}>
            <strong>{pdf.path}</strong>{' '}
            <a
              href={pdf.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              [Ouvrir / Télécharger]
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
