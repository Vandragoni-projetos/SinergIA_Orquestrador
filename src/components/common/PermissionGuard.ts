import { canCreate, canEdit, canDelete, canActivateDeactivate } from "../utils/permissions";

export default function PermissionGuard({ 
  userRole, 
  requiredRoles, 
  agent,
  action,
  children,
  fallback = null 
}) {
  const hasPermission = () => {
    if (requiredRoles && !requiredRoles.includes(userRole)) {
      return false;
    }
    
    if (action) {
      // Centralizando a lógica de permissão
      switch (action) {
        case 'edit':
          return canEdit(userRole, agent);
        case 'delete':
          return canDelete(userRole, agent);
        case 'create':
          return canCreate(userRole);
        case 'activate':
          return canActivateDeactivate(userRole);
        default:
          return true;
      }
    }
    
    return true;
  };

  return hasPermission() ? children : fallback;
}