export const hasPermission = (permissionCode,module) => {
    const permissions = JSON.parse(localStorage.getItem('permissions'));
    const permission = permissions?.filter((obj) => obj.identity === module)
    // return permissions?.some((obj) => obj.permission_code === permissionCode);
    return permission ? permissionCode === permission[0]?.read_permission?.code : false
  };

