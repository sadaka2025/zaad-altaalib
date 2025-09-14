// print-bucket-tree.js
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// ⚠️ Utilise Service Role Key seulement côté serveur
const SUPABASE_URL = 'https://ariqdghgxknuvowhgftt.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyaXFkZ2hneGtudXZvd2hnZnR0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTk5Njg4NiwiZXhwIjoyMDcxNTcyODg2fQ.5GvrFHXupLjQqdQxxucik6JkSpt2GUgUpy8gdJrTgXk';

const BUCKET = 'pdf';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Génère l’URL publique complète
function getPublicUrl(bucket, path) {
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
}

async function listFilesRecursively(path = '') {
  let tree = [];

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .list(path, { limit: 100 });

  if (error) {
    console.error('❌ Erreur lors de la récupération :', error.message);
    return tree;
  }

  for (const item of data) {
    if (item.metadata) {
      // 📄 Fichier
      const fullPath = path ? `${path}/${item.name}` : item.name;
      tree.push({
        type: 'file',
        name: item.name,
        url: getPublicUrl(BUCKET, fullPath), // 👉 URL complète
      });
    } else {
      // 📂 Dossier
      const subTree = await listFilesRecursively(
        path ? `${path}/${item.name}` : item.name
      );
      tree.push({
        type: 'folder',
        name: item.name,
        children: subTree,
      });
    }
  }

  return tree;
}

function printTree(tree, indent = '') {
  for (const node of tree) {
    if (node.type === 'folder') {
      console.log(`${indent}📂 ${node.name}/`);
      printTree(node.children, indent + '  ');
    } else {
      console.log(`${indent}📄 ${node.name} → ${node.url}`);
    }
  }
}

(async () => {
  console.log("🔍 Récupération de l'arborescence du bucket...");

  const tree = await listFilesRecursively('');

  const bucketTree = {
    bucket: BUCKET,
    children: tree,
  };

  console.log(`\n📦 Bucket: ${BUCKET}`);
  printTree(bucketTree.children, '  ');

  fs.writeFileSync(
    'bucket-tree.json',
    JSON.stringify(bucketTree, null, 2),
    'utf-8'
  );
  console.log('\n✅ Arborescence sauvegardée dans bucket-tree.json');
})();
