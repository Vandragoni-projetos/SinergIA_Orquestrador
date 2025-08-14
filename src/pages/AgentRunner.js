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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AgentRunner;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var all_1 = require("@/entities/all");
var Core_1 = require("@/integrations/Core");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var label_1 = require("@/components/ui/label");
var react_router_dom_1 = require("react-router-dom");
var utils_1 = require("@/utils");
var lucide_react_1 = require("lucide-react");
var alert_1 = require("@/components/ui/alert");
var react_markdown_1 = __importDefault(require("react-markdown"));
var FieldRenderer_1 = __importDefault(require("../components/common/FieldRenderer"));
var validation_1 = require("../components/utils/validation"); // Updated path
function AgentRunner() {
    var _this = this;
    var _a;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _b = (0, react_1.useState)(null), agent = _b[0], setAgent = _b[1];
    var _c = (0, react_1.useState)(null), user = _c[0], setUser = _c[1];
    var _d = (0, react_1.useState)(true), isLoading = _d[0], setIsLoading = _d[1];
    // State for multi-step wizard
    var _e = (0, react_1.useState)(0), currentStep = _e[0], setCurrentStep = _e[1];
    var _f = (0, react_1.useState)({}), stepInputs = _f[0], setStepInputs = _f[1];
    // State for prompts and results
    var _g = (0, react_1.useState)(""), currentPrompt = _g[0], setCurrentPrompt = _g[1];
    var _h = (0, react_1.useState)(""), apiResult = _h[0], setApiResult = _h[1];
    var _j = (0, react_1.useState)(false), isExecuting = _j[0], setIsExecuting = _j[1];
    var _k = (0, react_1.useState)({ prompt: false, result: false }), copied = _k[0], setCopied = _k[1];
    var _l = (0, react_1.useState)(""), error = _l[0], setError = _l[1];
    (0, react_1.useEffect)(function () {
        var urlParams = new URLSearchParams(window.location.search);
        var agentId = urlParams.get('id');
        if (agentId) {
            loadData(agentId);
        }
        else {
            navigate((0, utils_1.createPageUrl)("Agents"));
        }
    }, []);
    var loadData = function (agentId) { return __awaiter(_this, void 0, void 0, function () {
        var _a, agentData, userData, initialInputs_1, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setIsLoading(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Promise.all([
                            all_1.Agent.filter({ id: agentId }),
                            all_1.User.me()
                        ])];
                case 2:
                    _a = _b.sent(), agentData = _a[0], userData = _a[1];
                    if (agentData.length > 0) {
                        setAgent(agentData[0]);
                        initialInputs_1 = {};
                        agentData[0].steps.forEach(function (_, index) {
                            initialInputs_1[index] = {};
                        });
                        setStepInputs(initialInputs_1);
                        setUser(userData);
                    }
                    else {
                        navigate((0, utils_1.createPageUrl)("Agents"));
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.error("Erro ao carregar dados:", error_1);
                    navigate((0, utils_1.createPageUrl)("Agents"));
                    return [3 /*break*/, 4];
                case 4:
                    setIsLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleInputChange = function (inputName, value) {
        setStepInputs(function (prev) {
            var _a, _b;
            return (__assign(__assign({}, prev), (_a = {}, _a[currentStep] = __assign(__assign({}, prev[currentStep]), (_b = {}, _b[inputName] = value, _b)), _a)));
        });
    };
    var generateStepPrompt = function (stepIndex) {
        var step = agent.steps[stepIndex];
        var inputsForStep = stepInputs[stepIndex] || {};
        return (0, validation_1.compileTemplate)(step.template, inputsForStep);
    };
    var generateFinalPrompt = function () {
        var compiledSteps = agent.steps.map(function (step, index) {
            var compiled = (0, validation_1.compileTemplate)(step.template, stepInputs[index] || {});
            if (!compiled.trim())
                return '';
            return "--- ETAPA: ".concat(step.name, " ---\n").concat(compiled);
        }).filter(Boolean);
        return compiledSteps.join('\n\n');
    };
    var handleNextStep = function () {
        if (!isStepComplete()) {
            setError("Por favor, preencha todos os campos obrigatórios.");
            return;
        }
        setError("");
        var prompt = generateStepPrompt(currentStep);
        setCurrentPrompt(prompt);
        setApiResult(""); // Clear previous results
        setCurrentStep(function (s) { return s + 1; });
    };
    var handleGenerateFinalPrompt = function () {
        if (!isStepComplete()) {
            setError("Por favor, preencha todos os campos obrigatórios da etapa final.");
            return;
        }
        setError("");
        var finalPrompt = generateFinalPrompt();
        setCurrentPrompt(finalPrompt);
        setApiResult("");
    };
    var handleExecute = function () { return __awaiter(_this, void 0, void 0, function () {
        var startTime, llmResult, executionTime, error_2, errorMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!currentPrompt) {
                        setError("Nenhum prompt foi gerado ainda.");
                        return [2 /*return*/];
                    }
                    if (!(user === null || user === void 0 ? void 0 : user.openai_api_key)) {
                        setError("Por favor, adicione sua chave de API da OpenAI nas configurações para executar um agente.");
                        return [2 /*return*/];
                    }
                    setError("");
                    setIsExecuting(true);
                    setApiResult("");
                    startTime = Date.now();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, (0, Core_1.InvokeLLM)({ prompt: currentPrompt })];
                case 2:
                    llmResult = _a.sent();
                    setApiResult(llmResult);
                    executionTime = (Date.now() - startTime) / 1000;
                    return [4 /*yield*/, all_1.Execution.create({
                            agent_id: agent.id,
                            agent_name: agent.name,
                            inputs: stepInputs,
                            generated_prompt: currentPrompt,
                            output: llmResult,
                            status: "completed",
                            execution_time: executionTime
                        })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4:
                    error_2 = _a.sent();
                    console.error("Erro na execução:", error_2);
                    errorMessage = "Erro durante a execução. Verifique sua chave de API e tente novamente.";
                    setApiResult(errorMessage);
                    setError(errorMessage);
                    return [3 /*break*/, 6];
                case 5:
                    setIsExecuting(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var handleCopy = function (textToCopy, type) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, navigator.clipboard.writeText(textToCopy)];
                case 1:
                    _a.sent();
                    setCopied(function (prev) {
                        var _a;
                        return (__assign(__assign({}, prev), (_a = {}, _a[type] = true, _a)));
                    });
                    setTimeout(function () { return setCopied(function (prev) {
                        var _a;
                        return (__assign(__assign({}, prev), (_a = {}, _a[type] = false, _a)));
                    }); }, 2000);
                    return [2 /*return*/];
            }
        });
    }); };
    var isStepComplete = function () {
        var step = agent === null || agent === void 0 ? void 0 : agent.steps[currentStep];
        if (!step)
            return false;
        return step.inputs.every(function (input) { var _a; return !input.required || (stepInputs[currentStep] && ((_a = stepInputs[currentStep][input.name]) === null || _a === void 0 ? void 0 : _a.trim())); });
    };
    if (isLoading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Bot, { className: "w-16 h-16 text-indigo-500 animate-pulse" }) }));
    }
    var currentAgentStep = agent === null || agent === void 0 ? void 0 : agent.steps[currentStep];
    var isLastStep = currentStep === ((agent === null || agent === void 0 ? void 0 : agent.steps.length) - 1);
    return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", onClick: function () { return navigate((0, utils_1.createPageUrl)("Agents")); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeft, { className: "w-4 h-4 mr-2" }), " Voltar"] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Bot, { className: "w-6 h-6 text-white" }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold text-slate-900 dark:text-slate-100", children: agent === null || agent === void 0 ? void 0 : agent.name }), (0, jsx_runtime_1.jsx)("p", { className: "text-slate-600 dark:text-slate-400", children: agent === null || agent === void 0 ? void 0 : agent.description })] })] })] }), error && ((0, jsx_runtime_1.jsxs)(alert_1.Alert, { variant: "destructive", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)(alert_1.AlertTitle, { children: "Erro" }), (0, jsx_runtime_1.jsxs)(alert_1.AlertDescription, { children: [error, error.includes("chave de API") && (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: (0, utils_1.createPageUrl)("Configuracoes"), className: "font-bold underline ml-2", children: "Ir para Configura\u00E7\u00F5es" })] })] })), (0, jsx_runtime_1.jsxs)("div", { className: "grid lg:grid-cols-2 gap-6 items-start", children: [(0, jsx_runtime_1.jsx)("div", { className: "space-y-6", children: (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { className: "w-5 h-5 text-indigo-600" }), (0, jsx_runtime_1.jsx)("span", { children: currentAgentStep === null || currentAgentStep === void 0 ? void 0 : currentAgentStep.name })] }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-normal text-slate-500", children: ["Etapa ", currentStep + 1, " de ", agent === null || agent === void 0 ? void 0 : agent.steps.length] })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-slate-500 dark:text-slate-400 pt-2", children: currentAgentStep === null || currentAgentStep === void 0 ? void 0 : currentAgentStep.description })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(_a = currentAgentStep === null || currentAgentStep === void 0 ? void 0 : currentAgentStep.inputs) === null || _a === void 0 ? void 0 : _a.map(function (input, index) {
                                                var _a;
                                                return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)(label_1.Label, { htmlFor: input.name, className: "flex items-center gap-2", children: [input.name, input.required && (0, jsx_runtime_1.jsx)("span", { className: "text-red-500", children: "*" })] }), (0, jsx_runtime_1.jsx)(FieldRenderer_1.default, { input: input, value: (_a = stepInputs[currentStep]) === null || _a === void 0 ? void 0 : _a[input.name], onChange: function (value) { return handleInputChange(input.name, value); } })] }, index));
                                            }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center pt-4", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", onClick: function () { return setCurrentStep(function (s) { return s - 1; }); }, disabled: currentStep === 0, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ChevronLeft, { className: "w-4 h-4 mr-2" }), " Anterior"] }), isLastStep ? ((0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: handleGenerateFinalPrompt, disabled: !isStepComplete(), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Wand2, { className: "w-4 h-4 mr-2" }), " Gerar Prompt Final"] })) : ((0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: handleNextStep, disabled: !isStepComplete(), children: ["Gerar Prompt e Avan\u00E7ar ", (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { className: "w-4 h-4 ml-2" })] }))] })] })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { className: "bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileCode, { className: "w-5 h-5 text-indigo-600" }), "Prompt Gerado"] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsx)("textarea", { value: currentPrompt, readOnly: true, rows: 8, className: "w-full p-3 border border-slate-200 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-700/50 text-sm font-mono resize-none mb-4", placeholder: "O prompt gerado para a etapa atual aparecer\u00E1 aqui..." }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end gap-2", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", onClick: function () { return handleCopy(currentPrompt, 'prompt'); }, disabled: !currentPrompt, children: [copied.prompt ? (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, { className: "w-4 h-4 mr-2 text-green-500" }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Copy, { className: "w-4 h-4 mr-2" }), "Copiar"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: handleExecute, disabled: isExecuting || !currentPrompt || !(user === null || user === void 0 ? void 0 : user.openai_api_key), children: [isExecuting ? (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { className: "w-4 h-4 mr-2 animate-spin" }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Zap, { className: "w-4 h-4 mr-2" }), "Executar com IA"] })] }), !(user === null || user === void 0 ? void 0 : user.openai_api_key) && (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-slate-500 mt-2 text-right", children: "Adicione sua chave de API nas Configura\u00E7\u00F5es para usar." })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Bot, { className: "w-5 h-5 text-indigo-600" }), "Resultado da IA"] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "min-h-[200px]", children: isExecuting ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center justify-center h-full text-slate-500", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Bot, { className: "w-12 h-12 mb-4 text-slate-300 animate-pulse" }), (0, jsx_runtime_1.jsx)("p", { children: "Aguardando resposta da IA..." })] })) : apiResult ? ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "prose prose-sm dark:prose-invert max-w-none max-h-80 overflow-y-auto bg-slate-50 dark:bg-slate-900/50 rounded-md p-4", children: (0, jsx_runtime_1.jsx)(react_markdown_1.default, { children: apiResult }) }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", size: "sm", onClick: function () { return handleCopy(apiResult, 'result'); }, children: [copied.result ? (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, { className: "w-4 h-4 mr-2 text-green-500" }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Copy, { className: "w-4 h-4 mr-2" }), "Copiar Resultado"] })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "text-center py-10 text-slate-500", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Bot, { className: "w-12 h-12 mx-auto mb-4 text-slate-300" }), (0, jsx_runtime_1.jsx)("p", { children: "O resultado da execu\u00E7\u00E3o aparecer\u00E1 aqui." })] })) })] })] })] })] }) }));
}
