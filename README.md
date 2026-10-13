# Nuova Vita — Frontend

Interfaz web de **Nuova Vita**, un sistema de gestión para un centro de cuidado de adultos mayores. Centraliza la historia clínica, los informes de especialistas y el control de asistencia del personal.

Este repositorio es la migración a **React + Vite** del proyecto original en HTML, CSS y JavaScript, realizada para la materia Programación IV (Tecnicatura en Programación, UTN).

## Funcionalidades

### Página de inicio (`/`)
- Navbar fija y responsive con enlaces a cada sección.
- Secciones: presentación, qué es Nuova Vita, funcionalidades principales y roles del sistema (tarjetas generadas dinámicamente con `map()`).
- Formulario de contacto con validación en tiempo real y mensajes de estado.

### Inicio de sesión (`/login`)
- Validación en tiempo real de correo y contraseña (mínimo 6 caracteres).
- Botón para mostrar u ocultar la contraseña.
- Opción "Recordarme", que guarda el correo en `localStorage`.
- Panel de recuperación de acceso.

### Panel interno (`/dashboard`)
- Tarjetas de estadísticas calculadas a partir de los datos.
- Actividad reciente.
- Listado de pacientes con búsqueda por nombre (sin distinguir tildes) y filtro por estado.
- Menú lateral de navegación.

### Otras
- Página **404** para rutas inexistentes.
- **SEO por página**: título y meta description propios en cada ruta; las páginas internas (`/login`, `/dashboard` y la 404) llevan `noindex`.

## Tecnologías

| Herramienta | Uso |
|---|---|
| [React 19](https://react.dev/) | Interfaz basada en componentes |
| [Vite](https://vite.dev/) | Entorno de desarrollo y build |
| [React Bootstrap](https://react-bootstrap.netlify.app/) + [Bootstrap 5](https://getbootstrap.com/) | Componentes y sistema de grillas responsive |
| [React Router](https://reactrouter.com/) | Navegación entre páginas |
| [Axios](https://axios-http.com/) | Peticiones HTTP |
| [SweetAlert2](https://sweetalert2.github.io/) | Mensajes al usuario |
| [ESLint](https://eslint.org/) | Análisis estático del código |

## Estructura del proyecto

```
src/
├── assets/images/     # Logo e ilustraciones
├── components/        # Componentes reutilizables, agrupados por sección
│   ├── Navbar/  Hero/  About/  Services/  Roles/  Contact/  Footer/
│   ├── LoginForm/
│   └── Dashboard/     # Sidebar, StatCard, Statistics, RecentActivity, Patients, DashboardHeader
├── data/              # Datos que se recorren con map() (homeData.js, dashboardData.js)
├── hooks/             # Hooks propios (usePageMeta: título y metadatos SEO)
├── pages/             # Una carpeta por página: Home, Login, Dashboard, NotFound
├── styles/            # Tema de marca sobre Bootstrap: paleta y tipografías (theme.css)
├── App.jsx            # Definición de rutas
└── main.jsx           # Punto de entrada
```

## Rutas

| Ruta | Página |
|---|---|
| `/` | Inicio |
| `/login` | Inicio de sesión |
| `/dashboard` | Panel principal |
| `*` | Página no encontrada (404) |

## Instalación y ejecución

**Requisito:** [Node.js](https://nodejs.org/) 20.19 o superior.

```bash
# 1. Clonar el repositorio
git clone https://github.com/contysegura-cell/NuovaVita-frontend.git
cd NuovaVita-frontend

# 2. Instalar las dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

Abrir en el navegador la dirección que muestra la terminal (por lo general `http://localhost:5173`).

### Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve localmente la versión de producción |
| `npm run lint` | Revisa el código con ESLint |

## Variables de entorno

Las variables van en un archivo `.env` en la raíz del proyecto. Ese archivo **no se sube a GitHub** (está en `.gitignore`).

```
VITE_API_URL=https://ejemplo-api.com
```

## Despliegue

El proyecto se publica en [Vercel](https://vercel.com/). El archivo `vercel.json` redirige todas las rutas a `index.html` para que React Router funcione al recargar la página.

## Flujo de trabajo con Git

- `main`: versión estable.
- `dev`: integración de los cambios del equipo.
- `feature/*`: una rama por funcionalidad, que se integra a `dev` mediante Pull Request.