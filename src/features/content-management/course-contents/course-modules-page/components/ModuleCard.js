import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Menu, MenuItem, Switch, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircleIcon from '@mui/icons-material/Circle';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';

const gradientColors = [
    'linear-gradient(135deg, #f4b6b6 0%, #e78e8e 100%)',
    'linear-gradient(135deg, #f8c4a6 0%, #f6a89f 100%)',
    'linear-gradient(135deg, #f4f3a3 0%, #f2d1a5 100%)',
    'linear-gradient(135deg, #cde7c0 0%, #a1d3a5 100%)', 
    'linear-gradient(135deg, #7cff7c 0%, #5fdc5f 100%)', 
    'linear-gradient(135deg, #7cdcdc 0%, #4db5b5 100%)', 
    'linear-gradient(135deg, #7bb6ff 0%, #4496ff 100%)', 
    'linear-gradient(135deg, #5f9aff 0%, #3b8bff 100%)', 
    'linear-gradient(135deg, #4d6eff 0%, #3d55ff 100%)', 
    'linear-gradient(135deg, #b97eb3 0%, #a54c9a 100%)',
    'linear-gradient(135deg, #a54c9a 0%, #8e2a6f 100%)',
    'linear-gradient(135deg, #d6a89b 0%, #c36c5f 100%)',
    'linear-gradient(135deg, #f7a6b4 0%, #f7807a 100%)',
    'linear-gradient(135deg, #ff9d7a 0%, #ff6b5f 100%)', 
    'linear-gradient(135deg, #ff8f6a 0%, #ff6b4d 100%)', 
    'linear-gradient(135deg, #f79b4b 0%, #e67b1e 100%)', 
    'linear-gradient(135deg, #f5b7b6 0%, #ec6f6c 100%)',
    'linear-gradient(135deg, #e4a858 0%, #d78e1c 100%)', 
];



const ModuleCard = ({ index,page, name, courseName, initialStatus,module,handleStatusValue ,handleRowClick,setViewModalOpen,toggleEditUserDrawer,handleDelete}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState(initialStatus);
  const open = Boolean(anchorEl);
  const currentIndex = Math.ceil((((page-1) * 10) + index))

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  
  return (
    <Card 
      sx={{ 
        maxWidth: 345, 
        borderRadius: 3, 
        boxShadow: 5, 
        position: 'relative', 
        overflow: 'visible', 
        // background: '#fff',
        borderColor: status ? '#0CCE7F' : '#F44336',
        maxHeight: "196px",
        // backgroundImage: `url('${MaterialBg}')`,
        background : gradientColors[currentIndex],
        backgroundSize: "cover",
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
        }
      }}
    >
      
      <Box 
        sx={{ 
          p: 2, 
          borderTopLeftRadius: 'inherit',
          borderTopRightRadius: 'inherit',
          textAlign: 'left'
        }}
      >

        <Box display="flex" alignItems="center" mb={1}>
          <BookIcon sx={{ color: '#555', mr: 1 }} />
          <Typography 
            variant="h6" 
            sx={{
              fontWeight: 'bold',
              fontSize: '1.5rem', 
              color: '#333',
              textWrap: "nowrap",
              textOverflow: "ellipsis",
              width : "75%",
              overflow: "hidden"
            }}
          >
            {name}
          </Typography>
        </Box>
        
        <Box display="flex" alignItems="center" mb={1}>
          <SchoolIcon sx={{ color: '#555', mr: 1 }} />
          <Typography 
            variant="body1" 
            sx={{
              fontWeight: 'medium',
              fontSize: '1rem',
              color: '#555'
            }}
          >
            {courseName}
          </Typography>
        </Box>
        
      </Box>


      <CardContent>
        
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography 
            variant="body2" 
            display="flex" 
            alignItems="center"
            sx={{ 
              color: status ? '#0CCE7F' : '#F44336',
              fontWeight: 'medium'
            }}
          >
            <CircleIcon
              fontSize="small"
              sx={{ color: status ? '#0CCE7F' : '#F44336', mr: 1 }}
            />
            {status ? "Active" : "inActive"}
          </Typography>
          <Switch
            checked={status}
            onChange={(e)=>handleStatusValue(e,module)}
            color="primary"
          />
        </Box>
      </CardContent>

      
      <IconButton
        aria-label="settings"
        onClick={handleMenuOpen}
        sx={{ position: 'absolute', top: 16, right: 16, color: '#555', transition: 'color 0.3s ease'}}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => { handleMenuClose(); handleRowClick(module);setViewModalOpen(true) }}>View</MenuItem>
        <MenuItem onClick={() => { handleMenuClose(); handleRowClick(module);toggleEditUserDrawer() }}>Edit</MenuItem>
        <MenuItem onClick={(e) => { handleMenuClose(); handleRowClick(module);handleDelete(e,module?.uuid) }}>Delete</MenuItem>
      </Menu>
    </Card>
  );
};

export default ModuleCard;
