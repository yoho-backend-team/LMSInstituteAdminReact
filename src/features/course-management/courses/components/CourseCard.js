// import Card from '@mui/material/Card';
// import { Box, IconButton } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import Typography from '@mui/material/Typography';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Grid from '@mui/material/Grid';
// import React from 'react';
// import Icon from 'components/icon';
// import CourseEditModal from './CourseEditModal';
// import { useState } from 'react';
// import CustomChip from 'components/mui/chip';
// import { Link } from 'react-router-dom';

// // Styled Grid component
// const StyledGrid1 = styled(Grid)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'flex-start',
//   [theme.breakpoints.down('md')]: {
//     paddingTop: '0 !important'
//   }
// }));

// // Styled Grid component
// const StyledGrid2 = styled(Grid)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   [theme.breakpoints.up('md')]: {
//     paddingLeft: '0 !important'
//   },
//   [theme.breakpoints.down('md')]: {
//     order: -1
//   }
// }));

// // Styled component for the image
// const Img = styled('img')(({ theme }) => ({
//   height: '11rem',
//   borderRadius: theme.shape.borderRadius
// }));
// const CourseCard = (props) => {
//   const { sx, title, chipColor, chipText, image } = props;
//   const [isEditModalOpen, setEditModalOpen] = useState(false);
//   const handleEditClose = () => {
//     setEditModalOpen(false);
//   };
//   const handleEdit = () => {
//     setEditModalOpen(true);
//   };
//   return (
//     <Grid item xs={12} sm={12} lg={6}>
//       <Card sx={{ ...sx }}>
//         <Grid container>
//           <StyledGrid1 item xs={12} md={8} style={{padding:"10px"}}>
//             <CardContent style={{ paddingBottom: 0, paddingRight: '20px',width:"100%" }}>
//               <Typography variant="h3" sx={{ mb: 2 }}>
//                 {title}
//               </Typography>
//               {/* <Box sx={{ mb: 2.75, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
//                 <Rating readOnly value={rating} name="read-only" sx={{ mr: 2 }} />
//                 <Typography sx={{ color: 'text.secondary' }}>
//                   {rating} star | {reviews} reviews
//                 </Typography>
//               </Box> */}
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
//                 <CustomChip rounded size="small" skin="light" color={chipColor} label={chipText} />
//                 <Typography sx={{ color: 'text.secondary', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
//                   {' '}
//                   <Icon icon="mdi:clock" style={{ marginRight: '3px' }} />1 hour
//                 </Typography>
//               </Box>
//             </CardContent>
//             <CardActions className="card-action-dense" sx={{ width: '100%', paddingTop: '15px' }}>
//               <Box sx={{ display: 'flex' }}>
//               <IconButton component={Link} to='view ' aria-label="capture screenshot" color="primary">
//                 <Icon icon="tabler:eye" />
//               </IconButton>
//                 <IconButton onClick={() => handleEdit()} aria-label="capture screenshot" color="primary">
//                   <Icon icon="tabler:edit" />
//                 </IconButton>
//                 <IconButton aria-label="capture screenshot" color="error">
//                   <Icon icon="tabler:archive-filled" />
//                 </IconButton>
//               </Box>
//             </CardActions>
//           </StyledGrid1>
//           <StyledGrid2 item xs={12} md={4}>
//             <CardContent
//               sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 height: '100%',
//                 width: '100%',
//                 padding: '0px',
//                 paddingBottom: '0px !important'
//               }}
//             >
//               <Img alt="Stumptown Roasters" src={image} sx={{ objectFit: 'cover', height: '100%', width: '100%' }} />
//             </CardContent>
//           </StyledGrid2>
//         </Grid>
//       </Card>
//       <CourseEditModal open={isEditModalOpen} handleEditClose={handleEditClose} />
//     </Grid>
//   );
// };

// export default CourseCard;

import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Icon from 'components/icon';
import CustomChip from 'components/mui/chip';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import GroupDeleteDialog from 'features/user-management/groups/components/GroupDeleteDialog';

const CourseCard = (props) => {
  const [statusValue, setStatusValue] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDeleteMaterial, setSelectedDeleteMaterial] = useState(null);
  const { sx, image, personName, coursename, students, price } = props;

  const handleStatusValue = () => {
    setSelectedDeleteMaterial(props.material);
    setDeleteDialogOpen(true);
    setStatusValue(event.target.value);
  };

  const handleDeleteGroup = async () => {
    try {
      const result = await deleteGroup(selectedDeleteMaterial.id);

      if (result.success) {
        toast.success(result.message);
        dispatch(getAllGroups());
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid item xs={12} sm={12} lg={4}>
      <Card sx={{ ...sx }}>
        <CardContent sx={{ pb: 0 }}>
          <CardMedia sx={{ height: '12.5625rem', borderRadius: '5px' }} image={image} />
        </CardContent>
        <CardContent>
          <Box>
            <CustomChip skin="light" label="Live" rounded color="secondary" size="small" variant="outlined" />
          </Box>
          <Box sx={{ mr: 2, mt: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4">{coursename}</Typography>
            <Typography variant="body2" sx={{ fontSize: '13px', pt: 0.7, fontWeight: '400', opacity: 0.9 }}>
              {personName}
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 2,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Grid
              sx={{
                display: 'flex',
                alignItems: 'center',
                '& svg': { color: 'primary.main', mr: 0.5 }
              }}
            >
              <Icon icon="ic:twotone-person" fontSize={20} />
              <Typography sx={{ color: 'text.secondary' }}>{students}</Typography>
            </Grid>
            <Grid>
              <Typography sx={{ color: 'text.secondary' }}>{price}</Typography>
            </Grid>
          </Box>
        </CardContent>
        <CardActions className="demo-space-x" sx={{ pt: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Grid sx={{ mt: 1 }}>
            <TextField
              size="small"
              select
              fullWidth
              label="Status"
              SelectProps={{ value: statusValue, onChange: (e) => handleStatusValue(e) }}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Deactive">Deactive</MenuItem>
            </TextField>
          </Grid>
          <Button component={Link} to="view " size="medium" variant="contained" color="primary">
            View Details
          </Button>
        </CardActions>
      </Card>
      <GroupDeleteDialog open={deleteDialogOpen} setOpen={setDeleteDialogOpen} handleDeleteGroup={handleDeleteGroup} />
      
    </Grid>
  );
};

export default CourseCard;
