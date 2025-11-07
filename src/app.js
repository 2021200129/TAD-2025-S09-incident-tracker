const express = require('express');
const incidentsRouter = require('./routes/incidents');

const app = express();
const PORT = process.env.PORT || 3000;

// modificación

// Middleware para parsear JSON
app.use(express.json());

// Middleware para logging simple
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Ruta de health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Registro de Incidencias Ambientales',
    status: 'running',
    endpoints: {
      incidents: '/api/incidents'
    }
  });
});

// Montar rutas de incidencias
app.use('/api/incidents', incidentsRouter);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

// Solo iniciar servidor si no estamos en modo test
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;