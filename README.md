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
- El inicio de sesión es una simulación frontend: todavía no valida las credenciales contra un backend.

### Panel interno (`/dashboard`)
- Tarjetas de estadísticas calculadas a partir de los datos.
- Actividad reciente.
- Listado de pacientes con búsqueda por nombre (sin distinguir tildes) y filtro por estado.
- Directorio demostrativo del equipo profesional, cargado desde una API pública.
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
| [Axios](https://axios-http.com/) | Peticiones HTTP a la API pública |
| [SweetAlert2](https://sweetalert2.github.io/) | Mensajes de error durante el consumo de la API |
| [ESLint](https://eslint.org/) | Análisis estático del código |

## Consumo de API pública (TP Nº 8)

El dashboard consume la API pública [Random User](https://randomuser.me/) para construir un directorio demostrativo del equipo profesional de Nuova Vita.

Los nombres, correos y teléfonos recibidos son datos ficticios y se utilizan únicamente con fines académicos. La interfaz usa un avatar genérico para evitar presentar las fotografías generadas por la API como integrantes reales del centro.

La implementación se encuentra en `src/components/Dashboard/ProfessionalTeam.jsx` y utiliza:

- **Axios** para realizar la petición HTTP.
- **`useState`** para administrar los profesionales, el estado de carga, los errores y los reintentos.
- **`useEffect`** para ejecutar la petición cuando se monta el componente o se solicita un nuevo intento.
- **SweetAlert2** para informar al usuario si la petición falla.
- **`map()`** para generar una tarjeta por cada profesional recibido.
- **Variables de entorno** para evitar escribir la URL directamente dentro del componente.

Mientras se espera la respuesta se muestra un indicador de carga. Si ocurre un error, se presenta una alerta y un botón para reintentar la consulta.

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

# 3. Crear el archivo local de variables de entorno
cp .env.example .env

# 4. Iniciar el servidor de desarrollo
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

La URL de la API se configura en un archivo `.env` en la raíz del proyecto. Este archivo **no se sube a GitHub** porque está incluido en `.gitignore`.

Después de clonar el repositorio, copiar `.env.example` como `.env`:

```bash
cp .env.example .env
```

En Windows PowerShell también se puede utilizar:

```powershell
Copy-Item .env.example .env
```

La variable requerida es:

```
VITE_API_URL=https://randomuser.me/api/
```

Vite expone esta variable en React mediante `import.meta.env.VITE_API_URL`. Si se modifica `.env` mientras el servidor está funcionando, es necesario reiniciar `npm run dev`.

## Despliegue

El proyecto se publica en [Vercel](https://vercel.com/). El archivo `vercel.json` redirige todas las rutas a `index.html` para que React Router funcione al recargar la página.

## Flujo de trabajo con Git

- `main`: versión estable.
- `dev`: integración de los cambios del equipo.
- `feature/*`: una rama por funcionalidad, que se integra a `dev` mediante Pull Request.
