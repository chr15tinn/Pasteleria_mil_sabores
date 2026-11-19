# 🍰 Pastelería 1000 Sabores

Aplicación web desarrollada para la asignatura **Desarrollo Fullstack II (DSY1104)**, correspondiente a la Evaluación Parcial N°3.

El proyecto consiste en una tienda online para **Pastelería 1000 Sabores**, integrando un frontend desarrollado con **React + Vite** y un backend construido con **Spring Boot**, conectado a una base de datos **MySQL**.

La solución incorpora gestión de productos, usuarios, compras, pedidos, seguimiento, autenticación mediante JWT, control de acceso por roles, documentación de APIs mediante Swagger y pruebas automatizadas.

---

## 📌 Objetivo del proyecto

Desarrollar una aplicación web fullstack que permita administrar una tienda online de pastelería, integrando correctamente frontend, backend y base de datos.

El sistema permite:

- Consultar productos disponibles.
- Visualizar el detalle de cada producto.
- Registrar usuarios.
- Iniciar sesión.
- Mantener la sesión activa después de recargar la página.
- Administrar un carrito de compras.
- Realizar compras.
- Registrar pedidos en MySQL.
- Consultar pedidos realizados.
- Realizar seguimiento de pedidos.
- Administrar productos.
- Administrar usuarios.
- Administrar pedidos.
- Consultar reportes.
- Restringir funcionalidades según el rol del usuario.

---

# 🛠️ Tecnologías utilizadas

## Frontend

- React
- Vite
- JavaScript
- Bootstrap 5
- React Router
- Context API
- Fetch API
- Vitest
- React Testing Library

## Backend

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- JWT
- BCrypt
- Maven
- Swagger / OpenAPI

## Base de datos

- MySQL

## Herramientas

- Visual Studio Code
- Git
- GitHub
- MySQL Workbench
- Swagger UI
- Postman / navegador para pruebas de API

---

# 🏗️ Arquitectura general

El proyecto utiliza una arquitectura separada en tres componentes principales:

```text
Frontend React
      │
      │ HTTP / REST
      ▼
Backend Spring Boot
      │
      │ JPA
      ▼
Base de datos MySQL
```

El frontend consume los servicios REST disponibles en el backend.

El backend procesa la lógica de negocio, gestiona la seguridad y realiza las operaciones sobre la base de datos.

---

# 📂 Estructura general del proyecto

```text
Pasteleria_mil_sabores/
│
├── pasteleria-react/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   └── tests/
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── pasteleria-backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── pasteleria_backend/
│   │   │   │       ├── config/
│   │   │   │       ├── controller/
│   │   │   │       ├── dto/
│   │   │   │       ├── model/
│   │   │   │       ├── repository/
│   │   │   │       ├── security/
│   │   │   │       └── service/
│   │   │   │
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   │
│   │   └── test/
│   │
│   └── pom.xml
│
└── README.md
```

---

# 👥 Roles del sistema

La aplicación trabaja con tres roles principales.

## 👤 CLIENTE

El cliente puede:

- Ingresar a la tienda.
- Visualizar productos.
- Consultar el detalle de los productos.
- Agregar productos al carrito.
- Modificar cantidades.
- Eliminar productos del carrito.
- Realizar una compra.
- Consultar sus pedidos.
- Revisar el seguimiento de un pedido.
- Mantener su sesión activa después de recargar la página.

El cliente no puede acceder a las funciones administrativas.

---

## 🧾 VENDEDOR

El vendedor
