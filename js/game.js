import { MSG, HITS, DEATHS, HURTS, GOSSIP } from './messages.js'

export const CHAR = {
  '@': 'player', '█': 'wall', '.': 'point', '>': 'gate', '±': 'grave',
  'C': 'poliisi', 'M': 'mummo', 'K': 'kake', 'T': 'teekkari', 'V': 'varas',
  'P': 'punkkari', 'Ñ': 'kingi', 'B': 'pirkko', 'D': 'koira', 'G': 'gorilla',
  'N': 'neekeri', 'H': 'aids', 'Q': 'trokari', 'O': 'skin', 'R': 'pappi',
  'I': 'hippie', 'J': 'juppi', 'E': 'vanki', 'S': 'kaarme', ' ': 'ghost',
  '%': 'kalja', '&': 'lonkero', 'Þ': 'konjakki', '(': 'makkara', 'o': 'omena',
  'ý': 'suklaa', '$': 'raha', '!': 'pamppu', '\\': 'stiletti', 'ß': 'ketjut',
  'õ': 'haalarit', 'Ú': 'boots', 'ú': 'äpy', 'i': 'items'
}

export const NAME = {
  player: '@', wall: '█', point: '.', gate: '>', grave: '±', poliisi: 'C',
  mummo: 'M', kake: 'K', teekkari: 'T', varas: 'V', punkkari: 'P', kingi: 'Ñ',
  pirkko: 'B', koira: 'D', gorilla: 'G', neekeri: 'N', aids: 'H', trokari: 'Q',
  skin: 'O', pappi: 'R', hippie: 'I', juppi: 'J', vanki: 'E', kaarme: 'S',
  ghost: ' ', kalja: '%', lonkero: '&', konjakki: 'Þ', makkara: '(',
  omena: 'o', suklaa: 'ý', raha: '$', pamppu: '!', stiletti: '\\',
  ketjut: 'ß', haalarit: 'õ', boots: 'Ú', äpy: 'ú'
}

// Kohdeluettelo (SPU.SPE:stä)
export const SPECS = {
  ' ': 'Mörkö tai aave tai kummitus tai haamu tai ...',
  M: 'Mummeli, yleensä vaaraton. (Sillä on rahaa!)',
  C: 'Poliisi eli lainvartija, hyökkää pamppuineen kimppuusi, jos rikot lakia.',
  K: 'Kake on vanha kaverisi rippikouluajoilta.',
  T: 'Tekniikan yo (todennäköisesti fyysikko), joka kauppaa äpyä.',
  V: 'Kavala taskuvaras, joka koittaa rosvota vaivaiset säästösi.',
  P: 'Punkkari, äärimmäisen vaarallinen epäsosiaalinen yksilö. Ñ on kingi.',
  B: 'Pisteennielijä (pirullinen otus!).',
  D: 'Vesikauhuinen rakki.',
  'Û': 'Portinvartija, tosin lahjottavissa oleva sellainen.',
  G: 'Eläintarhasta karannut gorilla.',
  N: 'Neekeri (vaikkei tämä mikään rasistipeli olekaan).',
  H: 'Hinttaripoika Sven-Olof.',
  Q: 'Trokari, jolta saa pimeitä pulloja.',
  O: 'Skinhead (Pulipää - suom. huom.).',
  R: 'Paikallinen pappi.',
  I: 'Pilveä poltteleva pitkätukka eli hippi.',
  J: 'LaCoste:n varatoimitusjohtaja.',
  E: 'Vaarallinen vankikarkuri.',
  S: 'Vaarallinen käärme.',
  A: 'AIDS-testissä positiivisen tuloksen saanut Sven-Olof.',
  '(': 'HK:n sininen.',
  '!': 'Poliisin pamppu.',
  '\\': 'Jokin teräase.',
  '%': 'Hylätty olutpullo.',
  '&': 'Yksinäinen lonkero.',
  $: 'No rahaa tietenkin.',
  o: 'Olli Omena.',
  '.': 'Lue ohjeet (paina ?).',
  '>': 'Portti seuraavalle tasolle.'
}

