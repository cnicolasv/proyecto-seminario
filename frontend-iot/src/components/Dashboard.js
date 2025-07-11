import './Dashboard.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { getDevices } from "../api";
import DeviceForm from "./DeviceForm";
import VariableForm from "./VariableForm";
import { getDevices, getVariables } from "../api";
import { deleteDevice } from "../api";

//import VariableForm from "./VariableForm";



function Dashboard({ token, setToken }) {
    const navigate = useNavigate();
    const [devices, setDevices] = useState([]);

    const [variables, setVariables] = useState([]);


    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
    };

    // ✅ Mover esta función afuera del useEffect
    const fetchDevices = async () => {
        try {
            const res = await getDevices(token);
            setDevices(res.data);
        } catch (err) {
            console.error("Error al obtener dispositivos", err);
            alert("Error al cargar los dispositivos");
        }
    };

    const fetchVariables = async () => {
        try {
            const res = await getVariables(token);
            setVariables(res.data);
        } catch (err) {
            alert("Error al cargar las variables");
        }
    };

    useEffect(() => {
        fetchDevices();
        fetchVariables();
    }, [token]);

    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            <button onClick={handleLogout}>Cerrar sesión</button>

            <h3>Crear nuevo dispositivo</h3>
            <DeviceForm token={token} onDeviceCreated={fetchDevices} />

            <h3>Mis dispositivos</h3>
            {devices.length === 0 ? (
                <p>No tienes dispositivos registrados.</p>
            ) : (
                <ul>
                    {devices.map((d) => (
                        <li key={d.id}>
                            <strong>{d.name}</strong> — ID: {d.device_id}
                            <button
                                style={{ marginLeft: "10px" }}
                                onClick={async () => {
                                    if (window.confirm("¿Eliminar este dispositivo y todos sus recursos?")) {
                                        try {
                                            await deleteDevice(d.device_id, token);
                                            alert("Dispositivo eliminado correctamente");
                                            fetchDevices(); // recarga la lista
                                            fetchVariables(); // también recarga las variables por si había asociadas
                                        } catch (err) {
                                            alert("Error al eliminar el dispositivo");
                                            console.error(err);
                                        }
                                    }
                                }}
                            >
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <h3>Crear nueva variable</h3>
            <VariableForm token={token} devices={devices} onVariableCreated={fetchVariables} />

            <h3>Mis variables</h3>
            {variables.length === 0 ? (
                <p>No tienes variables registradas.</p>
            ) : (
                <ul>
                    {variables.map((v) => (
                        <li key={v.id}>
                            <strong>{v.variable_name}</strong> — {v.unit} — {v.description} <br />
                            <em>Dispositivo:</em> {v.device_id} — <em>Muestreo:</em> {v.sampling_ms}ms
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
}

export default Dashboard;
