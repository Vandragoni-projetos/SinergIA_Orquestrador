"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = void 0;
exports.SidebarContent = SidebarContent;
exports.SidebarFooter = SidebarFooter;
exports.SidebarGroup = SidebarGroup;
exports.SidebarGroupContent = SidebarGroupContent;
exports.SidebarGroupLabel = SidebarGroupLabel;
exports.SidebarMenu = SidebarMenu;
exports.SidebarMenuButton = SidebarMenuButton;
exports.SidebarMenuItem = SidebarMenuItem;
exports.SidebarHeader = SidebarHeader;
exports.SidebarProvider = SidebarProvider;
exports.SidebarTrigger = SidebarTrigger;
var jsx_runtime_1 = require("react/jsx-runtime");
function SidebarContent() {
    return ((0, jsx_runtime_1.jsx)("div", {}));
}
function SidebarFooter() {
    return ((0, jsx_runtime_1.jsx)("div", {}));
}
function SidebarGroup(_a) {
    var children = _a.children;
    return ((0, jsx_runtime_1.jsx)("div", { className: "sidebar-group", children: children }));
}
var Sidebar = function (_a) {
    var children = _a.children;
    return ((0, jsx_runtime_1.jsx)("div", { className: "sidebar", children: children }));
};
exports.Sidebar = Sidebar;
function SidebarGroupContent(_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)("div", { className: "sidebar-group-content", children: children });
}
function SidebarGroupLabel(_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)("div", { className: "sidebar-group-label", children: children });
}
function SidebarMenu(_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)("ul", { className: "sidebar-menu", children: children });
}
function SidebarMenuButton(_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)("button", { className: "sidebar-menu-button", children: children });
}
function SidebarMenuItem(_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)("li", { className: "sidebar-menu-item", children: children });
}
function SidebarHeader(_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)("div", { className: "sidebar-header", children: children });
}
function SidebarProvider(_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)("div", { className: "sidebar-provider", children: children });
}
function SidebarTrigger(_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)("button", { className: "sidebar-trigger", children: children });
}
