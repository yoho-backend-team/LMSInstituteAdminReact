// import React from 'react';
// import { Card, CardContent, Typography } from '@mui/material';
// import CardMedia from '@mui/material/CardMedia';
// import Grid from '@mui/material/Grid';

// const BatchCard = () => {
//   return (
//     <Grid container spacing={3}>
//       <Grid item xs={12} sm={6} md={3}>
//         <Card sx={{ backgroundColor: '#e3e1fc' }}>

//           <CardMedia
//             sx={{
//               height: '14.5625rem',
//               width: '80%',
//               display: 'flex',
//               justifyContent: 'center', // Center the image horizontally
//               alignItems: 'center', // Center the image vertically
//               margin: 'auto' // Center the image horizontally within the card
//             }}
//             image={`https://cdn-icons-png.flaticon.com/512/992/992651.png`}
//           />
//           <CardContent>
//             <Typography variant="h5" sx={{ mb: 2 }}>
//               Location
//             </Typography>
//             <Typography sx={{ color: 'text.secondary' }}>
//               29/1, Ambal Nagar, 1st Main Road, Echankadu, Kovilambakam, Chennai, TamilNadu- 600117
//             </Typography>
//           </CardContent>
//         </Card>
//       </Grid>

//       <Grid item xs={12} sm={6} md={3}>
//         <Card sx={{ backgroundColor: '#e3e1fc' }}>
//           <CardMedia
//             sx={{
//               height: '14.5625rem',
//               width: '80%',
//               display: 'flex',
//               justifyContent: 'center', // Center the image horizontally
//               alignItems: 'center', // Center the image vertically
//               margin: 'auto' // Center the image horizontally within the card
//             }}
//             image={`https://cdn3d.iconscout.com/3d/premium/thumb/company-building-7637349-6168858.png?f=webp`}
//           />
//           <CardContent>
//             <Typography variant="h5" sx={{ mb: 2 }}>
//               Location
//             </Typography>
//             <Typography sx={{ color: 'text.secondary' }}>
//               29/1, Ambal Nagar, 1st Main Road, Echankadu, Kovilambakam, Chennai, TamilNadu- 600117
//             </Typography>
//           </CardContent>
//         </Card>
//       </Grid>

//       <Grid item xs={12} sm={6} md={3}>
//         <Card sx={{ backgroundColor: '#e3e1fc' }}>
//           <CardMedia
//             sx={{
//               height: '14.5625rem',
//               width: '80%',
//               display: 'flex',
//               justifyContent: 'center', // Center the image horizontally
//               alignItems: 'center', // Center the image vertically
//               margin: 'auto' // Center the image horizontally within the card
//             }}
//             image={`https://cdn3d.iconscout.com/3d/premium/thumb/company-building-7637349-6168858.png?f=webp`}
//           />
//           <CardContent>
//             <Typography variant="h5" sx={{ mb: 2 }}>
//               Location
//             </Typography>
//             <Typography sx={{ color: 'text.secondary' }}>
//               29/1, Ambal Nagar, 1st Main Road, Echankadu, Kovilambakam, Chennai, TamilNadu- 600117
//             </Typography>
//           </CardContent>
//         </Card>
//       </Grid>

//       <Grid item xs={12} sm={6} md={3}>
//         <Card sx={{ backgroundColor: '#e3e1fc' }}>
//           <CardMedia
//             sx={{
//               height: '14.5625rem',
//               width: '80%',
//               display: 'flex',
//               justifyContent: 'center', // Center the image horizontally
//               alignItems: 'center', // Center the image vertically
//               margin: 'auto' // Center the image horizontally within the card
//             }}
//             image={`https://cdn3d.iconscout.com/3d/premium/thumb/company-building-7637349-6168858.png?f=webp`}
//           />
//           <CardContent>
//             <Typography variant="h5" sx={{ mb: 2 }}>
//               Location
//             </Typography>
//             <Typography sx={{ color: 'text.secondary' }}>
//               29/1, Ambal Nagar, 1st Main Road, Echankadu, Kovilambakam, Chennai, TamilNadu- 600117
//             </Typography>
//           </CardContent>
//         </Card>
//       </Grid>
//       <Grid item xs={12} sm={6} md={3}>
//         <Card sx={{ backgroundColor: '#e3e1fc' }}>
//           <CardMedia
//             sx={{
//               height: '14.5625rem',
//               width: '80%',
//               display: 'flex',
//               justifyContent: 'center', // Center the image horizontally
//               alignItems: 'center', // Center the image vertically
//               margin: 'auto' // Center the image horizontally within the card
//             }}
//             image={`https://cdn3d.iconscout.com/3d/premium/thumb/company-building-7637349-6168858.png?f=webp`}
//           />
//           <CardContent>
//             <Typography variant="h5" sx={{ mb: 2 }}>
//               Location
//             </Typography>
//             <Typography sx={{ color: 'text.secondary' }}>
//               29/1, Ambal Nagar, 1st Main Road, Echankadu, Kovilambakam, Chennai, TamilNadu- 600117
//             </Typography>
//           </CardContent>
//         </Card>
//       </Grid>
//     </Grid>
//   );
// };

// export default BatchCard;












import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const BatchCard = () => {
  const [anchorEl, setAnchorEl] = useState(null);

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

  const handleEditClick = () => {
    // Implement edit logic here
    handleClose();
  };

  const handleDeleteClick = () => {
    // Implement delete logic here
    handleClose();
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ backgroundColor: '#e3e1fc', position: 'relative' }}>
          {/* <IconButton
            aria-label="more"
            aria-haspopup="true"
            onClick={handleMenuClick}
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          >
            <MoreVertIcon />
          </IconButton>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleViewClick}>View</MenuItem>
            <MenuItem onClick={handleEditClick}>Edit</MenuItem>
            <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
          </Menu> */}

          <CardMedia
            sx={{
              height: '14.5625rem',
              width: '80%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 'auto'
            }}
            image={`https://cdn-icons-png.flaticon.com/512/992/992651.png`}
          />
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Location
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              29/1, Ambal Nagar, 1st Main Road, Echankadu, Kovilambakam, Chennai, TamilNadu- 600117
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {Array.from({ length: 5 }, (_, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card sx={{ backgroundColor: '#e3e1fc', position: 'relative' }}>
            <IconButton
              aria-label="more"
              aria-controls={`menu-${index}`}
              aria-haspopup="true"
              onClick={handleMenuClick}
              sx={{
                position: 'absolute',
                top: 0,
                right: 0
              }}
            >
              <MoreVertIcon />
            </IconButton>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleViewClick} component={Link} to="view" sx={{ fontSize: 'small', padding: '8px' }}>
                View
              </MenuItem>
              <MenuItem onClick={handleEditClick} component={Link} to="/edit" sx={{ fontSize: 'small', padding: '8px' }}>
                Edit
              </MenuItem>
              <MenuItem onClick={handleDeleteClick} component={Link} to="/delete" sx={{ fontSize: 'small', padding: '8px' }}>
                Delete
              </MenuItem>
            </Menu>

            <CardMedia
              sx={{
                height: '14.5625rem',
                width: '80%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 'auto'
              }}
              image={`https://cdn3d.iconscout.com/3d/premium/thumb/company-building-7637349-6168858.png?f=webp`}
            />
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Location
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                29/1, Ambal Nagar, 1st Main Road, Echankadu, Kovilambakam, Chennai, TamilNadu- 600117
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BatchCard;
