import { Card, CardContent, Typography, Avatar, Box, Chip, Divider, Grid } from '@mui/material';

import MuiTabList from '@mui/lab/TabList';
import { styled } from '@mui/material';
import MuiTab from '@mui/material/Tab';
import { useState } from 'react';
import InstituteDetails from './views/institute-details';
import { useInstitute } from 'utils/get-institute-details';


const instituteinfo = useInstitute().getDetails()


const MainSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('institute');
  const institute = useInstitute().getDetails();
console.log(institute,"______________________________________");

  const handleTabChange = (e, value) => {
    setActiveTab(value);
  };

  return (
    <Grid container spacing={2}>
<Grid item xs={3}>
<Card sx={{ maxWidth: 345, mx: 'auto', p: 2, borderRadius: 4, boxShadow: 3 }}>
        <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <Typography variant="h3" color="textPrimary">
          Profile
        </Typography>
        <Box
      sx={{
        width: 20,
        height: 20,
        bgcolor: instituteinfo.is_active ? "green":'red',
        borderRadius: "50%",
        display: "inline-block",
      }}
    />
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
          <Avatar src="https://via.placeholder.com/80" alt="Profile" sx={{ width: 80, height: 80, mb: 1 }} />
          <Typography variant="h4" fontWeight="bold">
            {instituteinfo.slug}
          </Typography>
          <Typography variant="body1" color="primary">
          {instituteinfo.contact_info.address.city} , {instituteinfo.contact_info.address.state}
          </Typography>
        </Box>
        <CardContent>
          <Typography variant="subtitle1" sx={{color:'#0cce7f'}} fontWeight="bold">
            EMAIL
          </Typography>
          <Typography variant="body1" color="textSecondary">
          {instituteinfo.email} 

          </Typography>
          <Typography variant="subtitle1" color={'#0cce7f'} fontWeight="bold" mt={2}>
            PHONE
          </Typography>
          <Typography variant="body1" color="textSecondary">
          +91 {instituteinfo.contact_info.alternate_no} , +91 {instituteinfo.contact_info.phone_no} 
          </Typography>
          <Typography variant="subtitle1" color={'#0cce7f'} fontWeight="bold" mt={2}>
            LOCATION
          </Typography>
          <Typography variant="body1" color="textSecondary">
          {instituteinfo.contact_info.address.address1}
          {instituteinfo.contact_info.address.address2}
          <br/>
          {instituteinfo.contact_info.address.city}, {instituteinfo.contact_info.address.state}
          <br/> PIN: 
          {instituteinfo.contact_info.address.pincode}
          
          </Typography>
                  
        </CardContent>
      </Card>

</Grid>
<Grid item xs={9}>
<InstituteDetails institute={instituteinfo} />

</Grid>

</Grid>

  );
};

export default MainSettingsPage;
