// Favicon animado: semáforo que cicla rojo → amarillo → verde.
// Dibuja cada estado en un canvas de 64x64 y lo pone como <link rel=icon>.
// El SVG estático de public/ queda como respaldo (sin JS o primera pintura).
// OJO: necesita `data:` en img-src del CSP para que Chrome acepte el favicon.
const SECUENCIA = ['roja', 'amarilla', 'verde', 'amarilla']
const COLORES = {
  roja: '#ff4438',
  amarilla: '#ffcf3f',
  verde: '#3ddc5f',
  apagada: '#2a2b32',
}
const CENTROS_Y = { roja: 16, amarilla: 32, verde: 48 }

function dibujar(estado) {
  const c = document.createElement('canvas')
  c.width = 64
  c.height = 64
  const g = c.getContext('2d')
  // Carcasa.
  g.fillStyle = '#14151a'
  if (g.roundRect) {
    g.beginPath()
    g.roundRect(14, 2, 36, 60, 10)
    g.fill()
  } else {
    g.fillRect(14, 2, 36, 60)
  }
  // Luces (la encendida con halo).
  for (const [nombre, y] of Object.entries(CENTROS_Y)) {
    if (nombre === estado) {
      const halo = g.createRadialGradient(32, y, 2, 32, y, 15)
      halo.addColorStop(0, COLORES[nombre])
      halo.addColorStop(1, 'rgba(0,0,0,0)')
      g.fillStyle = halo
      g.beginPath()
      g.arc(32, y, 15, 0, 7)
      g.fill()
    }
    g.fillStyle = nombre === estado ? COLORES[nombre] : COLORES.apagada
    g.beginPath()
    g.arc(32, y, 9, 0, 7)
    g.fill()
  }
  return c.toDataURL('image/png')
}

export function iniciarFaviconSemaforo(intervaloMs = 1000) {
  try {
    let link = document.querySelector("link[rel~='icon']")
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }
    let i = 0
    const pintar = () => {
      link.type = 'image/png'
      link.href = dibujar(SECUENCIA[i % SECUENCIA.length])
      i++
    }
    pintar()
    const id = setInterval(pintar, intervaloMs)
    return () => clearInterval(id)
  } catch {
    return () => {}
  }
}
