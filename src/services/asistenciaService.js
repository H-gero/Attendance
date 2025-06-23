import axios from 'axios';

// Definimos la constante correctamente (usa LET o CONST)
const API_BASE_URL = 'http://attendance-backend-9nhc.onrender.com/api/asistencia';

export const getAsistencias = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener asistencias:', error);
    throw error;
  }
};

export const addAsistencia = async (asistencia) => {
  try {
    const response = await axios.post(API_BASE_URL, asistencia);
    return response.data;
  } catch (error) {
    console.error('Error al agregar asistencia:', error);
    throw error;
  }
};

export const updateAsistencia = async (asistencia) => {
  try {
    // Usamos API_BASE_URL en lugar de API_URL
    const response = await axios.put(`${API_BASE_URL}/${asistencia.id}`, asistencia);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar asistencia:', error);
    throw error;
  }
};

export const deleteAsistencia = async (id) => {
  try {
    // Usamos API_BASE_URL en lugar de API_URL
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error('Error al eliminar asistencia:', error);
    throw error;
  }
};