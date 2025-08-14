"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AgentBuilder;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var all_1 = require("@/entities/all");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var input_1 = require("@/components/ui/input");
var textarea_1 = require("@/components/ui/textarea");
var label_1 = require("@/components/ui/label");
var select_1 = require("@/components/ui/select");
var switch_1 = require("@/components/ui/switch");
var react_router_dom_1 = require("react-router-dom");
var utils_1 = require("@/utils");
var lucide_react_1 = require("lucide-react");
var alert_1 = require("@/components/ui/alert");
var dnd_1 = require("@hello-pangea/dnd");
var categories_1 = require("../components/utils/categories");
var toneOptions_1 = require("../components/utils/toneOptions");
var permissions_1 = require("../components/utils/permissions");
var validation_1 = require("../components/utils/validation");
var inputTypes = [
    { value: "text", label: "Texto" },
    { value: "textarea", label: "Texto Longo" },
    { value: "number", label: "Número" },
    { value: "email", label: "E-mail" },
    { value: "url", label: "URL" },
    { value: "select", label: "Seleção" }
];
function AgentBuilder() {
    var _this = this;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, react_1.useState)(false), isLoading = _a[0], setIsLoading = _a[1];
    var _b = (0, react_1.useState)(false), isSaving = _b[0], setIsSaving = _b[1];
    var _c = (0, react_1.useState)(null), editingAgent = _c[0], setEditingAgent = _c[1];
    var _d = (0, react_1.useState)(null), user = _d[0], setUser = _d[1];
    var _e = (0, react_1.useState)('usuario'), userRole = _e[0], setUserRole = _e[1];
    var _f = (0, react_1.useState)(""), error = _f[0], setError = _f[1];
    var _g = (0, react_1.useState)({
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
    }), formData = _g[0], setFormData = _g[1];
    (0, react_1.useEffect)(function () {
        var urlParams = new URLSearchParams(window.location.search);
        var agentId = urlParams.get('id');
        loadUser();
        if (agentId) {
            loadAgent(agentId);
        }
    }, []);
    var loadUser = function () { return __awaiter(_this, void 0, void 0, function () {
        var userData, role, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, all_1.User.me()];
                case 1:
                    userData = _a.sent();
                    setUser(userData);
                    role = (0, permissions_1.getUserRole)(userData.email);
                    setUserRole(role);
                    // Verificar se pode criar/editar
                    if (!(0, permissions_1.canCreate)(role)) {
                        navigate((0, utils_1.createPageUrl)("Agents"));
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("Erro ao carregar usuário:", error_1);
                    navigate((0, utils_1.createPageUrl)("Agents"));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var loadAgent = function (agentId) { return __awaiter(_this, void 0, void 0, function () {
        var agentData, agent, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, all_1.Agent.filter({ id: agentId })];
                case 2:
                    agentData = _a.sent();
                    if (agentData.length > 0) {
                        agent = agentData[0];
                        // Verificar se pode editar
                        if (!(0, permissions_1.canEdit)(userRole, agent)) {
                            navigate((0, utils_1.createPageUrl)("Agents"));
                            return [2 /*return*/];
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
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Erro ao carregar agente:", error_2);
                    setError("Erro ao carregar agente");
                    return [3 /*break*/, 4];
                case 4:
                    setIsLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleInputChange = function (field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
        setError("");
    };
    var handleStepChange = function (stepIndex, field, value) {
        setFormData(function (prev) { return (__assign(__assign({}, prev), { steps: prev.steps.map(function (step, index) {
                var _a;
                return index === stepIndex ? __assign(__assign({}, step), (_a = {}, _a[field] = value, _a)) : step;
            }) })); });
        // Validar placeholders no template
        if (field === 'template') {
            var validation = (0, validation_1.validatePlaceholdersInText)(value);
            if (!validation.ok) {
                setError("Placeholders inv\u00E1lidos: ".concat(validation.invalid.join(', '), ". Use apenas letras min\u00FAsculas, n\u00FAmeros e underscore."));
            }
        }
    };
    var handleStepInputChange = function (stepIndex, inputIndex, field, value) {
        setFormData(function (prev) { return (__assign(__assign({}, prev), { steps: prev.steps.map(function (step, si) {
                return si === stepIndex ? __assign(__assign({}, step), { inputs: step.inputs.map(function (input, ii) {
                        var _a;
                        return ii === inputIndex ? __assign(__assign({}, input), (_a = {}, _a[field] = value, _a)) : input;
                    }) }) : step;
            }) })); });
    };
    var addStep = function () {
        setFormData(function (prev) { return (__assign(__assign({}, prev), { steps: __spreadArray(__spreadArray([], prev.steps, true), [{
                    name: "Etapa ".concat(prev.steps.length + 1),
                    description: "",
                    template: "",
                    inputs: []
                }], false) })); });
    };
    var removeStep = function (index) {
        if (formData.steps.length <= 1)
            return;
        setFormData(function (prev) { return (__assign(__assign({}, prev), { steps: prev.steps.filter(function (_, i) { return i !== index; }) })); });
    };
    var addInputToStep = function (stepIndex) {
        setFormData(function (prev) { return (__assign(__assign({}, prev), { steps: prev.steps.map(function (step, i) {
                return i === stepIndex ? __assign(__assign({}, step), { inputs: __spreadArray(__spreadArray([], step.inputs, true), [{
                            name: "",
                            type: "text",
                            required: false,
                            placeholder: ""
                        }], false) }) : step;
            }) })); });
    };
    var removeInputFromStep = function (stepIndex, inputIndex) {
        setFormData(function (prev) { return (__assign(__assign({}, prev), { steps: prev.steps.map(function (step, i) {
                return i === stepIndex ? __assign(__assign({}, step), { inputs: step.inputs.filter(function (_, ii) { return ii !== inputIndex; }) }) : step;
            }) })); });
    };
    var onDragEnd = function (result) {
        if (!result.destination)
            return;
        var source = result.source, destination = result.destination, type = result.type;
        if (type === 'STEPS') {
            var reorderedSteps_1 = Array.from(formData.steps);
            var removed = reorderedSteps_1.splice(source.index, 1)[0];
            reorderedSteps_1.splice(destination.index, 0, removed);
            setFormData(function (prev) { return (__assign(__assign({}, prev), { steps: reorderedSteps_1 })); });
        }
        else if (type.startsWith('INPUTS_')) {
            var stepIndex = parseInt(type.split('_')[1], 10);
            var step = formData.steps[stepIndex];
            var reorderedInputs = Array.from(step.inputs);
            var removed = reorderedInputs.splice(source.index, 1)[0];
            reorderedInputs.splice(destination.index, 0, removed);
            var newSteps_1 = Array.from(formData.steps);
            newSteps_1[stepIndex] = __assign(__assign({}, step), { inputs: reorderedInputs });
            setFormData(function (prev) { return (__assign(__assign({}, prev), { steps: newSteps_1 })); });
        }
    };
    var validateForm = function () {
        if (!formData.name.trim()) {
            setError("Nome do agente é obrigatório");
            return false;
        }
        if (!formData.description.trim()) {
            setError("Descrição é obrigatória");
            return false;
        }
        // Validar steps
        for (var i = 0; i < formData.steps.length; i++) {
            var step = formData.steps[i];
            if (!step.name.trim()) {
                setError("Nome da etapa ".concat(i + 1, " \u00E9 obrigat\u00F3rio"));
                return false;
            }
            if (!step.template.trim()) {
                setError("Template da etapa ".concat(i + 1, " \u00E9 obrigat\u00F3rio"));
                return false;
            }
            // Validar placeholders
            var validation = (0, validation_1.validatePlaceholdersInText)(step.template);
            if (!validation.ok) {
                setError("Placeholders inv\u00E1lidos na etapa ".concat(i + 1, ": ").concat(validation.invalid.join(', ')));
                return false;
            }
            // Validar inputs da etapa
            for (var j = 0; j < step.inputs.length; j++) {
                var input = step.inputs[j];
                if (!input.name.trim()) {
                    setError("Nome do campo ".concat(j + 1, " na etapa ").concat(i + 1, " \u00E9 obrigat\u00F3rio"));
                    return false;
                }
            }
        }
        return true;
    };
    var handleSave = function () { return __awaiter(_this, void 0, void 0, function () {
        var agentData, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!validateForm())
                        return [2 /*return*/];
                    setIsSaving(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    agentData = __assign(__assign({}, formData), { origin: editingAgent ? editingAgent.origin : "custom", is_editable: editingAgent ? editingAgent.is_editable : true });
                    if (!editingAgent) return [3 /*break*/, 3];
                    return [4 /*yield*/, all_1.Agent.update(editingAgent.id, agentData)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, all_1.Agent.create(agentData)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    navigate((0, utils_1.createPageUrl)("Agents"));
                    return [3 /*break*/, 7];
                case 6:
                    error_3 = _a.sent();
                    console.error("Erro ao salvar agente:", error_3);
                    setError("Erro ao salvar agente. Tente novamente.");
                    return [3 /*break*/, 7];
                case 7:
                    setIsSaving(false);
                    return [2 /*return*/];
            }
        });
    }); };
    if (isLoading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Bot, { className: "w-16 h-16 text-indigo-500 animate-pulse" }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-4xl mx-auto space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", onClick: function () { return navigate((0, utils_1.createPageUrl)("Agents")); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeft, { className: "w-4 h-4 mr-2" }), "Voltar"] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent", children: editingAgent ? "Editar Agente" : "Criar Novo Agente" }), (0, jsx_runtime_1.jsx)("p", { className: "text-slate-600 dark:text-slate-300", children: editingAgent ? "Modifique as configurações do agente" : "Configure seu agente inteligente" })] })] }), error && ((0, jsx_runtime_1.jsxs)(alert_1.Alert, { variant: "destructive", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { children: error })] })), (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { className: "w-5 h-5 text-indigo-600" }), "Informa\u00E7\u00F5es B\u00E1sicas"] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid md:grid-cols-2 gap-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "name", children: "Nome do Agente *" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "name", placeholder: "Ex: Assistente de Blog/Artigo", value: formData.name, onChange: function (e) { return handleInputChange("name", e.target.value); }, className: "border-slate-200 dark:border-slate-600" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "category", children: "Categoria *" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: formData.category, onValueChange: function (value) { return handleInputChange("category", value); }, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "border-slate-200 dark:border-slate-600", children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "Selecione a categoria" }) }), (0, jsx_runtime_1.jsx)(select_1.SelectContent, { children: categories_1.categoriesGrouped.map(function (group) { return ((0, jsx_runtime_1.jsxs)(select_1.SelectGroup, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectLabel, { children: group.label }), group.options.map(function (option) { return ((0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: option.value, children: option.label }, option.value)); })] }, group.label)); }) })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "description", children: "Descri\u00E7\u00E3o *" }), (0, jsx_runtime_1.jsx)(textarea_1.Textarea, { id: "description", placeholder: "Descreva o que seu agente faz e como ele pode ajudar...", value: formData.description, onChange: function (e) { return handleInputChange("description", e.target.value); }, rows: 3, className: "border-slate-200 dark:border-slate-600" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(switch_1.Switch, { checked: formData.is_active, onCheckedChange: function (checked) { return handleInputChange("is_active", checked); } }), (0, jsx_runtime_1.jsx)(label_1.Label, { children: "Agente Ativo" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(switch_1.Switch, { checked: formData.type === 'wizard', onCheckedChange: function (checked) { return handleInputChange("type", checked ? 'wizard' : 'simple'); } }), (0, jsx_runtime_1.jsx)(label_1.Label, { children: "Agente Multi-Etapas (Wizard)" })] })] })] })] }), (0, jsx_runtime_1.jsx)(dnd_1.DragDropContext, { onDragEnd: onDragEnd, children: (0, jsx_runtime_1.jsx)(dnd_1.Droppable, { droppableId: "steps-droppable", type: "STEPS", children: function (provided) { return ((0, jsx_runtime_1.jsxs)("div", __assign({}, provided.droppableProps, { ref: provided.innerRef, className: "space-y-6", children: [formData.steps.map(function (step, stepIndex) { return ((0, jsx_runtime_1.jsx)(dnd_1.Draggable, { draggableId: "step-".concat(stepIndex), index: stepIndex, children: function (provided) { return ((0, jsx_runtime_1.jsx)("div", __assign({ ref: provided.innerRef }, provided.draggableProps, { children: (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "flex flex-row items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("div", __assign({}, provided.dragHandleProps, { children: (0, jsx_runtime_1.jsx)(lucide_react_1.GripVertical, { className: "w-5 h-5 text-slate-400 cursor-move" }) })), (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2 text-lg", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Wand2, { className: "w-5 h-5 text-indigo-600" }), "Etapa ", stepIndex + 1] })] }), formData.steps.length > 1 && ((0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "icon", onClick: function () { return removeStep(stepIndex); }, className: "text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "w-4 h-4" }) }))] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid md:grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "Nome da Etapa *" }), (0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: "Ex: Palavras-chave", value: step.name, onChange: function (e) { return handleStepChange(stepIndex, "name", e.target.value); }, className: "border-slate-200 dark:border-slate-600" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "Descri\u00E7\u00E3o da Etapa" }), (0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: "Ex: Esta etapa ir\u00E1 gerar palavras-chave...", value: step.description, onChange: function (e) { return handleStepChange(stepIndex, "description", e.target.value); }, className: "border-slate-200 dark:border-slate-600" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "Template/Prompt da Etapa *" }), (0, jsx_runtime_1.jsx)(textarea_1.Textarea, { placeholder: "Digite o template com vari\u00E1veis. Ex: Gere {{quantidade}} palavras-chave sobre {{topico}} com {{tipo_palavra_chave}}...", value: step.template, onChange: function (e) { return handleStepChange(stepIndex, "template", e.target.value); }, rows: 5, className: "border-slate-200 dark:border-slate-600" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-slate-500", children: ["Use ", (0, jsx_runtime_1.jsx)("code", { children: '{{nome_campo}}' }), " para inserir vari\u00E1veis dos campos de entrada"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-semibold text-slate-900 dark:text-slate-100", children: "Campos de Entrada da Etapa" }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", size: "sm", onClick: function () { return addInputToStep(stepIndex); }, className: "border-indigo-200 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-700 dark:text-indigo-400 dark:hover:bg-indigo-900/20", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "w-4 h-4 mr-2" }), "Adicionar Campo"] })] }), (0, jsx_runtime_1.jsx)(dnd_1.Droppable, { droppableId: "inputs-droppable-".concat(stepIndex), type: "INPUTS_".concat(stepIndex), children: function (provided) { return ((0, jsx_runtime_1.jsxs)("div", __assign({}, provided.droppableProps, { ref: provided.innerRef, className: "space-y-3", children: [step.inputs.map(function (input, inputIndex) { return ((0, jsx_runtime_1.jsx)(dnd_1.Draggable, { draggableId: "input-".concat(stepIndex, "-").concat(inputIndex), index: inputIndex, children: function (provided) { return ((0, jsx_runtime_1.jsx)("div", __assign({ ref: provided.innerRef }, provided.draggableProps, { children: (0, jsx_runtime_1.jsx)(card_1.Card, { className: "p-4 bg-slate-50/80 dark:bg-slate-700/80 border-slate-200 dark:border-slate-600", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-3", children: [(0, jsx_runtime_1.jsx)("div", __assign({}, provided.dragHandleProps, { className: "mt-2", children: (0, jsx_runtime_1.jsx)(lucide_react_1.GripVertical, { className: "w-4 h-4 text-slate-400 cursor-move" }) })), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm", children: "Nome do Campo *" }), (0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: "topico", value: input.name, onChange: function (e) { return handleStepInputChange(stepIndex, inputIndex, 'name', e.target.value); }, className: "text-sm border-slate-200 dark:border-slate-600" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm", children: "Tipo" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: input.type, onValueChange: function (value) { return handleStepInputChange(stepIndex, inputIndex, 'type', value); }, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "text-sm border-slate-200 dark:border-slate-600", children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {}) }), (0, jsx_runtime_1.jsx)(select_1.SelectContent, { children: inputTypes.map(function (type) { return ((0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: type.value, children: type.label }, type.value)); }) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm", children: "Placeholder" }), (0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: "Ex: marketing digital", value: input.placeholder, onChange: function (e) { return handleStepInputChange(stepIndex, inputIndex, 'placeholder', e.target.value); }, className: "text-sm border-slate-200 dark:border-slate-600" })] })] }), input.type === 'select' && ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm", children: "Op\u00E7\u00F5es de Sele\u00E7\u00E3o" }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", variant: "ghost", size: "sm", onClick: function () {
                                                                                                                                handleStepInputChange(stepIndex, inputIndex, 'options_grouped', toneOptions_1.toneOptionsGrouped);
                                                                                                                            }, className: "text-xs text-indigo-600 hover:text-indigo-800", children: "Usar Modelo Tom de Voz" })] }), (0, jsx_runtime_1.jsx)(textarea_1.Textarea, { placeholder: "Digite as op\u00E7\u00F5es separadas por v\u00EDrgula ou use o formato JSON para grupos...", value: input.options_grouped
                                                                                                                        ? JSON.stringify(input.options_grouped, null, 2)
                                                                                                                        : (input.options || []).join(', '), onChange: function (e) {
                                                                                                                        var value = e.target.value;
                                                                                                                        try {
                                                                                                                            // Tentar parsear como JSON primeiro (para grupos)
                                                                                                                            var parsed = JSON.parse(value);
                                                                                                                            if (Array.isArray(parsed)) {
                                                                                                                                handleStepInputChange(stepIndex, inputIndex, 'options_grouped', parsed);
                                                                                                                                handleStepInputChange(stepIndex, inputIndex, 'options', []);
                                                                                                                            }
                                                                                                                        }
                                                                                                                        catch (_a) {
                                                                                                                            // Se não for JSON válido, tratar como lista simples
                                                                                                                            var simpleOptions = value.split(',').map(function (opt) { return opt.trim(); }).filter(Boolean);
                                                                                                                            handleStepInputChange(stepIndex, inputIndex, 'options', simpleOptions);
                                                                                                                            handleStepInputChange(stepIndex, inputIndex, 'options_grouped', []);
                                                                                                                        }
                                                                                                                    }, rows: input.options_grouped ? 8 : 3, className: "text-sm font-mono border-slate-200 dark:border-slate-600" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-slate-500", children: ["Para op\u00E7\u00F5es simples: Casual, Profissional, Amig\u00E1vel", (0, jsx_runtime_1.jsx)("br", {}), "Para grupos: Use JSON com array de objetos ", "{label, options}"] })] })), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-between", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(switch_1.Switch, { checked: input.required, onCheckedChange: function (checked) { return handleStepInputChange(stepIndex, inputIndex, 'required', checked); } }), (0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm", children: "Campo Obrigat\u00F3rio" })] }) })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "icon", onClick: function () { return removeInputFromStep(stepIndex, inputIndex); }, className: "text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 mt-2", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "w-4 h-4" }) })] }) }) }))); } }, inputIndex)); }), provided.placeholder] }))); } })] })] })] }) }))); } }, stepIndex)); }), provided.placeholder] }))); } }) }), formData.type === 'wizard' && ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-center", children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", onClick: addStep, className: "border-indigo-200 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-700 dark:text-indigo-400 dark:hover:bg-indigo-900/20", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "w-4 h-4 mr-2" }), "Adicionar Etapa"] }) })), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end gap-3", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", onClick: function () { return navigate((0, utils_1.createPageUrl)("Agents")); }, disabled: isSaving, children: "Cancelar" }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleSave, disabled: isSaving, className: "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700", children: isSaving ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" }), "Salvando..."] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Save, { className: "w-4 h-4 mr-2" }), editingAgent ? "Salvar Alterações" : "Criar Agente"] })) })] })] }) }));
}
