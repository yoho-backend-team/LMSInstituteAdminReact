import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
import { Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import React from 'react';
import Icon from 'components/icon';
import CourseEditModal from './CourseEditModal';
import { useState } from 'react';
import CustomChip from 'components/mui/chip';
import { Link } from 'react-router-dom';

// Styled Grid component
const StyledGrid1 = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    paddingTop: '0 !important'
  }
}));

// Styled Grid component
const StyledGrid2 = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    paddingLeft: '0 !important'
  },
  [theme.breakpoints.down('md')]: {
    order: -1
  }
}));

// Styled component for the image
const Img = styled('img')(({ theme }) => ({
  height: '11rem',
  borderRadius: theme.shape.borderRadius
}));
const CourseCard = (props) => {
  const { sx, title, chipColor, chipText, rating, reviews, image } = props;
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const handleEditClose = () => {
    setEditModalOpen(false);
  };
  const handleEdit = () => {
    setEditModalOpen(true);
  };
  return (
    <Grid item xs={12} sm={12} lg={6}>
      <Card sx={{ ...sx }}>
        <Grid container>
          <StyledGrid1 item xs={12} md={8}>
            <CardContent style={{ paddingBottom: 0, paddingRight: '20px' }}>
              <Typography variant="h3" sx={{ mb: 2 }}>
                {title}
              </Typography>
              <Box sx={{ mb: 2.75, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Rating readOnly value={rating} name="read-only" sx={{ mr: 2 }} />
                <Typography sx={{ color: 'text.secondary' }}>
                  {rating} star | {reviews} reviews
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <CustomChip rounded size="small" skin="light" color={chipColor} label={chipText} />
                <Typography sx={{ color: 'text.secondary', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  {' '}
                  <Icon icon="mdi:clock" style={{ marginRight: '3px' }} />1 hour
                </Typography>
              </Box>
            </CardContent>
            <CardActions className="card-action-dense" sx={{ width: '100%', paddingTop: '15px' }}>
              <Box sx={{ display: 'flex' }}>
              <IconButton component={Link} to='view ' aria-label="capture screenshot" color="primary">
                <Icon icon="tabler:eye" />
              </IconButton>
                <IconButton onClick={() => handleEdit()} aria-label="capture screenshot" color="primary">
                  <Icon icon="tabler:edit" />
                </IconButton>
                <IconButton aria-label="capture screenshot" color="error">
                  <Icon icon="tabler:archive-filled" />
                </IconButton>
              </Box>
            </CardActions>
          </StyledGrid1>
          <StyledGrid2 item xs={12} md={4}>
            <CardContent
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
                padding: '0px',
                paddingBottom: '0px !important'
              }}
            >
              <Img alt="Stumptown Roasters" src={image} sx={{ objectFit: 'cover', height: '100%', width: '100%' }} />
            </CardContent>
          </StyledGrid2>
        </Grid>
      </Card>
      <CourseEditModal open={isEditModalOpen} handleEditClose={handleEditClose} />
    </Grid>
  );
};

export default CourseCard;
