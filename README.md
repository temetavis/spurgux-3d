# SpurguX 3D

Kolmiulotteinen kunnianosoitus Petri Niskan vuoden 1987 klassikolle
**SpurguX** — *"tositapahtumiin perustuva seikkailupeli, jossa antisankari
kahlaa kaupunginosien halki etsien konjakkipulloa, jonka huhutaan olevan
tasolla 50, seuranaan ainoastaan kova jano."*

Peli on selaimessa pelattava 3D-roguelike (three.js). Viestit on kaivettu
mahollisimman pitkälti sellaisenaan alkuperäispelin tiedostoista
(SPU.HLP, SPU.SPE, SPU.TIP sekä pelin sisäiset merkkijonot).

## Peliohjeet

- **Liiku hiirellä**: klikkaa kohderuutua 3D-näkymässä. Pelaaja astuu yhden
  askeleen kohti klikattua ruutua per klikkaus (vuoropohjainen).
- **Taistele**: klikkaa/törmää viereiseen olentoon.
- **Kerää kaikki pisteet** (vihreät palot) ennen portille (`>`) menoa.
- **Ylläpidä humalatilaa**: promillet laskevat jokaisella askeleella.
  - Alle 0,8 promillin: krapula iskee ja HP vähenee — "Kankkunen saapuu ja
    katkaisee taipaleesi ..."
  - Yli 4,5 promillin: horjahtelet ja näkö sumenee
  - Yli 7 promillin: sammut
- **Juomia**: kalja (+2,0), lonkero (+2,6), konjakki (+8, vasta seuraavalla
  tasolla — kuten alkuperäisessä!). Kartalta löytyy hylättyjä olutpulloja ja
  yksinäisiä lonkeroita; Alkosta voi ostaa rahalla (kalja 10 mk, lonkero 15 mk).
- **Rahaa**: mummolta saa "eläkepäivinä" lyömällä, maasta löytyy seteleitä.

### Näppäimet (myös hiiri toimii)

```
q = juo kalja      b = juo lonkero    e = syö
. = odota          H,J,K,L / nuoret = liikkuminen
Y,U,N,B = diagonaalit (kuten Hackissa ... siis melkein)
```

## Ajaminen paikallisesti

Pelkkä staattinen sivu — riittää:

```bash
python3 -m http.server 8000
# avaa http://localhost:8000
```

## Testit

```bash
node tests/game.test.mjs      # pelilogiikan yksikkötestit
node tests/balance.test.mjs    # alkoholitasapainon simulointi (20 bottia)
```

Tasapainotestaus simuloi järkevän pelaajan: kuolemia tulee ~1–2 / 600
askelta, mikä tekee pelistä haastavan mutta ei ylivoimaisen.

## Tekijänoikeudet

- Alkuperäinen SpurguX (C) 1987 Petri Niska. Tämä on ei-kaupallinen
  kunnianosoitus (remake) faniyleisölle.
- three.js — MIT-lisenssi (mukana `vendor/`-hakemistossa).
- Remake: temetavis.
