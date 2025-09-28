# Tiendita

**Proyecto backend para llevar el registro contable de una tienda. Este proyecto utiliza [Node.js](http://nodejs.org) y [Express](https://expressjs.com) .**

**Este proyecto tiene una [Guía de buenas prácticas](https://github.com/UrielAraujoGit/tiendita-backend/blob/master/STYLEGUIDE.md).**

## Contenidos

- [Acerca del proyecto](#acerca-del-proyecto)
- [Arquitectura](#arquitectura-del-proyecto)
- [Setup](#setup)

<h2 id="acerca-del-proyecto">Acerca del proyecto</h2>

Este es un proyecto creado con [Node.js](https://nodejs.org/), [Express](https://expressjs.com) y [SQL](https://en.wikipedia.org/wiki/SQL).
En el cuál se puede llevar registro de los movimientos de dinero de una tienda. Dichos movimientos están separados en 3 entidades:

- Productos (products).
- Clientes (clients).
- Proveedores (suppliers).
- Empleados (employees).

<h2 id="arquitectura-del-proyecto">Arquitectura</h2>

### Modelo de datos

Cada una de las entidades anteriormente mencionadas puede registrar un movimiento positivo o negativo de dinero.

Estos movimientos se registran en una tabla `transactions` de la siguiente manera:

[Modelo de datos en SQL](https://media.discordapp.net/attachments/1253829245348745346/1268362673356017787/image.png?ex=66e6d10a&is=66e57f8a&hm=2fa6836255afe52f64e3f2092b8f5c848ca51622cd0e79a2d51b7c523a1087b1&=&format=webp&quality=lossless&width=687&height=430)

### API

Este proyecto expone una [API](https://en.wikipedia.org/wiki/API) por la cuál se podrá interactuar con el sistema, las diferentes entidades y registrar los movimientos de dinero deseados.

Esta API se divide en diferentes rutas, las cuales son:

- /products
- /clients
- /suppliers
- /employees
- /transactions

las diferentes rutas aplican la siguiente estructura de [`endpoints`](https://en.wikipedia.org/wiki/Endpoint_interface), utilizando el [Protocolo HTTP](https://en.wikipedia.org/wiki/HTTP):

### Arquitectura de endpoints

| Método   | Endpoint       | Descripción                                           | Cuerpo (Request) | Respuesta (Response)        |
| -------- | -------------- | ----------------------------------------------------- | ---------------- | --------------------------- |
| `GET`    | `/entidad/all` | Obtener la lista de todos los elementos de la entidad | N/A              | Lista de entidad            |
| `GET`    | `/entidad/:id` | Obtener un elemento específico                        | N/A              | Detalle de la entidad       |
| `POST`   | `/entidad`     | Crear un nuevo elemento de la entidad                 | `{...}`          | Entidad creada              |
| `PUT`    | `/entidad/:id` | Actualizar un elemento existente                      | `{...}`          | Entidad actualizada         |
| `DELETE` | `/entidad/:id` | Eliminar un elemento                                  | N/A              | Confirmación de eliminación |

### Detalles adicionales:

- **Errores comunes**:
  - `400 Bad Request`: Faltan campos obligatorios en la solicitud.
  - `404 Not Found`: La entidad no existe.
  - `500 Internal server error`: Error interno del servidor.

<h2 id="setup">Setup</h2>

Para poder ejecutar el proyecto, se necesitan segir los siguentes pasos:

- Descargar el repositorio.
- Tener instalado [Node.js](https://nodejs.org)
- Abrir una terminal en la carpeta raíz del repositorio
- Ejecutar el comando:

```console
npm install
```

Una vez realizados los pasos anteriores, solo resta ejecutar el proyecto con el siguiente comando:

```console
npm run dev
```

## Contribuidores

- **Elías Suárez** - [SuspiciousSchrodinger](https://github.com/SuspiciousSchrodinger)
- **Nora Villanueva** - [VillanuevaNoraB](https://github.com/VillanuevaNoraB)
- **Agustín Marrero** - [amarrero86mr](https://github.com/amarrero86mr)

[Guía de buenas prácticas](https://github.com/UrielAraujoGit/tiendita-backend/blob/master/STYLEGUIDE.md)
