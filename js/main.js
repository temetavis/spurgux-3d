import * as THREE from 'three'
import { Game, SPECS } from './game.js'
import { MSG, TIPS } from './messages.js'

const TILE = 1
const WALL_H = 1.6

const logEl = document.getElementById('log')
const statusEl = document.getElementById('status')
const invEl = document.getElementById('inv')
const gameoverEl = document.getElementById('gameover')
const goTitle = document.getElementById('go-title')
const goText = document.getElementById('go-text')

const logLines = []
function log (msg) {
  logLines.push(msg)
  while (logLines.length > 7) logLines.shift()
  logEl.innerHTML = logLines.map(l => `<div>${l}</div>`).join('')
}

// --- three.js ---
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x0b0e14)
scene.fog = new THREE.Fog(0x0b0e14, 8, 26)
const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 200)
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
document.body.appendChild(renderer.domElement)

const amb = new THREE.AmbientLight(0x888899, 0.7)
scene.add(amb)
const moon = new THREE.DirectionalLight(0xaabbdd, 0.8)
moon.position.set(5, 12, 3)
scene.add(moon)

const groundMat = new THREE.MeshLambertMaterial({ color: 0x3a3f46 })
const wallMat = new THREE.MeshLambertMaterial({ color: 0x705a48 })
const pointMat = new THREE.MeshBasicMaterial({ color: 0x00ff44 })
const graveMat = new THREE.MeshLambertMaterial({ color: 0x666677 })
const gateMat = new THREE.MeshBasicMaterial({ color: 0xffcc00 })

const MOB_COLORS = {
  poliisi: 0x3366cc, mummo: 0xcc99aa, kake: 0x886644, teekkari: 0x99ccff,
  varas: 0x554433, punkkari: 0x222222, kingi: 0x111111, pirkko: 0xff6600,
  koira: 0x887755, gorilla: 0x332211, neekeri: 0x553322, aids: 0xff3377,
  trokari: 0x88ff88, skin: 0xdddddd, pappi: 0x333333, hippie: 0x66ff66,
  juppi: 0x66ccdd, vanki: 0x777777, kaarme: 0x44aa44, ghost: 0x99aaff
}
const MOB_LABELS = {
  poliisi: 'Poliisi', mummo: 'Mummo', kake: 'Kake', teekkari: 'Teekkari',
  varas: 'Taskuvaras', punkkari: 'Punkkari', kingi: 'Punkkarikingi',
  pirkko: 'Pistepirkko', koira: 'Koira', gorilla: 'Gorilla',
  neekeri: 'Neekeri', aids: 'Sven-Olof', trokari: 'Trokari',
  skin: 'Skinhead', pappi: 'Pappi', hippie: 'Hippi', juppi: 'Juppi',
  vanki: 'Vankikarkuri', kaarme: 'Käärme', ghost: 'Aave'
}

const ITEM_COLORS = {
  point: 0x00ff44, kalja: 0x33ff33, lonkero: 0xffff33, konjakki: 0xcc5522,
  hennessy: 0xffaa00, makkara: 0xcc3333, omena: 0x33cc33, suklaa: 0x663311,
  raha: 0xffdd00, pamppu: 0x335577, stiletti: 0xaadddd, ketjut: 0x999999,
  haalarit: 0x3377ff, boots: 0xcc8833
}
const ITEM_LABELS = {
  kalja: 'Kalja', lonkero: 'Lonkero', konjakki: 'Konjakki',
  hennessy: 'Hennessy-konjakkipullo!', makkara: 'Makkara', omena: 'Omena',
  suklaa: 'Suklaa', raha: 'Rahaa', pamppu: 'Pamppu', stiletti: 'Stiletti',
  ketjut: 'Ketjut', haalarit: 'Haalarit', boots: 'Camel-bootsit'
}

let game = null
let tilesGroup = null
let mobGroup = null
let itemGroup = null
let playerMesh = null
let hoverMesh = null
const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()
const floorGeo = new THREE.PlaneGeometry(TILE, TILE)
const wallGeo = new THREE.BoxGeometry(TILE, WALL_H, TILE)
const markerGeo = new THREE.RingGeometry(0.28, 0.42, 24)
const mobGeo = new THREE.CapsuleGeometry(0.22, 0.5, 4, 8)
const itemGeo = { }
for (const t of Object.keys(ITEM_COLORS)) {
  itemGeo[t] = t === 'point'
    ? new THREE.SphereGeometry(0.12, 8, 6)
    : new THREE.BoxGeometry(0.2, 0.3, 0.2)
}
const graveGeo = new THREE.BoxGeometry(0.6, 0.7, 0.15)

