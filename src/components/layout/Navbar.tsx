import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/MainNav";
import { Shield } from "lucide-react";
import { useState } from "react";
import AdminLoginModal from "@/components/admin/AdminLoginModal";

export function Navbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Clicou no Shield");
    setIsLoginModalOpen(true);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="w-9 px-0"
              onClick={handleAdminClick}
            >
              <Shield className="h-5 w-5" />
            </Button>
          </nav>
        </div>
      </div>

      <AdminLoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </header>
  );
}

export default Navbar;
