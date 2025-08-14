import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Clock, 
  Copy, 
  Eye,
  Calendar,
  Zap
} from "lucide-react";
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

export default function ExecutionCard({ execution, onViewDetails, onCopyPrompt }) {
  return (
    <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          
          {/* Info Principal */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {execution.agent_name}
              </h3>
              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-1">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {format(new Date(execution.created_date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  </span>
                </div>
                {execution.execution_time && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{execution.execution_time}s</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status e Ações */}
          <div className="flex items-center gap-3">
            <Badge className={`${statusColors[execution.status]} border-0`}>
              {statusLabels[execution.status]}
            </Badge>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCopyPrompt(execution.generated_prompt)}
                className="border-slate-300 dark:border-slate-600"
              >
                <Copy className="w-4 h-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(execution)}
                className="border-slate-300 dark:border-slate-600"
              >
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Preview do Prompt */}
        {execution.generated_prompt && (
          <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
            <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
              {execution.generated_prompt}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}