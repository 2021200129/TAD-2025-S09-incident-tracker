const express = require('express');
const router = express.Router();
const store = require('../data/store');

// GET /api/incidents - Obtener todas las incidencias
router.get('/', (req, res) => {
  const incidents = store.getAll();
  res.json(incidents);
});

// GET /api/incidents/:id - Obtener una incidencia específica
router.get('/:id', (req, res) => {
  const incident = store.getById(req.params.id);
  
  if (!incident) {
    return res.status(404).json({ error: 'Incidencia no encontrada' });
  }
  
  res.json(incident);
});

// POST /api/incidents - Crear nueva incidencia
router.post('/', (req, res) => {
  const { title, description, location } = req.body;

  // Validaciones
  if (!title || title.trim().length === 0) {
    return res.status(400).json({ error: 'El título es requerido' });
  }

  if (title.length > 100) {
    return res.status(400).json({ error: 'El título no puede exceder 100 caracteres' });
  }

  if (!description || description.trim().length === 0) {
    return res.status(400).json({ error: 'La descripción es requerida' });
  }

  if (!location || location.trim().length === 0) {
    return res.status(400).json({ error: 'La ubicación es requerida' });
  }

  // Crear incidencia
  const newIncident = store.create({
    title: title.trim(),
    description: description.trim(),
    location: location.trim()
  });

  res.status(201).json(newIncident);
});

// PUT /api/incidents/:id - Actualizar incidencia
router.put('/:id', (req, res) => {
  const { title, description, location, status } = req.body;
  
  const updates = {};
  if (title) updates.title = title.trim();
  if (description) updates.description = description.trim();
  if (location) updates.location = location.trim();
  if (status && ['pending', 'in_progress', 'resolved'].includes(status)) {
    updates.status = status;
  }

  const updatedIncident = store.update(req.params.id, updates);
  
  if (!updatedIncident) {
    return res.status(404).json({ error: 'Incidencia no encontrada' });
  }

  res.json(updatedIncident);
});

// DELETE /api/incidents/:id - Eliminar incidencia
router.delete('/:id', (req, res) => {
  const deleted = store.delete(req.params.id);
  
  if (!deleted) {
    return res.status(404).json({ error: 'Incidencia no encontrada' });
  }

  res.status(204).send();
});

module.exports = router;