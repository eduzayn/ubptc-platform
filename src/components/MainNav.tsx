import * as React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Cursos",
    href: "/courses",
    description: "Explore nossa biblioteca de cursos e treinamentos especializados.",
  },
  {
    title: "Biblioteca",
    href: "/library",
    description: "Acesse artigos, publicações e recursos acadêmicos.",
  },
  {
    title: "Comunidade",
    href: "/community",
    description: "Conecte-se com outros profissionais e participe de discussões.",
  },
  {
    title: "Eventos",
    href: "/calendar",
    description: "Confira nosso calendário de eventos e atividades.",
  },
  {
    title: "Associação",
    href: "/association",
    description: "Saiba mais sobre como se tornar um membro da UBPTC.",
  },
];

export function MainNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Início</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    to="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      UBPTC
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      União Brasileira de Profissionais em Terapia Cognitiva
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/profile" title="Meu Perfil">
                Gerencie seu perfil, documentos e credenciais.
              </ListItem>
              <ListItem href="/my-courses" title="Meus Cursos">
                Acesse seus cursos e acompanhe seu progresso.
              </ListItem>
              <ListItem href="/profile/settings" title="Configurações">
                Ajuste suas preferências e configurações de conta.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Recursos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/about">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Sobre
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref as any}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          to={href || "#"}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default MainNav;
