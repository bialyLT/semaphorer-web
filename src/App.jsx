import { useEffect, useState } from 'react'
import { iniciarFaviconSemaforo } from './favicon.js'

const BASE = import.meta.env.BASE_URL

function useJson(path) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)
  useEffect(() => {
    fetch(BASE + path, { cache: 'no-store' })
      .then((r) => {
        if (!r.ok) throw new Error(r.status)
        return r.json()
      })
      .then(setData)
      .catch(() => setError(true))
  }, [path])
  return { data, error }
}

function Semaforo() {
  return (
    <div className="flex-none rounded-2xl border-2 border-linea bg-black/60 p-3" aria-hidden="true">
      <div className="flex flex-col gap-2.5">
        <span className="luz roja block h-9 w-9 rounded-full" />
        <span className="luz amarilla block h-9 w-9 rounded-full" />
        <span className="luz verde block h-9 w-9 rounded-full" />
      </div>
    </div>
  )
}

function masNueva(a, b) {
  const pa = a.split('.').map(Number)
  const pb = b.split('.').map(Number)
  for (let i = 0; i < 3; i++) {
    if ((pa[i] || 0) !== (pb[i] || 0)) return (pa[i] || 0) > (pb[i] || 0) ? a : b
  }
  return a
}

const WPP = 'https://wa.me/5493764635099?text=Hola%2C%20tengo%20una%20consulta%20sobre%20Semaphorer'

function BotonDescarga({ v, principal }) {
  if (!v) return null
  if (!v.url) {
    return (
      <span aria-disabled="true" className="inline-block cursor-not-allowed rounded-xl border border-linea bg-panel px-6 py-3 font-bold text-gris">
        Descarga pendiente de subida
      </span>
    )
  }
  return (
    <a
      href={v.url}
      rel="noopener"
      className={
        principal
          ? 'inline-block rounded-xl bg-cordon px-6 py-3 font-bold text-asfalto hover:brightness-110'
          : 'inline-block rounded-xl border border-linea bg-panel px-6 py-3 font-bold text-tinta hover:border-cordon'
      }
    >
      Descargar para {v.plataforma.startsWith('Linux') ? 'Linux' : 'Windows'} · {v.tamanio_mb} MB
    </a>
  )
}

const OFICIOS = [
  { emoji: '🧽', nombre: 'Limpiavidrios', desc: 'Seis toques con ritmo por parabrisas. La esponja y el balde pagan mejor.' },
  { emoji: '🎾', nombre: 'Malabares', desc: 'Cinco actos por función frente al auto. Buena función, buena propina.' },
  { emoji: '🥬', nombre: 'Venta ambulante', desc: 'Tres ofertas por venta, ritmo de pregón. Rápida y chica.' },
]

const REGLAS = [
  { titulo: 'El rojo es tu turno', desc: 'Trabajás con E junto al auto detenido. En verde se pierde el progreso a medias (el amable te da unos segundos de changüí).' },
  { titulo: 'Humor del conductor', desc: 'Los apurados se van si tardás, los enojados pueden no pagar y los amables dejan propina.' },
  { titulo: 'Policía y mochila', desc: 'La patrulla vigila la calzada: si te ve demasiado, decomisa lo que llevás encima. Guardá con G en la mochila azul (a salvo del decomiso, pero mirala: el ladrón la tantea).' },
  { titulo: 'Progresión', desc: 'Comprá mejoras de equipo, calle y negocio, y juntá para el pasaje a la próxima ciudad.' },
]

const CONTROLES = [
  ['WASD / flechas', 'Moverse'],
  ['Mouse', 'Mirar (click para capturar)'],
  ['E', 'Trabajar junto al auto en rojo'],
  ['Espacio', 'Saltar (subir a la vereda)'],
  ['F', 'Tienda de mejoras'],
  ['G', 'Guardar plata en la mochila azul'],
  ['I', 'Ver mochila'],
  ['V', 'Cambiar cámara'],
  ['Esc', 'Pausa'],
]

