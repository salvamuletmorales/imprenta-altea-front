import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

export function PrivateRoute({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
const [user, setUser] = useState<{ id: number; email: string; role: string } | null>(null);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/auth/me", {
          credentials: "include",
        });

        if (!res.ok) {
          setAuthenticated(false);
        } else {
          const data = await res.json();
          setUser(data);
          setAuthenticated(true);
        }
      } catch (err) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return null; // o un spinner mientras valida
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
