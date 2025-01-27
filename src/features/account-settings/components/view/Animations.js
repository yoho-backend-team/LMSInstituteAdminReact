import TabContext from '@mui/lab/TabContext';
import MuiTabList from '@mui/lab/TabList';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import MuiTab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const Tab = styled(MuiTab)(({ theme }) => ({
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1)
  }
}));

const TabList = styled(MuiTabList)(({ theme }) => ({
  borderBottom: '0 !important',
  '&, & .MuiTabs-scroller': {
    boxSizing: 'content-box',
    padding: theme.spacing(1, 1, 2),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      color: theme.palette.primary.main
    }
  }
}));

const StaffManagementViewsample = () => {
  return (
    <>
      <Grid>
        
        <Card sx={{py:3}}>
          {/* Placeholder for CardMedia */}
          <Stack spacing={3} ml={5}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="rounded" width={100} height={30} sx={{ fontSize: '1rem',backgroundColor:"#c0c1c3" , borderRadius:"50px"}}/>
      <Skeleton variant="rounded"  width={350} height={80} sx={{ pl:5 ,fontSize: '1rem',backgroundColor:"#c0c1c3" }} />
      <Skeleton variant="rounded" width={100} height={30} sx={{ fontSize: '1rem',backgroundColor:"#c0c1c3" , borderRadius:"50px"}}/>
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="rounded"  width={350} height={80} sx={{ pl:5 ,fontSize: '1rem',backgroundColor:"#c0c1c3" }} />
      <Skeleton variant="rounded" width={100} height={30} sx={{ fontSize: '1rem',backgroundColor:"#c0c1c3" , borderRadius:"50px"}}/>
      <Skeleton variant="rounded"  width={350} height={80} sx={{ pl:5 ,fontSize: '1rem',backgroundColor:"#c0c1c3" }} />

    </Stack>
        </Card>
      </Grid>
    </>
  );
};

export default StaffManagementViewsample;
