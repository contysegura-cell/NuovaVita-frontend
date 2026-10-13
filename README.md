# Nuova Vita — Frontend

Sistema de gestión para un centro de cuidado de adultos mayores: historia clínica digital, informes de especialistas, actividades diarias y control de asistencia.

El proyecto es **100% frontend**. No hay backend: los datos se guardan en el `localStorage` del navegador a través de una capa de servicios que simula una API.

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
├── data/seed.js    Datos iniciales de la demo
├── hooks/          Hooks propios (useAsync)
├── layouts/        PrivateLayout: menú lateral + contenido de cada sección
├── pages/          Una carpeta por pantalla
├── routes/paths.js Todas las URLs de la app
├── services/       Acceso a datos (API simulada)
├── styles/         Estilos propios sobre Bootstrap
├── test/           Configuración de los tests
└── utils/          Funciones puras (texto, fechas)
```

## Datos simulados

- Los componentes **nunca** leen `localStorage` directamente: usan los servicios de `src/services/` (`patientService`, `reportService`, …).
- Los servicios devuelven promesas con una demora de 300 ms, para que la interfaz maneje estados de carga y error como lo hará con una API real. El día que exista un backend, se reemplaza el interior de los servicios por llamadas HTTP y las pantallas no cambian.
- Los datos guardan un número de versión (`DB_VERSION` en `src/services/storage.js`). Si cambia la forma de los datos, subí ese número y los datos viejos se reemplazan por la semilla.
- No existe borrado: los registros se dan de baja lógicamente.
- **Restablecer datos de la demo** (en el menú lateral) vuelve a cargar la semilla.

> Los datos solo existen en el navegador donde se cargaron. No hay seguridad real: es una demo.

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
