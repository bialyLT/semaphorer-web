# Landing de Semaphorer

Web en React + Tailwind (Vite). Deploy en Vercel. Ver `ROADMAP.md` para el plan.

## Desarrollo local

```
npm install
npm run dev
```

Build de producción: `npm run build` (sale en `dist/`).

## Ritual por versión nueva

Lo hace `./tools/publicar_todo.sh` en el repo del juego: actualiza
`public/data/versiones.json` (URLs y tamaños reales, última destacada) y
`public/data/releases.json` (desde el CHANGELOG) y pushea esta repo.
Vercel redespliega solo con cada push a `main`.

## Deploy en Vercel

Importar el repo `semaphorer-web` con preset Framework en blanco (Vite se
detecta solo). Sin variables de entorno ni config extra: `npm run build` y
`dist/` como salida ya vienen por defecto.

## Notas

- `public/audio/musica_menu.wav` es copia del tema del juego (preview).
- Seguridad: React escapa el contenido por defecto (sin `dangerouslySetInnerHTML`
  en ningún lado); los links externos llevan `rel="noopener"`; CSP
  `default-src 'self'` en `index.html`.
- Pendiente: screenshots en `public/img/`.
