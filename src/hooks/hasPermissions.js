export const hasPermission = (permissionCode) => {
    const permissions = JSON.parse(localStorage.getItem('permissions'));
    return permissions?.some((obj) => obj.permission_code === permissionCode);
  };

