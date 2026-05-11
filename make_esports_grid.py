"""Build a horizontal grid of esports posters preserving original aspect ratios."""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).parent
ESPORTS_DIR = ROOT / "ESPORTS"
OUTPUT_FILE = ROOT / "esports_posters_grid.png"
SOCIAL_PREVIEW_FILE = ROOT / "public" / "designs" / "esports_social_preview.png"
IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}
EXCLUDED_FILES = {"maxresdefault.jpg"}
ROW_HEIGHT = 600  # normalize each row to this height
NUM_ROWS = 3
GAP = 0


def load_images():
    all_paths = sorted(
        path for path in ESPORTS_DIR.iterdir()
        if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS and path.name not in EXCLUDED_FILES
    )

    # Deduplicate: if both .png and .webp exist for the same stem, prefer .webp
    seen_stems = {}
    for path in all_paths:
        stem = path.stem
        if stem in seen_stems:
            existing = seen_stems[stem]
            if path.suffix.lower() == ".webp":
                seen_stems[stem] = path
        else:
            seen_stems[stem] = path

    image_paths = sorted(seen_stems.values(), key=lambda p: p.name.lower())

    images = []
    for path in image_paths:
        img = Image.open(path).convert("RGB")
        images.append((path.name, img))
        print(f"  Loaded {path.name} ({img.width}x{img.height})")

    return images


def scale_to_height(img, target_height):
    """Scale image proportionally so its height matches target_height."""
    ratio = target_height / img.height
    new_width = int(img.width * ratio)
    return img.resize((new_width, target_height), Image.Resampling.LANCZOS)


def build_horizontal_grid(images):
    if not images:
        raise ValueError(f"No images found in {ESPORTS_DIR}")

    # Scale all images to ROW_HEIGHT, keeping original aspect ratio
    scaled = [(name, scale_to_height(img, ROW_HEIGHT)) for name, img in images]

    # Split images into rows as evenly as possible
    per_row = len(scaled) // NUM_ROWS
    remainder = len(scaled) % NUM_ROWS
    rows = []
    idx = 0
    for r in range(NUM_ROWS):
        count = per_row + (1 if r < remainder else 0)
        rows.append(scaled[idx:idx + count])
        idx += count

    # Calculate grid dimensions
    row_widths = [sum(img.width for _, img in row) for row in rows]
    grid_width = max(row_widths)
    grid_height = NUM_ROWS * ROW_HEIGHT

    grid = Image.new("RGB", (grid_width, grid_height), (17, 17, 17))

    y = 0
    for row in rows:
        x = 0
        for _, img in row:
            grid.paste(img, (x, y))
            x += img.width
        y += ROW_HEIGHT

    return grid


def main():
    images = load_images()
    grid = build_horizontal_grid(images)
    grid.save(OUTPUT_FILE, quality=95)
    social_preview = Image.new("RGB", (1200, 630), (17, 17, 17))
    fitted = grid.copy()
    fitted.thumbnail((1200, 630), Image.Resampling.LANCZOS)
    x = (1200 - fitted.width) // 2
    y = (630 - fitted.height) // 2
    social_preview.paste(fitted, (x, y))
    social_preview.save(SOCIAL_PREVIEW_FILE, quality=95)
    print(f"\nCreated {OUTPUT_FILE}")
    print(f"Created {SOCIAL_PREVIEW_FILE}")
    print(f"Grid size: {grid.width}x{grid.height}")
    print(f"Used {len(images)} esports images in {NUM_ROWS} horizontal rows.")


if __name__ == "__main__":
    main()
