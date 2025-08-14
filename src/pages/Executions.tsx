
import React, { useState, useEffect, useMemo } from "react";
import { Execution, Agent } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Clock, 
  Search, 
  Filter,
  Bot,
  Play,
  Copy,
  Calendar,
  Zap,
  AlertCircle
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";

import ExecutionCard from "../components/executions/ExecutionCard";
import ExecutionDetails from "../components/executions/ExecutionDetails";

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

export default function Executions() {
  const [executions, setExecutions] = useState([]);
  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedExecution, setSelectedExecution] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [executionsData, agentsData] = await Promise.all([
        Execution.list("-created_date"),
        Agent.list()
      ]);
      
      setExecutions(executionsData);
      setAgents(agentsData);
    } catch (error) {
      console.error("Erro ao carregar execuções:", error);
    }
    setIsLoading(false);
  };

  // Memoize filtered executions to prevent unnecessary re-calculations
  const filteredExecutions = useMemo(() => {
    return executions.filter(execution => {
      const matchesSearch = 
        execution.agent_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        // Bug Fix: Ensure generated_prompt is treated as an empty string if null or undefined
        (execution.generated_prompt || "").toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || execution.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [executions, searchQuery, statusFilter]);

  // Memoize status counts for performance
  const memoizedStatusCounts = useMemo(() => {
    return {
      all: executions.length,
      completed: executions.filter(exec => exec.status === "completed").length,
      pending: executions.filter(exec => exec.status === "pending").length,
      running: executions.filter(exec => exec.status === "running").length,
      failed: executions.filter(exec => exec.status === "failed").length,
    };
  }, [executions]);

  const handleViewDetails = (execution) => {
    setSelectedExecution(execution);
    setShowDetails(true);
  };

  const handleCopyPrompt = async (prompt) => {
    // Add a simple notification or toast here in a real app
    await navigator.clipboard.writeText(prompt);
  };

  // Removed getStatusCount function as counts are now memoized and accessed directly

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Histórico de Execuções
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mt-2">
              Acompanhe todas as execuções dos seus agentes
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-indigo-200 text-indigo-600">
              {executions.length} execuções
            </Badge>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          
          {/* Busca */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Buscar por agente ou prompt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-slate-200 dark:border-slate-600 bg-white/60 dark:bg-slate-700/60"
            />
          </div>

          {/* Filtro de Status */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48 border-slate-200 dark:border-slate-600 bg-white/60 dark:bg-slate-700/60">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                Todos os Status ({memoizedStatusCounts.all})
              </SelectItem>
              <SelectItem value="completed">
                Concluído ({memoizedStatusCounts.completed})
              </SelectItem>
              <SelectItem value="pending">
                Pendente ({memoizedStatusCounts.pending})
              </SelectItem>
              <SelectItem value="running">
                Executando ({memoizedStatusCounts.running})
              </SelectItem>
              <SelectItem value="failed">
                Falhou ({memoizedStatusCounts.failed})
              </SelectItem>
            </SelectContent>
          </Select>

        </div>

        {/* Lista de Execuções */}
        {isLoading ? (
          <div className="space-y-4">
            {Array(6).fill(0).map((_, i) => (
              <Card key={i} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-12 h-12 rounded-xl" />
                      <div>
                        <Skeleton className="h-5 w-48 mb-2" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredExecutions.length === 0 ? (
          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60">
            <CardContent className="p-16 text-center">
              <Clock className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">
                {searchQuery || statusFilter !== "all" 
                  ? "Nenhuma execução encontrada" 
                  : "Nenhuma execução ainda"
                }
              </h3>
              <p className="text-slate-500 dark:text-slate-400">
                {searchQuery || statusFilter !== "all"
                  ? "Tente ajustar os filtros de busca"
                  : "Execute um agente para ver o histórico aqui"
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredExecutions.map((execution) => (
              <ExecutionCard
                key={execution.id}
                execution={execution}
                onViewDetails={handleViewDetails}
                onCopyPrompt={handleCopyPrompt}
              />
            ))}
          </div>
        )}

        {/* Modal de Detalhes */}
        <ExecutionDetails
          execution={selectedExecution}
          isOpen={showDetails}
          onClose={() => setShowDetails(false)}
        />

      </div>
    </div>
  );
}
