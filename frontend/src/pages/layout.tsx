import logo from "../assets/nocturneLogoNoBKGCropped.png"; 
 
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col bg-slate-900 text-slate-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-12">
          <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="nocturne Logo"
            className="h-10 w-10 object-contain"
          />
        </div>

          <nav className="ml-auto flex items-center gap-8">
            <a href="/" className="hover:text-blue-600">Home</a>
            <a href="/login" className="hover:text-blue-600">Admin</a>
            <a href="/add-song" className="hover:text-blue-600">Add Song</a>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-6 py-10">
        {children}
      </main>

      <footer className="bg-white border-t mt-10">
        <div className="max-w-6xl mx-auto px-6 py-4 text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} YourTune — Made by Leo 🎧
        </div>
      </footer>
    </div>
  );
}
