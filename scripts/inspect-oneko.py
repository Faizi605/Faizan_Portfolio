from collections import Counter
from PIL import Image

im = Image.open(r"C:\Users\Person\Desktop\portfolio\public\oneko\oneko.gif").convert("RGBA")
print(im.size)
c = Counter(im.getdata())
for color, n in c.most_common(15):
    print(color, n)

cell = im.crop((3 * 32, 3 * 32, 4 * 32, 4 * 32))
xs, ys = [], []
print("idle frame")
for y in range(32):
    row = []
    for x in range(32):
        r, g, b, a = cell.getpixel((x, y))
        if a > 10 and (r + g + b) > 40:
            xs.append(x)
            ys.append(y)
            row.append("#")
        else:
            row.append(".")
    print("".join(row))
if xs:
    print("range", min(xs), max(xs), min(ys), max(ys))
