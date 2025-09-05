#!/usr/bin/env node
/*
  Normalize Markdown tables in content/laptops by removing leading indentation
  so that Nuxt Content renders tables instead of code blocks.
*/
const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const dir = path.join(root, 'content', 'laptops')

function fixFile(filePath) {
  const input = fs.readFileSync(filePath, 'utf8')
  const lines = input.split(/\r?\n/)

  let changed = false
  const out = lines.map((line) => {
    // Remove leading spaces before Markdown table rows
    const fixed = line.replace(/^\s+\|/, '|').replace(/^\s+$/, '')
    if (fixed !== line) changed = true
    return fixed
  })

  // Trim trailing empty lines and ensure single trailing newline
  while (out.length && out[out.length - 1] === '') out.pop()
  const output = out.join('\n') + '\n'

  if (changed) {
    fs.writeFileSync(filePath, output)
    return true
  }
  return false
}

function run() {
  if (!fs.existsSync(dir)) {
    console.error('Directory not found:', dir)
    process.exit(1)
  }
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))
  let count = 0
  for (const f of files) {
    const fp = path.join(dir, f)
    if (fixFile(fp)) count++
  }
  console.log(`Processed ${files.length} files; fixed ${count}.`)
}

run()