export const ITEMS = [
  ['Haalarit', 0], ['Camel-bootsit', 0], ['Pamppu', 0], ['Stiletti', 0],
  ['Ketjut', 0], ['Äpy', 0], ['Makkara', 0], ['Omena', 0], ['Suklaa', 0],
  ['Lonkero', 0], ['Kalja', 0], ['Konjakki', 0]
]

export function rnd (n) { return Math.floor(Math.random() * n) }
export function pick (arr) { return arr[rnd(arr.length)] }

const MOBS = {
  poliisi: { hp: 8, speed: 1, hostile: true, dmg: [1, 3] },
  mummo: { hp: 2, speed: 1, hostile: false, money: [15, 50] },
  kake: { hp: 4, speed: 1, hostile: false },
  teekkari: { hp: 4, speed: 1, hostile: false },
  varas: { hp: 3, speed: 1, hostile: true, steals: true, dmg: [1, 2] },
  punkkari: { hp: 5, speed: 1, hostile: true, dmg: [1, 4] },
  kingi: { hp: 12, speed: 1, hostile: true, dmg: [2, 6], drops: 'ketjut' },
  pirkko: { hp: 6, speed: 1, hostile: false, eatsPoints: true },
  koira: { hp: 3, speed: 2, hostile: true, dmg: [1, 2] },
  gorilla: { hp: 14, speed: 0, hostile: true, dmg: [2, 6] },
  neekeri: { hp: 4, speed: 1, hostile: false, dodge: true },
  aids: { hp: 5, speed: 1, hostile: true, infects: true, dmg: [1, 3] },
  trokari: { hp: 5, speed: 1, hostile: false, sells: true },
  skin: { hp: 6, speed: 1, hostile: true, dmg: [1, 5] },
  pappi: { hp: 6, speed: 1, hostile: false, preaches: true },
  hippie: { hp: 4, speed: 1, hostile: true, needle: true, dmg: [1, 2] },
  juppi: { hp: 5, speed: 1, hostile: false, boast: true },
  vanki: { hp: 8, speed: 1, hostile: true, dmg: [1, 4] },
  kaarme: { hp: 3, speed: 1, hostile: true, poison: true, dmg: [1, 2] },
  ghost: { hp: 4, speed: 1, hostile: true, invisible: true, dmg: [1, 2] }
}

const WEAPON_DMG = { fist: [1, 2], pamppu: [2, 5], stiletti: [2, 6], ketjut: [3, 9] }
const WEAPON_ORDER = ['ketjut', 'stiletti', 'pamppu', 'fist']

export class Game {
  constructor (log, onDeath, onWin) {
    this.log = log
    this.onDeath = onDeath
    this.onWin = onWin
    this.name = 'Pate'
    this.reset()
  }

  reset () {
    this._promille = 3.0
    this.level = 1
    this.hp = 40
    this.maxHp = 40
    this.money = 0
    this.armor = 0
    this.points = 0
    this.pointsTotal = 0
    this.pointsNeeded = 0
    this.kills = 0
    this.aids = false
    this.dead = false
    this.won = false
    this.inventory = { Lonkero: 2, Kalja: 2, Makkara: 1 }
    this.weapon = 'fist'
    this.pendingKonjakki = false
    this._promille = 2.8
    this.genLevel()
    this.log(`Taso ${this.level}. ${MSG.hik}`)
  }

