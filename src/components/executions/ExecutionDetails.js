"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ExecutionDetails;
var jsx_runtime_1 = require("react/jsx-runtime");
var dialog_1 = require("@/components/ui/dialog");
var button_1 = require("@/components/ui/button");
var scroll_area_1 = require("@/components/ui/scroll-area");
var separator_1 = require("@/components/ui/separator");
var lucide_react_1 = require("lucide-react");
var react_markdown_1 = __importDefault(require("react-markdown"));
function ExecutionDetails(_a) {
    var execution = _a.execution, isOpen = _a.isOpen, onClose = _a.onClose;
    if (!execution)
        return null;
    return ((0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: isOpen, onOpenChange: onClose, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: "max-w-3xl", children: [(0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, { children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { className: "text-2xl font-bold text-slate-900 dark:text-slate-100", children: "Detalhes da Execu\u00E7\u00E3o" }), (0, jsx_runtime_1.jsxs)(dialog_1.DialogDescription, { children: ["Revis\u00E3o do prompt gerado e do resultado da IA para o agente: ", execution.agent_name, "."] })] }), (0, jsx_runtime_1.jsx)(scroll_area_1.ScrollArea, { className: "max-h-[60vh] pr-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-6 my-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("h3", { className: "flex items-center gap-2 font-semibold text-lg mb-2 text-slate-800 dark:text-slate-200", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileCode, { className: "w-5 h-5 text-indigo-500" }), "Prompt Gerado"] }), (0, jsx_runtime_1.jsx)("div", { className: "p-4 bg-slate-100 dark:bg-slate-800 rounded-lg", children: (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-mono", children: execution.generated_prompt }) })] }), (0, jsx_runtime_1.jsx)(separator_1.Separator, {}), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("h3", { className: "flex items-center gap-2 font-semibold text-lg mb-2 text-slate-800 dark:text-slate-200", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Bot, { className: "w-5 h-5 text-purple-500" }), "Resultado da IA"] }), (0, jsx_runtime_1.jsx)("div", { className: "p-4 bg-slate-100 dark:bg-slate-800 rounded-lg prose prose-sm dark:prose-invert max-w-none", children: (0, jsx_runtime_1.jsx)(react_markdown_1.default, { children: execution.output }) })] })] }) }), (0, jsx_runtime_1.jsx)(dialog_1.DialogFooter, { children: (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: onClose, children: "Fechar" }) })] }) }));
}
