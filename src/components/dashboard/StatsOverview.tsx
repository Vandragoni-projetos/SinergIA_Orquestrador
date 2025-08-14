import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, User, Shield, Zap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const StatCard = ({ icon: Icon, label, value, color, isLoading }) => {
  return (
    <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}</p>
            {isLoading ? (
              <Skeleton className="h-8 w-16 mt-2" />
            ) : (
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">{value}</p>
            )}
          </div>
          <div className={`p-3 rounded-xl ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function StatsOverview({ 
  totalAgents, 
  myAgents, 
  systemAgents, 
  todayExecutions, 
  isLoading 
}) {
  const stats = [
    {
      icon: Bot,
      label: "Total de Agentes",
      value: totalAgents,
      color: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    {
      icon: User,
      label: "Meus Agentes",
      value: myAgents,
      color: "bg-gradient-to-r from-green-500 to-green-600"
    },
    {
      icon: Shield,
      label: "Agentes do Sistema",
      value: systemAgents,
      color: "bg-gradient-to-r from-purple-500 to-purple-600"
    },
    {
      icon: Zap,
      label: "Execuções Hoje",
      value: todayExecutions,
      color: "bg-gradient-to-r from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} isLoading={isLoading} />
      ))}
    </div>
  );
}