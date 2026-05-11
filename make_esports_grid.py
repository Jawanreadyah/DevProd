from pathlib import Path
from math import ceil, sqrt
from PIL import Image, ImageOps

ROOT = Path(__file__).parent
ESPORTS_DIR = ROOT / "ESPORTS"
OUTPUT_FILE = ROOT / "esports_posters_grid.png"
IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}
CELL_WIDTH = 480
CELL_HEIGHT = 720
GAP = 0


def load_images():
    image_paths = sorted(
        path for path in ESPORTS_DIR.iterdir()
        if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS
    )

    images = []
    for path in image_paths:
        with Image.open(path) as image:
            fitted = ImageOps.fit(
                image.convert("RGB"),
                (CELL_WIDTH, CELL_HEIGHT),
                method=Image.Resampling.LANCZOS,
                centering=(0.5, 0.5),
            )
            images.append((path.name, fitted))

    return images


def build_grid(images):
    if not images:
        raise ValueError(f"No images found in {ESPORTS_DIR}")

    columns = ceil(sqrt(len(images)))
    rows = ceil(len(images) / columns)

    grid_width = columns * CELL_WIDTH + (columns - 1) * GAP
    grid_height = rows * CELL_HEIGHT + (rows - 1) * GAP
    grid = Image.new("RGB", (grid_width, grid_height), "white")

    for index, (_, image) in enumerate(images):
        row = index // columns
        column = index % columns
        x = column * (CELL_WIDTH + GAP)
        y = row * (CELL_HEIGHT + GAP)
        grid.paste(image, (x, y))

    return grid


def main():
    images = load_images()
    grid = build_grid(images)
    grid.save(OUTPUT_FILE, quality=95)
    print(f"Created {OUTPUT_FILE}")
    print(f"Used {len(images)} esports images with no spacing.")


if __name__ == "__main__":
    main()
