# Test Práctico - Frontend MercadoLibre

Este proyecto es una implementación del test práctico para aspirantes al área de frontend de MercadoLibre. La aplicación replica la funcionalidad básica de búsqueda y visualización de productos.

## 🚀 Demo

La aplicación cuenta con tres vistas principales:

- **Página de inicio** (`/`) - Caja de búsqueda con mensaje de bienvenida
- **Resultados de búsqueda** (`/items?search=query`) - Lista de productos filtrados
- **Detalle del producto** (`/items/:id`) - Información completa del producto

## 🛠️ Stack Tecnológico

### Frontend

- **Next.js 15.4.1** - Framework de React con SSR
- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **SCSS** - Preprocesador CSS con metodología BEM
- **Redux Toolkit** - Manejo de estado global
- **RTK Query** - Data fetching y caching

### Herramientas de Desarrollo

- **Vitest** - Framework de testing
- **Testing Library** - Utilidades de testing para React
- **ESLint** - Linter para JavaScript/TypeScript
- **Prettier** - Formateador de código

## 📋 Características Implementadas

### ✅ Requisitos Básicos

- Caja de búsqueda con navegación
- Vista de resultados de búsqueda
- Vista de detalle del producto
- Diseño responsive
- URLs navegables independientes
- SEO optimizado
- Performance optimizada

### ✅ Funcionalidades Extra

- Paginación de resultados (10 por página)
- Control de estado para evitar refrescos innecesarios
- Mensaje de bienvenida (solo primera visita)
- Breadcrumb con navegación inteligente
- Galería de imágenes interactiva
- Skeleton loading states
- Error handling robusto
- Tests unitarios

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js >= 20
- npm

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/CamiloBzt/mercadolibre-frontend.git
cd mercadolibre-frontend

# Instalar dependencias
npm install
```

## 📁 Estructura del Proyecto

```

src/
├── app/ # App Router de Next.js
│ ├── items/ # Páginas de productos
│ │ ├── [id]/ # Detalle del producto
│ │ └── page.tsx # Lista de productos
│ ├── layout.tsx # Layout principal
│ └── page.tsx # Página de inicio
├── components/ # Componentes React
│ ├── atoms/ # Componentes básicos
│ ├── molecules/ # Componentes compuestos
│ ├── organisms/ # Componentes complejos
│ └── templates/ # Layouts de página
├── hooks/ # Custom hooks
├── store/ # Estado global (Redux)
│ ├── api/ # API endpoints y tipos
│ └── slices/ # Slices de estado
├── styles/ # Estilos globales y variables
├── utils/ # Utilidades y helpers
└── test/ # Configuración y mocks de testing

```

## 🔧 Funcionalidades Técnicas

### Data Fetching

- Utiliza **FakeStore API** como fuente de datos
- Transformación de datos para adaptar al formato de MercadoLibre
- Cache inteligente con RTK Query
- Manejo de estados de carga y error

### SEO y Performance

- **Metadatos dinámicos** para cada producto
- **Imágenes optimizadas** con Next.js Image
- **Loading states** con skeleton components
- **Error boundaries** para manejo de errores
- **Lazy loading** para imágenes

### Estado Global

- **Redux Toolkit** para búsquedas y paginación
- **Persistencia** de estado de búsqueda
- **Sincronización** entre URL y estado

### Testing

- **Tests unitarios** para componentes críticos
- **Coverage** reporting

## 🌐 API Endpoints Simulados

Aunque no se implementó un backend real, la aplicación simula los endpoints requeridos:

### `/api/items?q=:query`

```json
{
  "categories": ["Electrónicos", "Celulares"],
  "items": [
    {
      "id": "1",
      "title": "iPhone 13 Pro",
      "price": {
        "currency": "COP",
        "amount": 1200000,
        "decimals": 0
      },
      "picture": "https://...",
      "condition": "nuevo",
      "free_shipping": true
    }
  ]
}
```

### `/api/items/:id`

```json
{
  "item": {
    "id": "1",
    "title": "iPhone 13 Pro",
    "price": { "currency": "COP", "amount": 1200000 },
    "pictures": ["https://..."],
    "condition": "nuevo",
    "description": "Descripción del producto...",
    "attributes": [
      {
        "id": "COLOR",
        "name": "Color",
        "value_name": "Azul"
      }
    ],
    "category_path_from_root": ["Electrónicos", "Celulares"]
  }
}
```

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm run test

# Tests con watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

Los tests cubren:

- Componentes críticos (SearchBar, ProductCard, Pagination)

## 🚀 Deployment

La aplicación está desplegada en **Vercel**:

🔗 **[Ver aplicación en vivo](https://mercadolibre-frontend-zeta.vercel.app/)**

### Deployment local

```bash
# Build para producción
npm run build

# Verificar build localmente
npm run start
```

## 👥 Autor

**Juan Camilo Bazurto** - [Linkedin](https://www.linkedin.com/in/juan-camilo-b-b65379105/) - [GitHub Personal](https://github.com/CamiloBzt) - [GitHub ECI](https://github.com/juan-bazurto-eci)
