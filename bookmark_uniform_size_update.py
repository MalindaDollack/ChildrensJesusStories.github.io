from pathlib import Path

p = Path('index.html')
text = p.read_text(encoding='utf-8')

start = text.find('<style id="uniform-bookmark-picture-size">')
end = text.find('</style>', start)
if start == -1 or end == -1:
    raise SystemExit('Uniform bookmark sizing block not found; no changes made')
end += len('</style>')

css = '''<style id="uniform-bookmark-picture-size">\n/* Mechanical display sizing only for every image inside PID1, PID2 and PID3. */\n#store-PID1 img,\n#store-PID2 img,\n#store-PID3 img {\n  width: 100% !important;\n  max-width: 250px !important;\n  height: 250px !important;\n  object-fit: contain !important;\n  object-position: center !important;\n  margin-left: auto !important;\n  margin-right: auto !important;\n}\n</style>'''

text = text[:start] + css + text[end:]
p.write_text(text, encoding='utf-8')
print('Included all PID1, PID2 and PID3 images, including description images, in uniform sizing')
