import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Menu, Search, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import UserMenu from "./UserMenu";
import AdminLoginModal from '../admin/AdminLoginModal';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

interface NavbarProps {
  onMenuToggle: () => void;
  username?: string;
  avatarUrl?: string;
  notificationCount?: number;
  isAdmin?: boolean;
}

const Navbar = ({
  username = "John Doe",
  avatarUrl = "",
  notificationCount = 3,
  onMenuToggle = () => {},
  isAdmin = false,
}: NavbarProps) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLogin = async (email: string, cpf: string) => {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, cpf }),
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }

      const { token } = await response.json();
      localStorage.setItem('adminToken', token);
      setIsLoginModalOpen(false);
      navigate('/admin');
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <nav className="w-full h-[70px] bg-background border-b border-border px-4 flex items-center justify-between shadow-sm">
        {/* Left section with menu toggle and logo */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link to="/" className="flex items-center gap-2">
            <img
              src="/images/logo-ubptc.png"
              alt="UBPTC Logo"
              className="h-10 w-auto"
            />
          </Link>
        </div>

        {/* Center section with search */}
        <div className="hidden md:flex items-center max-w-md w-full mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Buscar recursos, eventos, membros..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-accent/50"
            />
          </div>
        </div>

        {/* Right section with join button, notifications and profile */}
        <div className="flex items-center gap-2">
          <Link to="/associe-se">
            <Button className="bg-primary text-white hover:bg-primary/90 mr-2">
              Associe-se
            </Button>
          </Link>

          {/* Botão de Admin com verificação de autenticação */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleAdminClick}
                  className="relative"
                >
                  <Shield className="h-5 w-5 text-primary" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Acesso Administrativo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notificações</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <UserMenu
            username={username}
            avatarUrl={avatarUrl}
            notificationCount={notificationCount}
            isAdmin={isAdmin}
          />
        </div>
      </nav>

      {/* Modal de Login Administrativo */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </>
  );
};

export default Navbar;