function clearGroup (g) {
  if (!g) return
  while (g.children.length) {
    const c = g.children.pop()
    if (c.geometry && !c.userData.shared) c.geometry.dispose?.()
  }
  scene.remove(g)
}

function buildLevel () {
  clearGroup(tilesGroup); clearGroup(mobGroup); clearGroup(itemGroup)
  tilesGroup = new THREE.Group(); mobGroup = new THREE.Group(); itemGroup = new THREE.Group()
  scene.add(tilesGroup); scene.add(mobGroup); scene.add(itemGroup)

  const gw = game.w * TILE; const gh = game.h * TILE
  const base = new THREE.Mesh(new THREE.PlaneGeometry(gw, gh), groundMat)
  base.rotation.x = -Math.PI / 2
  base.position.set(gw / 2 - TILE / 2, 0, gh / 2 - TILE / 2)
  tilesGroup.add(base)

  for (let y = 0; y < game.h; y++) {
    for (let x = 0; x < game.w; x++) {
      const c = game.grid[y][x]
      if (c === 'wall') {
        const m = new THREE.Mesh(wallGeo, wallMat)
        m.position.set(x * TILE, WALL_H / 2, y * TILE)
        tilesGroup.add(m)
      } else if (c === 'gate') {
        const m = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.2, 0.15), gateMat)
        m.position.set(x * TILE, 0.6, y * TILE)
        m.rotation.y = 0.5
        tilesGroup.add(m)
        const pad = new THREE.Mesh(floorGeo, new THREE.MeshBasicMaterial({ color: 0x553300 }))
        pad.rotation.x = -Math.PI / 2
        pad.position.set(x * TILE, 0.02, y * TILE)
        tilesGroup.add(pad)
      } else if (c === 'alko') {
        const pad = new THREE.Mesh(floorGeo, new THREE.MeshBasicMaterial({ color: 0x004488 }))
        pad.rotation.x = -Math.PI / 2
        pad.position.set(x * TILE, 0.02, y * TILE)
        tilesGroup.add(pad)
        const box = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.0, 0.7), new THREE.MeshLambertMaterial({ color: 0x003366 }))
        box.position.set(x * TILE, 0.5, y * TILE)
        tilesGroup.add(box)
        const sign = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.2, 0.1), new THREE.MeshBasicMaterial({ color: 0x66ccff }))
        sign.position.set(x * TILE, 0.9, y * TILE + 0.35)
        tilesGroup.add(sign)
      } else if (c === 'grave') {
        const m = new THREE.Mesh(graveGeo, graveMat)
        m.position.set(x * TILE, 0.35, y * TILE)
        m.rotation.y = (x * 7 + y * 13) % 3 * 0.5 - 0.5
        tilesGroup.add(m)
        const pad = new THREE.Mesh(floorGeo, new THREE.MeshLambertMaterial({ color: 0x2a3328 }))
        pad.rotation.x = -Math.PI / 2
        pad.position.set(x * TILE, 0.02, y * TILE)
        tilesGroup.add(pad)
      }
    }
  }
  // esineet
  for (const it of game.items) {
    const geo = itemGeo[it.type] || itemGeo.point
    const mat = new THREE.MeshLambertMaterial({ color: ITEM_COLORS[it.type] || 0xffffff })
    const m = new THREE.Mesh(geo, mat)
    m.position.set(it.x * TILE, it.type === 'point' ? 0.15 : 0.18, it.y * TILE)
    m.userData = { kind: 'item', x: it.x, y: it.y, type: it.type }
    itemGroup.add(m)
  }
  // oliot
  for (const a of game.actors) {
    if (a.hp <= 0) continue
    const mat = new THREE.MeshLambertMaterial({ color: MOB_COLORS[a.type] || 0xffffff, transparent: a.type === 'ghost', opacity: a.type === 'ghost' ? 0.35 : 1 })
    const m = new THREE.Mesh(mobGeo, mat)
    m.position.set(a.x * TILE, 0.6, a.y * TILE)
    m.userData = { kind: 'mob', actor: a }
    mobGroup.add(m)
    mobGroup.userData = mobGroup.userData || {}
  }
  // pelaaja
  if (playerMesh) scene.remove(playerMesh)
  playerMesh = new THREE.Mesh(mobGeo, new THREE.MeshLambertMaterial({ color: 0xff2222 }))
  playerMesh.position.set(game.px * TILE, 0.6, game.py * TILE)
  scene.add(playerMesh)
  // hover-merkki
  if (!hoverMesh) {
    hoverMesh = new THREE.Mesh(markerGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }))
    hoverMesh.rotation.x = -Math.PI / 2
    scene.add(hoverMesh)
  }
}

