# 🏪 Tiendita_DB

**Proyecto backend para llevar el registro contable y administrativo de una tienda.**  
Desarrollado con **Node.js**, **Express**, y **MySQL**, este proyecto permite registrar movimientos de dinero y gestionar entidades como productos, clientes, proveedores y empleados.  

---

## 🧩 Acerca del proyecto

Este proyecto nació como una colaboración entre:
- **Uriel Araujo** - [UrielAraujoGit](https://github.com/UrielAraujoGit)
- **Nora Villanueva** - [VillanuevaNoraB](https://github.com/VillanuevaNoraB)  
- **Elías Suárez** - [SuspiciousSchrodinger](https://github.com/SuspiciousSchrodinger)  
- **Agustín Marrero** - [amarrero86mr](https://github.com/amarrero86mr)

---
## 🏗️ Arquitectura

### Modelo de datos

El sistema maneja las siguientes entidades principales:

- **Products (productos)**
- **Clients (clientes)**
- **Suppliers (proveedores)**
- **Employees (empleados)**
- **Transactions (movimientos de dinero)**
- **Visitors (usuarios autorizados para acceder a la API)**

Cada entidad puede registrar operaciones positivas o negativas que impactan el balance general.  
Las transacciones se registran en la tabla `transactions`, que referencia las demás entidades según su tipo de operación.

---

## 📘 API REST

Las rutas principales son:

| Método | Endpoint | Descripción |
|:------:|-----------|-------------|
| `GET` | `/products/all` | Lista todos los productos |
| `GET` | `/clients/all` | Lista todos los clientes |
| `POST` | `/transactions` | Registra un movimiento de dinero |
| `POST` | `/visitors/login` | Inicia sesión y genera un JWT |
| `POST` | `/visitors/register` | Registra un nuevo visitante |
| `GET` | `/docs` | Interfaz de documentación Swagger (protegida por token) |

### Detalles adicionales:

- **Errores comunes**:
  - `400 Bad Request`: Faltan campos obligatorios en la solicitud.
  - `401 Bad Request`: Acceso no autorizado / autorización expirada.
  - `404 Not Found`: La entidad no existe.
  - `500 Internal server error`: Error interno del servidor.

---
\
Con el tiempo, el proyecto evolucionó con una nueva **implementación backend** realizada por Agustín y supevisada por Uriel, que incorpora:
- 🔐 **Autenticación y autorización JWT**
- 🤖 **Protección contra bots mediante reCAPTCHA**
- 👤 **Entidad `visitors`** para gestionar accesos de usuarios humanos
- 📜 **Documentación interactiva con Swagger UI**
- 🧱 **Middleware de seguridad** para proteger rutas críticas
- ⚙️ **Optimización de estructura del proyecto y modularización**
---
## 🔒 Seguridad

### 1. Autenticación con JWT
El acceso a las rutas de la API requiere un **token JWT** válido.  
Los tokens se obtienen tras iniciar sesión desde los formularios de **Login** o **Register**, y son verificados por un **middleware** antes de permitir el acceso.

### 2. Protección anti-bots
El sistema utiliza un **honeypot (campo oculto)** y **Google reCAPTCHA** en los formularios de registro e inicio de sesión.  
Esto asegura que solo usuarios humanos puedan generar accesos válidos.

### 3. Entidad `visitors`
Se agregó una nueva tabla `visitors` que permite:
- Registrar nuevos visitantes
- Autenticarlos mediante JWT
- Controlar el acceso a la interfaz `/docs` (Swagger UI)

---

## 📜 Documentación con Swagger

El proyecto incluye documentación interactiva disponible en `/docs`, generada con **Swagger UI**.  
Esta documentación permite probar cada endpoint directamente desde el navegador, autenticándose con el token JWT obtenido tras el login.

---

## ⚙️ Setup

### 1. Requisitos previos
- Node.js ≥ 18
- MySQL ≥ 8.0
- npm o yarn

### 2. Instalación
```bash
git clone https://github.com/tuusuario/Tiendita_DB.git
cd Tiendita_DB
npm install
```

### 3. Configuración

Crea un archivo .env en la raíz del proyecto con tus credenciales:

env \
Copiar código \
PORT=3000 \
DB_HOST=localhost \
DB_USER=root \
DB_PASSWORD=tu_contraseña \
DB_NAME=tiendita_db \
JWT_SECRET=clave_super_segura \

### 4. Ejecución

Copiar código \
 ```npm run dev ``` \
El servidor quedará disponible en:
👉 http://localhost:3000

La documentación se puede consultar en:
👉 http://localhost:3000/docs

🧠 Buenas prácticas
El proyecto sigue la Guía de buenas prácticas del equipo original, incluyendo:

- Nombres consistentes en rutas y modelos
- Validaciones de datos en cada endpoint
- Manejo de errores controlado
- Modularización del código
- Uso de middlewares reutilizables

---
