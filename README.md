# CCE Prelims Tracker

ગણિત + રીઝનિંગ માટે Lectures · Notes · PYQ (CBT test) · Detailed Solutions · Progress tracker. Mobile-first, offline ચાલે, phone માં install થઈ શકે.

## GitHub Pages પર મૂકવું (friend ને link આપવા)
1. GitHub પર નવી repository બનાવો → આ folder ની બધી files upload કરો (`index.html`, `assets/`, `sw.js`, `manifest.webmanifest` સહિત).
2. Settings → Pages → Branch: `main` / root → Save.
3. મળેલી `https://…github.io/…` link share કરો. Phone માં Chrome ના menu થી **Add to Home screen** કરો તો app જેવું ખુલશે.

દરેક વ્યક્તિનો progress તેના પોતાના browser માં સચવાય છે (અલગ-અલગ device વચ્ચે sync થતો નથી). **Data** tab માંથી Backup download કરી રાખો.

## Computer પર ચલાવવું
`start.bat` double-click (Python 3 જોઈએ) → `http://localhost:8765`. Progress `cce-data.json` માં પણ સચવાય છે (એ file GitHub પર upload ન કરશો — `.gitignore` માં છે).

## Folder structure
```
index.html            app shell
sw.js, manifest.webmanifest   offline + install support
assets/css/app.css    બધા styles (એક જ file)
assets/js/            01–04 catalog/notes · 05–18, 26–37 topic data · 19 core app · 99 boot
assets/img/           પ્રશ્નોના figures (પહેલાં JS માં base64 હતા — હવે અલગ files, lazy load)
assets/icons/         app icons
server.py, start.bat  optional local save server
```

## Developer notes
- Scripts `defer` સાથે **આ જ ક્રમમાં** load થાય છે (`index.html`). ક્રમ બદલશો નહીં — પાછળની files આગળની files ને patch કરે છે. `99-boot.js` છેલ્લી જ રહેવી જોઈએ.
- નવો topic data ઉમેરવો હોય તો `PYQ[topicId]` અને `NOTES[topicId]` માં ઉમેરતી નવી file `19-core-tracker.js` પહેલાં મૂકો.
- Service worker નો cache clear કરવા `sw.js` માં `VERSION` બદલો.
