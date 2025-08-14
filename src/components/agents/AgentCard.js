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
exports.default = AgentCard;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var react_router_dom_1 = require("react-router-dom");
var utils_1 = require("@/utils");
var lucide_react_1 = require("lucide-react");
var date_fns_1 = require("date-fns");
var locale_1 = require("date-fns/locale");
var categories_1 = require("../utils/categories");
var PermissionGuard_1 = __importDefault(require("../common/PermissionGuard"));
var categoryColors = {
    articles_and_blogs: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
    seo: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    social_media: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    research: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    marketing: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    emails: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
    customer_service: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400",
    other: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
};
function AgentCard(_a) {
    var _this = this;
    var agent = _a.agent, onToggleFavorite = _a.onToggleFavorite, onDeleteAgent = _a.onDeleteAgent, userRole = _a.userRole;
    var isSystemAgent = agent.origin === "default";
    var categoryInfo = (0, categories_1.getCategoryInfo)(agent.category);
    var handleDelete = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!window.confirm('Tem certeza que deseja excluir este agente? Esta ação não pode ser desfeita.')) return [3 /*break*/, 2];
                    return [4 /*yield*/, onDeleteAgent(agent.id)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "group bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60 hover:bg-white/80 dark:hover:bg-slate-800/80 hover:shadow-lg transition-all duration-300", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "relative", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center relative", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Bot, { className: "w-6 h-6 text-white" }), isSystemAgent && ((0, jsx_runtime_1.jsx)("div", { className: "absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, { className: "w-3 h-3 text-white" }) }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-lg font-bold text-slate-900 dark:text-slate-100 line-clamp-1", children: agent.name }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 mt-2", children: [(0, jsx_runtime_1.jsx)(badge_1.Badge, { className: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 text-xs border-0", children: categoryInfo.group }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { className: "".concat(categoryColors[agent.category] || categoryColors.other, " text-xs border-0"), children: categoryInfo.label }), isSystemAgent && ((0, jsx_runtime_1.jsx)(badge_1.Badge, { className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 text-xs border-0", children: "Sistema" }))] })] })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "icon", onClick: function () { return onToggleFavorite(agent.id); }, className: "transition-colors duration-200 ".concat(agent.is_favorite
                                ? "text-red-500 hover:text-red-600"
                                : "text-slate-400 dark:text-slate-500 hover:text-red-500"), children: (0, jsx_runtime_1.jsx)(lucide_react_1.Heart, { className: "w-4 h-4 ".concat(agent.is_favorite ? "fill-current" : "") }) })] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-slate-600 dark:text-slate-300 text-sm line-clamp-3", children: agent.description }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "w-3 h-3" }), (0, jsx_runtime_1.jsx)("span", { children: (0, date_fns_1.format)(new Date(agent.created_date), "dd/MM/yyyy", { locale: locale_1.ptBR }) })] }), !isSystemAgent && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.User, { className: "w-3 h-3" }), (0, jsx_runtime_1.jsx)("span", { children: "Criado por voc\u00EA" })] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 pt-2", children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: (0, utils_1.createPageUrl)("AgentRunner?id=".concat(agent.id)), className: "flex-1", children: (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Play, { className: "w-4 h-4 mr-2" }), "Executar"] }) }), (0, jsx_runtime_1.jsx)(PermissionGuard_1.default, { userRole: userRole, action: "edit", agent: agent, children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: (0, utils_1.createPageUrl)("AgentBuilder?id=".concat(agent.id)), children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", size: "icon", className: "border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Edit3, { className: "w-4 h-4" }) }) }) }), (0, jsx_runtime_1.jsx)(PermissionGuard_1.default, { userRole: userRole, action: "delete", agent: agent, children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", size: "icon", onClick: handleDelete, className: "border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20", title: "Excluir agente", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "w-4 h-4" }) }) })] })] })] }));
}
