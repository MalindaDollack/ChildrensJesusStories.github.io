from pathlib import Path

path = Path('index.html')
html = path.read_text(encoding='utf-8')
old = '<div style="margin-top:8px;text-align:center;color:#4b146f;font-weight:800;line-height:1.25;">game card package no measurements</div>\n'
if old not in html:
    raise SystemExit('Target PID15 main-picture caption not found; no changes made.')
html = html.replace(old, '', 1)
path.write_text(html, encoding='utf-8')
print('Removed PID15 main-picture caption only.')
