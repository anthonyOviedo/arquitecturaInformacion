# generate_laptop_md.py
# Reads laptops.csv and generates one Markdown file per laptop row.

import csv
from pathlib import Path

INPUT = Path("laptops.csv")
OUTDIR = Path("../content/laptops")

def safe(name: str) -> str:
    return "".join(c if c.isalnum() or c in "-._" else "_" for c in name.strip())

def row_to_markdown(r: dict) -> str:
    return f"""# {r['Brand']} {r['Model_Name']}

| Spec | Value |
|---|---|
| Processor | {r['Processor']} |
| Operating System | {r['Operating_System']} |
| Storage | {r['Storage_MB']} MB |
| RAM | {r['RAM_GB']} GB |
| Screen Size | {r['Screen_Size']} cm |
| Touch Screen | {r['Touch_Screen']} |
| Price | ${r['Price']} |
"""

def main():
    OUTDIR.mkdir(exist_ok=True)
    with INPUT.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for r in reader:
            filename = f"{safe(r['Brand'])}_{safe(r['Model_Name'])}.md"
            (OUTDIR / filename).write_text(row_to_markdown(r), encoding="utf-8")

if __name__ == "__main__":
    main()
