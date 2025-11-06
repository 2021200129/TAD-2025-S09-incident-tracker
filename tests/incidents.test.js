const request = require('supertest');
const app = require('../src/app');

describe('API de Incidencias', () => {
  
  // Test 1: GET /api/incidents debe retornar array
  test('GET /api/incidents - debe retornar array vacío inicialmente', async () => {
    const response = await request(app).get('/api/incidents');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test 2: POST /api/incidents debe crear incidencia
  test('POST /api/incidents - debe crear nueva incidencia', async () => {
    const newIncident = {
      title: 'Basura acumulada',
      description: 'Acumulación de basura en esquina',
      location: 'Av. Principal #123'
    };

    const response = await request(app)
      .post('/api/incidents')
      .send(newIncident);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('status', 'pending');
    expect(response.body.title).toBe(newIncident.title);
  });

  // Test 3: POST sin título debe fallar
  test('POST /api/incidents - debe fallar sin título', async () => {
    const invalidIncident = {
      description: 'Descripción sin título',
      location: 'Algún lugar'
    };

    const response = await request(app)
      .post('/api/incidents')
      .send(invalidIncident);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  // Test 4: GET /:id debe retornar incidencia específica
  test('GET /api/incidents/:id - debe retornar incidencia específica', async () => {
    // Primero crear una incidencia
    const newIncident = {
      title: 'Test incidencia',
      description: 'Descripción test',
      location: 'Ubicación test'
    };

    const createResponse = await request(app)
      .post('/api/incidents')
      .send(newIncident);

    const incidentId = createResponse.body.id;

    // Luego obtenerla por ID
    const getResponse = await request(app).get(`/api/incidents/${incidentId}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body.id).toBe(incidentId);
    expect(getResponse.body.title).toBe(newIncident.title);
  });
});