function syncActors () {
  if (!mobGroup) return
  // poista kuolleet
  for (let i = mobGroup.children.length - 1; i >= 0; i--) {
    const m = mobGroup.children[i]
    if (m.userData.actor && m.userData.actor.hp <= 0) mobGroup.remove(m)
  }
  for (const m of mobGroup.children) {
    const a = m.userData.actor
    if (a) m.position.set(a.x * TILE, 0.6, a.y * TILE)
  }
  // esineiden päivitys
  if (itemGroup) {
    for (let i = itemGroup.children.length - 1; i >= 0; i--) {
      const m = itemGroup.children[i]
      const idx = game.items.findIndex(it => it.x === m.userData.x && it.y === m.userData.y && it.type === m.userData.type)
      if (idx < 0) itemGroup.remove(m)
    }
  }
  playerMesh.position.set(game.px * TILE, 0.6, game.py * TILE)
}

function updateHUD () {
  statusEl.textContent = game.statusText()
  invEl.textContent = game.inventoryText()
}

let hallucinating = false
function updateDrunkFx () {
  const p = game.promille
  // huikainen näkö yli 4 promillen
  scene.fog.near = p > 4 ? 8 - (p - 4) : 8
  scene.fog.far = p > 4 ? 26 - (p - 4) * 4 : 26
  if (p > 4 && !hallucinating) {
    hallucinating = true
    if (Math.random() < 0.3) log(MSG.strange)
  } else if (p <= 4) hallucinating = false
}

function startGame (name) {
  game = new Game(log, onDeath, onWin)
  game.name = name || 'Pate'
  game.log(`Kerropa nimesi ... ${game.name}${MSG.welcomeName}`)
  buildLevel()
  updateHUD()
  document.getElementById('start').classList.add('hidden')
  gameoverEl.classList.add('hidden')
  log(`Taso 1. ${MSG.hik}`)
  // satunnainen vihje
  if (Math.random() < 0.5) log(TIPS[Math.floor(Math.random() * TIPS.length)])
}

function onDeath () {
  goTitle.textContent = 'SAIRAALA'
  goText.textContent = `${game.name}${MSG.diedOnLevel}${game.level}. ${MSG.hangover}`
  gameoverEl.classList.remove('hidden')
}

function onWin () {
  goTitle.textContent = 'ONNITTELUT!'
  goText.textContent = `Löysit konjakkipullon tasolla ${game.level}! ${MSG.congrats}`
  gameoverEl.classList.remove('hidden')
}

// --- hiiriohjaus ---
function cellFromEvent (ev) {
  pointer.x = (ev.clientX / innerWidth) * 2 - 1
  pointer.y = -(ev.clientY / innerHeight) * 2 + 1
  raycaster.setFromCamera(pointer, camera)
  const targets = []
  if (tilesGroup) targets.push(...tilesGroup.children)
  if (itemGroup) targets.push(...itemGroup.children)
  if (mobGroup) targets.push(...mobGroup.children)
  const hits = raycaster.intersectObjects(targets, false)
  if (!hits.length) return null
  const h = hits[0]
  let cx = null; let cy = null
  if (h.object.userData.kind === 'mob') {
    cx = h.object.userData.actor.x; cy = h.object.userData.actor.y
  } else if (h.object.userData.kind === 'item') {
    cx = h.object.userData.x; cy = h.object.userData.y
  } else {
    cx = Math.round(h.point.x / TILE)
    cy = Math.round(h.point.z / TILE)
  }
  if (cx === null || cy === null) return null
  if (cx < 0 || cy < 0 || cx >= game.w || cy >= game.h) return null
  return { x: cx, y: cy }
}

renderer.domElement.addEventListener('mousemove', (ev) => {
  if (!game || game.dead || game.won) return
  const c = cellFromEvent(ev)
  if (c) {
    hoverMesh.visible = true
    hoverMesh.position.set(c.x * TILE, 0.05, c.y * TILE)
    const a = game.actorAt(c.x, c.y)
    if (a) {
      hoverMesh.material.color.setHex(0xff3333)
      const spec = SPECS[a.type] || SPECS[({ poliisi: 'C', mummo: 'M', kake: 'K', teekkari: 'T', varas: 'V', punkkari: 'P', pirkko: 'B', koira: 'D', gorilla: 'G', aids: 'H', trokari: 'Q', skin: 'O', pappi: 'R', hippie: 'I', juppi: 'J', vanki: 'E', kaarme: 'S', ghost: ' ', kingi: 'P' })[a.type]]
      hoverMesh.userData.tip = `${MOB_LABELS[a.type]} (${a.hp} hp) — ${spec || ''}`
    } else {
      hoverMesh.material.color.setHex(0xffffff)
      const it = game.items.find(i => i.x === c.x && i.y === c.y)
      hoverMesh.userData.tip = it && it.type !== 'point' ? ITEM_LABELS[it.type] : ''
    const tipEl = document.getElementById('tip')
    if (tipEl) {
      tipEl.textContent = hoverMesh.userData.tip || ''
      tipEl.style.left = (ev.clientX + 14) + 'px'
      tipEl.style.top = (ev.clientY + 14) + 'px'
    }
    }
  } else hoverMesh.visible = false
})