  genLevel () {
    const W = 18 + Math.min(10, Math.floor(this.level / 2))
    const H = 13 + Math.min(7, Math.floor(this.level / 3))
    this.w = W; this.h = H
    const g = []
    for (let y = 0; y < H; y++) {
      const row = []
      for (let x = 0; x < W; x++) {
        if (x === 0 || y === 0 || x === W - 1 || y === H - 1) row.push('wall')
        else row.push('empty')
      }
      g.push(row)
    }
    // seiniä/sokkeloita
    const nWalls = W * H * 0.10
    for (let i = 0; i < nWalls; i++) {
      const x = 2 + rnd(W - 4); const y = 2 + rnd(H - 4)
      if (g[y][x] === 'empty') {
        const len = 2 + rnd(5)
        const horiz = Math.random() < 0.5
        for (let j = 0; j < len; j++) {
          const xx = horiz ? x + j : x; const yy = horiz ? y : y + j
          if (xx > 0 && yy > 0 && xx < W - 1 && yy < H - 1) g[yy][xx] = 'wall'
        }
      }
    }
    this.grid = g

    // pelaajan lähtöruutu
    let p0 = null
    for (let y = 1; y < H - 1 && !p0; y++) {
      for (let x = 1; x < W - 1; x++) {
        if (g[y][x] === 'empty') { p0 = [x, y]; break }
      }
    }
    this.px = p0[0]; this.py = p0[1]

    // vain pelaajasta saavutettavat ruudut käyvät (ei jumiutumista eristyksiin)
    const seen = new Set([`${p0[0]},${p0[1]}`])
    const q = [[p0[0], p0[1]]]
    while (q.length) {
      const [x, y] = q.shift()
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx; const ny = y + dy
        const k = `${nx},${ny}`
        if (nx < 0 || ny < 0 || nx >= W || ny >= H || seen.has(k)) continue
        if (g[ny][nx] === 'wall') continue
        seen.add(k); q.push([nx, ny])
      }
    }
    this.actors = []
    this.items = []
    this.free = []
    for (let y = 1; y < H - 1; y++) {
      for (let x = 1; x < W - 1; x++) {
        if (g[y][x] === 'empty' && seen.has(`${x},${y}`)) this.free.push([x, y])
      }
    }
    const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); const t = a[i]; a[i] = a[j]; a[j] = t } return a }
    shuffle(this.free)

    // portti
    const gate = this.free.pop()
    this.grid[gate[1]][gate[0]] = 'gate'
    this.gate = gate

    // hauta
    for (let i = 0; i < 3 + rnd(3); i++) {
      const s = this.free.pop()
      if (s) this.grid[s[1]][s[0]] = 'grave'
    }

    // Alko (juomien osto rahalla)
    const alko = this.free.pop()
    if (alko) this.grid[alko[1]][alko[0]] = 'alko'
    this.alko = alko

    // pisteet
    const nPts = 6 + Math.floor(this.level * 1.2)
    for (let i = 0; i < nPts && this.free.length; i++) {
      const s = this.free.pop()
      this.items.push({ x: s[0], y: s[1], type: 'point' })
    }
    this.pointsNeeded = nPts
    this.points = 0

    // esineet
    const dropTypes = ['kalja', 'lonkero', 'konjakki', 'makkara', 'omena', 'suklaa', 'raha', 'pamppu', 'stiletti', 'haalarit', 'boots']
    const weights = [36, 28, 6, 9, 5, 5, 8, 3, 3, 2, 2]
    const total = weights.reduce((a, b) => a + b, 0)
    const nItems = 10 + rnd(6)
    for (let i = 0; i < nItems && this.free.length; i++) {
      let r = rnd(total); let t = dropTypes[0]
      for (let j = 0; j < weights.length; j++) { r -= weights[j]; if (r < 0) { t = dropTypes[j]; break } }
      const s = this.free.pop()
      this.items.push({ x: s[0], y: s[1], type: t })
    }
    // konjakki tasolla 50
    if (this.level >= 50) {
      const s = this.free.pop()
      if (s) this.items.push({ x: s[0], y: s[1], type: 'hennessy' })
    }

    // oliot
    const mobTypes = ['mummo', 'kake', 'teekkari', 'varas', 'punkkari', 'pirkko', 'koira', 'gorilla', 'neekeri', 'aids', 'trokari', 'skin', 'pappi', 'hippie', 'juppi', 'vanki', 'kaarme', 'ghost', 'poliisi']
    const nMobs = 6 + Math.min(14, Math.floor(this.level * 1.2))
    for (let i = 0; i < nMobs && this.free.length; i++) {
      const t = mobTypes[(this.level + i * 7 + rnd(mobTypes.length)) % mobTypes.length]
      const s = this.free.pop()
      const def = MOBS[t]
      const hpBonus = Math.floor(this.level / 3)
      this.actors.push({ x: s[0], y: s[1], type: t, hp: def.hp + hpBonus, def, cd: 0 })
    }
  }

  walkable (x, y) {
    if (x < 0 || y < 0 || x >= this.w || y >= this.h) return false
    const c = this.grid[y][x]
    return c !== 'wall'
  }

  atAlko () { return this.grid[this.py][this.px] === 'alko' }

  actorAt (x, y) { return this.actors.find(a => a.x === x && a.y === y && a.hp > 0) }
  itemAt (x, y) { return this.items.findIndex(it => it.x === x && it.y === y) }

  // --- vuoropohjainen liike: klikattu ruutu -> askel kerrallaan ---
  step (tx, ty) {
    if (this.dead || this.won) return
    // jos kohde ruudussa on olento: hyökkäys
    const target = this.actorAt(tx, ty)
    const dx = tx - this.px; const dy = ty - this.py
    const dist = Math.abs(dx) + Math.abs(dy)
    if (target && dist <= 1) { this.attack(target); this.endTurn(); return }
    let nx = this.px; let ny = this.py
    if (dist === 0) { this.endTurn(); return }
    if (Math.abs(dx) > Math.abs(dy)) nx += Math.sign(dx)
    else if (dy !== 0) ny += Math.sign(dy)
    else nx += Math.sign(dx)
    this.moveTo(nx, ny)
    this.endTurn()
  }

  moveTo (nx, ny) {
    if (!this.walkable(nx, ny)) {
      this.log(MSG.hitWall)
      this.wallStuck = true
      return
    }
    this.wallStuck = false
    const a = this.actorAt(nx, ny)
    if (a) { this.attack(a); return }
    // hauta
    if (this.grid[ny][nx] === 'grave') {
      if (Math.random() < 0.25) this.log(MSG.grave)
      this.log(MSG.graveSmell)
      if (Math.random() < 0.02) this.log('Aave hakkaa sinua!')
    }
    this.px = nx; this.py = ny
    // portti
    if (this.grid[ny][nx] === 'gate') { this.tryGate(); return }
    // esine
    const idx = this.itemAt(nx, ny)
    if (idx >= 0) this.pickup(idx)
  }

  tryGate () {
    if (this.points >= this.pointsNeeded) {
      this.levelUp()
    } else {
      this.log(MSG.pointsLeft)
    }
  }

  levelUp () {
    this.level++
    if (this.level > 50) { this.win(); return }
    if (this.pendingKonjakki) {
      this.promille += 8
      this.pendingKonjakki = false
      this.log(MSG.drinkKonjakki)
    }
    this.log(`Tarvitset portin päästäksesi tasolle ${this.level}.`)
    this.genLevel()
    this.log(`Taso ${this.level}. ${MSG.hik}`)
  }

  win () {
    this.won = true
    this.log(MSG.congrats)
    if (this.onWin) this.onWin()
  }

  pickup (idx) {
    const it = this.items[idx]
    this.items.splice(idx, 1)
    switch (it.type) {
      case 'point':
        this.points++
        this.pointsTotal++
        break
      case 'kalja':
        this.inventory.Kalja = (this.inventory.Kalja || 0) + 1
        this.log(MSG.pickBeer.replace('%d', '5'))
        break
      case 'lonkero':
        this.inventory.Lonkero = (this.inventory.Lonkero || 0) + 1
        this.log('Löydät yksinäisen lonkeron.')
        break
      case 'konjakki':
        this.pendingKonjakki = true
        this.log(MSG.drinkKonjakki)
        break
      case 'hennessy':
        this.win()
        break
      case 'makkara':
        this.inventory.Makkara = (this.inventory.Makkara || 0) + 1
        this.log('Kappas, kiekuralenkki.')
        break
      case 'omena':
        this.inventory.Omena = (this.inventory.Omena || 0) + 1
        this.log(MSG.eatAppleQ)
        break
      case 'suklaa':
        this.inventory.Suklaa = (this.inventory.Suklaa || 0) + 1
        this.log(MSG.eatChocolate)
        break
      case 'raha':
        const amount = 5 + rnd(30) + this.level * 2
        this.money += amount
        this.log(MSG.pickBeer.replace('%d', String(amount)))
        break
      case 'pamppu':
        this.inventory.Pamppu = (this.inventory.Pamppu || 0) + 1
        this.weapon = 'pamppu'
        this.log(MSG.pickPamppu)
        break
      case 'stiletti':
        this.inventory.Stiletti = (this.inventory.Stiletti || 0) + 1
        this.weapon = 'stiletti'
        this.log(MSG.pickStiletti)
        break
      case 'haalarit':
        this.inventory.Haalarit = 1
        this.armor += 2
        this.log(MSG.pickHaalarit)
        break
      case 'boots':
        this.inventory['Camel-bootsit'] = 1
        this.armor += 1
        this.log(MSG.pickBoots)
        break
    }
    if (this.weapon !== 'ketjut' && this.weapon !== 'stiletti') {
      if (this.weapon === 'fist' && this.inventory.Pamppu) this.weapon = 'pamppu'
    }
  }

  weaponDamage () {
    const w = WEAPON_DMG[this.weapon] || WEAPON_DMG.fist
    return w[0] + rnd(w[1] - w[0] + 1)
  }

  attack (a) {
    // väistö
    if (a.def.dodge && Math.random() < 0.3) { this.log('Ohi meni!'); return }
    let dmg = this.weaponDamage()
    // hautausmaan aave-suoja
    if (a.type === 'ghost' && this.grid[this.py][this.px] === 'grave') dmg = 0
    a.hp -= dmg
    const hitMsgs = HITS[a.type] || [`Lyöt ${a.type}a.`]
    this.log(pick(hitMsgs))
    if (a.hp <= 0) {
      this.kills++
      this.log(pick(DEATHS[a.type] || ['Hän sammuu!']))
      if (a.def.drops) {
        this.items.push({ x: a.x, y: a.y, type: a.def.drops })
      }
      // kaatuneilta löytyy joskus hylätty olutpullo
      if (!a.def.drops && Math.random() < 0.35) {
        this.items.push({ x: a.x, y: a.y, type: 'kalja' })
        this.log('Hylätty olutpullo lojuu maassa.')
      }
      if (a.def.money) {
        const m = a.def.money[0] + rnd(a.def.money[1])
        this.money += m
        this.log(MSG.pickBeer.replace('%d', String(m)))
      }
      if (a.def.eatsPoints) {
        const s = this.freeCell()
        if (s) this.items.push({ x: s[0], y: s[1], type: 'point' })
      }
    }
  }

  freeCell () {
    for (let i = 0; i < 200; i++) {
      const x = 1 + rnd(this.w - 2); const y = 1 + rnd(this.h - 2)
      if (this.grid[y][x] !== 'wall' && !this.actorAt(x, y) && !(x === this.px && y === this.py)) return [x, y]
    }
    return null
  }

  // --- alkoholitasapaino ---
  // Promilleita mallinnettu haastavaksi mutta ei ylivoimaiseksi:
  //   kuluminen: -0.35 / vuoro (pikkuhiljaa krapula lähestyy)
  //   kalja +2, lonkero +3, konjakki +12 (vaikutus vasta seuraavalla tasolla)
  //   liian vähän (< 1.0): krapulavaurio; liian paljon (> 6.0): sammuminen
  // Vaikutus: yli 4 promillea näkö sumenee (kartta häilyy), yli 6 kuolema.
  get promille () { return this._promille }
  set promille (v) {
    this._promille = Math.max(0, Math.min(10, v))
    if (this._promille > 6) { this.die(MSG.faint) }
    else if (this._promille > 4 && Math.random() < 0.3) this.log(MSG.dizzy)
  }

  initPromille () { this._promille = 3.0 }

  // Alkoholitasapaino (haastava mutta ei ylivoimainen):
  //   kalja +1.7, lonkero +2.6, konjakki +8 (vaikutus vasta seuraavalla tasolla)
  //   kuluminen -0.3 / vuoro, krapulavaurio alle 0.8 promillen
  //   yli 4.5 promillea näkö sumenee, yli 7 sammuu
  drink (kind) {
    if (this.dead || this.won) return
    if (kind === 'kalja') {
      if (!this.inventory.Kalja) { this.log(MSG.drinkNone); return }
      this.inventory.Kalja--
      this.promille += 2.0
      this.hp = Math.min(this.maxHp, this.hp + 1)
      this.log(MSG.drinkBeer)
    } else if (kind === 'lonkero') {
      if (!this.inventory.Lonkero) { this.log(MSG.drinkNone); return }
      this.inventory.Lonkero--
      this.promille += 2.6
      this.hp = Math.min(this.maxHp, this.hp + 1)
      this.log(MSG.drinkLonkka)
    }
    this.endTurn()
  }

  eat () {
    if (this.dead || this.won) return
    if (this.inventory.Makkara) {
      this.inventory.Makkara--
      this.hp = Math.min(this.maxHp, this.hp + 4)
      this.log(MSG.eatSausage)
    } else if (this.inventory.Omena) {
      this.inventory.Omena--
      if (Math.random() < 0.25) {
        this.hp = Math.max(1, this.hp - 3)
        this.log(MSG.eatAppleBad)
      } else {
        this.hp = Math.min(this.maxHp, this.hp + 3)
        this.log(MSG.eatApple)
      }
    } else if (this.inventory.Suklaa) {
      this.inventory.Suklaa--
      this.hp = Math.min(this.maxHp, this.hp + 2)
      this.log(MSG.eatChocolate)
    } else {
      this.log(MSG.eatNone)
      return
    }
    this.endTurn()
  }

  wait () {
    if (this.dead || this.won) return
    this.log('...')
    this.endTurn()
  }

  // Alko: "Ja mitähan herralle saisi olla?" — kalja 10 mk, lonkero 15 mk
  buy (kind) {
    if (this.dead || this.won) return false
    if (!this.atAlko()) { this.log('Alko ei ole tässä.'); return false }
    const price = kind === 'kalja' ? 10 : 15
    if (this.money < price) { this.log('Teille ei myydä, te olette liian köyhiä!'); return false }
    this.money -= price
    if (kind === 'kalja') this.inventory.Kalja = (this.inventory.Kalja || 0) + 1
    else this.inventory.Lonkero = (this.inventory.Lonkero || 0) + 1
    this.log('Ja mitähan herralle saisi olla? Kippis!')
    this.endTurn()
    return true
  }

  die (msg) {
    if (this.dead) return
    this.dead = true
    if (msg) this.log(msg)
    if (this.onDeath) this.onDeath()
  }

  endTurn () {
    if (this.dead || this.won) return
    // seinään takertuminen ei kuluota promilleja (peli etenee silti hitaasti)
    if (this.wallStuck) { this.wallStuck = false; return }
    // promilleiden kuluminen ( vain liikkuminen juoksuttaa; juominen/taistelu ei )
    this._promille = Math.max(0, this._promille - 0.12)
    // krapula (vain välillä iskee: ehtii vielä pelastautua juomalla)
    if (this._promille < 0.8) {
      if (Math.random() < 0.5) {
        this.hp -= 1
        if (Math.random() < 0.25) this.log('Sinua janoittaa ...')
        if (this.hp <= 0) { this.die(MSG.hangover); return }
      }
    } else if (this._promille < 1.6 && Math.random() < 0.1) {
      this.log('Kurkkuasi janottaa ...')
    }
    if (this._promille > 4 && Math.random() < 0.25) {
      this.hp = Math.max(1, this.hp - 1)
      this.log(MSG.dizzy)
    }
    // aids
    if (this.aids && Math.random() < 0.05) {
      this.hp -= 2
      this.log(MSG.aids)
      if (this.hp <= 0) { this.die(MSG.aids); return }
    }
    // oliot liikkuvat
    for (const a of this.actors) {
      if (a.hp <= 0) continue
      if (a.cd > 0) { a.cd--; continue }
      const speed = a.def.speed || 1
      a.cd = speed === 2 ? 0 : 1
      this.mobAct(a)
    }
  }

  mobAct (a) {
    const dx = this.px - a.x; const dy = this.py - a.y
    const dist = Math.abs(dx) + Math.abs(dy)
    if (dist === 1) { this.mobHit(a); return }
    if (dist > 9 && !a.def.hostile) {
      // satunnaisliike
      const d = pick([[1, 0], [-1, 0], [0, 1], [0, -1]])
      this.tryMobMove(a, a.x + d[0], a.y + d[1])
      return
    }
    if (a.def.hostile || dist <= 6) {
      // liiku kohti pelaajaa
      let nx = a.x; let ny = a.y
      if (Math.abs(dx) > Math.abs(dy)) nx += Math.sign(dx)
      else ny += Math.sign(dy)
      if (!this.tryMobMove(a, nx, ny)) {
        const alt = Math.abs(dx) > Math.abs(dy)
          ? [a.x, a.y + Math.sign(dy)]
          : [a.x + Math.sign(dx), a.y]
        this.tryMobMove(a, alt[0], alt[1])
      }
    }
    // erikoiskäytökset
    if (a.def.steals && dist === 1 && this.money > 0) {
      const stolen = Math.min(this.money, 10 + rnd(20))
      this.money -= stolen
      this.log('Lompakkosi kevenee!')
    }
    if (a.def.preaches && dist <= 2 && Math.random() < 0.3) {
      this.log('Pappi saarnaa sinulle viinan vaaroista.')
    }
    if (a.def.boast && dist <= 2 && Math.random() < 0.3) {
      this.log('Juppi uhoaa.')
    }
    if (a.def.eatsPoints && Math.random() < 0.3) {
      const i = this.items.findIndex(it => it.type === 'point')
      if (i >= 0) {
        this.items.splice(i, 1)
        if (this.points > 0) this.points--
        this.pointsNeeded = Math.max(this.pointsNeeded, this.points + 1)
        this.log('Pisteennielijä nielaisee pisteen!')
      }
    }
  }

  tryMobMove (a, nx, ny) {
    if (!this.walkable(nx, ny)) return false
    if (nx === this.px && ny === this.py) { this.mobHit(a); return true }
    if (this.actorAt(nx, ny)) return false
    // mobit eivät tallaa hautoja (paitsi aave)
    if (this.grid[ny][nx] === 'grave' && !a.def.invisible) return false
    a.x = nx; a.y = ny
    return true
  }

  mobHit (a) {
    // viholliset lyövät vain puolet vuoroista (hengähtämistä välillä)
    if (a.def.hostile && Math.random() < 0.5) return
    if (!a.def.hostile) {
      if (a.type === 'mummo') { this.log(pick(HURTS.mummo)); return }
      if (a.type === 'kake') { this.log(pick(GOSSIP)); return }
      if (a.type === 'teekkari') { this.log('Teekkari ylipuhuu sinut ostamaan äpyn.'); this.inventory['Äpy'] = (this.inventory['Äpy'] || 0) + 1; return }
      if (a.type === 'trokari') { this.log('Trokari yrittää kaupata pimeitä pulloja.'); return }
      if (a.type === 'aids') {
        if (!this.aids) { this.aids = true; this.log(pick(HURTS.aids)) }
        return
      }
      if (a.type === 'hippie') { this.log(pick(HURTS.hippie)); if (Math.random() < 0.2) this.log(MSG.strange); return }
      if (a.type === 'pappi') { this.log('Pappi saarnaa sinulle viinan vaaroista.'); return }
      return
    }
    const msgs = HURTS[a.type] || ['Sinua lyödään!']
    this.log(pick(msgs))
    const d = a.def.dmg || [1, 2]
    let dmg = d[0] + rnd(d[1] - d[0] + 1)
    dmg = Math.max(1, dmg - this.armor)
    this.hp -= dmg
    if (a.def.poison && Math.random() < 0.3) {
      this.log(MSG.snakepoison)
      this.hp -= 3
    }
    if (a.def.infects && Math.random() < 0.4 && !this.aids) {
      this.aids = true
      this.log(MSG.aids)
    }
    if (this.hp <= 0) this.die(MSG.faint)
  }

  statusText () {
    const p = this._promille.toFixed(1)
    return `Taso ${this.level}  HP ${this.hp}/${this.maxHp}  Promille ${p}  Rahaa ${this.money} mk  Pisteet ${this.points}/${this.pointsNeeded}`
  }

  inventoryText () {
    return Object.entries(this.inventory)
      .filter(([, n]) => n > 0)
      .map(([k, n]) => `${k}${n > 1 ? ' x' + n : ''}`)
      .join(', ') || '—'
  }
}
