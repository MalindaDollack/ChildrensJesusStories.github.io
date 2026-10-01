from pathlib import Path

html_path = Path("index.html")
image_name = "saddle book frog and snuggled measured horizontally"
image_path = Path(image_name + ".jpg")

if not image_path.exists():
    raise SystemExit("Requested saddle book frog/snuggled image is not present; no changes made.")

html = html_path.read_text(encoding="utf-8")

frog = '<figure style="margin:0;text-align:center;"><img loading="lazy" decoding="async" src="saddle book frog and snuggled measured horizontally.jpg?v=1" alt="saddle book frog and snuggled measured horizontally" style="display:block;width:100%;height:auto!important;aspect-ratio:auto!important;object-fit:contain;margin:0 auto;"><figcaption style="margin-top:6px;color:#4b146f;font-weight:800;line-height:1.25;">saddle book frog and snuggled measured horizontally</figcaption></figure>'
mailing = '<figure style="margin:0;text-align:center;"><img loading="lazy" decoding="async" src="saddle book mailing.jpg?v=1" alt="saddle book mailing" style="display:block;width:100%;height:auto!important;aspect-ratio:auto!important;object-fit:contain;margin:0 auto;"><figcaption style="margin-top:6px;color:#4b146f;font-weight:800;line-height:1.25;">saddle book mailing</figcaption></figure>'

replacements = []
for pid in ("PID16", "PID17"):
    marker = f'id="store-{pid}"'
    marker_pos = html.find(marker)
    if marker_pos < 0:
        raise SystemExit(f"{pid} not found; no changes made.")
    start = html.rfind("<article", 0, marker_pos)
    end = html.find("</article>", marker_pos)
    if start < 0 or end < 0:
        raise SystemExit(f"{pid} article boundaries not found; no changes made.")
    end += len("</article>")
    block = html[start:end]
    if frog in block:
        raise SystemExit(f"{pid} already contains the requested frog/snuggled photo; no changes made.")
    if block.count(mailing) != 1:
        raise SystemExit(f"{pid} mailing photo was not found exactly once; no changes made.")
    new_block = block.replace(mailing, frog + "\n" + mailing, 1)
    replacements.append((start, end, new_block))

for start, end, new_block in sorted(replacements, reverse=True):
    html = html[:start] + new_block + html[end:]

html_path.write_text(html, encoding="utf-8")
print("Added saddle book frog/snuggled photo as picture #4 to PID16 and PID17 only.")
