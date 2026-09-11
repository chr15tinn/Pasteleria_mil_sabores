# Pasteleria_mil_sabores
# 🍰 Pastelería Mil Sabores

Proyecto web desarrollado para la **Pastelería Mil Sabores**, cuyo objetivo es crear una plataforma sencilla y amigable para visualizar productos de pastelería, registrarse, iniciar sesión y realizar un proceso de compra.

El proyecto corresponde a una aplicación web desarrollada utilizando **HTML, CSS, JavaScript y Bootstrap**, incorporando diferentes páginas y funcionalidades orientadas a una tienda online.

---

## 📋 Descripción del proyecto

**Pastelería Mil Sabores** es una tienda virtual enfocada en la venta de productos de pastelería, como tortas, postres y productos especiales.

La aplicación permite al usuario:

* 🏠 Acceder a la página principal.
* 🍰 Visualizar productos disponibles.
* 🔎 Filtrar productos por categorías.
* 🛒 Agregar productos al carrito.
* 👤 Registrarse como usuario.
* 🔐 Iniciar sesión.
* 💳 Realizar un proceso de pago.
* 📦 Registrar información relacionada con el envío.
* 🏪 Conocer información sobre la pastelería mediante la sección "Nosotros".

---

## 🚀 Tecnologías utilizadas

El proyecto utiliza las siguientes tecnologías:

### HTML5

Utilizado para construir la estructura y contenido de las diferentes páginas del sitio web.

### CSS3

Utilizado para personalizar el diseño, colores, tipografías, distribución y apariencia general de la aplicación.

### JavaScript

Utilizado para agregar funcionalidades e interactividad al sitio, principalmente en procesos relacionados con:

* Carrito de compras.
* Filtros de productos.
* Formularios.
* Validaciones.
* Proceso de pago.
* Almacenamiento de información mediante `localStorage` y `sessionStorage`.

### Bootstrap 5

Se utiliza **Bootstrap 5** para facilitar el desarrollo de la interfaz y conseguir un diseño adaptable a diferentes tamaños de pantalla.

La aplicación utiliza componentes como:

* Navbar.
* Cards.
* Formularios.
* Botones.
* Dropdowns.
* Alertas.
* Sistema de columnas y filas.

### Google Fonts

Se utilizan las fuentes:

* **Pacifico**
* **Lato**

para mejorar la presentación visual de la aplicación.

---

## 📁 Estructura del proyecto

```text
Pasteleria_mil_sabores/
│
├── assets/
│   └── filters.css
│
├── Pago.html
├── login.html
├── nosotros.html
├── pasteleria.html
├── registro.html
│
└── README.md
```

---

## 📄 Páginas del proyecto

### 🏠 `pasteleria.html`

Página principal de la aplicación.

En ella se muestran los productos disponibles de la pastelería mediante tarjetas.

Cada producto puede mostrar:

* Imagen.
* Nombre.
* Descripción.
* Precio.
* Categoría.
* Botón para agregar al carrito.

También contiene el menú de navegación y las categorías de productos.

---

### 👤 `registro.html`

Página destinada al registro de nuevos usuarios.

El formulario permite ingresar información como:

* Nombre.
* Apellido.
* Usuario.
* Correo electrónico.
* Contraseña.
* Otros datos solicitados por el formulario.

Se utilizan componentes de Bootstrap para la estructura y validación visual del formulario.

---

### 🔐 `login.html`

Página de inicio de sesión.

El usuario puede ingresar:

* Correo electrónico.
* Usuario.
* Contraseña.

La página incluye un enlace para registrarse en caso de que el usuario todavía no tenga una cuenta.

---

### 💳 `Pago.html`

Página destinada al proceso de pago y finalización de la compra.

El formulario permite ingresar información relacionada con:

* Correo electrónico.
* Contraseña.
* Dirección.
* Descripción de la dirección.
* Región.
* Comuna.
* Código postal.
* Medio de pago.

Los medios de pago disponibles actualmente son:

* Débito.
* Crédito.

Al finalizar la compra, se muestra un mensaje de confirmación con información como el monto, medio de pago y dirección de envío.

Además, la información de la última compra puede almacenarse en `localStorage`.

---

### 🏪 `nosotros.html`

Página informativa sobre la Pastelería Mil Sabores.

Incluye información relacionada con la historia y características de la pastelería, además de elementos visuales para complementar la presentación.

---

## 🎂 Categorías de productos

El sistema contempla diferentes categorías de productos:

* Tortas Cuadradas.
* Tortas Circulares.
* Postres Individuales.
* Productos Sin Azúcar.
* Pastelería Tradicional.
* Productos sin gluten.
* Productos Vegana.
* Tortas Especiales.

Estas categorías se utilizan para organizar y filtrar los productos disponibles.

---

## 🛒 Carrito de compras

El proyecto incorpora un sistema de carrito de compras para permitir que los usuarios seleccionen productos antes de realizar una compra.

El carrito utiliza almacenamiento del navegador para mantener información relacionada con los productos seleccionados.

Se utilizan mecanismos como:

```javascript
localStorage
sessionStorage
```

Al finalizar correctamente una compra, el sistema puede limpiar la información almacenada del carrito.

---

## 💰 Proceso de compra

El flujo general de compra es:

```text
Inicio
  │
  ▼
Visualización de productos
  │
  ▼
Selección de productos
  │
  ▼
Agregar productos al carrito
  │
  ▼
Revisión del carrito
  │
  ▼
Proceso de pago
  │
  ▼
Ingreso de datos de envío
  │
  ▼
Selección del medio de pago
  │
  ▼
Finalizar compra
  │
  ▼
Confirmación de compra
```

---

## 🎨 Diseño

La interfaz utiliza una estética relacionada con una pastelería, utilizando principalmente tonos claros y marrones.

El color principal utilizado es:

```text
#5d4037
```

El fondo principal utiliza:

```text
#FFF5E1
```

Además, se utilizan las fuentes **Pacifico** y **Lato** para dife