renderer.domElement.addEventListener('contextmenu', (ev) => {
  ev.preventDefault()
  if (!game || game.dead || game.won) return
  const c = cellFromEvent(ev)
  if (c) { game.wait(); afterTurn() }
})

renderer.domElement.addEventListener('click', (ev) => {
  if (!game || game.dead || game.won) return
  const c = cellFromEvent(ev)
  if (!c) return
  const dist = Math.abs(c.x - game.px) + Math.abs(c.y - game.py)
  if (dist === 0) { game.wait(); afterTurn(); return }
  if (dist > 1) {
    // kävely kohderuutuun: askel kerrallaan, yksi klikkaus = yksi askel
    // mutta kaukainen klikkaus liikuttaa yhden askeleen kohti
    game.step(c.x, c.y)
  } else {
    const a = game.actorAt(c.x, c.y)
    game.step(c.x, c.y)
    if (!a) { /* liiku */ }
  }
  afterTurn()
})

function afterTurn () {
  syncActors()
  updateHUD()
  updateDrunkFx()
}

// --- näppäimet ---
addEventListener('keydown', (ev) => {
  if (!game || game.dead || game.won) return
  switch (ev.key) {
    case 'q': game.drink('kalja'); break
    case 'b': game.drink('lonkero'); break
    case 'e': game.eat(); break
    case '.': case 'Delete': game.wait(); break
    case 'h': case 'H': case 'ArrowLeft': game.step(game.px - 1, game.py); break
    case 'l': case 'L': case 'ArrowRight': game.step(game.px + 1, game.py); break
    case 'k': case 'K': case 'ArrowUp': game.step(game.px, game.py - 1); break
    case 'j': case 'J': case 'ArrowDown': game.step(game.px, game.py + 1); break
    case 'y': case 'Y': game.step(game.px - 1, game.py - 1); break
    case 'u': case 'U': game.step(game.px + 1, game.py - 1); break
    case 'n': case 'N': game.step(game.px + 1, game.py + 1); break
    case 'B': game.step(game.px - 1, game.py + 1); break
    default: return
  }
  afterTurn()
  ev.preventDefault()
})

document.getElementById('btn-beer').addEventListener('click', () => { if (game && !game.dead && !game.won) { game.drink('kalja'); afterTurn() } })
document.getElementById('btn-lonkka').addEventListener('click', () => { if (game && !game.dead && !game.won) { game.drink('lonkero'); afterTurn() } })
document.getElementById('btn-eat').addEventListener('click', () => { if (game && !game.dead && !game.won) { game.eat(); afterTurn() } })
document.getElementById('btn-wait').addEventListener('click', () => { if (game && !game.dead && !game.won) { game.wait(); afterTurn() } })
document.getElementById('btn-buy-beer').addEventListener('click', () => { if (game && !game.dead && !game.won) { game.buy('kalja'); afterTurn() } })
document.getElementById('btn-buy-lonkka').addEventListener('click', () => { if (game && !game.dead && !game.won) { game.buy('lonkero'); afterTurn() } })
document.getElementById('btn-start').addEventListener('click', () => {
  const n = document.getElementById('name').value.trim() || 'Pate'
  startGame(n)
})
document.getElementById('btn-again').addEventListener('click', () => startGame(game.name))

// --- animaatiosilmukka ---
const clock = new THREE.Clock()
let camAngle = 0
function animate () {
  requestAnimationFrame(animate)
  const t = clock.getElapsedTime()
  if (game && playerMesh) {
    // kamera seuraa pelaajaa kevyesti ylhäältä
    const px = game.px * TILE; const py = game.py * TILE
    const drunk = game.promille > 4
    const sway = drunk ? Math.sin(t * 1.7) * 0.35 : 0
    camAngle += 0.002
    const r = 7
    camera.position.set(
      px + Math.cos(camAngle) * 0.0 + sway,
      6.5,
      py + r + Math.sin(t * 0.9) * (drunk ? 0.5 : 0)
    )
    camera.lookAt(px, 0, py)
    // kohteiden pyöriminen
    if (itemGroup) {
      for (const m of itemGroup.children) {
        if (m.userData.type === 'point') m.position.y = 0.15 + Math.sin(t * 3 + m.userData.x) * 0.04
      }
    }
  }
  renderer.render(scene, camera)
}

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(innerWidth, innerHeight)
})

// otsikkoalku
document.getElementById('go-title').textContent = ''
animate()
