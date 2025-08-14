
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Bot, 
  Heart, 
  Shield, 
  Play, 
  Edit3,
  Trash2,
  Calendar,
  User
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { getCategoryInfo } from "../utils/categories";
import { canEdit, canDelete } from "../utils/permissions";
import PermissionGuard from "../common/PermissionGuard";

const categoryColors = {
  articles_and_blogs: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
  seo: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400", 
  social_media: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  research: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  marketing: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  emails: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
  customer_service: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400",
  other: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
};

export default function AgentCard({ agent, onToggleFavorite, onDeleteAgent, userRole }) {
  const isSystemAgent = agent.origin === "default";
  const categoryInfo = getCategoryInfo(agent.category);

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este agente? Esta ação não pode ser desfeita.')) {
      await onDeleteAgent(agent.id);
    }
  };

  return (
    <Card className="group bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60 hover:bg-white/80 dark:hover:bg-slate-800/80 hover:shadow-lg transition-all duration-300">
      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center relative">
              <Bot className="w-6 h-6 text-white" />
              {isSystemAgent && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Shield className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                {agent.name}
              </CardTitle>
              <div className="flex items-center gap-2 mt-2">
                {/* Chip do Grupo */}
                <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 text-xs border-0">
                  {categoryInfo.group}
                </Badge>
                {/* Chip da Categoria */}
                <Badge className={`${categoryColors[agent.category] || categoryColors.other} text-xs border-0`}>
                  {categoryInfo.label}
                </Badge>
                {isSystemAgent && (
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 text-xs border-0">
                    Sistema
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleFavorite(agent.id)}
            className={`transition-colors duration-200 ${
              agent.is_favorite 
                ? "text-red-500 hover:text-red-600" 
                : "text-slate-400 dark:text-slate-500 hover:text-red-500"
            }`}
          >
            <Heart className={`w-4 h-4 ${agent.is_favorite ? "fill-current" : ""}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3">
          {agent.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>
              {format(new Date(agent.created_date), "dd/MM/yyyy", { locale: ptBR })}
            </span>
          </div>
          {!isSystemAgent && (
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>Criado por você</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Link to={createPageUrl(`AgentRunner?id=${agent.id}`)} className="flex-1">
            <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
              <Play className="w-4 h-4 mr-2" />
              Executar
            </Button>
          </Link>
          
          <PermissionGuard userRole={userRole} action="edit" agent={agent}>
            <Link to={createPageUrl(`AgentBuilder?id=${agent.id}`)}>
              <Button variant="outline" size="icon" className="border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">
                <Edit3 className="w-4 h-4" />
              </Button>
            </Link>
          </PermissionGuard>

          <PermissionGuard userRole={userRole} action="delete" agent={agent}>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleDelete}
              className="border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              title="Excluir agente"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </PermissionGuard>
        </div>
      </CardContent>
    </Card>
  );
}