function App() {
  useEffect(() => iniciarFaviconSemaforo(), [])
  const { data: versiones } = useJson('data/versiones.json')
  const { data: releases, error: errorReleases } = useJson('data/releases.json')

  const ultima = versiones?.find((v) => v.destacado) ?? versiones?.[0]
  const ultimaVersion = versiones?.map((v) => v.version).reduce((a, b) => masNueva(a, b))
  const win = versiones?.find((v) => v.version === ultima?.version && !v.plataforma.startsWith('Linux'))
  const lin = versiones?.find((v) => v.version === ultima?.version && v.plataforma.startsWith('Linux'))

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-10 border-b border-linea bg-asfalto/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-3">
          <a href="#inicio" className="flex items-center gap-2 font-extrabold text-tinta no-underline">
            <span className="inline-block h-3 w-3 rounded-full bg-freno" aria-hidden="true" />
            Semaphorer
          </a>
          <div className="ml-auto hidden gap-5 text-gris sm:flex">
            <a className="hover:text-tinta" href="#laburo">El juego</a>
            <a className="hover:text-tinta" href="#controles">Controles</a>
            <a className="hover:text-tinta" href="#descargas">Descargas</a>
            <a className="hover:text-tinta" href="#releases">Releases</a>
            <a className="hover:text-tinta" href="#soporte">Soporte</a>
          </div>
          {ultima && <span className="rounded-md border border-linea bg-panel px-2.5 py-0.5 font-mono text-sm text-cordon">v{ultima.version}</span>}
        </div>
      </nav>

      <header id="inicio" className="mx-auto grid max-w-6xl gap-10 px-5 pb-10 pt-14 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h1 className="m-0 text-5xl font-extrabold tracking-tight md:text-6xl">Laburá en el semáforo</h1>
          <p className="mt-4 max-w-2xl text-lg text-gris">
            Limpiá vidrios, hacé malabares o vendé en un cruce latino. Cobrá en rojo,
            escondé la plata y que no te agarre la policía.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <BotonDescarga v={win} principal />
            <BotonDescarga v={lin} />
          </div>
          {ultima && (
            <p className="mt-4 font-mono text-sm text-gris">
              v{ultima.version} · {ultima.fecha}
            </p>
          )}
        </div>
        <div className="hidden items-center gap-6 md:flex">
          <Semaforo />
          <ul className="m-0 list-none space-y-3 p-0 text-gris">
            <li><strong className="text-2xl text-tinta">3</strong><br />oficios</li>
            <li><strong className="text-2xl text-tinta">4</strong><br />carriles</li>
            <li><strong className="text-2xl text-tinta">2</strong><br />plataformas</li>
          </ul>
        </div>
      </header>

      <div className="senda" aria-hidden="true" />

      <main className="mx-auto max-w-6xl px-5 pb-16">
        <section id="laburo" className="pt-12">
          <h2 className="border-l-8 border-cordon pl-3 text-3xl font-bold">Elegí tu laburo</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {OFICIOS.map((o) => (
              <article key={o.nombre} className="rounded-2xl border border-linea bg-panel p-5">
                <div className="text-4xl" aria-hidden="true">{o.emoji}</div>
                <h3 className="mb-1 mt-3 text-xl font-bold">{o.nombre}</h3>
                <p className="m-0 text-gris">{o.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="pt-12">
          <h2 className="border-l-8 border-cordon pl-3 text-3xl font-bold">Cómo se juega</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {REGLAS.map((r) => (
              <article key={r.titulo} className="rounded-2xl border border-linea bg-panel p-5">
                <h3 className="mb-1 mt-0 text-lg font-bold text-cordon">{r.titulo}</h3>
                <p className="m-0 text-gris">{r.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="controles" className="pt-12">
          <h2 className="border-l-8 border-cordon pl-3 text-3xl font-bold">Controles</h2>
          <dl className="mt-6 grid gap-x-8 gap-y-3 md:grid-cols-2">
            {CONTROLES.map(([tecla, accion]) => (
              <div key={tecla} className="flex gap-3 border-b border-linea pb-2">
                <dt className="min-w-32 font-mono font-bold text-cordon">{tecla}</dt>
                <dd className="m-0 text-gris">{accion}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="descargas" className="pt-12">
          <h2 className="border-l-8 border-cordon pl-3 text-3xl font-bold">Descargas</h2>
          {!versiones ? (
            <p className="text-gris">Cargando versiones…</p>
          ) : (
            <div className="mt-6 overflow-x-auto rounded-2xl border border-linea">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-panel text-left">
                    <th scope="col" className="px-4 py-3">Versión</th>
                    <th scope="col" className="px-4 py-3">Fecha</th>
                    <th scope="col" className="px-4 py-3">Plataforma</th>
                    <th scope="col" className="px-4 py-3">Tamaño</th>
                    <th scope="col" className="px-4 py-3">Descarga</th>
                  </tr>
                </thead>
                <tbody>
                  {versiones.map((v, i) => (
                    <tr key={v.version + v.plataforma} className={i % 2 ? 'bg-panel/50' : ''}>
                      <td className="whitespace-nowrap px-4 py-3 font-mono font-bold text-cordon">
                        v{v.version}{v.version === ultimaVersion ? ' (última)' : ''}
                      </td>
                      <td className="px-4 py-3 text-gris">{v.fecha}</td>
                      <td className="px-4 py-3">{v.plataforma}</td>
                      <td className="px-4 py-3 text-gris">{v.tamanio_mb ? `${v.tamanio_mb} MB` : '—'}</td>
                      <td className="px-4 py-3">
                        {v.url ? (
                          <a href={v.url} rel="noopener" className="text-cordon hover:underline">
                            {v.archivo}
                          </a>
                        ) : (
                          <span className="text-gris">Link pendiente de subida</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section id="releases" className="pt-12">
          <h2 className="border-l-8 border-cordon pl-3 text-3xl font-bold">Releases</h2>
          <div className="mt-6 space-y-3">
            {errorReleases && <p className="text-gris">No se pudo cargar el historial de releases.</p>}
            {!releases && !errorReleases && <p className="text-gris">Cargando historial…</p>}
            {releases?.map((r, i) => (
              <details key={r.version} open={i === 0} className="rounded-2xl border border-linea bg-panel px-5 py-3">
                <summary className="cursor-pointer font-bold">
                  v{r.version} <span className="ml-2 font-normal text-gris">{r.fecha}</span>
                </summary>
                <ul className="mb-2 mt-3 space-y-2 pl-5 text-gris">
                  {(r.cambios ?? []).map((c, j) => (
                    <li key={j}>
                      <span className="mr-2 rounded-md border border-linea px-2 py-0.5 text-xs">{c.tipo}</span>
                      {c.texto}
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </section>

        <section className="pt-12">
          <h2 className="border-l-8 border-cordon pl-3 text-3xl font-bold">La música</h2>
          <p className="mt-4 max-w-2xl text-gris">
            Tema del menú, generado para el juego. En la partida suena otro con más ritmo.
          </p>
          <audio controls preload="none" src={`${BASE}audio/musica_menu.wav`} className="mt-3" />
        </section>

        <section id="soporte" className="pt-12">
          <h2 className="border-l-8 border-cordon pl-3 text-3xl font-bold">Soporte</h2>
          <p className="mt-4 max-w-2xl text-gris">
            ¿El juego no arranca, encontraste un bug o tenés una idea? Escribime
            por WhatsApp y lo vemos.
          </p>
          <a
            href={WPP}
            target="_blank"
            rel="noopener"
            className="mt-4 inline-block rounded-xl bg-hierba px-6 py-3 font-bold text-asfalto hover:brightness-110"
          >
            Hablar por WhatsApp
          </a>
        </section>
      </main>

      <footer className="border-t border-dashed border-linea">
        <div className="mx-auto max-w-6xl px-5 py-6 text-gris">
          Semaphorer, hecho con Godot.
          {ultima && <> Versión actual: v{ultima.version}.</>}
          {' '}Código del juego en <a className="text-cordon hover:underline" href="https://github.com/bialyLT/semaphorer" target="_blank" rel="noopener">GitHub</a>.
        </div>
      </footer>
    </div>
  )
}

export default App
