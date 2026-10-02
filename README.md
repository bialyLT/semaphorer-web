# Landing de Semaphorer

Web estática (HTML + CSS + JS, sin build). Ver `ROADMAP.md` para el plan.

## Vista previa local

`fetch` no anda con `file://` en casi todos los navegadores. Servir local:

```
cd landing-web && python3 -m http.server
```

y abrir http://localhost:8000.

## Ritual por versión nueva

Lo hace solo `./tools/publicar_todo.sh` en el repo del juego: exporta
Windows+Linux, crea la release y actualiza `data/versiones.json` (URLs y
tamaños reales, última destacada) y `data/releases.json` (desde el
CHANGELOG). Si lo hacés a mano: agregar la entrada en `versiones.json`
(`url` real, `destacado: true` en la nueva) y en `releases.json`, recargar
y verificar el botón del hero y las tablas.

## Publicar la web (repo semaphorer-web)

Esta carpeta ES el repo: clonar `semaphorer-web`, mover acá adentro todo el
contenido de `landing-web/` (no la carpeta, su contenido) a la raíz del
clone, commitear y pushear. Después activar Pages en el repo (Settings >
Pages > Deploy from branch) y la web queda servida con `fetch` funcionando.

## Notas

- `audio/musica_menu.wav` es copia del tema del juego (Fase 5, preview).
- Seguridad: el JS solo inserta texto (`textContent`), nunca HTML; los links
  externos llevan `rel="noopener"`; hay CSP `default-src 'self'`.
- Pendiente: screenshots en `img/`, hosting definitivo de zips y web.
