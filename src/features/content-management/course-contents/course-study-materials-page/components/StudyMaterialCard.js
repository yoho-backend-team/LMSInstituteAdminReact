import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Menu, MenuItem, Switch, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircleIcon from '@mui/icons-material/Circle';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';
import MaterialBg from "../../../../../assets/images/content-management/material-bg.jpg"

const gradientColors = [
  'linear-gradient(135deg, #d1f2eb 0%, #a3e4d7 100%)',
  'linear-gradient(135deg, #f0f4c3 0%, #dce775 100%)',
  'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
  'linear-gradient(135deg, #e1bee7 0%, #ce93d8 100%)',
  'linear-gradient(135deg, #c5cae9 0%, #9fa8da 100%)',
  'linear-gradient(135deg, #bbdefb 0%, #90caf9 100%)',
  'linear-gradient(135deg, #b3e5fc 0%, #81d4fa 100%)',
  'linear-gradient(135deg, #b2ebf2 0%, #80deea 100%)',
  'linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%)',
  'linear-gradient(135deg, #dcedc8 0%, #c5e1a5 100%)',
  'linear-gradient(135deg, #fff9c4 0%, #fff59d 100%)',
  'linear-gradient(135deg, #ffecb3 0%, #ffe082 100%)',
  'linear-gradient(135deg, #ffe0b2 0%, #ffcc80 100%)',
  'linear-gradient(135deg, #ffccbc 0%, #ffab91 100%)',
  'linear-gradient(135deg, #d7ccc8 0%, #bcaaa4 100%)',
  'linear-gradient(135deg, #cfd8dc 0%, #b0bec5 100%)',
  'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)',
  'linear-gradient(135deg, #ede7f6 0%, #d1c4e9 100%)',
  'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
  'linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%)',
];


const StudyMaterialCard = ({ index,page, name, courseName, initialStatus,material,handleStatusValue ,handleRowClick,setViewModalOpen,toggleEditUserDrawer,handleDelete}) => {
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
              color: '#333'
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
            onChange={(e)=>handleStatusValue(e,material)}
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
        <MenuItem onClick={() => { handleMenuClose(); handleRowClick(material);setViewModalOpen(true) }}>View</MenuItem>
        <MenuItem onClick={() => { handleMenuClose(); handleRowClick(material);toggleEditUserDrawer() }}>Edit</MenuItem>
        <MenuItem onClick={(event) => { handleMenuClose(); handleRowClick(material);handleDelete(event,material) }}>Delete</MenuItem>
      </Menu>
    </Card>
  );
};

export default StudyMaterialCard;
