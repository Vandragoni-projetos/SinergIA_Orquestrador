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
exports.default = Agents;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var all_1 = require("@/entities/all");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var react_router_dom_1 = require("react-router-dom");
var utils_1 = require("@/utils");
var lucide_react_1 = require("lucide-react");
var AgentCard_1 = __importDefault(require("../components/agents/AgentCard"));
var FilterSidebar_1 = __importDefault(require("../components/agents/FilterSidebar"));
var PermissionGuard_1 = __importDefault(require("../components/common/PermissionGuard"));
var permissions_1 = require("../components/utils/permissions"); // Updated path
var categories_1 = require("../components/utils/categories"); // New import
function Agents() {
    var _this = this;
    var _a = (0, react_1.useState)([]), agents = _a[0], setAgents = _a[1];
    var _b = (0, react_1.useState)(null), user = _b[0], setUser = _b[1];
    var _c = (0, react_1.useState)('usuario'), userRole = _c[0], setUserRole = _c[1];
    var _d = (0, react_1.useState)(true), isLoading = _d[0], setIsLoading = _d[1];
    var _e = (0, react_1.useState)(""), searchQuery = _e[0], setSearchQuery = _e[1];
    var _f = (0, react_1.useState)("all"), selectedCategory = _f[0], setSelectedCategory = _f[1];
    var _g = (0, react_1.useState)("all"), selectedFilter = _g[0], setSelectedFilter = _g[1];
    var _h = (0, react_1.useState)(false), showFilters = _h[0], setShowFilters = _h[1];
    (0, react_1.useEffect)(function () {
        loadData();
    }, []);
    var loadData = function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, agentsData, userData, role, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setIsLoading(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Promise.all([
                            all_1.Agent.list("-created_date"),
                            all_1.User.me()
                        ])];
                case 2:
                    _a = _b.sent(), agentsData = _a[0], userData = _a[1];
                    setAgents(agentsData);
                    setUser(userData);
                    role = (0, permissions_1.getUserRole)(userData.email);
                    setUserRole(role);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.error("Erro ao carregar agentes:", error_1);
                    return [3 /*break*/, 4];
                case 4:
                    setIsLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleToggleFavorite = function (agentId) { return __awaiter(_this, void 0, void 0, function () {
        var agent, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    agent = agents.find(function (a) { return a.id === agentId; });
                    if (!agent)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, all_1.Agent.update(agentId, {
                            is_favorite: !agent.is_favorite
                        })];
                case 2:
                    _a.sent();
                    setAgents(function (prev) { return prev.map(function (a) {
                        return a.id === agentId ? __assign(__assign({}, a), { is_favorite: !a.is_favorite }) : a;
                    }); });
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Erro ao atualizar favorito:", error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleDeleteAgent = function (agentId) { return __awaiter(_this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, all_1.Agent.delete(agentId)];
                case 1:
                    _a.sent();
                    setAgents(function (prev) { return prev.filter(function (a) { return a.id !== agentId; }); });
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error("Erro ao excluir agente:", error_3);
                    alert("Erro ao excluir agente. Tente novamente.");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Filtrar agentes
    var filteredAgents = agents.filter(function (agent) {
        var categoryInfo = (0, categories_1.getCategoryInfo)(agent.category);
        var searchLower = searchQuery.toLowerCase();
        var matchesSearch = agent.name.toLowerCase().includes(searchLower) ||
            agent.description.toLowerCase().includes(searchLower) ||
            categoryInfo.label.toLowerCase().includes(searchLower); // Include category label in search
        var matchesCategory = selectedCategory === "all" || agent.category === selectedCategory;
        var matchesFilter = selectedFilter === "all" ||
            (selectedFilter === "favorites" && agent.is_favorite) ||
            (selectedFilter === "mine" && agent.created_by === (user === null || user === void 0 ? void 0 : user.email)) ||
            (selectedFilter === "system" && agent.origin === "default");
        return matchesSearch && matchesCategory && matchesFilter && agent.is_active;
    });
    return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex", children: [(0, jsx_runtime_1.jsx)(FilterSidebar_1.default, { selectedCategory: selectedCategory, onCategoryChange: setSelectedCategory, selectedFilter: selectedFilter, onFilterChange: setSelectedFilter, isOpen: showFilters, onClose: function () { return setShowFilters(false); }, agents: agents, userEmail: user === null || user === void 0 ? void 0 : user.email }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1 p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent", children: "Agentes Inteligentes" }), (0, jsx_runtime_1.jsx)("p", { className: "text-lg text-slate-600 dark:text-slate-300 mt-2", children: "Descubra e gerencie seus agentes de IA" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-3", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", onClick: function () { return setShowFilters(!showFilters); }, className: "md:hidden border-indigo-200 text-indigo-600 dark:border-indigo-700 dark:text-indigo-400", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Filter, { className: "w-4 h-4 mr-2" }), "Filtros"] }), (0, jsx_runtime_1.jsx)(PermissionGuard_1.default, { userRole: userRole, requiredRoles: ['admin_master', 'admin_pleno'], children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: (0, utils_1.createPageUrl)("AgentBuilder"), children: (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "w-4 h-4 mr-2" }), "Criar Agente"] }) }) })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "mb-8", children: (0, jsx_runtime_1.jsxs)("div", { className: "relative max-w-md", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" }), (0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: "Buscar agentes...", value: searchQuery, onChange: function (e) { return setSearchQuery(e.target.value); }, className: "pl-10 border-slate-200 dark:border-slate-600 bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm" })] }) }), isLoading ? ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: Array(9).fill(0).map(function (_, i) { return ((0, jsx_runtime_1.jsx)("div", { className: "h-64 bg-white/60 dark:bg-slate-700/60 rounded-xl animate-pulse" }, i)); }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredAgents.map(function (agent) { return ((0, jsx_runtime_1.jsx)(AgentCard_1.default, { agent: agent, onToggleFavorite: handleToggleFavorite, onDeleteAgent: handleDeleteAgent, userRole: userRole }, agent.id)); }) })), !isLoading && filteredAgents.length === 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "text-center py-16", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "w-8 h-8 text-slate-400" }) }), (0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2", children: "Nenhum agente encontrado" }), (0, jsx_runtime_1.jsx)("p", { className: "text-slate-500 dark:text-slate-400 mb-6", children: "Tente ajustar os filtros ou criar um novo agente" }), (0, jsx_runtime_1.jsx)(PermissionGuard_1.default, { userRole: userRole, requiredRoles: ['admin_master', 'admin_pleno'], children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: (0, utils_1.createPageUrl)("AgentBuilder"), children: (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "w-4 h-4 mr-2" }), "Criar Primeiro Agente"] }) }) })] }))] }) })] }) }));
}
