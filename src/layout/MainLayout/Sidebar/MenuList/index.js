// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  console.log(menuItem?.items);
  const filteredSidebarData = menuItem?.items.filter((item) => {
    var children = item?.children[0]?.children;
    if (children) {
      children = children.filter((child) => child.visible !== false);
      return children.length > 0; // Only keep items with non-empty children
    }
    return item.visible !== false; // Keep items with visible set to true
  });
  console.log(filteredSidebarData);
  const navItems = filteredSidebarData.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
