import { Button } from "../components/ui/button";
import { useState } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
function Card({ children, className = "" }) {
  return (
    <div className={`bg-white border border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";

export function Order() {
  const [cantidad, setCantidad] = useState(100);
  const [precio, setPrecio] = useState(28);

  const opciones = [
    { cantidad: 100, precio: 28 },
    { cantidad: 250, precio: 45 },
    { cantidad: 500, precio: 60 },
    { cantidad: 1000, precio: 75 },
  ];

  const handleCantidadChange = (e) => {
    const seleccion = opciones.find(
      (o) => o.cantidad === Number(e.target.value),
    );
    setCantidad(seleccion.cantidad);
    setPrecio(seleccion.precio);
  };

  const realizarPedido = async () => {
    const pedido = {
      usuarioId: "USER_AUTH_ID", // obtener desde contexto/auth
      servicio: "Impresión corporativa",
      cantidad,
      precio,
    };

    await fetch("/api/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedido),
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header />
      <main>
        <div className="min-h-screen flex items-center justify-center bg-[#f6f4ee] p-4">
          <Card className="w-full max-w-md rounded-2xl shadow-lg">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-center">
                Crear pedido
              </h2>

              <img
                src="/imprenta.jpg"
                alt="Productos de imprenta"
                className="rounded-xl w-full object-cover"
              />

              <p className="text-sm text-gray-600">
                Servicio de impresión profesional para carpetas, flyers, papel
                corporativo y tarjetas de visita.
              </p>

              <div className="space-y-2">
                <label className="text-sm font-medium">Cantidad</label>
                <select
                  className="w-full border rounded-lg p-2"
                  value={cantidad}
                  onChange={handleCantidadChange}
                >
                  {opciones.map((op) => (
                    <option key={op.cantidad} value={op.cantidad}>
                      {op.cantidad} uds - {op.precio} €
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-right font-semibold">Total: {precio} €</div>

              <Button
                onClick={realizarPedido}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Realizar pedido
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
