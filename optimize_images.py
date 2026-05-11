"""Convert all large PNG/JPG images to optimized WebP for faster loading."""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).parent
FOLDERS = [ROOT / "ESPORTS", ROOT / "Sports", ROOT / "others"]
MAX_DIMENSION = 1200  # max width or height in px
WEBP_QUALITY = 80
SKIP_EXTENSIONS = {".mp3", ".url", ".webp"}  # already small or not images


def optimize():
    converted = []
    for folder in FOLDERS:
        if not folder.exists():
            continue
        for path in sorted(folder.iterdir()):
            if not path.is_file():
                continue
            if path.suffix.lower() in SKIP_EXTENSIONS:
                continue
            if path.suffix.lower() not in {".png", ".jpg", ".jpeg"}:
                continue

            original_kb = path.stat().st_size / 1024
            if original_kb < 200:  # skip already small files
                continue

            with Image.open(path) as img:
                img = img.convert("RGB")
                img.thumbnail((MAX_DIMENSION, MAX_DIMENSION), Image.Resampling.LANCZOS)
                new_path = path.with_suffix(".webp")
                img.save(new_path, "WEBP", quality=WEBP_QUALITY)

            new_kb = new_path.stat().st_size / 1024
            print(f"{path.name} ({original_kb:.0f}KB) -> {new_path.name} ({new_kb:.0f}KB)")
            converted.append((path, new_path))

    print(f"\nOptimized {len(converted)} images.")
    return converted


if __name__ == "__main__":
    optimize()
