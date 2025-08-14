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
exports.default = Dashboard;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var all_1 = require("@/entities/all");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var react_router_dom_1 = require("react-router-dom");
var utils_1 = require("@/utils");
var lucide_react_1 = require("lucide-react");
var StatsOverview_1 = __importDefault(require("../components/dashboard/StatsOverview"));
var RecentExecutions_1 = __importDefault(require("../components/dashboard/RecentExecutions"));
var PopularAgents_1 = __importDefault(require("../components/dashboard/PopularAgents"));
function Dashboard() {
    var _this = this;
    var _a = (0, react_1.useState)([]), agents = _a[0], setAgents = _a[1];
    var _b = (0, react_1.useState)([]), executions = _b[0], setExecutions = _b[1];
    var _c = (0, react_1.useState)(null), user = _c[0], setUser = _c[1];
    var _d = (0, react_1.useState)(true), isLoading = _d[0], setIsLoading = _d[1];
    (0, react_1.useEffect)(function () {
        loadData();
    }, []);
    var loadData = function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, agentsData, executionsData, userData, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setIsLoading(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Promise.all([
                            all_1.Agent.list("-created_date", 50),
                            all_1.Execution.list("-created_date", 20),
                            all_1.User.me()
                        ])];
                case 2:
                    _a = _b.sent(), agentsData = _a[0], executionsData = _a[1], userData = _a[2];
                    setAgents(agentsData);
                    setExecutions(executionsData);
                    setUser(userData);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.error("Erro ao carregar dados:", error_1);
                    return [3 /*break*/, 4];
                case 4:
                    setIsLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var myAgents = agents.filter(function (agent) { return agent.created_by === (user === null || user === void 0 ? void 0 : user.email); });
    var systemAgents = agents.filter(function (agent) { return agent.origin === 'default'; });
    var todayExecutions = executions.filter(function (exec) {
        var today = new Date().toDateString();
        return new Date(exec.created_date).toDateString() === today;
    });
    return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto space-y-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-6", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent", children: "Bem-vindo ao FusiON" }), (0, jsx_runtime_1.jsx)("p", { className: "text-lg text-slate-600 mt-2", children: "Orquestre agentes inteligentes para automatizar seus processos" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-3", children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: (0, utils_1.createPageUrl)("Agents"), children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", className: "border-indigo-200 text-indigo-600 hover:bg-indigo-50", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Bot, { className: "w-4 h-4 mr-2" }), "Ver Agentes"] }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: (0, utils_1.createPageUrl)("AgentBuilder"), children: (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "w-4 h-4 mr-2" }), "Criar Agente"] }) })] })] }), (0, jsx_runtime_1.jsx)(StatsOverview_1.default, { totalAgents: agents.length, myAgents: myAgents.length, systemAgents: systemAgents.length, todayExecutions: todayExecutions.length, isLoading: isLoading }), (0, jsx_runtime_1.jsxs)("div", { className: "grid lg:grid-cols-3 gap-8", children: [(0, jsx_runtime_1.jsx)("div", { className: "lg:col-span-2", children: (0, jsx_runtime_1.jsx)(RecentExecutions_1.default, { executions: executions, isLoading: isLoading }) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(PopularAgents_1.default, { agents: agents, isLoading: isLoading }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "bg-gradient-to-r from-indigo-500 to-purple-600 border-0 text-white overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 right-0 w-64 h-64 transform translate-x-32 -translate-y-32", children: (0, jsx_runtime_1.jsx)("div", { className: "w-full h-full bg-white/10 rounded-full" }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-8 relative", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-2xl font-bold mb-2", children: "Pronto para come\u00E7ar?" }), (0, jsx_runtime_1.jsx)("p", { className: "text-indigo-100 mb-4", children: "Explore nossos agentes do sistema ou crie o seu pr\u00F3prio" })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { className: "w-16 h-16 text-white/20" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4", children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: (0, utils_1.createPageUrl)("Agents") + "?category=all&filter=system", children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "secondary", className: "bg-white/20 text-white border-white/30 hover:bg-white/30", children: ["Explorar Agentes", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { className: "w-4 h-4 ml-2" })] }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: (0, utils_1.createPageUrl)("AgentBuilder"), children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "secondary", className: "bg-white text-indigo-600 hover:bg-gray-50", children: ["Criar Meu Agente", (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "w-4 h-4 ml-2" })] }) })] })] })] })] }) }));
}
