# Marketplace integral de café personalizado

Propuesta integral para un marketplace de café que permite a clientes personalizar tueste, molienda y empaques; a vendedores monitorear todo el flujo desde el acopio hasta la entrega; y a administradores gobernar la operación con datos en tiempo real.

## Características clave

- **Tres tipos de usuarios**: cliente final, vendedor y administrador, cada uno con capacidades y touchpoints descritos en el portal.
- **Catálogo operativo** con filtros por origen, proceso, estado logístico, perfiles de tueste, molienda y empaque.
- **Fichas de lote** enriquecidas con flujos de cumplimiento, notificaciones para el vendedor y recomendaciones comerciales.
- **Blueprint de negocio** que cubre personalización, pipeline operativo, notificaciones y capas administrativas.

## Contenido relevante

- `pages/index.vue`: Página principal con la propuesta estratégica, tablas filtrables y roadmaps operativos.
- `pages/coffees/[...slug].vue`: Plantilla para visualizar el detalle de cada lote, sus opciones de personalización y el flujo de cumplimiento.
- `composables/useCoffeeCatalog.ts`: Lógica para consultar el contenido de los lotes y habilitar filtros y métricas del catálogo.
- `content/coffees/`: Colección de microlotes representativos con front matter estructurado (origen, perfiles de tueste, molienda, empaques, notificaciones, etc.).

## Puesta en marcha

1. **Instalar dependencias**

   ```bash
   npm install
   ```

2. **Servidor de desarrollo**

   ```bash
   npm run dev
   ```

   El sitio estará disponible en http://localhost:3000.

3. **Compilar para producción**

   ```bash
   npm run build
   ```

4. **Generar sitio estático**

   ```bash
   npm run generate
   ```

## Añadir nuevos lotes de café

1. Crear un archivo Markdown en `content/coffees/` con el front matter requerido (campos como `lotId`, `origin`, `roastProfiles`, `grindOptions`, `packagingOptions`, `fulfillmentFlow`, `sellerNotifications`).
2. Agregar narrativa en Markdown para detallar historia, estrategia comercial y KPIs asociados al lote.
3. El nuevo contenido aparecerá automáticamente en el catálogo y en la página de detalle.
