# Savvy - Frontend

Plataforma de inteligencia y control financiero personal y colaborativo. Este repositorio contiene el lado cliente (frontend) de la aplicación, construido de forma moderna, rápida y escalable.

## 🚀 Tecnologías Principales

*   **Framework:** [Next.js (App Router)](https://nextjs.org/)
*   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
*   **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Gestión de Estado Global:** [Zustand](https://zustand-demo.pmnd.rs/)
*   **Cliente HTTP:** [Axios](https://axios-http.com/)
*   **Gráficos Interactivos:** [Recharts](https://recharts.org/)

## 📂 Estructura del Proyecto

El código base está altamente estandarizado en las siguientes secciones principales:

*   `app/`: Vistas y sistema de rutas basado en el App Router de Next.js (`(auth)`, `(dashboard)`).
*   `components/`: Componentes UI reutilizables y apartados de layouts (Modales, Topbar, Sidebar, Inputs).
*   `hooks/`: Capa lógica separada de la vista (ej. `useAuth`, `useMetrics`, `useGoals`).
*   `services/`: Capa de persistencia, con la abstracción para comunicación API con Axios.
*   `store/`: Gestión del caché y el estado de la sesión de los usuarios utilizando Zustand.
*   `lib/`: Configuraciones de utilidades globales y los interceptores de Axios.

## ⚙️ Variables de Entorno

Debes contar con un archivo oculto llamado `.env.local` en la raíz de la carpeta `savvy-frontend` (al mismo nivel que tu `package.json`). El archivo tiene la siguiente estructura:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```
*(Nota: El endpoint base lleva el sufijo `/api` para acoplarse exitosamente a los controladores del Backend de NestJS).*

## 💻 Instalación y Ejecución Local

1. Instala todas las dependencias asegurando no modificar las versiones del _lock_:
   ```bash
   npm install
   ```

2. Arranca el entorno de desarrollo utilizando el poderoso _Turbopack_:
   ```bash
   npm run dev
   ```

3. Abre el navegador y visita el enlace que arroje la consola (generalmente `http://localhost:3000` pero puede saltar al `3002` si otro proceso está vivo en el fondo).

## 🛠️ Notas Clave de Desarrollo

- **Manejo Automático de Sesión (JWT):** El proyecto cuenta con un sistema robusto en `lib/axios.ts` donde se implementaron _interceptors_ y una _Cola Lógica (Queue)_. Si el token de acceso vence, las consultas se pausan internamente, se solicita un nuevo Token por debajo, y luego las consultas prosiguen sin que el usuario sienta el fallo.
- **Troubleshooting - Servidores Congelados:** Si `npm run dev` se congela (Muy común con la edición rápida de Windows PowerShell), prueba cerrando los procesos NodeJS zombies escribiendo en una terminal de admin: `taskkill /F /IM node.exe`.
