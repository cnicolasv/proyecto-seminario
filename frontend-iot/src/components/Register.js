import { useState } from "react";
import { register } from "../api";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [form, setForm] = useState({
        username: "",
        password: "",
        email: "",
        name: "",
        country: "",
        city: "",
        company: "",
        rol: "usuario"
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(form);
            alert("Usuario registrado");
            navigate("/login"); // ✅ redirige al login
        } catch (err) {
            alert("Error al registrar usuario");
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
            <input
                type="email"
                placeholder="Correo"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
                type="text"
                placeholder="Nombre completo"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
                type="text"
                placeholder="País"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
            />
            <input
                type="text"
                placeholder="Ciudad"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            <input
                type="text"
                placeholder="Empresa"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
            <button type="submit">Registrar</button>

            {/* ✅ Enlace al login */}
            <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
        </form>
    );
}

export default Register;
