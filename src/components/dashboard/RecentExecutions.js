"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RecentExecutions;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var react_router_dom_1 = require("react-router-dom");
var utils_1 = require("@/utils");
var skeleton_1 = require("@/components/ui/skeleton");
var date_fns_1 = require("date-fns");
var locale_1 = require("date-fns/locale");
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
function RecentExecutions(_a) {
    var executions = _a.executions, isLoading = _a.isLoading;
    var recentExecutions = executions.slice(0, 5);
    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "border-b border-slate-200/60 dark:border-slate-700/60", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-100", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { className: "w-5 h-5 text-indigo-600" }), "Execu\u00E7\u00F5es Recentes"] }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: (0, utils_1.createPageUrl)("Executions"), children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", size: "sm", className: "border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30", children: ["Ver Todas", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { className: "w-4 h-4 ml-2" })] }) })] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-0", children: isLoading ? ((0, jsx_runtime_1.jsx)("div", { className: "space-y-4 p-6", children: Array(5).fill(0).map(function (_, i) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700 last:border-b-0", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-10 h-10 rounded-lg" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-32 mb-2" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-3 w-24" })] })] }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-6 w-20 rounded-full" })] }, i)); }) })) : recentExecutions.length === 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "p-8 text-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Bot, { className: "w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" }), (0, jsx_runtime_1.jsx)("p", { className: "text-slate-500 dark:text-slate-400 text-lg", children: "Nenhuma execu\u00E7\u00E3o ainda" }), (0, jsx_runtime_1.jsx)("p", { className: "text-slate-400 dark:text-slate-500 text-sm", children: "Execute um agente para ver o hist\u00F3rico aqui" })] })) : ((0, jsx_runtime_1.jsx)("div", { className: "divide-y divide-slate-100 dark:divide-slate-700", children: recentExecutions.map(function (execution) { return ((0, jsx_runtime_1.jsxs)("div", { className: "p-4 hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors duration-200", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Bot, { className: "w-5 h-5 text-white" }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "font-medium text-slate-900 dark:text-slate-100", children: execution.agent_name }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: (0, date_fns_1.format)(new Date(execution.created_date), "dd/MM/yyyy 'às' HH:mm", { locale: locale_1.ptBR }) })] })] }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { className: "".concat(statusColors[execution.status], " border-0"), children: statusLabels[execution.status] })] }), execution.execution_time && ((0, jsx_runtime_1.jsxs)("div", { className: "mt-2 text-xs text-slate-400 dark:text-slate-500", children: ["Tempo: ", execution.execution_time, "s"] }))] }, execution.id)); }) })) })] }));
}
