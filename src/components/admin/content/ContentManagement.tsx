import { Menu, Link, Shield, Bell } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Upload,
  Menu,
  Shield,
  Bell,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mockPages = [
  {
    id: 1,
    title: "Página Inicial",
    type: "Página",
    lastUpdated: "10/05/2023",
    status: "Publicado",
    author: "Admin",
  },
  {
    id: 2,
    title: "Sobre Nós",
    type: "Página",
    lastUpdated: "15/04/2023",
    status: "Publicado",
    author: "Admin",
  },
  {
    id: 3,
    title: "Benefícios da Associação",
    type: "Página",
    lastUpdated: "20/03/2023",
    status: "Rascunho",
    author: "Admin",
  },
];

const mockImages = [
  {
    id: 1,
    title: "Banner Principal",
    type: "Imagem",
    lastUpdated: "05/05/2023",
    status: "Ativo",
    dimensions: "1920x600px",
  },
  {
    id: 2,
    title: "Logo UBPTC",
    type: "Imagem",
    lastUpdated: "01/01/2023",
    status: "Ativo",
    dimensions: "200x200px",
  },
  {
    id: 3,
    title: "Ícones de Serviços",
    type: "Imagem",
    lastUpdated: "15/02/2023",
    status: "Ativo",
    dimensions: "64x64px",
  },
];

const mockLibraryContent = [
  {
    id: 1,
    title: "E-book: Introdução à Psicologia Clínica",
    type: "E-book",
    lastUpdated: "12/04/2023",
    status: "Publicado",
    author: "Dr. Silva",
    category: "Psicologia Clínica",
  },
  {
    id: 2,
    title: "Artigo: Terapia Cognitivo-Comportamental",
    type: "Artigo",
    lastUpdated: "05/03/2023",
    status: "Publicado",
    author: "Dra. Oliveira",
    category: "Terapias",
  },
  {
    id: 3,
    title: "Podcast: Saúde Mental na Pandemia",
    type: "Podcast",
    lastUpdated: "18/02/2023",
    status: "Publicado",
    author: "Dr. Santos",
    category: "Saúde Mental",
  },
];

const mockCommunityContent = [
  {
    id: 1,
    title: "Fórum: Discussões Clínicas",
    type: "Fórum",
    lastUpdated: "15/05/2023",
    status: "Ativo",
    moderator: "Admin",
    members: 45,
  },
  {
    id: 2,
    title: "Grupo: Supervisão em Grupo",
    type: "Grupo",
    lastUpdated: "10/04/2023",
    status: "Ativo",
    moderator: "Dra. Costa",
    members: 12,
  },
  {
    id: 3,
    title: "Diretório de Membros",
    type: "Diretório",
    lastUpdated: "01/05/2023",
    status: "Ativo",
    moderator: "Sistema",
    members: 120,
  },
];

const ContentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("pages");
  const [showHeaderSettings, setShowHeaderSettings] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Publicado":
      case "Ativo":
        return <Badge className="bg-green-500">{status}</Badge>;
      case "Rascunho":
        return <Badge className="bg-yellow-500">{status}</Badge>;
      case "Inativo":
        return <Badge className="bg-red-500">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredPages = mockPages.filter((page) =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredImages = mockImages.filter((image) =>
    image.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredLibraryContent = mockLibraryContent.filter((content) =>
    content.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredCommunityContent = mockCommunityContent.filter((content) =>
    content.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestão de Conteúdo</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Adicionar Conteúdo
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Conteúdo do Site</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar conteúdo..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="ml-2">
              <Filter className="mr-2 h-4 w-4" /> Filtrar
            </Button>
          </div>

          <Tabs defaultValue="pages" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="pages">Páginas</TabsTrigger>
              <TabsTrigger value="images">Imagens</TabsTrigger>
              <TabsTrigger value="library">Biblioteca Digital</TabsTrigger>
              <TabsTrigger value="community">Comunidade</TabsTrigger>
              <TabsTrigger value="header">Cabeçalho</TabsTrigger>
            </TabsList>

            <TabsContent value="pages">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Última Atualização</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Autor</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPages.map((page) => (
                      <TableRow key={page.id}>
                        <TableCell className="font-medium">
                          {page.title}
                        </TableCell>
                        <TableCell>{page.type}</TableCell>
                        <TableCell>{page.lastUpdated}</TableCell>
                        <TableCell>{getStatusBadge(page.status)}</TableCell>
                        <TableCell>{page.author}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir menu</span>
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                <span>Visualizar</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Editar</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Excluir</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="images">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Última Atualização</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Dimensões</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredImages.map((image) => (
                      <TableRow key={image.id}>
                        <TableCell className="font-medium">
                          {image.title}
                        </TableCell>
                        <TableCell>{image.type}</TableCell>
                        <TableCell>{image.lastUpdated}</TableCell>
                        <TableCell>{getStatusBadge(image.status)}</TableCell>
                        <TableCell>{image.dimensions}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir menu</span>
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                <span>Visualizar</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Editar</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Excluir</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="library">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Última Atualização</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Autor</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLibraryContent.map((content) => (
                      <TableRow key={content.id}>
                        <TableCell className="font-medium">
                          {content.title}
                        </TableCell>
                        <TableCell>{content.type}</TableCell>
                        <TableCell>{content.category}</TableCell>
                        <TableCell>{content.lastUpdated}</TableCell>
                        <TableCell>{getStatusBadge(content.status)}</TableCell>
                        <TableCell>{content.author}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir menu</span>
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                <span>Visualizar</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Editar</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Excluir</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="community">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Última Atualização</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Moderador</TableHead>
                      <TableHead>Membros</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCommunityContent.map((content) => (
                      <TableRow key={content.id}>
                        <TableCell className="font-medium">
                          {content.title}
                        </TableCell>
                        <TableCell>{content.type}</TableCell>
                        <TableCell>{content.lastUpdated}</TableCell>
                        <TableCell>{getStatusBadge(content.status)}</TableCell>
                        <TableCell>{content.moderator}</TableCell>
                        <TableCell>{content.members}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir menu</span>
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                <span>Visualizar</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Editar</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Excluir</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="header">
              <div className="space-y-6 p-4 border rounded-md">
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Configurações do Cabeçalho
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          Logo da Associação
                        </h4>
                        <div className="flex items-center gap-4">
                          <div className="border p-2 rounded-md bg-gray-50 w-fit">
                            <img
                              src="/images/logo-ubptc.png"
                              alt="UBPTC Logo"
                              className="h-12 w-auto"
                            />
                          </div>
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" /> Alterar Logo
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          Dimensões do Logo
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-muted-foreground">
                              Altura (px)
                            </label>
                            <Input type="number" value="40" className="mt-1" />
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">
                              Largura (auto)
                            </label>
                            <Input
                              disabled
                              value="auto"
                              className="mt-1 bg-gray-50"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          Cores do Cabeçalho
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-muted-foreground">
                              Cor de Fundo
                            </label>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="h-6 w-6 rounded border bg-white"></div>
                              <Input value="#FFFFFF" className="w-full" />
                            </div>
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">
                              Cor da Borda
                            </label>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="h-6 w-6 rounded border bg-gray-200"></div>
                              <Input value="#E5E7EB" className="w-full" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          Texto e Ícones
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-muted-foreground">
                              Cor do Texto
                            </label>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="h-6 w-6 rounded border bg-gray-900"></div>
                              <Input value="#111827" className="w-full" />
                            </div>
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">
                              Cor dos Ícones
                            </label>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="h-6 w-6 rounded border bg-gray-500"></div>
                              <Input value="#6B7280" className="w-full" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-4">Visualização</h4>
                  <div className="border rounded-md overflow-hidden">
                    <div className="w-full h-[70px] bg-white border-b border-gray-200 px-4 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="md:hidden"
                        >
                          <Menu className="h-5 w-5" />
                        </Button>

                        <div className="flex items-center gap-2">
                          <img
                            src="/images/logo-ubptc.png"
                            alt="UBPTC Logo"
                            className="h-10 w-auto"
                          />
                        </div>
                        <Link to="/associe-se" className="ml-4">
                          <Button className="bg-primary text-white hover:bg-primary/90">
                            Associe-se
                          </Button>
                        </Link>
                      </div>

                      <div className="hidden md:flex items-center max-w-md w-full mx-4">
                        <div className="relative w-full">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            type="search"
                            placeholder="Buscar recursos, eventos, membros..."
                            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-50"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Shield className="h-5 w-5 text-primary" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="relative"
                        >
                          <Bell className="h-5 w-5" />
                          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                            3
                          </span>
                        </Button>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                          <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancelar</Button>
                  <Button>Salvar Alterações</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagement;
