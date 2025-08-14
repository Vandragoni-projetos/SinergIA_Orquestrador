import React, { useState, useEffect } from "react";
import { Agent, Execution, User } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Bot, 
  Zap, 
  Clock, 
  TrendingUp,
  Plus,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import StatsOverview from "../components/dashboard/StatsOverview";
import RecentExecutions from "../components/dashboard/RecentExecutions";
import PopularAgents from "../components/dashboard/PopularAgents";

export default function Dashboard() {
  const [agents, setAgents] = useState([]);
  const [executions, setExecutions] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [agentsData, executionsData, userData] = await Promise.all([
        Agent.list("-created_date", 50),
        Execution.list("-created_date", 20),
        User.me()
      ]);
      
      setAgents(agentsData);
      setExecutions(executionsData);
      setUser(userData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
    setIsLoading(false);
  };

  const myAgents = agents.filter(agent => agent.created_by === user?.email);
  const systemAgents = agents.filter(agent => agent.origin === 'default');
  const todayExecutions = executions.filter(exec => {
    const today = new Date().toDateString();
    return new Date(exec.created_date).toDateString() === today;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Bem-vindo ao FusiON
            </h1>
            <p className="text-lg text-slate-600 mt-2">
              Orquestre agentes inteligentes para automatizar seus processos
            </p>
          </div>
          
          <div className="flex gap-3">
            <Link to={createPageUrl("Agents")}>
              <Button variant="outline" className="border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                <Bot className="w-4 h-4 mr-2" />
                Ver Agentes
              </Button>
            </Link>
            <Link to={createPageUrl("AgentBuilder")}>
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                Criar Agente
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <StatsOverview 
          totalAgents={agents.length}
          myAgents={myAgents.length}
          systemAgents={systemAgents.length}
          todayExecutions={todayExecutions.length}
          isLoading={isLoading}
        />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Recent Executions */}
          <div className="lg:col-span-2">
            <RecentExecutions 
              executions={executions}
              isLoading={isLoading}
            />
          </div>

          {/* Popular Agents */}
          <div>
            <PopularAgents 
              agents={agents}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 border-0 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 transform translate-x-32 -translate-y-32">
            <div className="w-full h-full bg-white/10 rounded-full"></div>
          </div>
          <CardContent className="p-8 relative">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Pronto para começar?
                </h3>
                <p className="text-indigo-100 mb-4">
                  Explore nossos agentes do sistema ou crie o seu próprio
                </p>
              </div>
              <Sparkles className="w-16 h-16 text-white/20" />
            </div>
            
            <div className="flex gap-4">
              <Link to={createPageUrl("Agents") + "?category=all&filter=system"}>
                <Button variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  Explorar Agentes
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to={createPageUrl("AgentBuilder")}>
                <Button variant="secondary" className="bg-white text-indigo-600 hover:bg-gray-50">
                  Criar Meu Agente
                  <Plus className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}