from pathlib import Path

from PIL import Image

SRC = Path(r"C:\Users\Person\Desktop\portfolio\public\oneko\oneko.gif")
OUT = Path(r"C:\Users\Person\Desktop\portfolio\public\oneko\panda.png")

WHITE = (255, 255, 255, 255)
BLACK = (18, 18, 18, 255)
CLEAR = (0, 0, 0, 0)


def is_cat(px):
    r, g, b, a = px
    return a > 10 and (r + g + b) > 40


def is_solid_black(px):
    r, g, b, a = px
    return a > 200 and r + g + b < 40


def in_ellipse(rx, ry, cx, cy, rxx, ryy):
    return ((rx - cx) / rxx) ** 2 + ((ry - cy) / ryy) ** 2 <= 1.0


def convert_cell(cell):
    cat = [[is_cat(cell.getpixel((x, y))) for x in range(32)] for y in range(32)]
    detail = [[is_solid_black(cell.getpixel((x, y))) for x in range(32)] for y in range(32)]
    points = [(x, y) for y in range(32) for x in range(32) if cat[y][x]]
    if not points:
        return Image.new("RGBA", (32, 32), CLEAR)

    xs = [p[0] for p in points]
    ys = [p[1] for p in points]
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    width = max(1, max_x - min_x + 1)
    height = max(1, max_y - min_y + 1)

    head_cut = min_y + max(8, int(height * 0.48))
    head = [(x, y) for x, y in points if y <= head_cut]
    hxs = [p[0] for p in head] or xs
    head_min_x, head_max_x = min(hxs), max(hxs)
    head_width = max(1, head_max_x - head_min_x + 1)

    def rel_head(x, y):
        return (x - head_min_x) / head_width, (y - min_y) / height

    out = Image.new("RGBA", (32, 32), CLEAR)
    pixels = out.load()

    for x, y in points:
        hx, hy = rel_head(x, y)
        ear = hy < 0.30 and (hx < 0.40 or hx > 0.60)
        patch = in_ellipse(hx, hy, 0.28, 0.40, 0.20, 0.20) or in_ellipse(
            hx, hy, 0.72, 0.40, 0.20, 0.20
        )
        limb = hy > 0.58 and (x <= head_min_x + 4 or head_max_x - 4 <= x <= head_max_x + 5)
        if ear or limb or patch or detail[y][x]:
            pixels[x, y] = BLACK
        else:
            pixels[x, y] = WHITE

    # Keep a white silhouette outline so black patches read on a dark page
    for x, y in points:
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if nx < 0 or ny < 0 or nx > 31 or ny > 31 or not cat[ny][nx]:
                pixels[x, y] = WHITE
                break

    # Pupils
    left_cx = head_min_x + int(head_width * 0.28)
    right_cx = head_min_x + int(head_width * 0.72)
    eye_cy = min_y + int(height * 0.40)
    for cx in (left_cx, right_cx):
        for dx in (0, 1):
            for dy in (0, 1):
                px, py = cx + dx, eye_cy + dy
                if 0 <= px < 32 and 0 <= py < 32 and cat[py][px]:
                    pixels[px, py] = WHITE

    return out


def ascii_cell(cell):
    lines = []
    for y in range(32):
        row = []
        for x in range(32):
            r, g, b, a = cell.getpixel((x, y))
            if a < 10:
                row.append(".")
            elif r + g + b < 120:
                row.append("B")
            else:
                row.append("W")
        lines.append("".join(row))
    return "\n".join(lines)


src = Image.open(SRC).convert("RGBA")
sheet = Image.new("RGBA", (256, 128), CLEAR)

for row in range(4):
    for col in range(8):
        cell = src.crop((col * 32, row * 32, col * 32 + 32, row * 32 + 32))
        sheet.paste(convert_cell(cell), (col * 32, row * 32))

sheet.save(OUT)
print("wrote", OUT)

for name, (col, row) in {"idle": (3, 3), "alert": (7, 3), "east": (3, 0), "sleep": (2, 0)}.items():
    cell = sheet.crop((col * 32, row * 32, col * 32 + 32, row * 32 + 32))
    print("\n===", name, "===")
    print(ascii_cell(cell))
