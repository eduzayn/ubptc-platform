import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AdminLoginModal } from '@/components/admin/AdminLoginModal';
import { Logo } from '@/components/Logo';
import { MobileNav } from '@/components/MobileNav';
import { MainNav } from '@/components/MainNav';

export function Navbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoginModalOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <Logo />
            </Link>
            <MainNav />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <MobileNav />
            </SheetContent>
          </Sheet>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleAdminClick}
                className="relative"
              >
                <Shield className="h-5 w-5 text-primary" />
              </Button>
            </div>
          </div>
        </nav>
      </header>

      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={async (email, cpf) => {
          try {
            const response = await fetch('/api/admin/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, cpf })
            });

            if (!response.ok) throw new Error('Credenciais inválidas');

            const { token } = await response.json();
            localStorage.setItem('adminToken', token);
            setIsLoginModalOpen(false);
            navigate('/admin');
          } catch (error) {
            throw error;
          }
        }}
      />
    </>
  );
}
