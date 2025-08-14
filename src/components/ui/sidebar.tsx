// src/components/ui/Sidebar.tsx
import React from 'react';

export function SidebarContent() {
  return (
    <div>
      {/* Conteúdo do menu lateral */}
    </div>
  );
}

export function SidebarFooter() {
  return (
    <div>
      {/* Conteúdo do rodapé da sidebar */}
    </div>
  );
}

export function SidebarGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="sidebar-group">
      {children}
    </div>
  );
}

export const Sidebar = ({ children }) => {
  return (
    <div className="sidebar">
      {children}
    </div>
  );
};

export function SidebarGroupContent({ children }: { children: React.ReactNode }) {
  return <div className="sidebar-group-content">{children}</div>;
}

export function SidebarGroupLabel({ children }: { children: React.ReactNode }) {
  return <div className="sidebar-group-label">{children}</div>;
}

export function SidebarMenu({ children }: { children: React.ReactNode }) {
  return <ul className="sidebar-menu">{children}</ul>;
}

export function SidebarMenuButton({ children }: { children: React.ReactNode }) {
  return <button className="sidebar-menu-button">{children}</button>;
}

export function SidebarMenuItem({ children }: { children: React.ReactNode }) {
  return <li className="sidebar-menu-item">{children}</li>;
}

export function SidebarHeader({ children }: { children: React.ReactNode }) {
  return <div className="sidebar-header">{children}</div>;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  return <div className="sidebar-provider">{children}</div>;
}

export function SidebarTrigger({ children }: { children: React.ReactNode }) {
  return <button className="sidebar-trigger">{children}</button>;
}


// Você pode adicionar outros componentes como SidebarContent, SidebarHeader, etc.