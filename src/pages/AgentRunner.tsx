
import React, { useState, useEffect } from "react";
import { Agent, Execution, User } from "@/entities/all";
import { InvokeLLM } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate, Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  ArrowLeft, 
  Copy, 
  CheckCircle,
  Bot,
  Zap,
  Clock,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  Wand2,
  FileCode
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ReactMarkdown from "react-markdown";

import FieldRenderer from "../components/common/FieldRenderer";
import { compileTemplate } from "../components/utils/validation"; // Updated path

export default function AgentRunner() {
  const navigate = useNavigate();
  const [agent, setAgent] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for multi-step wizard
  const [currentStep, setCurrentStep] = useState(0);
  const [stepInputs, setStepInputs] = useState({});

  // State for prompts and results
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [apiResult, setApiResult] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  
  const [copied, setCopied] = useState({prompt: false, result: false});
  const [error, setError] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const agentId = urlParams.get('id');
    
    if (agentId) {
      loadData(agentId);
    } else {
      navigate(createPageUrl("Agents"));
    }
  }, []);

  const loadData = async (agentId) => {
    setIsLoading(true);
    try {
      const [agentData, userData] = await Promise.all([
        Agent.filter({ id: agentId }),
        User.me()
      ]);
      
      if (agentData.length > 0) {
        setAgent(agentData[0]);
        // Initialize stepInputs with empty objects for each step
        const initialInputs = {};
        agentData[0].steps.forEach((_, index) => {
            initialInputs[index] = {};
        });
        setStepInputs(initialInputs);
        setUser(userData);
      } else {
        navigate(createPageUrl("Agents"));
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      navigate(createPageUrl("Agents"));
    }
    setIsLoading(false);
  };
  
  const handleInputChange = (inputName, value) => {
    setStepInputs(prev => ({
      ...prev,
      [currentStep]: {
        ...prev[currentStep],
        [inputName]: value
      }
    }));
  };

  const generateStepPrompt = (stepIndex) => {
    const step = agent.steps[stepIndex];
    const inputsForStep = stepInputs[stepIndex] || {};
    return compileTemplate(step.template, inputsForStep);
  };
  
  const generateFinalPrompt = () => {
    const compiledSteps = agent.steps.map((step, index) => {
      const compiled = compileTemplate(step.template, stepInputs[index] || {});
      if (!compiled.trim()) return '';
      return `--- ETAPA: ${step.name} ---\n${compiled}`;
    }).filter(Boolean);
    
    return compiledSteps.join('\n\n');
  };

  const handleNextStep = () => {
    if (!isStepComplete()) {
        setError("Por favor, preencha todos os campos obrigatórios.");
        return;
    }
    setError("");
    const prompt = generateStepPrompt(currentStep);
    setCurrentPrompt(prompt);
    setApiResult(""); // Clear previous results
    setCurrentStep(s => s + 1);
  };
  
  const handleGenerateFinalPrompt = () => {
    if (!isStepComplete()) {
        setError("Por favor, preencha todos os campos obrigatórios da etapa final.");
        return;
    }
    setError("");
    const finalPrompt = generateFinalPrompt();
    setCurrentPrompt(finalPrompt);
    setApiResult("");
  };

  const handleExecute = async () => {
    if (!currentPrompt) {
      setError("Nenhum prompt foi gerado ainda.");
      return;
    }
    if (!user?.openai_api_key) {
      setError("Por favor, adicione sua chave de API da OpenAI nas configurações para executar um agente.");
      return;
    }
    
    setError("");
    setIsExecuting(true);
    setApiResult("");
    const startTime = Date.now();
    
    try {
      const llmResult = await InvokeLLM({ prompt: currentPrompt });
      setApiResult(llmResult);
      
      const executionTime = (Date.now() - startTime) / 1000;
      
      await Execution.create({
        agent_id: agent.id,
        agent_name: agent.name,
        inputs: stepInputs,
        generated_prompt: currentPrompt,
        output: llmResult,
        status: "completed",
        execution_time: executionTime
      });
      
    } catch (error) {
      console.error("Erro na execução:", error);
      const errorMessage = "Erro durante a execução. Verifique sua chave de API e tente novamente.";
      setApiResult(errorMessage);
      setError(errorMessage);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleCopy = async (textToCopy, type) => {
    await navigator.clipboard.writeText(textToCopy);
    setCopied(prev => ({...prev, [type]: true}));
    setTimeout(() => setCopied(prev => ({...prev, [type]: false})), 2000);
  };

  const isStepComplete = () => {
    const step = agent?.steps[currentStep];
    if (!step) return false;
    
    return step.inputs.every(input => 
      !input.required || (stepInputs[currentStep] && stepInputs[currentStep][input.name]?.trim())
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <Bot className="w-16 h-16 text-indigo-500 animate-pulse" />
      </div>
    );
  }

  const currentAgentStep = agent?.steps[currentStep];
  const isLastStep = currentStep === (agent?.steps.length - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate(createPageUrl("Agents"))}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{agent?.name}</h1>
              <p className="text-slate-600 dark:text-slate-400">{agent?.description}</p>
            </div>
          </div>
        </div>
        
        {error && (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>
                    {error}
                    {error.includes("chave de API") && <Link to={createPageUrl("Configuracoes")} className="font-bold underline ml-2">Ir para Configurações</Link>}
                </AlertDescription>
            </Alert>
        )}

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          
          <div className="space-y-6">
            <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                    <span>{currentAgentStep?.name}</span>
                  </div>
                  <span className="text-sm font-normal text-slate-500">
                    Etapa {currentStep + 1} de {agent?.steps.length}
                  </span>
                </CardTitle>
                <p className="text-sm text-slate-500 dark:text-slate-400 pt-2">{currentAgentStep?.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentAgentStep?.inputs?.map((input, index) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={input.name} className="flex items-center gap-2">
                      {input.name}
                      {input.required && <span className="text-red-500">*</span>}
                    </Label>
                    <FieldRenderer
                      input={input}
                      value={stepInputs[currentStep]?.[input.name]}
                      onChange={(value) => handleInputChange(input.name, value)}
                    />
                  </div>
                ))}

                <div className="flex justify-between items-center pt-4">
                  <Button variant="outline" onClick={() => setCurrentStep(s => s - 1)} disabled={currentStep === 0}>
                    <ChevronLeft className="w-4 h-4 mr-2" /> Anterior
                  </Button>
                  
                  {isLastStep ? (
                    <Button onClick={handleGenerateFinalPrompt} disabled={!isStepComplete()}>
                      <Wand2 className="w-4 h-4 mr-2" /> Gerar Prompt Final
                    </Button>
                  ) : (
                    <Button onClick={handleNextStep} disabled={!isStepComplete()}>
                      Gerar Prompt e Avançar <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCode className="w-5 h-5 text-indigo-600" />
                    Prompt Gerado
                  </CardTitle>
              </CardHeader>
              <CardContent>
                <textarea 
                  value={currentPrompt} 
                  readOnly 
                  rows={8} 
                  className="w-full p-3 border border-slate-200 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-700/50 text-sm font-mono resize-none mb-4"
                  placeholder="O prompt gerado para a etapa atual aparecerá aqui..."
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => handleCopy(currentPrompt, 'prompt')} disabled={!currentPrompt}>
                    {copied.prompt ? <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
                    Copiar
                  </Button>
                  <Button onClick={handleExecute} disabled={isExecuting || !currentPrompt || !user?.openai_api_key}>
                    {isExecuting ? <Clock className="w-4 h-4 mr-2 animate-spin" /> : <Zap className="w-4 h-4 mr-2" />}
                    Executar com IA
                  </Button>
                </div>
                {!user?.openai_api_key && <p className="text-xs text-slate-500 mt-2 text-right">Adicione sua chave de API nas Configurações para usar.</p>}
              </CardContent>
            </Card>

            <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-indigo-600" />
                  Resultado da IA
                </CardTitle>
              </CardHeader>
              <CardContent className="min-h-[200px]">
                {isExecuting ? (
                   <div className="flex flex-col items-center justify-center h-full text-slate-500">
                     <Bot className="w-12 h-12 mb-4 text-slate-300 animate-pulse" />
                     <p>Aguardando resposta da IA...</p>
                   </div>
                ) : apiResult ? (
                  <div className="space-y-4">
                    <div className="prose prose-sm dark:prose-invert max-w-none max-h-80 overflow-y-auto bg-slate-50 dark:bg-slate-900/50 rounded-md p-4">
                      <ReactMarkdown>{apiResult}</ReactMarkdown>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleCopy(apiResult, 'result')}>
                      {copied.result ? <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
                       Copiar Resultado
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-10 text-slate-500">
                    <Bot className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                    <p>O resultado da execução aparecerá aqui.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
}
