# arquitecturaInformacion

# tarea2 app in netfly
https://polite-chaja-c33d38.netlify.app/

Nuxt 3 application that displays a catalog of laptops. Laptop details are stored as Markdown in `content/tarea2/laptops` and can be regenerated from the CSV dataset in `data/laptops.csv` using the provided script.

## Getting Started

1. **Install dependencies**
   
   ```bash
   npm install
   ```

2. **Run the development server**
   
   ```bash
   npm run dev
   ```
   
   The site will be available at http://localhost:3000.

3. **Build for production**

   ```bash
   npm run build
   ```

4. **Generate static site**

   ```bash
   npm run generate
   ```

## Updating laptop content

If you change `data/laptops.csv`, regenerate the Markdown files with:

```bash
node scripts/generateMarkdown.js
```

This creates files under `content/tarea2/laptops/`.
