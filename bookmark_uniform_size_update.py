from pathlib import Path

p = Path('index.html')
text = p.read_text(encoding='utf-8')
marker = '<style id="uniform-bookmark-picture-size">'
if marker in text:
    print('Uniform bookmark sizing already present')
    raise SystemExit(0)

css = '''\n<style id="uniform-bookmark-picture-size">\n/* Mechanical display sizing only for PID1, PID2 and PID3 bookmark pictures. */\n#store-PID1 > img,\n#store-PID2 > img,\n#store-PID3 > img,\n#store-PID1 .pid1-bookmark-photo-gallery img,\n#store-PID2 .pid2-bookmark-photo-gallery img,\n#store-PID3 .pid3-bookmark-photo-gallery img {\n  width: 100% !important;\n  max-width: 250px !important;\n  height: 250px !important;\n  object-fit: contain !important;\n  object-position: center !important;\n  margin-left: auto !important;\n  margin-right: auto !important;\n}\n</style>\n'''

if '</head>' not in text:
    raise SystemExit('Could not find </head>; no changes made')
text = text.replace('</head>', css + '</head>', 1)
p.write_text(text, encoding='utf-8')
print('Added uniform mechanical sizing for PID1, PID2 and PID3 bookmark pictures only')
