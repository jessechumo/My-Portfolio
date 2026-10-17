"""Turn img/jesse.jpg into the ASCII portrait used in the About section's neofetch block.

Usage: python3 tools/ascii-portrait.py [columns] > portrait.txt
Needs Pillow (pip install pillow). Paste the output into the <pre class="neofetch__art"> in index.html.

The photo's backdrop is a neutral grey while skin and shirt are saturated, so saturation is used to
separate the subject from the backdrop; very dark pixels inside the head area are treated as hair.
"""
import sys
from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter

PHOTO = Path(__file__).resolve().parent.parent / 'img' / 'jesse.jpg'
RAMP = ' .,:;-=+*#%@'
CELL_ASPECT = 0.5  # monospace cell width / height (Red Hat Mono at line-height ~1.15)


def portrait(cols):
    src = Image.open(PHOTO).convert('RGB')
    w, h = src.size
    crop = src.crop((100, 90, w - 100, int(h * 0.72)))
    cw, ch = crop.size
    rows = int(cols * ch / cw * CELL_ASPECT)
    small = crop.resize((cols, rows), Image.LANCZOS)
    detail = ImageEnhance.Contrast(small.convert('L')).enhance(1.25)
    detail = detail.filter(ImageFilter.UnsharpMask(radius=1.2, percent=120, threshold=2))
    hsv = small.convert('HSV')
    sat, val, lum = hsv.getchannel('S').load(), hsv.getchannel('V').load(), detail.load()

    lines = []
    for r in range(rows):
        line = ''
        for c in range(cols):
            s, v, l = sat[c, r] / 255, val[c, r] / 255, lum[c, r] / 255
            ex, ey = (c - cols * 0.52) / (cols * 0.30), (r - rows * 0.30) / (rows * 0.33)
            hair = v < 0.17 and ex * ex + ey * ey < 1
            if not ((s > 0.16 and v > 0.07) or hair):
                line += ' '
                continue
            t = 0.30 if hair and s <= 0.16 else min(1, max(0, (l - 0.08) / 0.74)) ** 0.95
            line += RAMP[min(len(RAMP) - 1, max(1, round(t * (len(RAMP) - 1))))]
        lines.append(line.rstrip())
    while lines and not lines[0].strip():
        lines.pop(0)
    while lines and not lines[-1].strip():
        lines.pop()
    return '\n'.join(lines)


if __name__ == '__main__':
    print(portrait(int(sys.argv[1]) if len(sys.argv) > 1 else 58))
