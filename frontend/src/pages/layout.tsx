import logo from "../assets/logo/nocturne-high-resolution-logo-transparent.png"; 
import { Button } from "@/components/ui/button";
import '../index.css'
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useAuth } from "@/context/AuthContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAdmin, logout } = useAuth();

  return (
    
    <div className="min-h-dvh flex flex-col bg-[linear-gradient(to_bottom,_#3b6ea9_0%,_#d4c0a8_100%)] dark:bg-[linear-gradient(to_bottom,_#0a0f1c_0%,_#1c1f26_100%)] text-slate-100">
      <header className="shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-12">
          <div className="flex items-center gap-3">
            <img src={logo} alt="nocturne Logo" className="h-20 w-50 object-contain" />
          </div>

          <nav className="ml-auto flex items-center gap-3">
            <ThemeToggle/> 
            <Button asChild variant="ghostOutline">
              <Link to="/">Home</Link>
            </Button>

            {!isAdmin && (<Button asChild variant="ghostOutline">
              <Link to="/login">Login</Link>
            </Button>)}

            {isAdmin && (
              <>
                <Button asChild variant="ghostOutline">
                  <Link to="/add-song">Add Song</Link>
                </Button>

              <Button
                variant="ghostOutline"
                onClick={() => {
                  logout();
                  window.location.href = "/";
                }}
              >
                Logout
              </Button>

              </>
            )}
          </nav>

        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-6 py-10">
        {children}
      </main>

      <footer className="bg-white border-t mt-10">
        <div className="max-w-6xl mx-auto px-6 py-4 text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} Nocturne — Made by Leo 🎧
        </div>
      </footer>
    </div>
  );
}
