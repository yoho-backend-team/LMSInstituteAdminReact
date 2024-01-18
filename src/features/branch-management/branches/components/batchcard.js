import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';

const BatchCard = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ backgroundColor: '#e3e1fc' }}>
        
          <CardMedia
            sx={{
              height: '14.5625rem',
              width: '80%',
              display: 'flex',
              justifyContent: 'center', // Center the image horizontally
              alignItems: 'center', // Center the image vertically
              margin: 'auto' // Center the image horizontally within the card
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

      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ backgroundColor: '#e3e1fc' }}>
          <CardMedia
            sx={{
              height: '14.5625rem',
              width: '80%',
              display: 'flex',
              justifyContent: 'center', // Center the image horizontally
              alignItems: 'center', // Center the image vertically
              margin: 'auto' // Center the image horizontally within the card
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

      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ backgroundColor: '#e3e1fc' }}>
          <CardMedia
            sx={{
              height: '14.5625rem',
              width: '80%',
              display: 'flex',
              justifyContent: 'center', // Center the image horizontally
              alignItems: 'center', // Center the image vertically
              margin: 'auto' // Center the image horizontally within the card
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

      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ backgroundColor: '#e3e1fc' }}>
          <CardMedia
            sx={{
              height: '14.5625rem',
              width: '80%',
              display: 'flex',
              justifyContent: 'center', // Center the image horizontally
              alignItems: 'center', // Center the image vertically
              margin: 'auto' // Center the image horizontally within the card
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
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ backgroundColor: '#e3e1fc' }}>
          <CardMedia
            sx={{
              height: '14.5625rem',
              width: '80%',
              display: 'flex',
              justifyContent: 'center', // Center the image horizontally
              alignItems: 'center', // Center the image vertically
              margin: 'auto' // Center the image horizontally within the card
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
    </Grid>
  );
};

export default BatchCard;
