import { Game } from '../js/game.js'
import assert from 'node:assert'

const logs = []
const log = m => logs.push(m)
let deathCount = 0
let winCount = 0
const g = new Game(log, () => deathCount++, () => winCount++)

// tason generointi
assert.ok(g.w >= 18 && g.h >= 13, 'tason koko')
assert.ok(g.pointsNeeded > 0, 'pisteitä löytyy')
assert.ok(g.actors.length >= 6, 'olioita löytyy')
assert.ok(g.items.some(i => i.type === 'point'), 'piste-esineitä')

// kulku
const sx = g.px; const sy = g.py
g.step(sx + 1, sy)
assert.ok(g.px === sx + 1 || logs.length > 0, 'liikkuminen toimii')

// taistelu: luo olento viereen
const a = { x: g.px + 1, y: g.py, type: 'kake', hp: 4, def: { hp: 4, speed: 1, hostile: false }, cd: 0 }
g.actors.push(a)
g.step(g.px + 1, g.py)
assert.ok(a.hp < 4, 'hyökkäys vahingoittaa')

// alkoholitasapaino
const before = g.promille
g.drink('kalja')
assert.ok(g.promille >= before, 'juominen nostaa promilleja')

// kuolema krapulaan: nollaa promilleet ja odota
g._promille = 0.5
g.hp = 2
for (let i = 0; i < 60; i++) { if (g.dead) break; g.wait() }
assert.ok(g.dead === true, 'krapula tappaa matalilla promilleilla')
assert.ok(logs.some(l => l.includes('Kankkunen')), 'krapulaviesti')

console.log('OK: pelilogiikan testit läpi. Kuolemat:', deathCount, 'Voitot:', winCount, 'Viestit:', logs.length)
