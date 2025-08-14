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
exports.default = Layout;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var all_1 = require("@/entities/all");
//import { createPageUrl } from "@/utils";
var createPageUrl_1 = require("@/utils/createPageUrl"); // Ajuste conforme necessário
var lucide_react_1 = require("lucide-react");
var sidebar_1 = require("@/components/ui/sidebar");
var button_1 = require("@/components/ui/button");
var ThemeToggle_1 = __importDefault(require("./components/common/ThemeToggle"));
var permissions_1 = require("@/utils/permissions"); // Corrigir aqui
var navigationItems = [
    {
        title: "Dashboard",
        url: (0, createPageUrl_1.createPageUrl)("Dashboard"),
        icon: lucide_react_1.LayoutDashboard,
    },
    {
        title: "Agentes",
        url: (0, createPageUrl_1.createPageUrl)("Agents"),
        icon: lucide_react_1.Bot,
    },
    {
        title: "Criar Agente",
        url: (0, createPageUrl_1.createPageUrl)("AgentBuilder"),
        icon: lucide_react_1.Plus,
    },
    {
        title: "Execuções",
        url: (0, createPageUrl_1.createPageUrl)("Executions"),
        icon: lucide_react_1.History,
    },
    {
        title: "Configurações",
        url: (0, createPageUrl_1.createPageUrl)("Configuracoes"),
        icon: lucide_react_1.Settings,
    }
];
function Layout(_a) {
    var _this = this;
    var _b;
    var children = _a.children, currentPageName = _a.currentPageName;
    var location = (0, react_router_dom_1.useLocation)();
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _c = (0, react_1.useState)(null), user = _c[0], setUser = _c[1];
    var _d = (0, react_1.useState)('usuario'), userRole = _d[0], setUserRole = _d[1];
    (0, react_1.useEffect)(function () {
        var loadUser = function () { return __awaiter(_this, void 0, void 0, function () {
            var userData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, all_1.User.me()];
                    case 1:
                        userData = _a.sent();
                        setUser(userData);
                        setUserRole((0, permissions_1.getUserRole)(userData.email));
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log("Usuário não logado");
                        navigate((0, createPageUrl_1.createPageUrl)("Login"));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        loadUser();
    }, []);
    var handleLogout = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, all_1.User.logout()];
                case 1:
                    _a.sent();
                    navigate((0, createPageUrl_1.createPageUrl)("Login"));
                    return [2 /*return*/];
            }
        });
    }); };
    var roleLabels = {
        admin_master: "Admin Master",
        admin_pleno: "Admin Pleno",
        usuario: "Usuário"
    };
    return ((0, jsx_runtime_1.jsx)(sidebar_1.SidebarProvider, { children: (0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300", children: [(0, jsx_runtime_1.jsxs)(sidebar_1.Sidebar, { className: "border-r border-slate-200/60 dark:border-slate-700/60 backdrop-blur-sm bg-white/80 dark:bg-slate-800/80", children: [(0, jsx_runtime_1.jsx)(sidebar_1.SidebarHeader, { className: "border-b border-slate-200/60 dark:border-slate-700/60 p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Zap, { className: "w-6 h-6 text-white" }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold text-slate-900 dark:text-slate-100", children: "FusiON" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "IA Orquestrador" })] })] }) }), (0, jsx_runtime_1.jsx)(sidebar_1.SidebarContent, { className: "p-3", children: (0, jsx_runtime_1.jsxs)(sidebar_1.SidebarGroup, { children: [(0, jsx_runtime_1.jsx)(sidebar_1.SidebarGroupLabel, { className: "text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider px-3 py-2 mb-2", children: "Navega\u00E7\u00E3o" }), (0, jsx_runtime_1.jsx)(sidebar_1.SidebarGroupContent, { children: (0, jsx_runtime_1.jsx)(sidebar_1.SidebarMenu, { className: "space-y-1", children: navigationItems.map(function (item) { return ((0, jsx_runtime_1.jsx)(sidebar_1.SidebarMenuItem, { children: (0, jsx_runtime_1.jsx)(sidebar_1.SidebarMenuButton, { asChild: true, className: "rounded-xl transition-all duration-200 ".concat(location.pathname === item.url
                                                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                                                        : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100'), children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: item.url, className: "flex items-center gap-3 px-4 py-3 font-medium", children: [(0, jsx_runtime_1.jsx)(item.icon, { className: "w-5 h-5" }), (0, jsx_runtime_1.jsx)("span", { children: item.title })] }) }) }, item.title)); }) }) })] }) }), (0, jsx_runtime_1.jsxs)(sidebar_1.SidebarFooter, { className: "border-t border-slate-200/60 dark:border-slate-700/60 p-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3 min-w-0", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-8 h-8 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center", children: (0, jsx_runtime_1.jsx)("span", { className: "text-slate-600 dark:text-slate-300 font-medium text-sm", children: (_b = user === null || user === void 0 ? void 0 : user.email) === null || _b === void 0 ? void 0 : _b[0].toUpperCase() }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 min-w-0", children: [(0, jsx_runtime_1.jsx)("p", { className: "font-medium text-slate-900 dark:text-slate-100 text-sm truncate", title: user === null || user === void 0 ? void 0 : user.email, children: user === null || user === void 0 ? void 0 : user.email }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-slate-500 dark:text-slate-400 truncate", children: roleLabels[userRole] })] })] }), (0, jsx_runtime_1.jsx)(ThemeToggle_1.default, {})] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "ghost", className: "w-full justify-start mt-4 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700", onClick: handleLogout, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.LogOut, { className: "w-4 h-4 mr-2" }), "Sair da Plataforma"] })] })] }), (0, jsx_runtime_1.jsxs)("main", { className: "flex-1 flex flex-col transition-all duration-300", children: [(0, jsx_runtime_1.jsxs)("header", { className: "bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-b border-slate-200/60 dark:border-slate-700/60 px-6 py-4 flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4", children: [(0, jsx_runtime_1.jsx)(sidebar_1.SidebarTrigger, { className: "hover:bg-slate-100 dark:hover:bg-slate-700 p-2 rounded-xl transition-all duration-200", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Menu, { className: "w-5 h-5 text-slate-700 dark:text-slate-200" }) }), (0, jsx_runtime_1.jsx)("h1", { className: "text-xl font-bold text-slate-900 dark:text-slate-100 hidden sm:block", children: "FusiON" })] }), (0, jsx_runtime_1.jsx)(ThemeToggle_1.default, {})] }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1 overflow-auto", children: children })] })] }) }));
}
