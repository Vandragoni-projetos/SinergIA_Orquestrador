import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, TrendingUp, Shield } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const categoryColors = {
  copywriting: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
  seo: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  social_media: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  analysis: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  content: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  automation: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
  design: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  research: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  other: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
};

const categoryLabels = {
  copywriting: "Copywriting",
  seo: "SEO",
  social_media: "Redes Sociais",
  analysis: "Análise",
  content: "Conteúdo",
  automation: "Automação", 
  design: "Design",
  research: "Pesquisa",
  other: "Outros"
};

export default function PopularAgents({ agents, isLoading }) {
  // Simular popularidade baseada na data de criação (mais recentes = mais populares)
  const popularAgents = agents
    .filter(agent => agent.is_active)
    .sort((a, b) => new Date(b.created_date) - new Date(a.created_date))
    .slice(0, 6);

  return (
    <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60">
      <CardHeader className="border-b border-slate-200/60 dark:border-slate-700/60">
        <CardTitle className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-100">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          Agentes Populares
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="space-y-4 p-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : popularAgents.length === 0 ? (
          <div className="p-8 text-center">
            <Bot className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400">Nenhum agente disponível</p>
          </div>
        ) : (
          <div className="space-y-3 p-6">
            {popularAgents.map((agent, index) => (
              <div key={agent.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  {agent.origin === 'default' && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Shield className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                  {index < 3 && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {index + 1}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 dark:text-slate-100 truncate">{agent.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={`${categoryColors[agent.category]} text-xs border-0`}>
                      {categoryLabels[agent.category]}
                    </Badge>
                    {agent.origin === 'default' && (
                      <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">Sistema</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}