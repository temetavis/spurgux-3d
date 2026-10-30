import { Game } from '../js/game.js'
import assert from 'node:assert'

// BFS-reitinhaku testibottia varten (kuten järkevä pelaaja kiertää seinät)
function bfsNext (g, tx, ty) {
  const W = g.w; const H = g.h
  const prev = new Map()
  const q = [[g.px, g.py]]
  const seen = new Set([g.px + ',' + g.py])
  while (q.length) {
    const [x, y] = q.shift()
    if (x === tx && y === ty) {
      let cx = x; let cy = y
      while (true) {
        const p = prev.get(cx + ',' + cy)
        if (!p) return null
        if (p[0] === g.px && p[1] === g.py) return [cx, cy]
        cx = p[0]; cy = p[1]
      }
    }
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx; const ny = y + dy
      const k = nx + ',' + ny
      if (nx < 0 || ny < 0 || nx >= W || ny >= H || seen.has(k)) continue
      if (!g.walkable(nx, ny)) continue
      seen.add(k)
      prev.set(k, [x, y])
      q.push([nx, ny])
    }
  }
  return null
}

// Simuloi järkevä pelaaja: kerää pisteet, juo kun promillet laskevat, portti auki
function simulate (steps = 600) {
  let deaths = 0
  let maxLevel = 0
  let drinks = 0
  const g = new Game(() => {}, () => { deaths++ }, () => {})
  for (let s = 0; s < steps; s++) {
    if (g.dead) { g.reset(); continue }
    maxLevel = Math.max(maxLevel, g.level)
    // taistele viereisiä vihollisia vastaan (kuten pelaaja tekisi)
    const adj = [[1, 0], [-1, 0], [0, 1], [0, -1]]
      .map(([dx, dy]) => g.actorAt(g.px + dx, g.py + dy))
      .filter(a => a && a.hp > 0 && a.def.hostile)
    if (adj.length) { g.step(adj[0].x, adj[0].y); continue }
    if (g.promille < 1.6) {
      if (g.inventory.Kalja) { g.drink('kalja'); drinks++; continue }
      if (g.inventory.Lonkero) { g.drink('lonkero'); drinks++; continue }
    }
    // Alko: osta juomia rahalla kun hengenhdässä (kuten pelaaja hädässä)
    if (g.atAlko() && g.money >= 10 && g.promille < 1.6) {
      while (g.money >= 10 && !(g.inventory.Kalja >= 2 || g.inventory.Lonkero >= 2)) {
        if (g.money >= 15 && !g.inventory.Lonkero) g.buy('lonkero')
        else if (g.money >= 10 && !g.inventory.Kalja) g.buy('kalja')
        else if (g.money >= 15) g.buy('lonkero')
        else if (g.money >= 10) g.buy('kalja')
        else break
      }
      continue
    }
    // kerää juomia reitillä ja janottaessa (kuten pelaaja)
    const booze = g.items.find(i => i.type === 'kalja' || i.type === 'lonkero' || i.type === 'konjakki')
    if (booze && g.promille < 3) {
      const nb = bfsNext(g, booze.x, booze.y)
      const pt0 = g.items.find(i => i.type === 'point')
      const np0 = pt0 ? bfsNext(g, pt0.x, pt0.y) : null
      const dB = Math.abs(booze.x - g.px) + Math.abs(booze.y - g.py)
      const dP = pt0 ? Math.abs(pt0.x - g.px) + Math.abs(pt0.y - g.py) : 1e9
      if (nb && (!np0 || dB <= dP + 6)) { g.step(nb[0], nb[1]); continue }
    }
    if (g.points >= g.pointsNeeded) {
      const n = bfsNext(g, g.gate[0], g.gate[1])
      if (n) { g.step(n[0], n[1]); continue }
    }
    const pt = g.items.find(i => i.type === 'point')
    if (pt) {
      const n = bfsNext(g, pt.x, pt.y)
      if (n) { g.step(n[0], n[1]); continue }
    }
    g.wait()
  }
  return { deaths, maxLevel, drinks }
}

const N = 20
const results = []
for (let i = 0; i < N; i++) results.push(simulate())

const avgDeaths = results.reduce((a, r) => a + r.deaths, 0) / N
const avgLevel = results.reduce((a, r) => a + r.maxLevel, 0) / N
console.log('Keskimääräiset kuolemat / 600 askelta:', avgDeaths.toFixed(2))
console.log('Keskimääräinen maksimitaso:', avgLevel.toFixed(2))

// Tasapainotavoitteet (testibotti on tahaton pelaaja — ihminen pelaa paremmin):
//  - haastava: kuolemia tapahtuu, mutta ei jatkuvasti
//  - ei ylivoimainen: edetään tasoissa
assert.ok(avgDeaths >= 0.3, `Liian helppoa? Kuolemia: ${avgDeaths}`)
assert.ok(avgDeaths <= 3.0, `Liian vaikeaa? Kuolemia: ${avgDeaths}`)
assert.ok(avgLevel >= 1.5, `Ei edetä tasoissa: ${avgLevel}`)
assert.ok(avgLevel <= 15, `Etenee epärealistisen pitkälle: ${avgLevel}`)
console.log('OK: alkoholitasapaino haastava mutta ei ylivoimainen.')
