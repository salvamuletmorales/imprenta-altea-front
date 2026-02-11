import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

export function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  function formatDate(dateString: string) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }
  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/auth/me", {
        credentials: "include", 
      });
      if (!res.ok) return;

      const data = await res.json();
      setName(data.name || "");
      setEmail(data.email || "");
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Cargar pedidos del usuario
  const fetchMyOrders = async () => {
    try {
      setLoadingOrders(true);
      const res = await fetch("http://localhost:3001/api/order/my", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not fetch orders");
      setOrders(data.map((o) => ({ ...o, loading: false })));
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchMyOrders();
  }, []);


  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:3001/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error updating profile");

      setSuccess("Perfil actualizado correctamente");
      setPassword(""); 
      setName(data.user.name);
      setEmail(data.user.email);
    } catch (err: any) {
      setError(err.message);
    }
  };


  const cancelOrder = async (orderId: number) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/order/${orderId}/cancel`,
        {
          method: "POST",
          credentials: "include",
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error canceling order");
      fetchMyOrders();
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div className="mt-4 min-h-screen bg-background text-foreground font-sans">
      <Header />
      <main>
        <div className="mt-4 min-h-screen flex items-center justify-center bg-background px-4 py-10">
          <div className="w-full max-w-2xl bg-card p-8 rounded-lg shadow-sm border space-y-10">
            <div>
              <h1 className="text-2xl font-semibold text-center mb-2">
                Mi perfil
              </h1>
              <p className="text-sm text-muted-foreground text-center mb-6">
                Editar información personal
              </p>

              <form className="space-y-4" onSubmit={handleUpdateProfile}>
                <Input
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Nueva contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {error && (
                  <div className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg p-2">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg p-2">
                    {success}
                  </div>
                )}

                <Button className="w-full">Guardar cambios</Button>
              </form>
            </div>

            {/* Lista de Pedidos */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Mis pedidos</h2>
              {loadingOrders ? (
                <p className="text-center text-muted-foreground">
                  Loading orders...
                </p>
              ) : (
                <div className="space-y-3 h-64 overflow-auto">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-border rounded-lg p-4 flex justify-between items-center"
                    >
                      <div className="text-sm space-y-1">
                        <p>
                          <strong>Fecha:</strong> {formatDate(order.created_at)}
                        </p>
                        <p>
                          <strong>Producto:</strong> {order.service}
                        </p>
                        <p>
                          <strong>Cantidad:</strong> {order.quantity}
                        </p>
                        <p>
                          <strong>Estado:</strong> {order.state}
                        </p>
                        <p>
                          <strong>Total:</strong> {order.total_price} €
                        </p>
                      </div>

                      {order.state !== "Cancelado" && (
                        <Button
                          variant="ghost"
                          className="text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                          disabled={order.loading}
                          onClick={async () => {
                            const confirmCancel = window.confirm(
                              "¿Estás seguro que quieres cancelar este pedido?",
                            );
                            if (!confirmCancel) return;

                            setOrders((prev) =>
                              prev.map((o) =>
                                o.id === order.id ? { ...o, loading: true } : o,
                              ),
                            );

                            try {
                              await cancelOrder(order.id);
                            } finally {
                              setOrders((prev) =>
                                prev.map((o) =>
                                  o.id === order.id
                                    ? { ...o, loading: false }
                                    : o,
                                ),
                              );
                            }
                          }}
                        >
                          {order.loading ? "Anulando..." : "Anular"}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
