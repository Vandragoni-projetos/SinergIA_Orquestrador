"use strict";
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
exports.default = Executions;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var all_1 = require("@/entities/all");
var card_1 = require("@/components/ui/card");
var input_1 = require("@/components/ui/input");
var badge_1 = require("@/components/ui/badge");
var select_1 = require("@/components/ui/select");
var lucide_react_1 = require("lucide-react");
var skeleton_1 = require("@/components/ui/skeleton");
var ExecutionCard_1 = __importDefault(require("../components/executions/ExecutionCard"));
var ExecutionDetails_1 = __importDefault(require("../components/executions/ExecutionDetails"));
var statusColors = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    running: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    failed: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
};
var statusLabels = {
    pending: "Pendente",
    running: "Executando",
    completed: "Concluído",
    failed: "Falhou"
};
function Executions() {
    var _this = this;
    var _a = (0, react_1.useState)([]), executions = _a[0], setExecutions = _a[1];
    var _b = (0, react_1.useState)([]), agents = _b[0], setAgents = _b[1];
    var _c = (0, react_1.useState)(true), isLoading = _c[0], setIsLoading = _c[1];
    var _d = (0, react_1.useState)(""), searchQuery = _d[0], setSearchQuery = _d[1];
    var _e = (0, react_1.useState)("all"), statusFilter = _e[0], setStatusFilter = _e[1];
    var _f = (0, react_1.useState)(null), selectedExecution = _f[0], setSelectedExecution = _f[1];
    var _g = (0, react_1.useState)(false), showDetails = _g[0], setShowDetails = _g[1];
    (0, react_1.useEffect)(function () {
        loadData();
    }, []);
    var loadData = function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, executionsData, agentsData, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setIsLoading(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Promise.all([
                            all_1.Execution.list("-created_date"),
                            all_1.Agent.list()
                        ])];
                case 2:
                    _a = _b.sent(), executionsData = _a[0], agentsData = _a[1];
                    setExecutions(executionsData);
                    setAgents(agentsData);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.error("Erro ao carregar execuções:", error_1);
                    return [3 /*break*/, 4];
                case 4:
                    setIsLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    // Memoize filtered executions to prevent unnecessary re-calculations
    var filteredExecutions = (0, react_1.useMemo)(function () {
        return executions.filter(function (execution) {
            var matchesSearch = execution.agent_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                // Bug Fix: Ensure generated_prompt is treated as an empty string if null or undefined
                (execution.generated_prompt || "").toLowerCase().includes(searchQuery.toLowerCase());
            var matchesStatus = statusFilter === "all" || execution.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [executions, searchQuery, statusFilter]);
    // Memoize status counts for performance
    var memoizedStatusCounts = (0, react_1.useMemo)(function () {
        return {
            all: executions.length,
            completed: executions.filter(function (exec) { return exec.status === "completed"; }).length,
            pending: executions.filter(function (exec) { return exec.status === "pending"; }).length,
            running: executions.filter(function (exec) { return exec.status === "running"; }).length,
            failed: executions.filter(function (exec) { return exec.status === "failed"; }).length,
        };
    }, [executions]);
    var handleViewDetails = function (execution) {
        setSelectedExecution(execution);
        setShowDetails(true);
    };
    var handleCopyPrompt = function (prompt) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Add a simple notification or toast here in a real app
                return [4 /*yield*/, navigator.clipboard.writeText(prompt)];
                case 1:
                    // Add a simple notification or toast here in a real app
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    // Removed getStatusCount function as counts are now memoized and accessed directly
    return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent", children: "Hist\u00F3rico de Execu\u00E7\u00F5es" }), (0, jsx_runtime_1.jsx)("p", { className: "text-lg text-slate-600 dark:text-slate-300 mt-2", children: "Acompanhe todas as execu\u00E7\u00F5es dos seus agentes" })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-3", children: (0, jsx_runtime_1.jsxs)(badge_1.Badge, { variant: "outline", className: "border-indigo-200 text-indigo-600", children: [executions.length, " execu\u00E7\u00F5es"] }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row gap-4 mb-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative flex-1 max-w-md", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" }), (0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: "Buscar por agente ou prompt...", value: searchQuery, onChange: function (e) { return setSearchQuery(e.target.value); }, className: "pl-10 border-slate-200 dark:border-slate-600 bg-white/60 dark:bg-slate-700/60" })] }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: statusFilter, onValueChange: setStatusFilter, children: [(0, jsx_runtime_1.jsxs)(select_1.SelectTrigger, { className: "w-48 border-slate-200 dark:border-slate-600 bg-white/60 dark:bg-slate-700/60", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Filter, { className: "w-4 h-4 mr-2" }), (0, jsx_runtime_1.jsx)(select_1.SelectValue, {})] }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsxs)(select_1.SelectItem, { value: "all", children: ["Todos os Status (", memoizedStatusCounts.all, ")"] }), (0, jsx_runtime_1.jsxs)(select_1.SelectItem, { value: "completed", children: ["Conclu\u00EDdo (", memoizedStatusCounts.completed, ")"] }), (0, jsx_runtime_1.jsxs)(select_1.SelectItem, { value: "pending", children: ["Pendente (", memoizedStatusCounts.pending, ")"] }), (0, jsx_runtime_1.jsxs)(select_1.SelectItem, { value: "running", children: ["Executando (", memoizedStatusCounts.running, ")"] }), (0, jsx_runtime_1.jsxs)(select_1.SelectItem, { value: "failed", children: ["Falhou (", memoizedStatusCounts.failed, ")"] })] })] })] }), isLoading ? ((0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: Array(6).fill(0).map(function (_, i) { return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm", children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-12 h-12 rounded-xl" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-5 w-48 mb-2" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-32" })] })] }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-6 w-20 rounded-full" })] }) }) }, i)); }) })) : filteredExecutions.length === 0 ? ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60", children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-16 text-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { className: "w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" }), (0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2", children: searchQuery || statusFilter !== "all"
                                    ? "Nenhuma execução encontrada"
                                    : "Nenhuma execução ainda" }), (0, jsx_runtime_1.jsx)("p", { className: "text-slate-500 dark:text-slate-400", children: searchQuery || statusFilter !== "all"
                                    ? "Tente ajustar os filtros de busca"
                                    : "Execute um agente para ver o histórico aqui" })] }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "grid gap-4", children: filteredExecutions.map(function (execution) { return ((0, jsx_runtime_1.jsx)(ExecutionCard_1.default, { execution: execution, onViewDetails: handleViewDetails, onCopyPrompt: handleCopyPrompt }, execution.id)); }) })), (0, jsx_runtime_1.jsx)(ExecutionDetails_1.default, { execution: selectedExecution, isOpen: showDetails, onClose: function () { return setShowDetails(false); } })] }) }));
}
