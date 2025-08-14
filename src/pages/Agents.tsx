
import React, { useState, useEffect } from "react";
import { Agent, User } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Search, Plus, Filter } from "lucide-react";

import AgentCard from "../components/agents/AgentCard";
import FilterSidebar from "../components/agents/FilterSidebar";
import PermissionGuard from "../components/common/PermissionGuard";
import { getUserRole } from "../components/utils/permissions"; // Updated path
import { getCategoryInfo } from "../components/utils/categories"; // New import

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState('usuario');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [agentsData, userData] = await Promise.all([
        Agent.list("-created_date"),
        User.me()
      ]);
      
      setAgents(agentsData);
      setUser(userData);
      
      const role = getUserRole(userData.email);
      setUserRole(role);
    } catch (error) {
      console.error("Erro ao carregar agentes:", error);
    }
    setIsLoading(false);
  };

  const handleToggleFavorite = async (agentId) => {
    const agent = agents.find(a => a.id === agentId);
    if (!agent) return;

    try {
      await Agent.update(agentId, { 
        is_favorite: !agent.is_favorite 
      });
      
      setAgents(prev => prev.map(a => 
        a.id === agentId ? { ...a, is_favorite: !a.is_favorite } : a
      ));
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error);
    }
  };

  const handleDeleteAgent = async (agentId) => {
    try {
      await Agent.delete(agentId);
      setAgents(prev => prev.filter(a => a.id !== agentId));
    } catch (error) {
      console.error("Erro ao excluir agente:", error);
      alert("Erro ao excluir agente. Tente novamente.");
    }
  };

  // Filtrar agentes
  const filteredAgents = agents.filter(agent => {
    const categoryInfo = getCategoryInfo(agent.category);
    const searchLower = searchQuery.toLowerCase();

    const matchesSearch = agent.name.toLowerCase().includes(searchLower) ||
                         agent.description.toLowerCase().includes(searchLower) ||
                         categoryInfo.label.toLowerCase().includes(searchLower); // Include category label in search
    
    const matchesCategory = selectedCategory === "all" || agent.category === selectedCategory;
    
    const matchesFilter = 
      selectedFilter === "all" ||
      (selectedFilter === "favorites" && agent.is_favorite) ||
      (selectedFilter === "mine" && agent.created_by === user?.email) ||
      (selectedFilter === "system" && agent.origin === "default");
    
    return matchesSearch && matchesCategory && matchesFilter && agent.is_active;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
      <div className="flex">
        
        {/* Sidebar de Filtros */}
        <FilterSidebar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          agents={agents}
          userEmail={user?.email}
        />

        {/* Conteúdo Principal */}
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Agentes Inteligentes
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 mt-2">
                  Descubra e gerencie seus agentes de IA
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden border-indigo-200 text-indigo-600 dark:border-indigo-700 dark:text-indigo-400"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
                
                <PermissionGuard userRole={userRole} requiredRoles={['admin_master', 'admin_pleno']}>
                  <Link to={createPageUrl("AgentBuilder")}>
                    <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg">
                      <Plus className="w-4 h-4 mr-2" />
                      Criar Agente
                    </Button>
                  </Link>
                </PermissionGuard>
              </div>
            </div>

            {/* Busca */}
            <div className="mb-8">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Buscar agentes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-slate-200 dark:border-slate-600 bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Lista de Agentes */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(9).fill(0).map((_, i) => (
                  <div key={i} className="h-64 bg-white/60 dark:bg-slate-700/60 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAgents.map((agent) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    onToggleFavorite={handleToggleFavorite}
                    onDeleteAgent={handleDeleteAgent}
                    userRole={userRole}
                  />
                ))}
              </div>
            )}

            {!isLoading && filteredAgents.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">
                  Nenhum agente encontrado
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  Tente ajustar os filtros ou criar um novo agente
                </p>
                <PermissionGuard userRole={userRole} requiredRoles={['admin_master', 'admin_pleno']}>
                  <Link to={createPageUrl("AgentBuilder")}>
                    <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Criar Primeiro Agente
                    </Button>
                  </Link>
                </PermissionGuard>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
