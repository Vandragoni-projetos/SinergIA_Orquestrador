
// Mapa de perfis por email
const USER_ROLES = {
  'vandragoni@gmail.com': 'admin_master',
  'upperaws@gmail.com': 'admin_pleno', 
  'gildenefsouza@gmail.com': 'usuario'
};

// Determinar perfil baseado no email
export function getUserRole(email) {
  return USER_ROLES[email] || 'usuario';
}

// Verificar permissões
export function canCreate(userRole) {
  return ['admin_master', 'admin_pleno'].includes(userRole);
}

export function canEdit(userRole, agent) {
  return userRole === 'admin_master';
}

export function canDelete(userRole, agent) {
  // Permitir que o Admin Master exclua qualquer agente, incluindo os de sistema (origin: 'default').
  return userRole === 'admin_master';
}

export function canExecute(userRole) {
  return true; // Todos podem executar
}

export function canFavorite(userRole) {
  return true; // Todos podem favoritar
}

export function canActivateDeactivate(userRole) {
  return userRole === 'admin_master';
}
