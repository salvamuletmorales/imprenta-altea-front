'use client';
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/src/components/ui/button";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{ id: number; email: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/auth/me", {
          credentials: "include", 
        });

        if (!res.ok) {
          setUser(null);
        } else {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3001/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    } finally {
      setUser(null);
      navigate("/login");
    }
  };

  if (loading) return null; // O un spinner mientras se valida

  return (
    <header className="mb-4 fixed top-0 left-0 right-0 z-50 bg-background/100 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className="w-60 h-10 flex items-center justify-center">
              <img src="/logo.png" alt="Logo" />
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#historia" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Nuestra Historia
            </a>
            <a href="#servicios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Servicios
            </a>
            <a href="#contacto" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contacto
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <>
                <Button variant="ghost" size="sm" className="cursor-pointer text-foreground">
                  <Link to="/login">Iniciar Sesión</Link>
                </Button>

                <Button size="sm" className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link to="/registro">Registrarse</Link>
                </Button>
              </>
            ) : (
              <div className="relative group">
                {/* Botón Perfil */}
                <Button variant="ghost" size="sm" className="cursor-pointer text-foreground">
                  {user.name}
                </Button>

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link to="/perfil" className="block px-4 py-2 text-sm hover:bg-accent/10">
                    Mi perfil
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm hover:bg-accent/10">
                    Cerrar sesión
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <a href="#historia" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Nuestra Historia
              </a>
              <a href="#servicios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Servicios
              </a>
              <a href="#contacto" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contacto
              </a>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                {!user ? (
                  <>
                    <Button variant="ghost" size="sm" className="cursor-pointer justify-start text-foreground">
                      <Link to="/login">Iniciar Sesión</Link>
                    </Button>
                    <Button size="sm" className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90">
                      <Link to="/registro">Registrarse</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/perfil">
                      <Button variant="ghost" size="sm" className="cursor-pointer justify-start text-foreground">
                        Mi perfil
                      </Button>
                    </Link>
                    <Button onClick={handleLogout} size="sm" className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90">
                      Cerrar sesión
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
