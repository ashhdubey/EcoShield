// Path: Client/src/components/layout/MainLayout.tsx

import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, Shield, User, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { useAuth } from "@/contexts/AuthContext";
import { NotificationBell } from "@/components/NotificationBell";

export default function MainLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { isAuthenticated, logout } = useAuth(); 
  
  const location = useLocation();
  const navigate = useNavigate();

  // --- THIS IS THE FIX ---
  // Restored all of your original links and added the new ones.
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Chronicle", path: "/chronicle" },
    { name: "RegenEarth", path: "/regen-earth" },
    { name: "MyShield", path: "/my-shield" },
    { name: "Compare", path: "/compare" },
    { name: "Rankings", path: "/rankings" },
  ];
  // --- END OF FIX ---

  const handleSignOut = () => {
    logout();
    toast.success("Signed out successfully");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-ecoshield-sky-blue" />
              <span className="text-xl font-bold">EcoShield</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "transition-colors hover:text-ecoshield-sky-blue",
                  location.pathname === link.path && "text-ecoshield-sky-blue"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <NotificationBell />
            <ThemeToggle />
            {isAuthenticated ? (
              <>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="hidden md:inline-flex gap-2"
                >
                  <Link to="/profile">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="hidden md:inline-flex gap-2"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Button asChild size="sm" variant="outline" className="hidden md:inline-flex">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild size="sm" className="hidden md:inline-flex">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "md:hidden fixed inset-0 top-16 z-50 bg-background",
            isMobileMenuOpen ? "block" : "hidden"
          )}
        >
          <div className="container py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "py-2 text-lg",
                  location.pathname === link.path && "text-ecoshield-sky-blue"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-4 border-t">
              {isAuthenticated ? (
                <>
                  <Button asChild variant="outline">
                    <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline">
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
      
      <footer className="bg-gray-900 text-gray-300">
        <div className="container py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="font-semibold text-white mb-4">EcoShield</h3>
                    <p className="text-sm">Protect yourself, protect Earth. Your daily guide to environmental awareness and safety.</p>
                </div>
                <div>
                    <h3 className="font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/about" className="hover:text-ecoshield-sky-blue">About</Link></li>
                        <li><Link to="/chronicle" className="hover:text-ecoshield-sky-blue">Chronicle</Link></li>
                        <li><Link to="/help" className="hover:text-ecoshield-sky-blue">Help</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-white mb-4">Resources</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-ecoshield-sky-blue">NASA Science</a></li>
                        <li><a href="#" className="hover:text-ecoshield-sky-blue">WHO</a></li>
                        <li><a href="#" className="hover:text-ecoshield-sky-blue">Dermatology Org</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-white mb-4">Contact Us</h3>
                     <p className="text-sm">Prayagraj, Uttar Pradesh, India</p>
                     <p className="text-sm">ecoshield@example.com</p>
                </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
                <p>&copy; 2025 EcoShield. All rights reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}