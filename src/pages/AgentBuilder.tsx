
import React, { useState, useEffect } from "react";
import { Agent, User } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2,
  Bot,
  Sparkles,
  AlertCircle,
  GripVertical,
  Wand2
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { categoriesGrouped } from "../components/utils/categories";
import { toneOptionsGrouped } from "../components/utils/toneOptions";
import { getUserRole, canCreate, canEdit } from "../components/utils/permissions";
import { validatePlaceholdersInText } from "../components/utils/validation";
import PermissionGuard from "../components/common/PermissionGuard";

const inputTypes = [
  { value: "text", label: "Texto" },
  { value: "textarea", label: "Texto Longo" },
  { value: "number", label: "Número" },
  { value: "email", label: "E-mail" },
  { value: "url", label: "URL" },
  { value: "select", label: "Seleção" }
];

export default function AgentBuilder() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState('usuario');
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "other",
    type: "simple",
    steps: [{ 
      name: "Entrada", 
      description: "", 
      template: "", 
      inputs: [] 
    }],
    is_active: true
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const agentId = urlParams.get('id');
    
    loadUser();
    
    if (agentId) {
      loadAgent(agentId);
    }
  }, []);

  const loadUser = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
      const role = getUserRole(userData.email);
      setUserRole(role);
      
      // Verificar se pode criar/editar
      if (!canCreate(role)) {
        navigate(createPageUrl("Agents"));
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      navigate(createPageUrl("Agents"));
    }
  };

  const loadAgent = async (agentId) => {
    setIsLoading(true);
    try {
      const agentData = await Agent.filter({ id: agentId });
      
      if (agentData.length > 0) {
        const agent = agentData[0];
        
        // Verificar se pode editar
        if (!canEdit(userRole, agent)) {
          navigate(createPageUrl("Agents"));
          return;
        }
        
        setEditingAgent(agent);
        setFormData({
          name: agent.name,
          description: agent.description,
          category: agent.category,
          type: agent.type || 'simple',
          steps: agent.steps && agent.steps.length > 0 ? agent.steps : [{ 
            name: "Entrada", 
            description: "", 
            template: "", 
            inputs: [] 
          }],
          is_active: agent.is_active
        });
      }
    } catch (error) {
      console.error("Erro ao carregar agente:", error);
      setError("Erro ao carregar agente");
    }
    setIsLoading(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleStepChange = (stepIndex, field, value) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.map((step, index) => 
        index === stepIndex ? { ...step, [field]: value } : step
      )
    }));
    
    // Validar placeholders no template
    if (field === 'template') {
      const validation = validatePlaceholdersInText(value);
      if (!validation.ok) {
        setError(`Placeholders inválidos: ${validation.invalid.join(', ')}. Use apenas letras minúsculas, números e underscore.`);
      }
    }
  };

  const handleStepInputChange = (stepIndex, inputIndex, field, value) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.map((step, si) => 
        si === stepIndex ? {
          ...step,
          inputs: step.inputs.map((input, ii) => 
            ii === inputIndex ? { ...input, [field]: value } : input
          )
        } : step
      )
    }));
  };

  const addStep = () => {
    setFormData(prev => ({
      ...prev,
      steps: [...prev.steps, { 
        name: `Etapa ${prev.steps.length + 1}`, 
        description: "", 
        template: "", 
        inputs: [] 
      }]
    }));
  };

  const removeStep = (index) => {
    if (formData.steps.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }));
  };

  const addInputToStep = (stepIndex) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.map((step, i) => 
        i === stepIndex ? {
          ...step,
          inputs: [...step.inputs, { 
            name: "", 
            type: "text", 
            required: false, 
            placeholder: "" 
          }]
        } : step
      )
    }));
  };

  const removeInputFromStep = (stepIndex, inputIndex) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.map((step, i) => 
        i === stepIndex ? {
          ...step,
          inputs: step.inputs.filter((_, ii) => ii !== inputIndex)
        } : step
      )
    }));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, type } = result;

    if (type === 'STEPS') {
      const reorderedSteps = Array.from(formData.steps);
      const [removed] = reorderedSteps.splice(source.index, 1);
      reorderedSteps.splice(destination.index, 0, removed);
      setFormData(prev => ({ ...prev, steps: reorderedSteps }));
    } else if (type.startsWith('INPUTS_')) {
      const stepIndex = parseInt(type.split('_')[1], 10);
      const step = formData.steps[stepIndex];
      const reorderedInputs = Array.from(step.inputs);
      const [removed] = reorderedInputs.splice(source.index, 1);
      reorderedInputs.splice(destination.index, 0, removed);
      
      const newSteps = Array.from(formData.steps);
      newSteps[stepIndex] = { ...step, inputs: reorderedInputs };
      setFormData(prev => ({ ...prev, steps: newSteps }));
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Nome do agente é obrigatório");
      return false;
    }
    
    if (!formData.description.trim()) {
      setError("Descrição é obrigatória");
      return false;
    }

    // Validar steps
    for (let i = 0; i < formData.steps.length; i++) {
      const step = formData.steps[i];
      
      if (!step.name.trim()) {
        setError(`Nome da etapa ${i + 1} é obrigatório`);
        return false;
      }
      
      if (!step.template.trim()) {
        setError(`Template da etapa ${i + 1} é obrigatório`);
        return false;
      }
      
      // Validar placeholders
      const validation = validatePlaceholdersInText(step.template);
      if (!validation.ok) {
        setError(`Placeholders inválidos na etapa ${i + 1}: ${validation.invalid.join(', ')}`);
        return false;
      }
      
      // Validar inputs da etapa
      for (let j = 0; j < step.inputs.length; j++) {
        const input = step.inputs[j];
        if (!input.name.trim()) {
          setError(`Nome do campo ${j + 1} na etapa ${i + 1} é obrigatório`);
          return false;
        }
      }
    }
    
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    try {
      const agentData = {
        ...formData,
        origin: editingAgent ? editingAgent.origin : "custom",
        is_editable: editingAgent ? editingAgent.is_editable : true
      };
      
      if (editingAgent) {
        await Agent.update(editingAgent.id, agentData);
      } else {
        await Agent.create(agentData);
      }
      
      navigate(createPageUrl("Agents"));
    } catch (error) {
      console.error("Erro ao salvar agente:", error);
      setError("Erro ao salvar agente. Tente novamente.");
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
        <Bot className="w-16 h-16 text-indigo-500 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate(createPageUrl("Agents"))}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {editingAgent ? "Editar Agente" : "Criar Novo Agente"}
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              {editingAgent ? "Modifique as configurações do agente" : "Configure seu agente inteligente"}
            </p>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Informações Básicas */}
        <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              Informações Básicas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Agente *</Label>
                <Input
                  id="name"
                  placeholder="Ex: Assistente de Blog/Artigo"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="border-slate-200 dark:border-slate-600"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Categoria *</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleInputChange("category", value)}
                >
                  <SelectTrigger className="border-slate-200 dark:border-slate-600">
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriesGrouped.map(group => (
                      <SelectGroup key={group.label}>
                        <SelectLabel>{group.label}</SelectLabel>
                        {group.options.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição *</Label>
              <Textarea
                id="description"
                placeholder="Descreva o que seu agente faz e como ele pode ajudar..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={3}
                className="border-slate-200 dark:border-slate-600"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) => handleInputChange("is_active", checked)}
                />
                <Label>Agente Ativo</Label>
              </div>
              
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.type === 'wizard'}
                  onCheckedChange={(checked) => handleInputChange("type", checked ? 'wizard' : 'simple')}
                />
                <Label>Agente Multi-Etapas (Wizard)</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Steps/Etapas */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="steps-droppable" type="STEPS">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
                {formData.steps.map((step, stepIndex) => (
                  <Draggable key={stepIndex} draggableId={`step-${stepIndex}`} index={stepIndex}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60">
                          <CardHeader className="flex flex-row items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div {...provided.dragHandleProps}>
                                <GripVertical className="w-5 h-5 text-slate-400 cursor-move" />
                              </div>
                              <CardTitle className="flex items-center gap-2 text-lg">
                                <Wand2 className="w-5 h-5 text-indigo-600" />
                                Etapa {stepIndex + 1}
                              </CardTitle>
                            </div>
                            {formData.steps.length > 1 && (
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => removeStep(stepIndex)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </CardHeader>
                          <CardContent className="space-y-4">
                            
                            {/* Nome e Descrição da Etapa */}
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Nome da Etapa *</Label>
                                <Input
                                  placeholder="Ex: Palavras-chave"
                                  value={step.name}
                                  onChange={(e) => handleStepChange(stepIndex, "name", e.target.value)}
                                  className="border-slate-200 dark:border-slate-600"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Descrição da Etapa</Label>
                                <Input
                                  placeholder="Ex: Esta etapa irá gerar palavras-chave..."
                                  value={step.description}
                                  onChange={(e) => handleStepChange(stepIndex, "description", e.target.value)}
                                  className="border-slate-200 dark:border-slate-600"
                                />
                              </div>
                            </div>

                            {/* Template da Etapa */}
                            <div className="space-y-2">
                              <Label>Template/Prompt da Etapa *</Label>
                              <Textarea
                                placeholder="Digite o template com variáveis. Ex: Gere {{quantidade}} palavras-chave sobre {{topico}} com {{tipo_palavra_chave}}..."
                                value={step.template}
                                onChange={(e) => handleStepChange(stepIndex, "template", e.target.value)}
                                rows={5}
                                className="border-slate-200 dark:border-slate-600"
                              />
                              <p className="text-xs text-slate-500">
                                Use <code>{'{{nome_campo}}'}</code> para inserir variáveis dos campos de entrada
                              </p>
                            </div>

                            {/* Campos de Entrada da Etapa */}
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                                  Campos de Entrada da Etapa
                                </h4>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => addInputToStep(stepIndex)}
                                  className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-700 dark:text-indigo-400 dark:hover:bg-indigo-900/20"
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  Adicionar Campo
                                </Button>
                              </div>

                              <Droppable droppableId={`inputs-droppable-${stepIndex}`} type={`INPUTS_${stepIndex}`}>
                                {(provided) => (
                                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                                    {step.inputs.map((input, inputIndex) => (
                                      <Draggable 
                                        key={inputIndex} 
                                        draggableId={`input-${stepIndex}-${inputIndex}`} 
                                        index={inputIndex}
                                      >
                                        {(provided) => (
                                          <div ref={provided.innerRef} {...provided.draggableProps}>
                                            <Card className="p-4 bg-slate-50/80 dark:bg-slate-700/80 border-slate-200 dark:border-slate-600">
                                              <div className="flex items-start gap-3">
                                                <div {...provided.dragHandleProps} className="mt-2">
                                                  <GripVertical className="w-4 h-4 text-slate-400 cursor-move" />
                                                </div>
                                                
                                                <div className="flex-1 space-y-3">
                                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                    <div className="space-y-1">
                                                      <Label className="text-sm">Nome do Campo *</Label>
                                                      <Input
                                                        placeholder="topico"
                                                        value={input.name}
                                                        onChange={(e) => handleStepInputChange(stepIndex, inputIndex, 'name', e.target.value)}
                                                        className="text-sm border-slate-200 dark:border-slate-600"
                                                      />
                                                    </div>
                                                    
                                                    <div className="space-y-1">
                                                      <Label className="text-sm">Tipo</Label>
                                                      <Select
                                                        value={input.type}
                                                        onValueChange={(value) => handleStepInputChange(stepIndex, inputIndex, 'type', value)}
                                                      >
                                                        <SelectTrigger className="text-sm border-slate-200 dark:border-slate-600">
                                                          <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                          {inputTypes.map(type => (
                                                            <SelectItem key={type.value} value={type.value}>
                                                              {type.label}
                                                            </SelectItem>
                                                          ))}
                                                        </SelectContent>
                                                      </Select>
                                                    </div>
                                                    
                                                    <div className="space-y-1">
                                                      <Label className="text-sm">Placeholder</Label>
                                                      <Input
                                                        placeholder="Ex: marketing digital"
                                                        value={input.placeholder}
                                                        onChange={(e) => handleStepInputChange(stepIndex, inputIndex, 'placeholder', e.target.value)}
                                                        className="text-sm border-slate-200 dark:border-slate-600"
                                                      />
                                                    </div>
                                                  </div>

                                                  {/* Opções para Select */}
                                                  {input.type === 'select' && (
                                                    <div className="space-y-2">
                                                      <div className="flex items-center justify-between">
                                                        <Label className="text-sm">Opções de Seleção</Label>
                                                        <Button
                                                          type="button"
                                                          variant="ghost"
                                                          size="sm"
                                                          onClick={() => {
                                                            handleStepInputChange(stepIndex, inputIndex, 'options_grouped', toneOptionsGrouped);
                                                          }}
                                                          className="text-xs text-indigo-600 hover:text-indigo-800"
                                                        >
                                                          Usar Modelo Tom de Voz
                                                        </Button>
                                                      </div>
                                                      
                                                      <Textarea
                                                        placeholder="Digite as opções separadas por vírgula ou use o formato JSON para grupos..."
                                                        value={
                                                          input.options_grouped 
                                                            ? JSON.stringify(input.options_grouped, null, 2)
                                                            : (input.options || []).join(', ')
                                                        }
                                                        onChange={(e) => {
                                                          const value = e.target.value;
                                                          try {
                                                            // Tentar parsear como JSON primeiro (para grupos)
                                                            const parsed = JSON.parse(value);
                                                            if (Array.isArray(parsed)) {
                                                              handleStepInputChange(stepIndex, inputIndex, 'options_grouped', parsed);
                                                              handleStepInputChange(stepIndex, inputIndex, 'options', []);
                                                            }
                                                          } catch {
                                                            // Se não for JSON válido, tratar como lista simples
                                                            const simpleOptions = value.split(',').map(opt => opt.trim()).filter(Boolean);
                                                            handleStepInputChange(stepIndex, inputIndex, 'options', simpleOptions);
                                                            handleStepInputChange(stepIndex, inputIndex, 'options_grouped', []);
                                                          }
                                                        }}
                                                        rows={input.options_grouped ? 8 : 3}
                                                        className="text-sm font-mono border-slate-200 dark:border-slate-600"
                                                      />
                                                      <p className="text-xs text-slate-500">
                                                        Para opções simples: Casual, Profissional, Amigável<br/>
                                                        Para grupos: Use JSON com array de objetos {`{label, options}`}
                                                      </p>
                                                    </div>
                                                  )}

                                                  <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                      <Switch
                                                        checked={input.required}
                                                        onCheckedChange={(checked) => handleStepInputChange(stepIndex, inputIndex, 'required', checked)}
                                                      />
                                                      <Label className="text-sm">Campo Obrigatório</Label>
                                                    </div>
                                                  </div>
                                                </div>

                                                <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  onClick={() => removeInputFromStep(stepIndex, inputIndex)}
                                                  className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 mt-2"
                                                >
                                                  <Trash2 className="w-4 h-4" />
                                                </Button>
                                              </div>
                                            </Card>
                                          </div>
                                        )}
                                      </Draggable>
                                    ))}
                                    {provided.placeholder}
                                  </div>
                                )}
                              </Droppable>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {/* Adicionar Etapa (apenas para wizards) */}
        {formData.type === 'wizard' && (
          <div className="flex justify-center">
            <Button 
              variant="outline" 
              onClick={addStep}
              className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-700 dark:text-indigo-400 dark:hover:bg-indigo-900/20"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Etapa
            </Button>
          </div>
        )}

        {/* Ações */}
        <div className="flex justify-end gap-3">
          <Button 
            variant="outline" 
            onClick={() => navigate(createPageUrl("Agents"))}
            disabled={isSaving}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {editingAgent ? "Salvar Alterações" : "Criar Agente"}
              </>
            )}
          </Button>
        </div>

      </div>
    </div>
  );
}
