// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  // const filteredSidebarData = menuItem?.items.filter((item) => {
  //   var children = item?.children[0]?.children;
  //   if (children) {
  //     children = children.filter((child) => child.visible !== false);
  //     return children.length > 0; // Only keep items with non-empty children
  //   }
  //   return item.visible !== false; // Keep items with visible set to true
  // });

  // const filteredData = menuItem?.items.filter((item) => {
  //   if (item.children && item.children.length > 0) {
  //     return item.children.some((child) => {
  //       if (child.children && child.children.length > 0) {
  //         return child.children.some((grandchild) => grandchild.visible === true);
  //       }
  //       return false;
  //     });
  //   }
  //   return false;
  // });

  // const filteredData = menuItem?.items.filter((item) => {
  //   if (item.children && item.children.length > 0) {
  //     return item.children.some((child) => {
  //       if (child.children && child.children.length > 0) {
  //         return child.children.some((grandchild) => grandchild.visible === true);
  //       }
  //       return false;
  //     });
  //   }
  //   return false;
  // });

  // // Further filtering to remove non-visible children
  // filteredData.forEach((item) => {
  //   item.children = item.children.filter((child) => {
  //     if (child.children && child.children.length > 0) {
  //       return child.children.find((grandchild) => grandchild.visible === true);
  //     }
  //     return false;
  //   });
  // });

  const filteredData = [];

  menuItem?.items.forEach((item) => {
    if (item.children && item.children.length > 0) {
      const newItem = { ...item };
      newItem.children = [];
      item.children.forEach((child) => {
        if (child.children && child.children.length > 0) {
          const newChild = { ...child };
          newChild.children = newChild.children.filter((grandchild) => grandchild.visible === true);
          if (newChild.children.length > 0) {
            newItem.children.push(newChild);
          }
        }
      });
      if (newItem.children.length > 0) {
        filteredData.push(newItem);
      }
    }
  });

  console.log(filteredData);

  const navItems = filteredData.map((item) => {
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
