import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminLoginModal({ isOpen, onClose }: AdminLoginModalProps) {
  console.log('Modal está aberto?', isOpen); // DEBUG

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login Administrativo</DialogTitle>
          <DialogDescription>
            Faça login para acessar o painel administrativo.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Button onClick={() => console.log('Teste')}>Teste</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
