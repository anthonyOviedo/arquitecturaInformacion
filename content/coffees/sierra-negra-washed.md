---
title: Sierra Negra Lavado
lotId: SN-07-24
vendor: Altura México
producer: Unión de Productores Sierra Negra
origin:
  farm: Parcelas Sierra Negra
  municipality: Tequila
  region: Veracruz
  country: México
  altitude: "1,400 msnm"
harvestWindow: Noviembre 2023 - Enero 2024
variety: Garnica
process: Lavado clásico
score: 85.9
certifications:
  - Rainforest Alliance
  - Producción sustentable
deliveryPromise: Entrega nacional en 3-4 días; envío a EE.UU. en 8 días hábiles
nextMilestone: Inicio de campaña retail 25 de julio de 2024
inventoryKg: 500
status: Disponible
acopioCenter: Centro de Acopio Córdoba
fulfillmentHub: Hub logístico Ciudad de México
valueProposition: Café balanceado con notas a chocolate, almendra y manzana roja, pensado para programas de suscripción y retail.
customerSegments:
  - Suscripciones familiares con entregas mensuales.
  - Retailers especializados con barras de café dentro de tienda.
  - Oficinas que migran a programas de café de especialidad.
roastProfiles:
  - name: Hogar versátil
    level: Medio
    charge: 25 kg por batch
    development: 13m / 1m 45s de desarrollo
    restTime: 4 días
    flavorFocus: Chocolate de leche y manzana roja
    recommendedUses:
      - Cafetera de filtro
      - Prensa francesa
  - name: Espresso tradicional
    level: Medio-oscuro
    charge: 22 kg por batch
    development: 13m 40s / 2m 05s de desarrollo
    restTime: 6 días
    flavorFocus: Cacao, almendra y caramelo
    recommendedUses:
      - Espresso
      - Latte
  - name: Omni suscripción
    level: Medio
    charge: 24 kg por batch
    development: 12m 45s / 1m 30s de desarrollo
    restTime: 5 días
    flavorFocus: Equilibrio para métodos manuales y automáticos
    recommendedUses:
      - Batch brew
      - Aeropress
      - Moka
grindOptions:
  - name: Familiar
    granularity: '650 µm'
    recommendedUses:
      - Cafetera de goteo
      - Prensa francesa
  - name: Espresso clásico
    granularity: '240 µm'
    recommendedUses:
      - Espresso
      - Cafetera italiana
  - name: Omni suscripción
    granularity: '580 µm'
    recommendedUses:
      - Métodos manuales
      - Máquinas automáticas
packagingOptions:
  - format: 250 g bolsa con válvula
    material: Bolsa biorreciclable con zipper
    price: 12
    notes: Incluye recetario impreso y código de fidelidad.
  - format: 1 kg horeca
    material: Bolsa metalizada doble capa
    price: 32
    notes: Etiqueta personalizable con logo del cliente.
  - format: Pack trimestral (3 × 500 g)
    material: Caja rígida con separadores reutilizables
    price: 78
    notes: Ideal para suscripciones familiares.
fulfillmentFlow:
  - step: Planeación de demanda
    status: Completado
    owner: Equipo de planeación CDMX
    sla: 48 h
    detail: Forecast ajustado con base en suscripciones activas y nuevos retailers.
  - step: Tueste semanal
    status: En progreso
    owner: Tostaduría Altura
    sla: 24 h
    detail: Producción en ciclos cortos con pruebas de taza por batch.
  - step: Empaque y armado de kits
    status: Programado
    owner: Centro de fulfillment CDMX
    sla: 24 h
    detail: Empaque personalizado según canal y armado de kits de bienvenida.
  - step: Distribución multi-canal
    status: Pendiente
    owner: Red logística nacional
    sla: 72 h
    detail: Entregas en oficinas, retail y clientes finales con tracking en app.
sellerNotifications:
  - trigger: Forecast actualizado
    channel:
      - Email
      - App
    message: Se actualizó la demanda proyectada; revisa tu inventario disponible.
  - trigger: Tueste completado
    channel:
      - App
    message: Tu lote SN-07-24 fue tostado bajo perfil Hogar versátil.
  - trigger: Kits enviados
    channel:
      - Email
      - SMS
    message: Los kits de suscripción han sido despachados, comparte el tracking con tus clientes.
---

## Contexto del lote
Sierra Negra Lavado se produce en microparcelas ubicadas en la Sierra Madre Oriental. La Unión de Productores invierte en programas de reforestación y recolección diferenciada para mejorar consistencia en taza.

### Estrategia de lanzamiento
- Crear bundles con molinos manuales para nuevos suscriptores.
- Ofrecer descuentos escalonados a retailers según volumen mensual.
- Implementar campañas de referidos con cupones digitales.

### Seguimiento operativo
1. Tablero de control con cumplimiento de SLA por canal (suscripciones, retail, oficinas).
2. Alertas automáticas cuando el inventario disponible cae por debajo del 20 %.
3. Encuestas de satisfacción enviadas 48 h después de la entrega.

### Métricas clave
- Retención de suscripciones por encima del 80 %.
- Tiempo de ciclo tueste → entrega inferior a 5 días.
- Calificación promedio >4.5 en evaluaciones de taza.
