# Roadmap — Landing page de Semaphorer

Web estática construida desde 0 para presentar el juego, con dos requisitos
fijos: **links de descarga de todas las versiones** y **todas las releases
visibles** (historial completo, no solo la última).

## Fase 0 — Decisiones (resueltas)

- [x] Stack: React + Tailwind con Vite (rebuild a pedido: página más profesional).
- [x] Dónde viven los zips: GitHub Releases del repo del juego.
- [x] Dónde vive la web: Vercel (deploy automático con cada push a `main`).
- [x] Fuente de verdad de versiones: `public/data/versiones.json` (Descargas) y
  `public/data/releases.json` (Releases), actualizados por
  `tools/actualizar_web.py` desde el `CHANGELOG.md` + GitHub Releases.

## Fase 1 — Esqueleto

- [x] `index.html`: estructura semántica (`header`, `main`, `section`,
  `footer`), español, responsive desde el día 1.
- [x] `estilos.css`: paleta del juego (amarillo cordón sobre asfalto, de
  `UiTheme`), mobile-first.
- [x] Secciones fijas: Hero (título + botón Jugar/Descargar) · El juego
  (oficios, policía, mochila) · Controles · Descargas · Releases · Footer.

## Fase 2 — Datos (el corazón de tus dos requisitos)

- [x] `data/versiones.json`: una entrada por versión publicada. Esquema:
  ```json
  [
    { "version": "1.2.0", "fecha": "2026-10-02", "plataforma": "windows",
      "archivo": "Semaphorer-windows-v1.2.0.zip", "url": "PONER_URL",
      "tamanio_mb": 65, "destacado": true }
  ]
  ```
  - [x] La sección Descargas renderiza la tabla desde este JSON: la última
    marcada `destacado` arriba y grande, el resto como historial completo.
  - [x] Cada fila muestra versión, fecha, plataforma, tamaño y botón descargar.
- [x] `data/releases.json`: una entrada por release (espejo de
  `../CHANGELOG.md`: versión, fecha, Added/Fixed/Changed).
  - [x] La sección Releases las lista todas, de nueva a vieja, colapsables.
  - [ ] Flujo: al sacar versión nueva se agrega una entrada (a mano o con un
    script que parsee el CHANGELOG).

## Fase 3 — Contenido y polish

- [x] Hero con logo/título, subtítulo de una línea y botón a la última versión.
- [x] Tarjetas por oficio (🧽 limpiavidrios · 🎾 malabares · 🥬 venta).
- [x] Tabla de controles (WASD, E, F, G, I, Espacio, Esc, V).
- [ ] Capturas/GIFs del juego (carpeta `img/`; tomar con el juego corriendo).
- [x] Footer: versión actual y nota "hecho con Godot" (link al repo cuando haya URL pública).
- [x] Accesibilidad mínima: contraste, focos visibles, `alt` en imágenes.

## Fase 4 — Publicación y flujo de release

- [ ] Subir la web al hosting elegido.
- [ ] Definir el ritual por versión: exportar zip → subir archivo → agregar
  entrada en `versiones.json` + `releases.json` → verificar links.
- [ ] `README.md` en esta carpeta: cómo actualizar la web en cada release.

## Fase 5 — Extras (si da el tiempo)

- [x] Preview de la música (`musica_menu`) con `<audio>`.
- [ ] Etiquetas SEO/Open Graph para compartir el link.
- [ ] Contador o badge "última versión: vX.Y.Z" leído del JSON.

## Criterios de aceptación

1. Se ven los links de **todas** las versiones publicadas, no solo la última.
2. Se ven **todas** las releases con sus cambios.
3. Agregar una versión nueva = subir el zip + 2 entradas JSON, nada más.
