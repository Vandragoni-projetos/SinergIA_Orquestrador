
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User } from "@/entities/all";
//import { createPageUrl } from "@/utils";
import { createPageUrl } from "@/utils/createPageUrl"; // Ajuste conforme necessário
import { 
  Bot, 
  LayoutDashboard, 
  Plus, 
  History, 
  Settings,
  Zap,
  LogOut,
  Menu
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./components/common/ThemeToggle";
import { getUserRole } from "@/utils/permissions"; // Corrigir aqui

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: LayoutDashboard,
  },
  {
    title: "Agentes",
    url: createPageUrl("Agents"),
    icon: Bot,
  },
  {
    title: "Criar Agente",
    url: createPageUrl("AgentBuilder"),
    icon: Plus,
  },
  {
    title: "Execuções",
    url: createPageUrl("Executions"),
    icon: History,
  },
  {
    title: "Configurações",
    url: createPageUrl("Configuracoes"),
    icon: Settings,
  }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState('usuario');

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await User.me();
        setUser(userData);
        setUserRole(getUserRole(userData.email));
      } catch (error) {
        console.log("Usuário não logado");
        navigate(createPageUrl("Login"));
      }
    };
    loadUser();
  }, []);
  
  const handleLogout = async () => {
    await User.logout();
    navigate(createPageUrl("Login"));
  };
  
  const roleLabels = {
    admin_master: "Admin Master",
    admin_pleno: "Admin Pleno",
    usuario: "Usuário"
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
        <Sidebar className="border-r border-slate-200/60 dark:border-slate-700/60 backdrop-blur-sm bg-white/80 dark:bg-slate-800/80">
          <SidebarHeader className="border-b border-slate-200/60 dark:border-slate-700/60 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">FusiON</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">IA Orquestrador</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider px-3 py-2 mb-2">
                Navegação
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`rounded-xl transition-all duration-200 ${
                          location.pathname === item.url 
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' 
                            : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3 font-medium">
                          <item.icon className="w-5 h-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-slate-200/60 dark:border-slate-700/60 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center">
                  <span className="text-slate-600 dark:text-slate-300 font-medium text-sm">
                    {user?.email?.[0].toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 dark:text-slate-100 text-sm truncate" title={user?.email}>{user?.email}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{roleLabels[userRole]}</p>
                </div>
              </div>
              <ThemeToggle />
            </div>
             <Button
                variant="ghost"
                className="w-full justify-start mt-4 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                onClick={handleLogout}
            >
                <LogOut className="w-4 h-4 mr-2" />
                Sair da Plataforma
            </Button>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col transition-all duration-300">
          <header className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-b border-slate-200/60 dark:border-slate-700/60 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-slate-100 dark:hover:bg-slate-700 p-2 rounded-xl transition-all duration-200">
                <Menu className="w-5 h-5 text-slate-700 dark:text-slate-200" />
              </SidebarTrigger>
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 hidden sm:block">FusiON</h1>
            </div>
            <ThemeToggle />
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
