import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  if (!email || !password) {
    return setError("Todos los campos son obligatorios");
  }

  try {
    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include", // ✅ importante para enviar y recibir cookies
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Error al iniciar sesión");
    }

    // Guardar solo datos del usuario
    localStorage.setItem("user", JSON.stringify(data.user));

    navigate("/");

  } catch (err: any) {
    setError(err.message);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-card p-8 rounded-lg shadow-sm border">
        
        <h1 className="text-2xl font-semibold text-center mb-2">
          Iniciar sesión
        </h1>

        <p className="text-sm text-muted-foreground text-center mb-6">
          Accede a tu cuenta
        </p>

        <form className="space-y-4" onSubmit={handleLogin}>
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

          {/* ✅ Mensaje de error elegante */}
          {error && (
            <div className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg p-2">
              {error}
            </div>
          )}

          <Button className="w-full">
            Entrar
          </Button>
        </form>

        <p className="text-sm text-center text-muted-foreground mt-6">
          ¿No tienes cuenta?{" "}
          <Link
            to="/registro"
            className="font-medium text-primary hover:underline"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
