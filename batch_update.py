import os
import subprocess

# Dossier des CSV
csv_folder = "public/videoscsv"
# Racine des JSON
json_root = "public/data/years"

# Parcours des fichiers CSV
for csv_file in os.listdir(csv_folder):
    if csv_file.endswith(".csv"):
        # Ex: videosfiqh.csv -> fiqh
        matiere = csv_file.replace("videos", "").replace(".csv", "")

        # Nom du JSON attendu
        json_filename = f"{matiere}_data_s1s2.json"
        json_path = None

        # Cherche dans toutes les années (year1 → year5)
        for year in range(1, 6):
            candidate = os.path.join(json_root, f"year{year}", "subjects_s1s2", json_filename)
            if os.path.exists(candidate):
                json_path = candidate
                break

        csv_path = os.path.join(csv_folder, csv_file)

        if json_path:
            print(f"🔄 Mise à jour : {csv_file} → {json_path}")
            subprocess.run(["python", "update_subjectjson.py", csv_path, json_path])
        else:
            print(f"⚠️ JSON introuvable pour la matière : {matiere}")
