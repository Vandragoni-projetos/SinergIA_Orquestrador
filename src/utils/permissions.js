"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserRole = getUserRole;
exports.canCreate = canCreate;
exports.canEdit = canEdit;
exports.canDelete = canDelete;
exports.canExecute = canExecute;
exports.canFavorite = canFavorite;
exports.canActivateDeactivate = canActivateDeactivate;
// Mapa de perfis por email
var USER_ROLES = {
    'vandragoni@gmail.com': 'admin_master',
    'upperaws@gmail.com': 'admin_pleno',
    'gildenefsouza@gmail.com': 'usuario'
};
// Determinar perfil baseado no email
function getUserRole(email) {
    return USER_ROLES[email] || 'usuario';
}
// Verificar permissões
function canCreate(userRole) {
    return ['admin_master', 'admin_pleno'].includes(userRole);
}
function canEdit(userRole, agent) {
    return userRole === 'admin_master';
}
function canDelete(userRole, agent) {
    // Permitir que o Admin Master exclua qualquer agente, incluindo os de sistema (origin: 'default').
    return userRole === 'admin_master';
}
function canExecute(userRole) {
    return true; // Todos podem executar
}
function canFavorite(userRole) {
    return true; // Todos podem favoritar
}
function canActivateDeactivate(userRole) {
    return userRole === 'admin_master';
}
