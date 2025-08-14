"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ExecutionCard;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
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
function ExecutionCard(_a) {
    var execution = _a.execution, onViewDetails = _a.onViewDetails, onCopyPrompt = _a.onCopyPrompt;
    return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200", children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Bot, { className: "w-6 h-6 text-white" }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold text-slate-900 dark:text-slate-100", children: execution.agent_name }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "w-4 h-4" }), (0, jsx_runtime_1.jsx)("span", { children: (0, date_fns_1.format)(new Date(execution.created_date), "dd/MM/yyyy 'às' HH:mm", { locale: locale_1.ptBR }) })] }), execution.execution_time && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { className: "w-4 h-4" }), (0, jsx_runtime_1.jsxs)("span", { children: [execution.execution_time, "s"] })] }))] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)(badge_1.Badge, { className: "".concat(statusColors[execution.status], " border-0"), children: statusLabels[execution.status] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", size: "sm", onClick: function () { return onCopyPrompt(execution.generated_prompt); }, className: "border-slate-300 dark:border-slate-600", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Copy, { className: "w-4 h-4" }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", size: "sm", onClick: function () { return onViewDetails(execution); }, className: "border-slate-300 dark:border-slate-600", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "w-4 h-4" }) })] })] })] }), execution.generated_prompt && ((0, jsx_runtime_1.jsx)("div", { className: "mt-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg", children: (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-slate-600 dark:text-slate-300 line-clamp-2", children: execution.generated_prompt }) }))] }) }));
}
