// Almacenamiento en memoria (se reinicia al reiniciar servidor)
let incidents = [];

const store = {
  // Obtener todas las incidencias
  getAll() {
    return incidents;
  },

  // Obtener una incidencia por ID
  getById(id) {
    return incidents.find(incident => incident.id === id);
  },

  // Crear nueva incidencia
  create(incidentData) {
    const newIncident = {
      id: require('crypto').randomUUID(),
      ...incidentData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    incidents.push(newIncident);
    return newIncident;
  },

  // Actualizar incidencia existente
  update(id, updates) {
    const index = incidents.findIndex(incident => incident.id === id);
    if (index === -1) return null;

    incidents[index] = {
      ...incidents[index],
      ...updates,
      id: incidents[index].id, // No permitir cambiar el ID
      createdAt: incidents[index].createdAt // No permitir cambiar fecha creación
    };
    return incidents[index];
  },

  // Eliminar incidencia
  delete(id) {
    const index = incidents.findIndex(incident => incident.id === id);
    if (index === -1) return false;
    
    incidents.splice(index, 1);
    return true;
  }
};

module.exports = store;