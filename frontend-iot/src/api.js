import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000', // ajusta si estás en Docker o producción
});

// Crear usuario
export const register = (data) => API.post('/users', data);

// Login con OAuth2PasswordRequestForm (form-urlencoded)
export const login = (data) =>
    API.post(
        '/login',
        new URLSearchParams({
            username: data.username,
            password: data.password,
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );

// Crear dispositivo
export const createDevice = (data, token) =>
    API.post('/devices', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

// ✅ Obtener dispositivos
export const getDevices = (token) =>
    API.get('/devices', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

// 🧪 (Opcional) Eliminar dispositivo por ID
export const deleteDevice = (deviceId, token) =>
    API.delete(`/devices/${deviceId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const createVariable = (data, token) =>
    API.post('/variables', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const getVariables = (token) =>
    API.get('/variables', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

