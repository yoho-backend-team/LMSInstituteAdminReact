import { Card, CardContent, Typography, Avatar, Box, Chip, Divider, Grid } from '@mui/material';
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MuiTabList from '@mui/lab/TabList';
import { styled } from '@mui/material';
import MuiTab from '@mui/material/Tab';
import { useState } from 'react';
import InstituteDetails from './views/institute-details';
import { useInstitute } from 'utils/get-institute-details';

const instituteinfo = useInstitute().getDetails();

const MainSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('institute');
  const institute = useInstitute().getDetails();
  console.log(institute, '______________________________________');

  const handleTabChange = (e, value) => {
    setActiveTab(value);
  };

  return (
    <Grid container spacing={6}>
      <Grid item  xs={12} lg={3}>
        <Card sx={{ maxWidth: 345, mx: 'auto', p: 2, borderRadius: 4, boxShadow: 3 , position: { lg: 'fixed', xs: 'relative' }}}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h3" color="textPrimary">
              Profile
            </Typography>
            <Chip label={instituteinfo.is_active ? "Active":'Inactive'}  color={instituteinfo.is_active ? 'primary':'error'}></Chip>
            
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
            <Avatar src={instituteinfo.logo} alt="Profile" sx={{ width: 80, height: 80, mb: 1 }} />
            <Typography variant="h4" fontWeight="bold">
              {instituteinfo.slug}
            </Typography>
            <Typography variant="body1" >
              {instituteinfo.contact_info.address.city} , {instituteinfo.contact_info.address.state}
            </Typography>
          </Box >
          <CardContent sx={{textAlign:'center'}}>
            <Box sx={{display:'flex' ,mt:2 ,gap:1 ,mb:2 ,justifyContent:"center"}}>

          <EmailIcon color="primary" />
            <Typography variant="subtitle1" sx={{ color: '#0cce7f' }} fontWeight="bold">
              EMAIL
            </Typography>
            </Box>
            <Typography variant="body1" color="textSecondary">
              {instituteinfo.email}
            </Typography>
            <Box sx={{display:'flex',alignItems:'center',justifyContent:"center",mt:2,gap:1,mb:2}}>

            <PhoneIcon color="primary" />
            <Typography variant="subtitle1" color={'#0cce7f'} fontWeight="bold" >
              PHONE
            </Typography>
            </Box>
            <Typography variant="body1" color="textSecondary">
              +91 {instituteinfo.contact_info.alternate_no} , +91 {instituteinfo.contact_info.phone_no}
            </Typography>
            <Box sx={{display:'flex',alignItems:'center',justifyContent:"center",mt:2,gap:1,mb:2}}>

            <LocationOnIcon color="primary" />
            <Typography variant="subtitle1" color={'#0cce7f'} fontWeight="bold" >
              LOCATION
            </Typography>
            </Box>
            <Typography variant="body1" color="textSecondary">
              {instituteinfo.contact_info.address.address1}
              {instituteinfo.contact_info.address.address2}
              <br />
              {instituteinfo.contact_info.address.city}, {instituteinfo.contact_info.address.state}
              <br /> PIN:
              {instituteinfo.contact_info.address.pincode}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={9}>
        <InstituteDetails institute={instituteinfo} />
      </Grid>
    </Grid>
  );
};

export default MainSettingsPage;
