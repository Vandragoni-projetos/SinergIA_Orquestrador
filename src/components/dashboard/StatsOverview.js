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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StatsOverview;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var skeleton_1 = require("@/components/ui/skeleton");
var StatCard = function (_a) {
    var Icon = _a.icon, label = _a.label, value = _a.value, color = _a.color, isLoading = _a.isLoading;
    return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200", children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-slate-600 dark:text-slate-400", children: label }), isLoading ? ((0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-8 w-16 mt-2" })) : ((0, jsx_runtime_1.jsx)("p", { className: "text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1", children: value }))] }), (0, jsx_runtime_1.jsx)("div", { className: "p-3 rounded-xl ".concat(color), children: (0, jsx_runtime_1.jsx)(Icon, { className: "w-6 h-6 text-white" }) })] }) }) }));
};
function StatsOverview(_a) {
    var totalAgents = _a.totalAgents, myAgents = _a.myAgents, systemAgents = _a.systemAgents, todayExecutions = _a.todayExecutions, isLoading = _a.isLoading;
    var stats = [
        {
            icon: lucide_react_1.Bot,
            label: "Total de Agentes",
            value: totalAgents,
            color: "bg-gradient-to-r from-blue-500 to-blue-600"
        },
        {
            icon: lucide_react_1.User,
            label: "Meus Agentes",
            value: myAgents,
            color: "bg-gradient-to-r from-green-500 to-green-600"
        },
        {
            icon: lucide_react_1.Shield,
            label: "Agentes do Sistema",
            value: systemAgents,
            color: "bg-gradient-to-r from-purple-500 to-purple-600"
        },
        {
            icon: lucide_react_1.Zap,
            label: "Execuções Hoje",
            value: todayExecutions,
            color: "bg-gradient-to-r from-orange-500 to-orange-600"
        }
    ];
    return ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: stats.map(function (stat, index) { return ((0, jsx_runtime_1.jsx)(StatCard, __assign({}, stat, { isLoading: isLoading }), index)); }) }));
}
