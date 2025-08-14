# BerneyApp Backend

## 📋 Descripción

API REST del backend de BerneyApp construida con Node.js, Express y Prisma ORM. Proporciona todos los endpoints necesarios para el sistema de gestión logística, incluyendo autenticación, gestión de usuarios, empresas, cotizaciones y datos maestros.

## 🚀 Características

### 🔐 Autenticación y Autorización
- **JWT Tokens**: Autenticación basada en tokens
- **bcryptjs**: Encriptación segura de contraseñas
- **Middleware de Roles**: Autorización basada en roles de usuario
- **Sesiones Persistentes**: Tokens con expiración configurable

### 🏢 Gestión de Empresas
- **CRUD Completo**: Crear, leer, actualizar, eliminar empresas
- **Validación de RUT**: Validación de RUT chileno
- **Información Fiscal**: Gestión de datos SII
- **Representantes**: Gestión de representantes legales y contadores

### 📋 Sistema de Cotizaciones
- **Cotizaciones Marítimas**: Gestión completa de cotizaciones marítimas
- **Cotizaciones Aéreas**: Gestión de cotizaciones aéreas
- **Cotizaciones Terrestres**: Gestión de cotizaciones terrestres
- **Estados**: Control de estados de cotización
- **Asignación**: Asignación de vendedores y operadores

### 👥 Gestión de Usuarios
- **CRUD de Usuarios**: Gestión completa de usuarios
- **Sistema de Roles**: Roles Admin, Vendedor, Operador, Gerente, Contador
- **Perfiles**: Gestión de perfiles de usuario
- **Último Acceso**: Tracking de actividad de usuarios

### 🗂️ Mantenedores (Datos Maestros)
- **Puertos**: Gestión de puertos marítimos
- **Aeropuertos**: Gestión de aeropuertos
- **Embarcaciones**: Gestión de embarcaciones
- **Tipos de Carga**: Categorización de tipos de carga
- **Condiciones**: Condiciones de flete y carga
- **Incoterms**: Términos de comercio internacional
- **Personas de Contacto**: Gestión de contactos
- **Almacenes**: Gestión de almacenes

### 📊 Base de Datos
- **Prisma ORM**: ORM moderno y type-safe
- **MySQL**: Base de datos relacional
- **Migraciones**: Sistema de migraciones automático
- **Seeding**: Datos de prueba automáticos

## 🛠️ Tecnologías

### Core
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **Prisma ORM** - ORM para base de datos

### Base de Datos
- **MySQL** - Base de datos relacional
- **Prisma Client** - Cliente de base de datos

### Autenticación
- **JWT** - JSON Web Tokens
- **bcryptjs** - Encriptación de contraseñas

### Utilidades
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Variables de entorno
- **nodemon** - Auto-restart en desarrollo

## 📁 Estructura del Proyecto

```
backend/
├── prisma/                     # Configuración de base de datos
│   ├── migrations/             # Migraciones de base de datos
│   ├── schema.prisma           # Esquema de base de datos
│   ├── seed.js                 # Datos de prueba
│   └── devSeed.js              # Datos de desarrollo
├── src/
│   ├── controllers/            # Controladores de API
│   │   ├── userController.js   # Controlador de usuarios
│   │   ├── chileanCompanyController.js
│   │   ├── mantenedoresController.js
│   │   ├── quotationController.js
│   │   └── roleController.js
│   ├── services/               # Lógica de negocio
│   │   ├── userService.js      # Servicios de usuario
│   │   ├── chileanCompanyService.js
│   │   ├── mantenedoresService.js
│   │   ├── quotationService.js
│   │   └── roleService.js
│   ├── middleware/             # Middleware personalizado
│   │   ├── adminMiddleware.js  # Middleware de admin
│   │   └── managerMiddleware.js
│   ├── auth.js                 # Configuración de autenticación
│   ├── index.js                # Punto de entrada
│   └── test.js                 # Archivo de pruebas
├── package.json                # Dependencias y scripts
├── .env                        # Variables de entorno
└── README.md                   # Este archivo
```

## 🚀 Instalación

### Prerrequisitos
- Node.js 18+
- MySQL 8.0+
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <backend-repo-url>
cd backend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env
cp .env.example .env

# Editar .env con configuración de base de datos
DATABASE_URL="mysql://user:password@localhost:3306/berneyapp"
JWT_SECRET="your-secret-key"
PORT=3000
```

4. **Configurar base de datos**
```bash
# Generar cliente Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev

# Poblar con datos de prueba
npm run seed
```

5. **Iniciar servidor**
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

El servidor estará disponible en `http://localhost:3000`

## 🔧 Scripts Disponibles

```bash
npm start        # Servidor de producción
npm run dev      # Servidor de desarrollo con nodemon
npm run seed     # Poblar base de datos con datos de prueba
npm test         # Ejecutar tests (cuando estén implementados)
```

## 📊 Esquema de Base de Datos

### Modelos Principales

