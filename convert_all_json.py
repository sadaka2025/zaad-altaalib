import os
import re

# 📂 Dossier cible
input_folder = "public/data/years/year1/subjects_s1s2"

# conversion chiffres arabes → occidentaux
arabic_to_western = str.maketrans("٠١٢٣٤٥٦٧٨٩", "0123456789")

def clean_numbers(text):
    # convertir en chiffres occidentaux
    text = text.translate(arabic_to_western)
    # remplacer tout nombre avec zéro(s) devant → sans zéro
    text = re.sub(r'(?<=\D)0+(\d+)', r'\1', text)  # ex: ec01 → ec1
    text = re.sub(r'\b0+(\d+)\b', r'\1', text)     # ex: "01" → "1"
    return text

# parcourir tous les fichiers JSON du dossier
for filename in os.listdir(input_folder):
    if filename.endswith(".json"):
        file_path = os.path.join(input_folder, filename)

        with open(file_path, "r", encoding="utf-8") as f:
            data = f.read()

        converted = clean_numbers(data)

        with open(file_path, "w", encoding="utf-8") as f:
            f.write(converted)

        print(f"✅ {filename} corrigé")

print("🎉 Conversion terminée pour tous les JSON !")
