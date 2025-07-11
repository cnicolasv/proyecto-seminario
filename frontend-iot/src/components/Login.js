import { useState } from "react";
import { login } from "../api";
import { Link, useNavigate } from "react-router-dom"; // ✅ IMPORTAMOS useNavigate

function Login({ setToken }) {
    const [form, setForm] = useState({ username: "", password: "" });
    const navigate = useNavigate(); // ✅ OBJETO DE NAVEGACIÓN

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(form);
            const token = res.data.access_token; // ✅ corregido 'access_token'
            setToken(token);
            alert("Login exitoso");
            navigate("/dashboard"); // ✅ redirigir automáticamente
        } catch (err) {
            alert("Error al iniciar sesión");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Usuario"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button type="submit">Login</button>

            {/* Enlace para ir a registro */}
            <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
        </form>
    );
}

export default Login;
