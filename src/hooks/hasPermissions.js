import secureLocalStorage from 'react-secure-storage';

export const hasPermission = (permissionCode, module, action) => {
  const permissions = JSON.parse(secureLocalStorage.getItem('permissions'));
  const permission = permissions?.filter((obj) => obj.identity === module);
  const Action = action ? action : "read_permission";
  // return permissions?.some((obj) => obj.permission_code === permissionCode);
  return permission ? permissionCode === permission[0]?.[Action]?.code : false;
};