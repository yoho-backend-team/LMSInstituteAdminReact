import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

// project imports
import NavItem from '../NavItem';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';

// ==============================|| SIDEBAR MENU LIST COLLAPSE ITEMS ||============================== //


// Inside your component
const NavCollapse = ({ menu, level }) => {
  const customization = useSelector((state) => state.customization);
  const navigate = useNavigate();
  const { pathname } = useLocation(); // Get current route

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // Check if current pathname matches any child item
  const isChildActive = menu.children?.some((item) => {
    if (item.children) {
      return item.children.some((child) => child.url === pathname);
    }
    return item.url === pathname;
  });

  const handleClick = () => {
    setOpen(!open);
    setSelected(!selected ? menu.id : null);
    if (menu?.id !== 'authentication') {
      navigate(menu.children[0]?.url);
    }
  };

  // Set open state if a child item is active
  useEffect(() => {
    if (isChildActive) {
      setOpen(true);
      setSelected(menu.id);
    } else {
      setOpen(false);
      setSelected(null);
    }
  }, [pathname, menu.id]);

  // Render child menu items
  const menus = menu.children?.map((item) => {
    switch (item.type) {
      case 'collapse':
        return <NavCollapse key={item.id} menu={item} level={level + 1} />;
      case 'item':
        return <NavItem key={item.id} item={item} level={level + 1} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const Icon = menu.icon;
  const menuIcon = menu.icon ? (
    <Icon strokeWidth={2} size="1.3rem" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: selected === menu.id ? 8 : 6,
        height: selected === menu.id ? 8 : 6
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  return (
    <>
      <ListItemButton
        sx={{
          borderRadius: `${customization.borderRadius}px`,
          mb: 0.5,
          alignItems: 'flex-start',
          backgroundColor: isChildActive || selected === menu.id ? '#0CCE7F ' : 'inherit', // Persist background when child is active or item is selected
          py: level > 1 ? 1 : 1.25,
          pl: `${level * 24}px`,
          color: isChildActive? "white" :"#3b4056",
          ":hover": {
            fontWeight: "bold",
            color: "#0CCE7F",
            '& .MuiListItemIcon-root': {
              color: "#0CCE7F",
            }
          },
          '&.Mui-selected': {
            backgroundColor: '#0CCE7F',
            '&:hover': {
              backgroundColor: '#0AA865',
            },
          },
        }}
        selected={selected === menu.id}
        onClick={handleClick}
      >
        <ListItemIcon sx={{ my: 'auto', minWidth: !menu.icon ? 18 : 36 , width: "22px", height: "22px", strokeWidth: 2 }}>
          {menuIcon}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography variant={selected === menu.id ? 'h5' : 'body1'} color="inherit" sx={{ my: 'auto', fontWeight: "bold" }}>
              {menu.title}
            </Typography>
          }
          secondary={
            menu.caption && (
              <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                {menu.caption}
              </Typography>
            )
          }
        />
        {open ? (
          <IconChevronUp strokeWidth={3} size="1rem" style={{ marginTop: 'auto', marginBottom: 'auto', marginRight: -20 }} />
        ) : (
          <IconChevronDown strokeWidth={3} size="1rem" style={{ marginTop: 'auto', marginBottom: 'auto', marginRight: -20 }} />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{
            position: 'relative',
            '&:after': {
              content: "''",
              position: 'absolute',
              left: '32px',
              top: 0,
              height: '100%',
              width: '1px',
              opacity: 1,
              backgroundColor: "#0CCE7F"
            }
          }}
        >
          {menus}
        </List>
      </Collapse>
    </>
  );
};



NavCollapse.propTypes = {
  menu: PropTypes.object,
  level: PropTypes.number
};

export default NavCollapse;
