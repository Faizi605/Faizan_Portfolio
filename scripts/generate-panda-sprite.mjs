import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const WHITE = '#f9f7f4'
const SHADOW = '#d9b7a4'
const BROWN = '#b68b6d'
const GREY = '#463f3a'
const PINK = '#f7bfd2'

const palette = {
  '.': null,
  w: WHITE,
  s: SHADOW,
  b: BROWN,
  g: GREY,
  p: PINK,
}

function empty() {
  return Array.from({ length: 32 }, () => Array(32).fill(null))
}

function paint(grid, ox, oy, art, map = palette) {
  const rows = art
    .trim()
    .split('\n')
    .map((row) => row.trimEnd())
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x += 1) {
      const color = map[row[x]]
      if (!color) continue
      const gx = ox + x
      const gy = oy + y
      if (gy >= 0 && gy < 32 && gx >= 0 && gx < 32) grid[gy][gx] = color
    }
  })
}

function flip(grid) {
  return grid.map((row) => [...row].reverse())
}

function shift(grid, dx, dy) {
  const next = empty()
  for (let y = 0; y < 32; y += 1) {
    for (let x = 0; x < 32; x += 1) {
      const nx = x + dx
      const ny = y + dy
      if (nx >= 0 && nx < 32 && ny >= 0 && ny < 32) next[ny][nx] = grid[y][x]
    }
  }
  return next
}

const idleArt = `
....gg....gg....
...gwwgggwwg...
..gwwwwwwwwwg..
..gwwbbbbwwwg..
..gwwbppppbwwg.
..gwwbppppbwwg.
...gwwbbbbgww..
....gwwwwwwg...
....gwwwwwwg...
...gwwggggwwg..
..gwwg....gwwg.
..gg........gg.
`

const alertArt = `
....gg....gg....
...gwwgggwwg...
..gwwwwwwwwwg..
..gwwbbbbwwwg..
..gwwbppppbwwg.
..gwwbppppbwwg.
...gwwbbbbgww..
....gwwwwwwg...
....gwwwwwwg...
...gwwggggwwg..
..gwwg....gwwg.
..gg........gg.
`

const tiredArt = `
....gg....gg....
...gwwgggwwg...
..gwwwwwwwwwg..
..gwwbbbbwwwg..
..gwwbppppbwwg.
..gwwbppppbwwg.
...gwwbbbbgww..
....gwwwwwwg...
....gwwbbwwg...
....gwbbbbwg...
.....gg..gg....
`

const sleepA = `
................
................
......gwwg......
.....gwwwwg.....
....gwwwwwwg....
...gwwbbbbwwg...
...gwwbpppbwwg..
...gwwbpppbwwg..
....gwwwwwwg....
.....gggggg.....
................
................
`

const sleepB = `
................
................
.......gwwg.....
......gwwwwg....
.....gwwwwwwg...
....gwwbbbbwwg..
....gwwbpppbwwg.
....gwwbpppbwwg.
.....gwwwwwwg...
......ggggg.....
................
................
`

const scratchA = `
....gg....gg....
...gwwgggwwg...
..gwwwwwwwwwg..
..gwwbbbbwwwg..
..gwwbppppbwwg.
..gwwbppppbwwg.
...gwwbbbbgww..
....gwwwwwwg...
.....gwwwwg....
....gwwbbbwg...
....gwb..bwg...
.....gg..gg....
`

const scratchB = `
....gg....gg....
...gwwgggwwg...
..gwwwwwwwwwg..
..gwwbbbbwwwg..
..gwwbppppbwwg.
..gwwbppppbwwg.
...gwwbbbbgww..
....gwwwwwwg...
.....gwwwwg....
....gwb..bwg...
....ggb..bgg...
......gggg.....
`

const walkA = `
....gg....gg....
...gwwgggwwg...
..gwwwwwwwwwg..
..gwwbbbbwwwg..
..gwwbppppbwwg.
..gwwbppppbwwg.
...gwwbbbbgww..
....gwwwwwwg...
....gwwg..gwwg.
....gww....wwg.
....gg......gg.
`

const walkB = `
....gg....gg....
...gwwgggwwg...
..gwwwwwwwwwg..
..gwwbbbbwwwg..
..gwwbppppbwwg.
..gwwbppppbwwg.
...gwwbbbbgww..
....gwwwwwwg...
....gwwg..gwwg.
.....gg....gg..
`

function fromArt(art, dx = 6, dy = 8) {
  const grid = empty()
  paint(grid, dx, dy, art)
  return grid
}

const frames = {
  idle: fromArt(idleArt, 6, 8),
  alert: fromArt(alertArt, 6, 8),
  tired: fromArt(tiredArt, 6, 8),
  sleep0: fromArt(sleepA, 6, 9),
  sleep1: fromArt(sleepB, 6, 9),
  scratch0: fromArt(scratchA, 6, 8),
  scratch1: fromArt(scratchB, 6, 8),
  scratch2: fromArt(scratchA, 5, 8),
  walk0: fromArt(walkA, 6, 8),
  walk1: fromArt(walkB, 6, 8),
}

const sheet = Array.from({ length: 128 }, () => Array(256).fill(null))

function place(col, row, grid) {
  for (let y = 0; y < 32; y += 1) {
    for (let x = 0; x < 32; x += 1) {
      sheet[row * 32 + y][col * 32 + x] = grid[y][x]
    }
  }
}

place(0, 0, frames.idle)
place(1, 0, frames.alert)
place(2, 0, frames.tired)
place(3, 0, frames.sleep0)
place(4, 0, frames.sleep1)
place(5, 0, frames.scratch0)
place(6, 0, frames.scratch1)
place(7, 0, frames.scratch2)
place(0, 1, frames.walk0)
place(1, 1, frames.walk1)
place(2, 1, flip(frames.walk0))
place(3, 1, flip(frames.walk1))
place(4, 1, frames.idle)
place(5, 1, frames.alert)
place(6, 1, frames.tired)
place(7, 1, frames.idle)

const rects = []
for (let y = 0; y < 128; y += 1) {
  for (let x = 0; x < 256; x += 1) {
    const color = sheet[y][x]
    if (color) {
      rects.push(`<rect x="${x}" y="${y}" width="1" height="1" fill="${color}"/>`)
    }
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="128" viewBox="0 0 256 128" shape-rendering="crispEdges">
${rects.join('\n')}
</svg>
`

const outDir = join(dirname(fileURLToPath(import.meta.url)), '../public/oneko')
mkdirSync(outDir, { recursive: true })
writeFileSync(join(outDir, 'rabbit.svg'), svg)
console.log(`Wrote ${rects.length} pixels to public/oneko/rabbit.svg`)
