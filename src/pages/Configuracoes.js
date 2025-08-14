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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Configuracoes;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var all_1 = require("@/entities/all");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var card_1 = require("@/components/ui/card");
var label_1 = require("@/components/ui/label");
var lucide_react_1 = require("lucide-react");
var alert_1 = require("@/components/ui/alert");
function Configuracoes() {
    var _this = this;
    var _a = (0, react_1.useState)(""), apiKey = _a[0], setApiKey = _a[1];
    var _b = (0, react_1.useState)(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = (0, react_1.useState)(false), isSaving = _c[0], setIsSaving = _c[1];
    var _d = (0, react_1.useState)(null), user = _d[0], setUser = _d[1];
    var _e = (0, react_1.useState)(false), saved = _e[0], setSaved = _e[1];
    (0, react_1.useEffect)(function () {
        loadUserData();
    }, []);
    var loadUserData = function () { return __awaiter(_this, void 0, void 0, function () {
        var userData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, all_1.User.me()];
                case 2:
                    userData = _a.sent();
                    setUser(userData);
                    if (userData.openai_api_key) {
                        setApiKey(userData.openai_api_key);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Erro ao carregar dados do usuário:", error_1);
                    return [3 /*break*/, 4];
                case 4:
                    setIsLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleSave = function () { return __awaiter(_this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsSaving(true);
                    setSaved(false);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, all_1.User.updateMyUserData({ openai_api_key: apiKey })];
                case 2:
                    _a.sent();
                    setSaved(true);
                    setTimeout(function () { return setSaved(false); }, 3000);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Erro ao salvar a chave de API:", error_2);
                    return [3 /*break*/, 4];
                case 4:
                    setIsSaving(false);
                    return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-4xl mx-auto space-y-8", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent", children: "Configura\u00E7\u00F5es" }), (0, jsx_runtime_1.jsx)("p", { className: "text-lg text-slate-600 dark:text-slate-300 mt-2", children: "Gerencie suas integra\u00E7\u00F5es e configura\u00E7\u00F5es da conta" })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.KeyRound, { className: "w-5 h-5 text-indigo-600" }), "Chave de API da OpenAI"] }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "Sua chave de API \u00E9 armazenada de forma segura e usada apenas para executar os agentes em seu nome." })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "api-key", children: "Sua Chave" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "api-key", type: "password", placeholder: "sk-************************************************", value: apiKey, onChange: function (e) { setApiKey(e.target.value); setSaved(false); }, className: "border-slate-200 dark:border-slate-600" })] }), saved && ((0, jsx_runtime_1.jsxs)(alert_1.Alert, { variant: "default", className: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, { className: "h-4 w-4 text-green-600 dark:text-green-400" }), (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { className: "text-green-700 dark:text-green-300", children: "Chave de API salva com sucesso!" })] })), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-end", children: (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleSave, disabled: isSaving, children: isSaving ? "Salvando..." : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Save, { className: "w-4 h-4 mr-2" }), " Salvar Chave"] }) }) })] })] }), (0, jsx_runtime_1.jsxs)(alert_1.Alert, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Info, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)(alert_1.AlertTitle, { children: "Como funciona a execu\u00E7\u00E3o?" }), (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { children: "O FusiON utiliza a sua chave de API da OpenAI para executar os prompts diretamente na sua conta. Isso garante que voc\u00EA tenha total controle sobre o uso e os custos. Atualmente, n\u00E3o suportamos login direto com a conta Google/OpenAI, sendo o uso da chave de API o m\u00E9todo de integra\u00E7\u00E3o." })] })] }) }));
}
