"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FilterSidebar;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
var categories = [
    { id: "all", label: "Todas Categorias", icon: lucide_react_1.Bot },
    { id: "articles_and_blogs", label: "Artigos e Blogs", icon: lucide_react_1.FileText },
    { id: "advertisements", label: "Anúncios", icon: lucide_react_1.Zap },
    { id: "customer_service", label: "Atendimento ao Cliente", icon: lucide_react_1.User },
    { id: "ebook", label: "E-books", icon: lucide_react_1.BookOpen },
    { id: "ecommerce", label: "E-commerce", icon: lucide_react_1.ShoppingCart },
    { id: "emails", label: "E-mails", icon: lucide_react_1.Mail },
    { id: "letter", label: "Cartas", icon: lucide_react_1.FileText },
    { id: "podcast", label: "Podcasts", icon: lucide_react_1.Mic },
    { id: "press_release", label: "Comunicados de Imprensa", icon: lucide_react_1.Megaphone },
    { id: "research", label: "Pesquisa", icon: lucide_react_1.Search },
    { id: "reviews", label: "Avaliações", icon: lucide_react_1.Star },
    { id: "rewriter", label: "Reescrita", icon: lucide_react_1.Edit },
    { id: "seo", label: "SEO", icon: lucide_react_1.BarChart3 },
    { id: "social_media", label: "Redes Sociais", icon: lucide_react_1.Share2 },
    { id: "video_scripts", label: "Roteiros de Vídeo", icon: lucide_react_1.Clapperboard },
    { id: "website_copy", label: "Textos para Site", icon: lucide_react_1.Globe },
    { id: "other", label: "Outros", icon: lucide_react_1.Bot }
];
var filters = [
    { id: "all", label: "Todos os Agentes", icon: lucide_react_1.Bot },
    { id: "favorites", label: "Favoritos", icon: lucide_react_1.Heart },
    { id: "mine", label: "Meus Agentes", icon: lucide_react_1.User },
    { id: "system", label: "Sistema", icon: lucide_react_1.Shield }
];
function FilterSidebar(_a) {
    var selectedCategory = _a.selectedCategory, onCategoryChange = _a.onCategoryChange, selectedFilter = _a.selectedFilter, onFilterChange = _a.onFilterChange, isOpen = _a.isOpen, onClose = _a.onClose, agents = _a.agents, userEmail = _a.userEmail;
    var getCategoryCount = function (categoryId) {
        if (categoryId === "all")
            return agents.length;
        // Handle the case where agents for a category might not exist
        var categoryAgents = agents.filter(function (agent) { return agent.category === categoryId; });
        return categoryAgents.length;
    };
    var getFilterCount = function (filterId) {
        switch (filterId) {
            case "all":
                return agents.length;
            case "favorites":
                return agents.filter(function (agent) { return agent.is_favorite; }).length;
            case "mine":
                return agents.filter(function (agent) { return agent.created_by === userEmail; }).length;
            case "system":
                return agents.filter(function (agent) { return agent.origin === "default"; }).length;
            default:
                return 0;
        }
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [isOpen && ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 bg-black/20 z-40 lg:hidden", onClick: onClose })), (0, jsx_runtime_1.jsx)("div", { className: "\n        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-r border-slate-200/60 dark:border-slate-700/60 transform transition-transform duration-200 ease-in-out\n        ".concat(isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0', "\n      "), children: (0, jsx_runtime_1.jsxs)("div", { className: "p-6 h-full overflow-y-auto", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mb-6 lg:hidden", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold text-slate-900 dark:text-slate-100", children: "Filtros" }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "icon", onClick: onClose, children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "w-5 h-5" }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "mb-6 bg-white/60 dark:bg-slate-700/60 border-slate-200/60 dark:border-slate-600/60", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-lg font-semibold text-slate-900 dark:text-slate-100", children: "Filtros R\u00E1pidos" }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "space-y-2", children: filters.map(function (filter) {
                                        var count = getFilterCount(filter.id);
                                        var isSelected = selectedFilter === filter.id;
                                        return ((0, jsx_runtime_1.jsxs)(button_1.Button, { variant: isSelected ? "default" : "ghost", className: "w-full justify-between transition-all duration-200 ".concat(isSelected
                                                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                                                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600"), onClick: function () { return onFilterChange(filter.id); }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(filter.icon, { className: "w-4 h-4" }), (0, jsx_runtime_1.jsx)("span", { children: filter.label })] }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: isSelected ? "secondary" : "outline", className: isSelected ? "bg-white/20 text-white border-white/30" : "", children: count })] }, filter.id));
                                    }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "bg-white/60 dark:bg-slate-700/60 border-slate-200/60 dark:border-slate-600/60", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-lg font-semibold text-slate-900 dark:text-slate-100", children: "Categorias" }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "space-y-2", children: categories.map(function (category) {
                                        var count = getCategoryCount(category.id);
                                        var isSelected = selectedCategory === category.id;
                                        return ((0, jsx_runtime_1.jsxs)(button_1.Button, { variant: isSelected ? "default" : "ghost", className: "w-full justify-between transition-all duration-200 ".concat(isSelected
                                                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                                                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600"), onClick: function () { return onCategoryChange(category.id); }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(category.icon, { className: "w-4 h-4" }), (0, jsx_runtime_1.jsx)("span", { children: category.label })] }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: isSelected ? "secondary" : "outline", className: isSelected ? "bg-white/20 text-white border-white/30" : "", children: count })] }, category.id));
                                    }) })] })] }) })] }));
}
