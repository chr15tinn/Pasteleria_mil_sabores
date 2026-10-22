# 🍰 Pastelería 1000 Sabores

Proyecto web desarrollado para **Pastelería 1000 Sabores**, orientado a la creación de una tienda online de productos de pastelería.

El proyecto comenzó como una aplicación desarrollada con HTML, CSS, JavaScript y Bootstrap, y posteriormente fue migrado a **React con Vite**, incorporando arquitectura basada en componentes, diseño responsivo, roles de usuario, almacenamiento local, pruebas unitarias y un módulo de administración.

---

## 📋 Descripción del proyecto

Pastelería 1000 Sabores es una aplicación web que permite visualizar y comprar productos como tortas, postres, productos sin azúcar, opciones sin gluten, productos veganos y tortas especiales.

La aplicación cuenta con funcionalidades tanto para clientes como para administradores.

### 👤 Funcionalidades para clientes

- Visualización del catálogo de productos.
- Búsqueda de productos.
- Filtro por categorías.
- Visualización de ofertas.
- Vista de detalle de cada producto.
- Carrito de compras.
- Registro de usuarios.
- Inicio y cierre de sesión.
- Perfil de usuario.
- Consulta de pedidos.
- Seguimiento del estado de una compra.
- Proceso de checkout.
- Registro de dirección y datos de entrega.
- Selección de medio de pago.
- Confirmación de compra.
- Blog.
- Sección Nosotros.
- Formulario de contacto.

---

## 🔐 Registro y autenticación

El sistema utiliza autenticación simulada mediante `localStorage`.

Los nuevos usuarios son registrados con el rol:

```text
CLIENTE
```

Para el registro solamente se permiten correos pertenecientes a los siguientes dominios institucionales:

```text
@duocuc.cl
@duoc.cl
@profesor.duocuc.cl
@profesor.duoc.cl
```

Correos pertenecientes a otros servicios, como Gmail, Hotmail, Outlook o Yahoo, son rechazados por el sistema.

---

## 🎁 Beneficios para clientes

El proyecto contempla beneficios especiales definidos para Pastelería 1000 Sabores.

### 🎉 Código promocional FELICES50

El código:

```text
FELICES50
```

corresponde a una promoción por el aniversario de Pastelería 1000 Sabores.

Entrega un:

```text
10% de descuento
```

### 🎂 Beneficio de cumpleaños

Los usuarios registrados con correo institucional Duoc pueden acceder al beneficio de una torta gratis durante su cumpleaños, de acuerdo con la lógica implementada en la aplicación.

---

## 🛒 Carrito de compras

La aplicación posee un carrito desarrollado mediante React Context.

Permite:

- Agregar productos.
- Eliminar productos.
- Modificar cantidades.
- Calcular el subtotal.
- Visualizar la cantidad total de productos.
- Vaciar el carrito.
- Mantener la información mediante `localStorage`.

---

## 💳 Proceso de compra

El flujo general de compra es:

```text
Inicio
   │
   ▼
Catálogo de productos
   │
   ▼
Selección de producto
   │
   ▼
Agregar al carrito
   │
   ▼
Revisión del carrito
   │
   ▼
Checkout
   │
   ▼
Datos de entrega
   │
   ▼
Medio de pago
   │
   ▼
Confirmación de compra
   │
   ▼
Mis pedidos
   │
   ▼
Seguimiento del pedido
```

Si el usuario se encuentra autenticado, parte de sus datos pueden utilizarse automáticamente durante el proceso de compra.

---

# 👨‍💼 Módulo de Administración

El proyecto incorpora un rol:

```text
ADMIN
```

que posee acceso a funcionalidades protegidas.

La aplicación incluye un usuario administrador de demostración:

```text
Correo: admin@1000sabores.cl
Contraseña: Admin123
```

El administrador puede acceder a un Dashboard con información general de la tienda.

---

## 📊 Dashboard administrativo

El panel muestra información como:

- Cantidad de productos.
- Cantidad de usuarios.
- Cantidad de pedidos.
- Total acumulado de ventas.
- Productos con stock crítico.
- Accesos rápidos a funcionalidades administrativas.

---

## 🍰 Gestión de productos

El administrador puede realizar operaciones CRUD sobre los productos.

Esto permite:

- Crear productos.
- Visualizar productos.
- Editar productos.
- Eliminar productos.
- Modificar stock.
- Definir ofertas.
- Detectar productos con stock crítico.

---

## 📦 Gestión de pedidos

El administrador puede consultar los pedidos realizados y modificar su estado.

Los estados utilizados son:

```text
Pedido recibido
En preparación
En camino
Entregado
```

Los cambios también pueden ser consultados posteriormente por el cliente desde el seguimiento de pedidos.

---

## 👥 Gestión de usuarios

El administrador puede visualizar los usuarios registrados y gestionar información relacionada con ellos.

Entre las funcionalidades disponibles se encuentran:

- Visualizar usuarios.
- Consultar correo.
- Consultar rol.
- Consultar beneficios.
- Cambiar roles.
- Eliminar usuarios.

---

## 📈 Reportes

La aplicación cuenta con una sección de reportes administrativos.

Se pueden visualizar datos como:

- Total de ventas.
- Cantidad de pedidos.
- Cantidad de productos vendidos.
- Usuarios registrados.
- Productos más vendidos.
- Productos con stock crítico.

---

# 🚀 Tecnologías utilizadas

## React

La interfaz principal del proyecto fue desarrollada utilizando React.

Se utilizan:

- Componentes reutilizables.
- Props.
- Estado.
- Hooks.
- Context.
- Renderizado condicional.
- Manejo de eventos.

---

## Vite

Vite se utiliza como herramienta de construcción y entorno de desarrollo para React.

Permite ejecutar el proyecto mediante:

```bash
npm run dev
```

---

## React Router DOM

Se utiliza para manejar la navegación entre las diferentes vistas de la aplicación.

Entre las rutas disponibles se encuentran:

```text
/
/productos
/productos/:id
/categorias
/ofertas
/carrito
/checkout
/compra-exitosa
/login
/registro
/perfil
/pedidos
/seguimiento
/blog
/blog/:id
/nosotros
/contacto
/admin
/admin/productos
/admin/pedidos
/admin/usuarios
/admin/reportes
```

---

## Bootstrap 5

Bootstrap se utiliza para apoyar el desarrollo de una interfaz responsiva.

Se utilizan componentes como:

- Navbar.
- Cards.
- Formularios.
- Botones.
- Dropdowns.
- Badges.
- Tablas.
- Alertas.
- Grid responsive.

---

## CSS3

Se utilizan estilos propios para mantener la identidad visual de Pastelería 1000 Sabores.

Los colores principales utilizados son:

```text
#FFF5E1
#FFC0CB
#8B4513
#5D4037
```

---

## Google Fonts

Se utilizan principalmente las fuentes:

```text
Pacifico
Lato
```

`Pacifico` se utiliza para elementos decorativos y títulos, mientras que `Lato` se utiliza para mantener una lectura clara en el contenido general.

---

# 🧩 Atomic Design

El proyecto utiliza **Atomic Design** para organizar los componentes.

La estructura considera:

### Atoms

Componentes simples y reutilizables.

Ejemplos:

```text
Button
Price
```

### Molecules

Combinaciones de componentes pequeños.

Ejemplos:

```text
ProductCard
SearchBar
CartItem
BlogCard
```

### Organisms

Componentes de mayor tamaño que agrupan varias partes de la interfaz.

Ejemplos:

```text
Navbar
ProductGrid
```

### Pages

Representan las vistas completas utilizadas por React Router.

---

# 🏗️ Patrón de diseño

El proyecto utiliza el patrón:

```text
Repository Pattern
```

Este patrón permite separar la lógica relacionada con el almacenamiento y gestión de productos de los componentes visuales.

El repositorio de productos permite realizar operaciones como:

```text
getAll()
getById()
create()
update()
remove()
```

Esto ayuda a mantener el código más ordenado y facilita su mantenimiento.

---

# 💾 Persistencia de información

Actualmente el proyecto utiliza `localStorage` como almacenamiento simulado.

Entre los datos almacenados se encuentran:

- Usuarios.
- Usuario autenticado.
- Productos.
- Carrito.
- Pedidos.
- Última compra.
- Mensajes de contacto.

Este almacenamiento permite simular persistencia sin utilizar todavía una base de datos real.

---

# 🧪 Pruebas unitarias

El proyecto utiliza:

```text
Vitest
```

junto con:

```text
Testing Library
jsdom
```

Las pruebas permiten verificar diferentes partes de la aplicación.

Actualmente se prueban funcionalidades relacionadas con:

- Renderizado de componentes.
- Props.
- Eventos.
- Barra de búsqueda.
- ProductCard.
- Autenticación.
- Registro.
- Restricción de dominios.
- Repository Pattern.
- CRUD de productos.
- Carrito de compras.
- Estado.
- Cálculo de subtotal.
- Lógica de beneficios y descuentos.

Para ejecutar las pruebas:

```bash
npm test
```

Para ejecutarlas una sola vez:

```bash
npm run test:run
```

Para generar el reporte de cobertura:

```bash
npm run test:coverage
```

```registro de testing:
npm run test:coverage 2>&1 | Tee-Object -FilePath ".\resultado-testing.txt"
```


---

## 📊 Cobertura de pruebas

En una de las mediciones realizadas durante el desarrollo se obtuvo aproximadamente:

```text
Statements: 89,28%
Branches:   68,51%
Functions:  95,12%
Lines:      89,28%
```

Estos resultados pueden cambiar a medida que se incorporan nuevas funcionalidades y pruebas al proyecto.

---

# 📁 Estructura principal

La versión actual desarrollada con React se encuentra en:

```text
Pasteleria_mil_sabores/
│
├── pasteleria-react/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   ├── molecules/
│   │   │   └── organisms/
│   │   │
│   │   ├── context/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── tests/
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── assets/
├── Pago.html
├── login.html
├── nosotros.html
├── pasteleria.html
├── registro.html
│
└── README.md
```

Los archivos HTML ubicados fuera de `pasteleria-react` corresponden a la primera versión del proyecto y se mantienen como referencia del desarrollo realizado anteriormente.

La versión principal actual se encuentra dentro de:

```text
pasteleria-react
```

---

# 🎂 Categorías de productos

Actualmente el catálogo contempla categorías como:

```text
Tortas Cuadradas
Tortas Circulares
Postres Individuales
Productos Sin Azúcar
Pastelería Tradicional
Productos Sin Gluten
Productos Veganos
Tortas Especiales
```

Estas categorías permiten organizar y filtrar los productos dentro de la tienda.

---

# 🎨 Diseño responsivo

La aplicación fue diseñada para adaptarse a diferentes tamaños de pantalla utilizando:

- Bootstrap Grid.
- Clases responsivas.
- CSS personalizado.
- Navbar adaptable.
- Cards responsivas.
- Tablas con desplazamiento horizontal cuando es necesario.

La identidad visual utiliza tonos crema, marrones y rosados relacionados con la temática de una pastelería.

---

# ⚙️ Instalación y ejecución

Para ejecutar el proyecto se requiere tener instalado:

```text
Node.js
npm
```

Después de descargar o clonar el repositorio, ingresar a:

```bash
cd pasteleria-react
```

Instalar las dependencias:

```bash
npm install
```

Ejecutar el proyecto:

```bash
npm run dev
```

Vite mostrará una dirección local similar a:

```text
http://localhost:5173
```

Abrir esa dirección en el navegador.

---

# ✅ Estado actual del proyecto

Actualmente el proyecto cuenta con:

- React + Vite.
- Navegación mediante React Router.
- Atomic Design.
- Repository Pattern.
- Catálogo de productos.
- Búsqueda y categorías.
- Ofertas.
- Carrito.
- Registro e inicio de sesión.
- Restricción de correos institucionales.
- Roles CLIENTE y ADMIN.
- Perfil.
- Checkout.
- Pedidos.
- Seguimiento.
- Dashboard administrativo.
- CRUD de productos.
- Gestión de pedidos.
- Gestión de usuarios.
- Reportes.
- Blog.
- Nosotros.
- Contacto.
- Pruebas unitarias con Vitest.
- Reporte de cobertura.
- Diseño responsivo con Bootstrap y CSS personalizado.

---

## 👨‍💻 Proyecto académico

Proyecto desarrollado como parte de una evaluación académica, continuando y mejorando la versión realizada anteriormente con HTML, CSS y JavaScript mediante la incorporación de React, componentes reutilizables, arquitectura frontend, patrones de diseño y pruebas unitarias.
