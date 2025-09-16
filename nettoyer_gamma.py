import os
from pdf2image import convert_from_path
from PIL import Image, ImageDraw
import img2pdf

# Configuration
INPUT_DIR = "public/gamma/input_pdfs"
OUTPUT_DIR = "public/gamma/output_pdfs"
LOGO_PATH = "public/gamma/etiquette.png"
POPPLER_PATH = r"C:\poppler-24.08.0\Library\bin"  # chemin Poppler

os.makedirs(OUTPUT_DIR, exist_ok=True)

# Fonction pour traiter chaque PDF
def process_pdf(pdf_file):
    pdf_path = os.path.join(INPUT_DIR, pdf_file)
    print(f"🔄 Traitement de : {pdf_file}")

    # 1️⃣ Conversion en images
    pages = convert_from_path(pdf_path, dpi=200, poppler_path=POPPLER_PATH)
    image_paths = []

    for i, page in enumerate(pages):
        img_path = os.path.join(OUTPUT_DIR, f"{pdf_file}_page_{i}.png")
        page.save(img_path, "PNG")
        image_paths.append(img_path)

        # 2️⃣ Ajouter le logo pour recouvrir le texte
        page_edit = Image.open(img_path).convert("RGBA")
        logo = Image.open(LOGO_PATH).convert("RGBA")

        page_width, page_height = page_edit.size

        # ⚡ Estimation automatique de la zone "Made with Gamma" à recouvrir
        # Tu peux ajuster ces valeurs si le texte est plus grand
        zone_width = int(page_width * 0.25)   # 25% de la largeur de la page
        zone_height = int(page_height * 0.08) # 8% de la hauteur de la page

        # Redimensionner le logo pour couvrir toute la zone
        logo_resized = logo.resize((zone_width, zone_height))

        # Positionner le logo en bas à droite
        pos = (page_width - zone_width - 20, page_height - zone_height - 20)

        page_edit.alpha_composite(logo_resized, dest=pos)
        page_edit.convert("RGB").save(img_path, "PNG")

    # 3️⃣ Recomposer en PDF propre
    output_pdf_path = os.path.join(OUTPUT_DIR, f"{os.path.splitext(pdf_file)[0]}_clean.pdf")
    with open(output_pdf_path, "wb") as f:
        f.write(img2pdf.convert(image_paths))

    # Nettoyer images temporaires
    for img in image_paths:
        os.remove(img)

    print(f"✅ PDF généré : {output_pdf_path}")

# Boucle sur tous les PDF
for file in os.listdir(INPUT_DIR):
    if file.lower().endswith(".pdf"):
        process_pdf(file)