#### User
```prisma
model User {
  id           Int       @id @default(autoincrement())
  firstName    String?
  lastName     String?
  username     String    @unique
  email        String?   @unique
  rut          String?   @unique
  address      String?
  password     String
  profileColor String    @default("#5160D3")
  active       Boolean   @default(true)
  lastAccess   DateTime?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  
  // Relations
  roles                    UserRole[]
  companiesAsVendor        ChileanCompany[] @relation("CompanyVendor")
  companiesAsOperator      ChileanCompany[] @relation("CompanyOperator")
  seaQuotesAsVendor        SeaQuote[] @relation("SeaQuoteVendor")
  seaQuotesAsOperator      SeaQuote[] @relation("SeaQuoteOperator")
  // ... más relaciones
}
```

#### ChileanCompany
```prisma
model ChileanCompany {
  id                      Int      @id @default(autoincrement())
  name                    String?
  rut                     String?  @unique
  CodeIATA                String?
  SiiResNumber            Int?
  SiiResDate              DateTime?
  InvoiceEnabledSii       Boolean  @default(false)
  SocialReason            String?
  email                   String?
  phoneNumber             String?
  
  // Representative information
  representativeName      String?
  representativeRut       String?
  bookSendingRut          String?
  ChecksPP                String?
  Accountantname          String?
  AccountantRut           String?
  
  // Currency information
  firstCurrency           String?
  firstMask               String?
  firstConversion         String?
  secondCurrency          String?
  secondConversion        String?
  secondMask              String?
  thirdCurrencyd          String?
  thirdConversion         String?
  thirdMask               String?
  
  // Tax information
  vat                     Decimal?  @db.Decimal(10, 2)
  retention               Decimal?  @db.Decimal(10, 2)
  
  // Designated users
  designatedVendorId      Int?
  designatedOperatorId    Int?
  
  createdAt               DateTime @default(now())
  updatedAt               DateTime @updatedAt
  
  // Relations
  designatedVendor        User?    @relation("CompanyVendor", fields: [designatedVendorId], references: [id])
  designatedOperator      User?    @relation("CompanyOperator", fields: [designatedOperatorId], references: [id])
  seaQuotes               SeaQuote[]
  airQuotes               AirQuote[] @relation("AirQuoteClient")
  landQuotes              LandQuote[] @relation("LandQuoteClient")
}
```

#### SeaQuote (Ejemplo de Cotización)
```prisma
model SeaQuote {
  id                      Int      @id @default(autoincrement())
  quoteNumber             String?  @unique
  status                  String   @default("in_progress")
  
  // Client information
  clientChileanCompanyId  Int?
  clientContactPersonId   Int?
  
  // Designated users
  designatedVendorId      Int?
  designatedOperatorId    Int?
  
  // Quote details
  originPortId            Int?
  destinationPortId       Int?
  vesselId                Int?
  cargoTypeId             Int?
  cargoConditionId        Int?
  freightConditionId      Int?
  incotermId              Int?
  purchaseClauseId        Int?
  
  // Financial information
  totalAmount             Decimal? @db.Decimal(10, 2)
  currency                String?
  
  createdAt               DateTime @default(now())
  updatedAt               DateTime @updatedAt
  updatedById             Int?
  
  // Relations
  clientChileanCompany    ChileanCompany? @relation(fields: [clientChileanCompanyId], references: [id])
  clientContactPerson     ContactPerson? @relation(fields: [clientContactPersonId], references: [id])
  designatedVendor        User? @relation("SeaQuoteVendor", fields: [designatedVendorId], references: [id])
  designatedOperator      User? @relation("SeaQuoteOperator", fields: [designatedOperatorId], references: [id])
  updatedBy               User? @relation("SeaQuoteUpdatedBy", fields: [updatedById], references: [id])
  // ... más relaciones con mantenedores
}
```

## 🔌 Endpoints de API

### Autenticación
```
POST   /api/login              # Login de usuario
POST   /api/logout             # Logout de usuario
GET    /api/me                 # Obtener usuario actual
PUT    /api/profile            # Actualizar perfil
```

### Usuarios
```
GET    /api/users              # Listar usuarios
GET    /api/users/:id          # Obtener usuario específico
POST   /api/users              # Crear usuario
PUT    /api/users/:id          # Actualizar usuario
DELETE /api/users/:id          # Eliminar usuario
```

### Empresas Chilenas
```
GET    /api/chilean-companies              # Listar empresas
GET    /api/chilean-companies/:id          # Obtener empresa específica
POST   /api/chilean-companies              # Crear empresa
PUT    /api/chilean-companies/:id          # Actualizar empresa
DELETE /api/chilean-companies/:id          # Eliminar empresa
```

### Cotizaciones
```
GET    /api/sea-quotes                     # Listar cotizaciones marítimas
GET    /api/sea-quotes/:id                 # Obtener cotización específica
POST   /api/sea-quotes                     # Crear cotización marítima
PUT    /api/sea-quotes/:id                 # Actualizar cotización
DELETE /api/sea-quotes/:id                 # Eliminar cotización

GET    /api/air-quotes                     # Cotizaciones aéreas
GET    /api/land-quotes                    # Cotizaciones terrestres
```

