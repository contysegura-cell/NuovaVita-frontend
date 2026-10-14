# Nuova Vita — Frontend

Sistema de gestión para un centro de cuidado de adultos mayores: historia clínica digital, informes de especialistas, actividades diarias y control de asistencia.

El proyecto es **100% frontend**. No hay backend: los pacientes y especialistas se cargan y consultan a través de una API simulada que guarda los datos en el `localStorage` del navegador.

## Tecnologías

- React 19 + Vite
- React Router 7
- React Bootstrap / Bootstrap 5
- SweetAlert2
- Vitest + Testing Library

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Sirve el build localmente |
| `npm run lint` | ESLint |
| `npm test` | Ejecuta los tests una vez |
| `npm run test:watch` | Tests en modo watch |

## Estructura

```
src/
├── components/     Componentes reutilizables (Dashboard, Feedback, landing…)
├── data/           seed.js (API simulada) y dashboardData.js (datos estáticos del panel)
├── hooks/          Hooks propios (useAsync)
├── layouts/        PrivateLayout: menú lateral + contenido de cada sección
├── pages/          Una carpeta por pantalla
├── routes/paths.js Todas las URLs de la app
├── services/       Acceso a datos (API simulada)
├── styles/         Estilos propios sobre Bootstrap
├── test/           Configuración de los tests
└── utils/          Funciones puras (texto, fechas)
```

## Login

El login solo valida en el navegador que el correo tenga un formato válido y que la contraseña tenga al menos 8 caracteres. No hay usuarios ni sesión: al ingresar se navega al panel.

## API simulada

- Se usa **solo para cargar y consultar pacientes y especialistas** (`patientService` y `specialistService` en `src/services/`).
- Expone únicamente operaciones equivalentes a **GET** (`getAll`, `getById`) y **POST** (`create`). No hay edición ni borrado.
- Las respuestas llegan con una demora de 300 ms, por eso las pantallas muestran estados de carga y error.
- Los datos se guardan en `localStorage` con un número de versión (`DB_VERSION` en `src/services/storage.js`). Si cambia la forma de los datos, subí ese número y los datos viejos se reemplazan por la semilla.
- **Restablecer datos de la demo** (en el menú lateral) vuelve a cargar la semilla.
- Los componentes nunca leen `localStorage` directamente: siempre usan los servicios.

Los demás números del panel (informes, turnos, alertas y actividad reciente) son datos estáticos de ejemplo en `src/data/dashboardData.js`.

> Los datos solo existen en el navegador donde se cargaron.

## Rutas

| Ruta | Pantalla |
|---|---|
| `/` | Landing |
| `/login` | Inicio de sesión |
| `/dashboard` | Panel principal |
| `/dashboard/pacientes` | Listado de pacientes |
| `/dashboard/historia-clinica`, `/informes`, `/actividades`, `/asistencia`, `/configuracion` | Próximamente |

## Deploy

Se publica en Vercel. `vercel.json` redirige todas las rutas a `index.html` para que funcione el ruteo del lado del cliente.
