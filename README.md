# Sistema de Registro de Incidencias Ambientales

API REST para el registro y gestión de incidencias ambientales, alineado con los ODS 11 (Ciudades Sostenibles) y 13 (Acción por el Clima).

## 🚀 Tecnologías

- Node.js 20 LTS
- Express.js
- Jest + Supertest (testing)
- GitHub Actions (CI)
- Azure App Service

## 📋 Endpoints

### GET /api/incidents
Obtiene todas las incidencias registradas.

**Respuesta:**
```json
[
  {
    "id": "uuid",
    "title": "Acumulación de basura",
    "description": "Basura en esquina de Av. Principal",
    "location": "Av. Principal #123",
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### POST /api/incidents
Crea una nueva incidencia.

**Body:**
```json
{
  "title": "Título de la incidencia",
  "description": "Descripción detallada",
  "location": "Ubicación exacta"
}
```

**Respuesta:** 201 Created con la incidencia creada.

### GET /api/incidents/:id
Obtiene una incidencia específica por ID.

### PUT /api/incidents/:id
Actualiza una incidencia existente.

### DELETE /api/incidents/:id
Elimina una incidencia.

## 🧪 Ejecutar Tests

```bash
npm test
```

## 🏃 Ejecutar Localmente

```bash
npm install
npm start
```

La API estará disponible en `http://localhost:3000`

## 🔄 CI/CD

- **CI:** GitHub Actions ejecuta tests automáticamente en cada push
- **CD:** Azure App Service despliega automáticamente desde la rama main

## 📦 Deployment

Aplicación desplegada en: `https://incident-tracker-[nombre].azurewebsites.net`

## 👨‍💻 Autor

Proyecto desarrollado para el curso Taller de Aplicaciones Distribuidas - D09 DevSecOps: CI