### Mantenedores
```
GET    /api/ports                          # Puertos
GET    /api/airports                       # Aeropuertos
GET    /api/vessels                        # Embarcaciones
GET    /api/cargo-types                    # Tipos de carga
GET    /api/cargo-conditions               # Condiciones de carga
GET    /api/freight-conditions             # Condiciones de flete
GET    /api/incoterms                      # Incoterms
GET    /api/contact-persons                # Personas de contacto
GET    /api/contact-types                  # Tipos de contacto
GET    /api/warehouses                     # Almacenes
GET    /api/package-types                  # Tipos de bulto
GET    /api/purchase-clauses               # Cláusulas de compra
```

### Roles
```
GET    /api/roles                          # Listar roles
GET    /api/roles/:id                      # Obtener rol específico
POST   /api/roles                          # Crear rol
PUT    /api/roles/:id                      # Actualizar rol
DELETE /api/roles/:id                      # Eliminar rol
```

## 🔐 Autenticación y Autorización

### Flujo de Autenticación
1. Cliente envía credenciales a `/api/login`
2. Servidor valida credenciales con bcryptjs
3. Se genera JWT token con información del usuario
4. Token se devuelve al cliente
5. Cliente incluye token en header `Authorization: Bearer <token>`

### Middleware de Autorización
```javascript
// Ejemplo de middleware de admin
const adminMiddleware = async (req, res, next) => {
  try {
    const user = req.user;
    const hasAdminRole = user.roles.some(role => role.name === 'Admin');
    
    if (!hasAdminRole) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ error: 'Authorization error' });
  }
};
```

### Roles y Permisos
- **Admin**: Acceso completo a todas las funcionalidades
- **Gerente**: Gestión de usuarios y empresas
- **Vendedor**: Creación y gestión de cotizaciones
- **Operador**: Gestión de operaciones
- **Contador**: Acceso a módulo contable

## 🗂️ Controladores y Servicios

### Estructura de Controladores
```javascript
// Ejemplo: userController.js
const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const auth = require('../auth');

// Middleware de autenticación
router.use(auth);

// Endpoints
router.get('/users', async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

### Estructura de Servicios
```javascript
// Ejemplo: userService.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

class UserService {
  async getAllUsers() {
    return await prisma.user.findMany({
      include: {
        roles: {
          include: {
            role: true
          }
        }
      }
    });
  }
  
  async createUser(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    return await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword
      }
    });
  }
}

module.exports = new UserService();
```

## 📊 Migraciones y Seeding

### Crear Migración
```bash
npx prisma migrate dev --name add_new_field
```

### Aplicar Migraciones
```bash
# Desarrollo
npx prisma migrate dev

# Producción
npx prisma migrate deploy
```

### Seeding de Datos
```bash
# Ejecutar seed principal
npm run seed

# Ejecutar seed de desarrollo
node prisma/devSeed.js
```

## 🧪 Testing

### Configuración de Tests
```bash
# Instalar dependencias de testing (cuando estén implementadas)
npm install --save-dev jest supertest

# Ejecutar tests
npm test
```

### Estructura de Tests
```
src/
├── __tests__/
│   ├── controllers/
│   ├── services/
│   ├── middleware/
│   └── integration/
```

## 🔧 Configuración

### Variables de Entorno (.env)
```env
# Base de datos
DATABASE_URL="mysql://user:password@localhost:3306/berneyapp"

# Autenticación
JWT_SECRET="your-super-secret-key"
JWT_EXPIRES_IN="24h"

# Servidor
PORT=3000
NODE_ENV=development

# CORS
CORS_ORIGIN="http://localhost:5173"
```

### Prisma (prisma/schema.prisma)
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

## 📦 Despliegue

### Producción
```bash
# Build de producción
npm run build

# Iniciar servidor
npm start
```

### Docker (Opcional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🐛 Debugging

### Logs
```javascript
// Logs de desarrollo
console.log('Debug info:', data);

// Logs de error
console.error('Error occurred:', error);
```

### Herramientas
- **Prisma Studio**: `npx prisma studio` para explorar base de datos
- **Node Inspector**: Para debugging de código
- **Postman/Insomnia**: Para testing de endpoints

## 🔒 Seguridad

### Medidas Implementadas
- **bcryptjs**: Encriptación de contraseñas
- **JWT**: Tokens seguros con expiración
- **CORS**: Configuración de origen permitido
- **Validación**: Validación de datos de entrada
- **Sanitización**: Limpieza de datos de entrada

### Buenas Prácticas
- Usar variables de entorno para configuraciones sensibles
- Validar todos los datos de entrada
- Implementar rate limiting en producción
- Usar HTTPS en producción
- Mantener dependencias actualizadas

## 🤝 Contribución

1. Fork el repositorio
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

### Guías de Contribución
- Seguir las convenciones de código existentes
- Agregar tests para nuevas funcionalidades
- Documentar nuevos endpoints
- Usar commits semánticos

## 📝 Licencia

Este proyecto está bajo la Licencia ISC.

---

**Desarrollado con Node.js, Express y Prisma**
