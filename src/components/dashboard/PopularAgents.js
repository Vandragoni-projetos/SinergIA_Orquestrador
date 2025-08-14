"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PopularAgents;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
var skeleton_1 = require("@/components/ui/skeleton");
var categoryColors = {
    copywriting: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
    seo: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    social_media: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    analysis: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    content: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    automation: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
    design: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    research: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    other: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
};
var categoryLabels = {
    copywriting: "Copywriting",
    seo: "SEO",
    social_media: "Redes Sociais",
    analysis: "Análise",
    content: "Conteúdo",
    automation: "Automação",
    design: "Design",
    research: "Pesquisa",
    other: "Outros"
};
function PopularAgents(_a) {
    var agents = _a.agents, isLoading = _a.isLoading;
    // Simular popularidade baseada na data de criação (mais recentes = mais populares)
    var popularAgents = agents
        .filter(function (agent) { return agent.is_active; })
        .sort(function (a, b) { return new Date(b.created_date) - new Date(a.created_date); })
        .slice(0, 6);
    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "border-b border-slate-200/60 dark:border-slate-700/60", children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-100", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, { className: "w-5 h-5 text-indigo-600" }), "Agentes Populares"] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-0", children: isLoading ? ((0, jsx_runtime_1.jsx)("div", { className: "space-y-4 p-6", children: Array(6).fill(0).map(function (_, i) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-10 h-10 rounded-lg" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-32 mb-2" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-3 w-24" })] })] }, i)); }) })) : popularAgents.length === 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "p-8 text-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Bot, { className: "w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" }), (0, jsx_runtime_1.jsx)("p", { className: "text-slate-500 dark:text-slate-400", children: "Nenhum agente dispon\u00EDvel" })] })) : ((0, jsx_runtime_1.jsx)("div", { className: "space-y-3 p-6", children: popularAgents.map(function (agent, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Bot, { className: "w-5 h-5 text-white" }) }), agent.origin === 'default' && ((0, jsx_runtime_1.jsx)("div", { className: "absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, { className: "w-2.5 h-2.5 text-white" }) })), index < 3 && ((0, jsx_runtime_1.jsx)("div", { className: "absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white", children: index + 1 }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 min-w-0", children: [(0, jsx_runtime_1.jsx)("p", { className: "font-medium text-slate-900 dark:text-slate-100 truncate", children: agent.name }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 mt-1", children: [(0, jsx_runtime_1.jsx)(badge_1.Badge, { className: "".concat(categoryColors[agent.category], " text-xs border-0"), children: categoryLabels[agent.category] }), agent.origin === 'default' && ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-yellow-600 dark:text-yellow-400 font-medium", children: "Sistema" }))] })] })] }, agent.id)); }) })) })] }));
}
