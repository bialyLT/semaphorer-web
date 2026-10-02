"use strict";

/* Renderiza versiones y releases desde data/*.json usando solo texto
   (nada de HTML inyectado): los JSON son la única fuente de contenido. */

async function cargarJSON(ruta) {
  const r = await fetch(ruta, { cache: "no-store" });
  if (!r.ok) throw new Error("HTTP " + r.status + " en " + ruta);
  return r.json();
}

function texto(el, s) {
  el.textContent = s == null ? "" : String(s);
  return el;
}

function celda(fila, s) {
  const td = document.createElement("td");
  return fila.appendChild(texto(td, s));
}

function linkDescarga(v) {
  const a = document.createElement("a");
  if (v.url) {
    a.href = v.url;
    a.rel = "noopener";
    texto(a, "Descargar " + v.archivo);
  } else {
    a.href = "#descargas";
    a.setAttribute("aria-disabled", "true");
    texto(a, "Link pendiente de subida");
  }
  return a;
}

async function renderVersiones() {
  const estado = document.getElementById("descargas-estado");
  try {
    const versiones = await cargarJSON("data/versiones.json");
    const tabla = document.getElementById("tabla-versiones");
    const cuerpo = tabla.querySelector("tbody");
    const conLink = versiones.filter((v) => v.url);
    const destacada = versiones.find((v) => v.destacado) || versiones[0];

    for (const v of versiones) {
      const tr = document.createElement("tr");
      const th = document.createElement("th");
      th.scope = "row";
      tr.appendChild(texto(th, "v" + v.version + (v.destacado ? " (última)" : "")));
      celda(tr, v.fecha);
      celda(tr, v.plataforma);
      celda(tr, v.tamanio_mb ? v.tamanio_mb + " MB" : "—");
      const td = document.createElement("td");
      td.appendChild(linkDescarga(v));
      tr.appendChild(td);
      cuerpo.appendChild(tr);
    }
    tabla.hidden = false;
    texto(estado, conLink.length + " de " + versiones.length + " versiones con descarga disponible.");

    texto(document.getElementById("version-actual"), "v" + destacada.version);
    texto(document.getElementById("version-pie"), "Versión actual: v" + destacada.version + ".");
    const boton = document.getElementById("boton-descargar");
    if (destacada.url) {
      boton.href = destacada.url;
      boton.rel = "noopener";
      texto(boton, "Descargar v" + destacada.version + " para Windows");
    } else {
      boton.setAttribute("aria-disabled", "true");
      texto(boton, "Descarga pendiente de subida (v" + destacada.version + ")");
    }
  } catch (e) {
    texto(estado, "No se pudieron cargar las versiones. Si abrís el archivo directo, probá con: python3 -m http.server");
  }
}

async function renderReleases() {
  const estado = document.getElementById("releases-estado");
  try {
    const releases = await cargarJSON("data/releases.json");
    const lista = document.getElementById("lista-releases");
    for (const r of releases) {
      const det = document.createElement("details");
      if (r === releases[0]) det.open = true;
      const sum = document.createElement("summary");
      texto(sum, "v" + r.version);
      const fecha = document.createElement("span");
      fecha.className = "fecha";
      sum.appendChild(texto(fecha, r.fecha));
      det.appendChild(sum);
      const ul = document.createElement("ul");
      for (const c of r.cambios || []) {
        const li = document.createElement("li");
        const tag = document.createElement("span");
        tag.className = "tag";
        li.appendChild(texto(tag, c.tipo));
        li.appendChild(document.createTextNode(c.texto));
        ul.appendChild(li);
      }
      det.appendChild(ul);
      lista.appendChild(det);
    }
    estado.remove();
  } catch (e) {
    texto(estado, "No se pudo cargar el historial de releases.");
  }
}

renderVersiones();
renderReleases();
