// ** MUI Imports
// import Box from '@mui/material/Box';
import { Typography, Grid,Box, Card } from '@mui/material';
import styled from '@emotion/styled';
// import MainCard from 'components/cards/MainCard';
// import { Typography as StyledTypography } from '@mui/material/styles/createTypography';
// import Card from '@mui/material/Card';
// import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import InstituteIcon from 'assets/images/icons/Lovepik_com-402395765-3d-stereo-technology-style-texture-earth-icon-free-model.png';
// import LinearProgress from '@mui/material/LinearProgress';

// ** Custom Components Imports
// import CustomChip from 'components/mui/chip';

// const data = [
//   {
//     progress: 85,
//     chipText: '+40%',
//     chipColor: 'success',
//     // title: 'Total Students',
//     subtitle: '199 Students'
//   },
//   {
//     progress: 65,
//     chipText: '+29%',
//     chipColor: 'success',
//     progressColor: 'info',
//     // title: 'Total Staffs',
//     subtitle: '22 Staffs'
//   }
// ];

const CardStudentandTeacher = () => {
  // const renderData = data.map((item, index) => (
  //   <Box key={index} sx={{ ...(index !== data.length - 1 && { mb: 5 }) }}>
  //     <Box sx={{ gap: 3, mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  //       <Typography variant="h5" sx={{ color: 'text.secondary' }}>
  //         {item.subtitle}
  //       </Typography>
  //       <CustomChip rounded size="small" skin="light" color={item.chipColor} label={item.chipText} />
  //       <Typography variant="body2" sx={{ color: 'text.disabled' }}>
  //         {`${item.progress}%`}
  //       </Typography>
  //     </Box>
  //     <LinearProgress variant="determinate" value={item.progress} color={item.progressColor} sx={{ height: 8 }} />
  //   </Box>
  // ));
const StyledTypography = styled(Typography)(({theme})=>({
  color:theme.palette.mode == 'light'? theme.palette.secondary.light : theme.palette.secondary.light
}))
  const CardWrapper = styled(Card)(({ theme }) => ({
    backgroundColor:theme.palette.mode == 'light'? theme.palette.dark.main : theme.palette.dark.main,
    // color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
      content: '""',
      position: 'absolute',
      width: 184,
      height: 194,
      background: theme.palette.secondary[200],
      borderRadius: '50%',
      top: -107,
      right: -101,
      [theme.breakpoints.down('sm')]: {
        top: -105,
        right: -140
      }
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      width: 195,
      height: 223,
      background: theme.palette.primary.light,
      borderRadius: '50%',
      top: -154,
      right: -72,
      opacity: 0.2,
      [theme.breakpoints.down('sm')]: {
        top: -155,
        right: -70
      }
    }
  }));

  return (
    <CardWrapper sx={{p:0}}>
      {/* <CardContent>{renderData}</CardContent> */}
      <CardContent sx={{p:2,py:5}}>
        <Grid container xs={12}>
          <Grid item xs={4}>
            <img src={InstituteIcon} height={100} alt="branch-img" />
          </Grid>
          <Grid item xs={8} sx={{mt:3.5}}>
            <Box>
              <StyledTypography variant="h5" sx={{mb:1}}>Welcome to</StyledTypography>
              <StyledTypography variant="h2" >Keelkattalai</StyledTypography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </CardWrapper>
  );
};

export default CardStudentandTeacher;
