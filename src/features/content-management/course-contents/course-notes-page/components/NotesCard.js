import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Menu, MenuItem, Switch, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircleIcon from '@mui/icons-material/Circle';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';

const gradientColors = [
  'linear-gradient(135deg, #f1e0e0 0%, #d5a3a3 100%)',
  'linear-gradient(135deg, #f3e4e4 0%, #d6a6a6 100%)',
  'linear-gradient(135deg, #f4e5a3 0%, #d1b96f 100%)',
  'linear-gradient(135deg, #e0f0f0 0%, #a3d4d4 100%)',
  'linear-gradient(135deg, #d9e7f0 0%, #a2c4e4 100%)',
  'linear-gradient(135deg, #b3e4e0 0%, #7dc2c2 100%)',
  'linear-gradient(135deg, #bcbcbc 0%, #8f8f8f 100%)',
  'linear-gradient(135deg, #d3c9e3 0%, #a7a1b4 100%)',
  'linear-gradient(135deg, #e3d0e6 0%, #a4a0b3 100%)',
  'linear-gradient(135deg, #c3c3c3 0%, #9e9e9e 100%)',
  'linear-gradient(135deg, #d7e6e2 0%, #a3d6d1 100%)', 
  'linear-gradient(135deg, #d1d6f0 0%, #8a8fe4 100%)',
  'linear-gradient(135deg, #e3d2d2 0%, #d1a4a4 100%)', 
  'linear-gradient(135deg, #e6c6c6 0%, #d2a1a1 100%)',
  'linear-gradient(135deg, #c3e4c4 0%, #9abda1 100%)',
  'linear-gradient(135deg, #c5e4f0 0%, #a0c6e4 100%)',
  'linear-gradient(135deg, #e3c6c6 0%, #d1a4a4 100%)',
  'linear-gradient(135deg, #c2e5c2 0%, #7dbdba 100%)', 
  'linear-gradient(135deg, #e6e6f0 0%, #9f9fff 100%)',
  'linear-gradient(135deg, #d6d2f0 0%, #9b6dff 100%)',
];



const NotesCard = ({ index,page, name, courseName, initialStatus,note,handleStatusValue ,handleRowClick,setViewModalOpen,toggleEditUserDrawer,handleDelete}) => {
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
            onChange={(e)=>handleStatusValue(e,note)}
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
        <MenuItem onClick={() => { handleMenuClose(); handleRowClick(note);setViewModalOpen(true) }}>View</MenuItem>
        <MenuItem onClick={() => { handleMenuClose(); handleRowClick(note);toggleEditUserDrawer() }}>Edit</MenuItem>
        <MenuItem onClick={(e) => { handleMenuClose(); handleRowClick(note);handleDelete(e,note) }}>Delete</MenuItem>
      </Menu>
    </Card>
  );
};

export default NotesCard;
