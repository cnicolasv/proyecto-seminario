// src/components/VariableForm.js
import { useState } from "react";
import { createVariable } from "../api";

function VariableForm({ token, devices, onVariableCreated }) {
    const [form, setForm] = useState({
        device_id: "",
        variable_name: "",
        unit: "",
        description: "",
        sampling_ms: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createVariable(form, token);
            alert("Variable creada correctamente");
            setForm({
                device_id: "",
                variable_name: "",
                unit: "",
                description: "",
                sampling_ms: "",
            });

            if (onVariableCreated) {
                onVariableCreated();
            }
        } catch (err) {
            alert("Error al crear la variable");
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <select
                value={form.device_id}
                onChange={(e) => setForm({ ...form, device_id: e.target.value })}
                required
            >
                <option value="">Selecciona un dispositivo</option>
                {devices.map((d) => (
                    <option key={d.device_id} value={d.device_id}>
                        {d.name} ({d.device_id})
                    </option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Nombre de la variable"
                value={form.variable_name}
                onChange={(e) => setForm({ ...form, variable_name: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Unidad de medida"
                value={form.unit}
                onChange={(e) => setForm({ ...form, unit: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Descripción"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <input
                type="number"
                placeholder="Frecuencia de muestreo (ms)"
                value={form.sampling_ms}
                onChange={(e) => setForm({ ...form, sampling_ms: e.target.value })}
                required
            />
            <button type="submit">Crear variable</button>
        </form>
    );
}

export default VariableForm;
