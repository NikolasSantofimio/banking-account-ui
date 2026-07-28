# Banking Account UI

Cliente React para el microservicio bancario: creación de cuentas, depósito/retiro y consulta de saldo.

## Tecnologías

- React 18 + Vite
- Axios
- JavaScript (sin TypeScript)

## Prerrequisitos

- Node.js 20 LTS (https://nodejs.org)
- El backend `banking-account-service` corriendo en `http://localhost:8080` (ver su propio README)

Verificar instalación:

```bash
node --version
npm --version
```

## 1. Clonar el repositorio

```bash
git clone https://github.com/NikolasSantofimio/banking-account-ui.git
cd banking-account-ui
```

## 2. Instalar dependencias

```bash
npm install
```
## 3. Configurar la URL del backend

Por defecto, el cliente apunta a `http://localhost:8080` (configurado en `src/api/client.js`). Si tu backend corre en otro host/puerto, edita `API_BASE_URL` en ese archivo.

## 4. Correr en modo desarrollo

```bash
npm run dev
```

Abre `http://localhost:5173`. Asegúrate de que el backend y su contenedor de PostgreSQL estén corriendo, o las peticiones fallarán.

## 5. Iniciar sesión

Credenciales de desarrollo configuradas en el backend:

```
Usuario: admin
Contraseña: admin123
```

## 6. Compilar para producción

```bash
npm run build
```

Genera el sitio estático en `dist/`, listo para servir desde S3, CloudFront, Nginx, o cualquier hosting estático.

## Estructura del proyecto

```
src/
├── api/
│   └── client.js          # Cliente Axios con interceptor JWT
├── components/
│   ├── LoginForm.jsx        # Autenticación
│   ├── AccountForm.jsx      # Micro-frontend: creación de cuenta
│   ├── TransactionForm.jsx  # Micro-frontend: depósito / retiro
│   └── BalanceLookup.jsx    # Micro-frontend: consulta de saldo
├── App.jsx
├── main.jsx
└── index.css
```

## Funcionalidad

| Componente | Endpoint que consume |
|---|---|
| LoginForm | `POST /auth/token` |
| AccountForm | `POST /accounts` |
| TransactionForm | `POST /accounts/{id}/deposit` o `POST /accounts/{id}/withdraw` |
| BalanceLookup | `GET /accounts/{id}/balance` |

## Notas

- El JWT se guarda en `localStorage` bajo la clave `jwt_token` y se inyecta automáticamente en cada request vía interceptor de Axios.
- El repositorio del backend (https://github.com/NikolasSantofimio/banking-account-service) vive por separado; este proyecto no funciona de forma aislada, requiere la API corriendo.
