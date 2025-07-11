import { useState } from "react";
import { createDevice } from "../api";

function DeviceForm({ token, onDeviceCreated }) {
    const [form, setForm] = useState({ name: '', device_id: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createDevice(form, token);
            alert('Dispositivo creado');
            setForm({ name: '', device_id: '' }); // limpiar campos

            if (onDeviceCreated) {
                onDeviceCreated(); // 🔁 actualiza lista en el Dashboard
            }
        } catch (err) {
            alert('Error al crear el dispositivo');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nombre del dispositivo"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
                type="text"
                placeholder="ID"
                value={form.device_id}
                onChange={(e) => setForm({ ...form, device_id: e.target.value })}
            />
            <button type="submit">Crear</button>
        </form>
    );
}

export default DeviceForm;
