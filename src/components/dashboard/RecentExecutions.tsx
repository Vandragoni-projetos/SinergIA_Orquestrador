import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Bot, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  running: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400", 
  completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  failed: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
};

const statusLabels = {
  pending: "Pendente",
  running: "Executando",
  completed: "Concluído", 
  failed: "Falhou"
};

export default function RecentExecutions({ executions, isLoading }) {
  const recentExecutions = executions.slice(0, 5);

  return (
    <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60">
      <CardHeader className="border-b border-slate-200/60 dark:border-slate-700/60">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-100">
            <Clock className="w-5 h-5 text-indigo-600" />
            Execuções Recentes
          </CardTitle>
          <Link to={createPageUrl("Executions")}>
            <Button variant="outline" size="sm" className="border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30">
              Ver Todas
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="space-y-4 p-6">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700 last:border-b-0">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            ))}
          </div>
        ) : recentExecutions.length === 0 ? (
          <div className="p-8 text-center">
            <Bot className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400 text-lg">Nenhuma execução ainda</p>
            <p className="text-slate-400 dark:text-slate-500 text-sm">Execute um agente para ver o histórico aqui</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {recentExecutions.map((execution) => (
              <div key={execution.id} className="p-4 hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">{execution.agent_name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {format(new Date(execution.created_date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                      </p>
                    </div>
                  </div>
                  <Badge className={`${statusColors[execution.status]} border-0`}>
                    {statusLabels[execution.status]}
                  </Badge>
                </div>
                {execution.execution_time && (
                  <div className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                    Tempo: {execution.execution_time}s
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}