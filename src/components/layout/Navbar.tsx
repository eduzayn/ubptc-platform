import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AdminLoginModal } from '@/components/admin/AdminLoginModal';
import { Logo } from '@/components/Logo';
import { MobileNav } from '@/components/MobileNav';
import { MainNav } from '@/components/MainNav';

interface NavbarProps {
  onMenuToggle?: () => void;
  username?: string;
  avatarUrl?: string;
  notificationCount?: number;
  isAdmin?: boolean;
  onLogout?: () => void;
}

export function Navbar({
  onMenuToggle,
  username,
  avatarUrl,
  notificationCount = 0,
  isAdmin,
  onLogout
}: NavbarProps) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
                onClick={onMenuToggle}
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

            {isAdmin && username && (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">{username}</span>
                {onLogout && (
                  <Button variant="outline" size="sm" onClick={onLogout}>
                    Sair
                  </Button>
                )}
              </div>
            )}
          </div>
        </nav>
      </header>

      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}

export default Navbar;
