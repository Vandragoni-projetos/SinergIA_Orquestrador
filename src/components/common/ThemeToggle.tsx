import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Verificar tema salvo ou preferência do sistema
    const savedTheme = localStorage.getItem('fusion-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    
    setIsDark(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('fusion-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('fusion-theme', 'light');
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-10 h-10 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
      title={isDark ? "Alternar para modo claro" : "Alternar para modo escuro"}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-slate-600 dark:text-slate-300" />
      ) : (
        <Moon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
      )}
    </Button>
  );
}