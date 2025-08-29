import json
import pandas as pd
import sys
import re

def extract_gdrive_id(url: str):
    if isinstance(url, str) and "/d/" in url:
        return url.split("/d/")[1].split("/")[0]
    return None

def normalize_video_link(url: str):
    if isinstance(url, str) and "view" in url:
        url = url.replace("view?usp=sharing", "preview")
    return url

def main(csv_path, json_path):
    # 1. Charger JSON existant
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    # 2. Charger CSV
    df = pd.read_csv(csv_path)

    for sem, sem_df in df.groupby("sem"):
        sem = str(sem)

        # ---- IDs des lessons et lives depuis CSV ----
        lesson_ids_csv = set(str(lid) for lid in sem_df["lesson"] if str(lid).isdigit())
        live_ids_csv = set(str(lid) for lid in sem_df["lesson"] if "live" in str(lid))

        # ---- Nettoyer lessons non présents dans CSV ----
        data["semesters"][sem]["lessons"] = [
            l for l in data["semesters"][sem]["lessons"]
            if str(l["id"]) in lesson_ids_csv
        ]
        data["semesters"][sem]["contentLinks"] = {
            lid: links for lid, links in data["semesters"][sem]["contentLinks"].items()
            if str(lid) in lesson_ids_csv
        }

        # ---- Mise à jour des lessons ----
        for _, row in sem_df[sem_df["lesson"].astype(str).str.isdigit()].iterrows():
            lesson_id = str(row["lesson"])
            title = str(row["title"])
            video = normalize_video_link(str(row["video"]))
            file_id = extract_gdrive_id(video)

            # update title
            for lesson in data["semesters"][sem]["lessons"]:
                if str(lesson["id"]) == lesson_id:
                    lesson["title"] = title

            # update links.video + videoDownload uniquement
            if lesson_id in data["semesters"][sem]["contentLinks"]:
                links = data["semesters"][sem]["contentLinks"][lesson_id]
            else:
                # si le lesson existe pas encore → créer l’entrée
                data["semesters"][sem]["contentLinks"][lesson_id] = {}
                links = data["semesters"][sem]["contentLinks"][lesson_id]

            links["video"] = video
            if file_id:
                links["videoDownload"] = f"https://drive.google.com/uc?export=download&id={file_id}"

        # ---- Mise à jour des lives ----
        for section in data["semesters"][sem]["conclusion"]["sections"]:
            if section["title"] == "اللقاءات المباشرة":
                # garder uniquement les lives du CSV
                section["items"] = [
                    item for item in section["items"]
                    if item["id"] in live_ids_csv
                ]

                # mise à jour / ajout
                for _, row in sem_df[sem_df["lesson"].astype(str).str.contains("live")].iterrows():
                    lesson_id = row["lesson"]
                    title = row["title"]
                    video = normalize_video_link(row["video"])
                    file_id = extract_gdrive_id(video)

                    # chercher si existe
                    item = next((i for i in section["items"] if i["id"] == lesson_id), None)
                    if item:
                        item["label"] = title
                        item["links"]["video"] = video
                        if file_id:
                            item["links"]["videoDownload"] = f"https://drive.google.com/uc?export=download&id={file_id}"
                    else:
                        # ajouter nouveau live
                        section["items"].append({
                            "id": lesson_id,
                            "label": title,
                            "tabs": ["video", "summaryPDF"],
                            "tabLabels": {
                                "video": "🎥 تسجيل اللقاء",
                                "summaryPDF": "📝 ملخص اللقاء"
                            },
                            "links": {
                                "video": video,
                                "videoDownload": f"https://drive.google.com/uc?export=download&id={file_id}" if file_id else ""
                            }
                        })

    # 3. Sauvegarder JSON mis à jour
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"✅ Mise à jour terminée (alignement strict avec CSV) : {json_path}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("❌ Usage: python update_subjectjson.py videos.csv subject.json")
    else:
        main(sys.argv[1], sys.argv[2])
