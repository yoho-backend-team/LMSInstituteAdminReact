import React from 'react';
import Icon from 'components/icon';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, IconButton, Box, Grid } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
const BranchCard = ({ branch, setEditModalOpen, setSelectedBranch }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ position: 'relative' }}>
        <Grid
          sx={{
            position: 'absolute',
            top: 5,
            right: 3
          }}
        >
          <IconButton
            aria-label="capture screenshot"
            color="primary"
            onClick={() => {
              if (branch) {
                setSelectedBranch(branch);
                setEditModalOpen(true);
              }
            }}
          >
            <Icon icon="tabler:edit" />
          </IconButton>
          <Box component={Link} to={`${branch?.branch_id}`}>
            <IconButton aria-label="capture screenshot" color="primary">
              <Icon icon="tabler:eye" />
            </IconButton>
          </Box>
        </Grid>

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
          image={require('assets/images/avatar/map-pin.png')}
        />
        <CardContent>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {branch?.branch_name}
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            {branch?.address}, {branch?.city}, {branch?.state}, {branch?.pin_code}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default BranchCard;
