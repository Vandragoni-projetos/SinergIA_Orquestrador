
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Heart, 
  User, 
  Shield, 
  X,
  FileText,
  Zap,
  ShoppingCart,
  Mail,
  Mic,
  Megaphone,
  Search,
  Star,
  Edit,
  BarChart3,
  Share2,
  Clapperboard,
  Globe,
  BookOpen // Retained as it's used in the new categories list
} from 'lucide-react';

const categories = [
  { id: "all", label: "Todas Categorias", icon: Bot },
  { id: "articles_and_blogs", label: "Artigos e Blogs", icon: FileText },
  { id: "advertisements", label: "Anúncios", icon: Zap },
  { id: "customer_service", label: "Atendimento ao Cliente", icon: User },
  { id: "ebook", label: "E-books", icon: BookOpen },
  { id: "ecommerce", label: "E-commerce", icon: ShoppingCart },
  { id: "emails", label: "E-mails", icon: Mail },
  { id: "letter", label: "Cartas", icon: FileText },
  { id: "podcast", label: "Podcasts", icon: Mic },
  { id: "press_release", label: "Comunicados de Imprensa", icon: Megaphone },
  { id: "research", label: "Pesquisa", icon: Search },
  { id: "reviews", label: "Avaliações", icon: Star },
  { id: "rewriter", label: "Reescrita", icon: Edit },
  { id: "seo", label: "SEO", icon: BarChart3 },
  { id: "social_media", label: "Redes Sociais", icon: Share2 },
  { id: "video_scripts", label: "Roteiros de Vídeo", icon: Clapperboard },
  { id: "website_copy", label: "Textos para Site", icon: Globe },
  { id: "other", label: "Outros", icon: Bot }
];

const filters = [
  { id: "all", label: "Todos os Agentes", icon: Bot },
  { id: "favorites", label: "Favoritos", icon: Heart },
  { id: "mine", label: "Meus Agentes", icon: User },
  { id: "system", label: "Sistema", icon: Shield }
];

export default function FilterSidebar({ 
  selectedCategory, 
  onCategoryChange, 
  selectedFilter, 
  onFilterChange,
  isOpen,
  onClose,
  agents,
  userEmail
}) {
  const getCategoryCount = (categoryId) => {
    if (categoryId === "all") return agents.length;
    // Handle the case where agents for a category might not exist
    const categoryAgents = agents.filter(agent => agent.category === categoryId);
    return categoryAgents.length;
  };
  
  const getFilterCount = (filterId) => {
    switch (filterId) {
      case "all":
        return agents.length;
      case "favorites":
        return agents.filter(agent => agent.is_favorite).length;
      case "mine":
        return agents.filter(agent => agent.created_by === userEmail).length;
      case "system":
        return agents.filter(agent => agent.origin === "default").length;
      default:
        return 0;
    }
  };

  return (
    <>
      {/* Overlay Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-r border-slate-200/60 dark:border-slate-700/60 transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 h-full overflow-y-auto">
          
          {/* Header Mobile */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Filtros</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Filtros Rápidos */}
          <Card className="mb-6 bg-white/60 dark:bg-slate-700/60 border-slate-200/60 dark:border-slate-600/60">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Filtros Rápidos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {filters.map((filter) => {
                const count = getFilterCount(filter.id);
                const isSelected = selectedFilter === filter.id;
                
                return (
                  <Button
                    key={filter.id}
                    variant={isSelected ? "default" : "ghost"}
                    className={`w-full justify-between transition-all duration-200 ${
                      isSelected 
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg" 
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600"
                    }`}
                    onClick={() => onFilterChange(filter.id)}
                  >
                    <div className="flex items-center gap-2">
                      <filter.icon className="w-4 h-4" />
                      <span>{filter.label}</span>
                    </div>
                    <Badge 
                      variant={isSelected ? "secondary" : "outline"} 
                      className={isSelected ? "bg-white/20 text-white border-white/30" : ""}
                    >
                      {count}
                    </Badge>
                  </Button>
                );
              })}
            </CardContent>
          </Card>

          {/* Categorias */}
          <Card className="bg-white/60 dark:bg-slate-700/60 border-slate-200/60 dark:border-slate-600/60">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Categorias
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {categories.map((category) => {
                const count = getCategoryCount(category.id);
                const isSelected = selectedCategory === category.id;
                
                return (
                  <Button
                    key={category.id}
                    variant={isSelected ? "default" : "ghost"}
                    className={`w-full justify-between transition-all duration-200 ${
                      isSelected 
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg" 
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600"
                    }`}
                    onClick={() => onCategoryChange(category.id)}
                  >
                    <div className="flex items-center gap-2">
                      <category.icon className="w-4 h-4" />
                      <span>{category.label}</span>
                    </div>
                    <Badge 
                      variant={isSelected ? "secondary" : "outline"} 
                      className={isSelected ? "bg-white/20 text-white border-white/30" : ""}
                    >
                      {count}
                    </Badge>
                  </Button>
                );
              })}
            </CardContent>
          </Card>

        </div>
      </div>
    </>
  );
}
