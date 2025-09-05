const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '..', 'data', 'laptops.csv');
const outDir = path.join(__dirname, '..', 'content', 'laptops');

const csv = fs.readFileSync(csvPath, 'utf-8').trim();
const lines = csv.split(/\r?\n/);
const headers = lines.shift().split(',');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

lines.forEach((line, idx) => {
  if (!line.trim()) return;
  const cols = line.split(',');
  const row = {};
  headers.forEach((h, i) => row[h] = cols[i]);

  const slugBase = `${row.Brand}-${row.Model_Name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const slug = `${row.Num}-${slugBase}`;

  const frontMatter = `---\nbrand: "${row.Brand}"\nmodel: "${row.Model_Name}"\nprocessor: "${row.Processor}"\noperatingSystem: "${row.Operating_System}"\nstorageMB: ${row.Storage_MB}\nramGB: ${row.RAM_GB}\nscreenSize: ${row.Screen_Size}\ntouchScreen: ${row.Touch_Screen === 'Yes'}\nprice: ${row.Price}\n---\n`;

  const content = `# ${row.Brand} ${row.Model_Name}\n\nDetalles del equipo ${row.Brand} ${row.Model_Name}.`;

  fs.writeFileSync(path.join(outDir, `${slug}.md`), frontMatter + '\n' + content);
});

console.log('Markdown files generated in', outDir);
