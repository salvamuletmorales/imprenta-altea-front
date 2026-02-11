import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";

export function Register() {
  const navigate = useNavigate();

  const [name, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      return setError("Las contraseñas no coinciden");
    }

    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error en registro");
      }
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-card p-8 rounded-lg shadow-sm border">

        <h1 className="text-2xl font-semibold text-center mb-2">
          Crear cuenta
        </h1>

        <p className="text-sm text-muted-foreground text-center mb-6">
          Regístrate para continuar
        </p>

        <form className="space-y-4" onSubmit={handleRegister}>
          <Input
            placeholder="Nombre"
            value={name}
            onChange={(e) => setNombre(e.target.value)}
          />

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* ✅ Error elegante */}
          {error && (
            <div className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg p-2">
              {error}
            </div>
          )}

          <Button className="w-full">
            Registrarse
          </Button>
        </form>

        <p className="text-sm text-center text-muted-foreground mt-6">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
