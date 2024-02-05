import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BranchesCardHeader from './BrachesCardHeader';
// import { useTheme } from '@mui/system';
import BranchEditModal from './edit-Branch/BranchEditModal';
// import BranchDeleteModal from './delete-Branch/BranchDeleteModal';
import { useDispatch, useSelector } from 'react-redux';
import { selectBranches } from '../redux/branchSelectors';
import { getAllBranches } from '../redux/branchThunks';
import { useEffect } from 'react';

const BranchCard = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();
  const branches = useSelector(selectBranches);
  useEffect(() => {
    dispatch(getAllBranches());
  }, [dispatch]);

  console.log(branches);
  // const theme = useTheme();

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const handleEditClose = () => {
    setEditModalOpen(false);
  };

  const handleEdit = (branchData) => {
    setSelectedBranch(branchData);
    setEditModalOpen(true);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewClick = () => {
    // Implement view logic here
    handleClose();
  };

    
  const branchData = [
    {
      image: require('assets/images/avatar/map-pin.png'),
      title: 'Branch 1',
      location: '29/1, Ambal Nagar, 1st Main Road, Echankadu, Kovilambakam, Chennai, TamilNadu- 600117'
    },
    {
      image: require('assets/images/avatar/map-pin.png'),

      title: 'Branch 2',
      location: '29/1, Ambal Nagar, 1st Main Road, Echankadu, Kovilambakam, Chennai, TamilNadu- 600117'
    },
    {
      image: require('assets/images/avatar/map-pin.png'),

      title: 'Branch 3',
      location: '29/1, Ambal Nagar, 1st Main Road, Echankadu, Kovilambakam, Chennai, TamilNadu- 600117'
    },
    {
      image: require('assets/images/avatar/map-pin.png'),

      title: 'Branch 4',
      location: '29/1, Ambal Nagar, 1st Main Road, Echankadu, Kovilambakam, Chennai, TamilNadu- 600117'
    },
    {
      image: require('assets/images/avatar/map-pin.png'),

      title: 'Branch 5',
      location: '29/1, Ambal Nagar, 1st Main Road, Echankadu, Kovilambakam, Chennai, TamilNadu- 600117'
    }
    // Add more objects for additional branches
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <BranchesCardHeader />
      </Grid>
      {branchData.map((branch, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card sx={{ position: 'relative' }}>
            <IconButton
              aria-label="more"
              aria-controls={`menu-${index}`}
              aria-haspopup="true"
              onClick={(event) => handleMenuClick(event, branch)}
              sx={{
                position: 'absolute',
                top: 5,
                right: 3
              }}
            >
              <MoreVertIcon />
            </IconButton>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleViewClick} component={Link} to="view" sx={{ fontSize: 'small', padding: '8px' }}>
                View
              </MenuItem>
              <MenuItem onClick={() => handleEdit(branch)} sx={{ fontSize: 'small', padding: '8px' }}>
                Edit
              </MenuItem>
             
            </Menu>

            <CardMedia
              sx={{
                height: 100,
                width: 100,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 3,
                mx: 'auto'
              }}
              // image={require('assets/images/avatar/map-pin.png')}
              image={branch.image}
            />
            <CardContent>
              <Typography variant="h4" sx={{ mb: 2 }}>
                {branch.title}
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                {branch.location}
                {/* 29/1, Ambal Nagar, 1st Main Road, Echankadu, Kovilambakam, Chennai, TamilNadu- 600117 */}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <BranchEditModal open={isEditModalOpen} handleEditClose={handleEditClose} selectedBranch={selectedBranch} />
    </Grid>
  );
};

export default BranchCard;
