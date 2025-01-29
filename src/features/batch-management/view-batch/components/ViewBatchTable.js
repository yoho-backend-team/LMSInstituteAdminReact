import { Grid, TextField, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Pagination from '@mui/material/Pagination';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ViewBatchTable = ({ students }) => {

  const [searchQuery, setSearchQuery] = useState('');

  if (!students) {
    return null;
  }
  const filteredStudents = students.filter((student) => student?.full_name.toLowerCase().includes(searchQuery.toLowerCase()));



  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Grid container spacing={2} >
        <Grid item xs={12} sm={8} />
        <Grid item xs={12} sm={12}>
          <TextField sx={{ display: 'flex' }} fullwidth placeholder="Search Student" value={searchQuery} onChange={handleSearchChange} />
        </Grid>



        {/* Student Cards Layout */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {filteredStudents.map((student) => (
            <Grid item xs={12} sm={6} md={4} key={student.id}>

              <Card sx={{ borderRadius: 2, boxShadow: 2, p: 2, transition: 'all 0.3s ease-in-out', '&:hover':{transform: 'translateY(-4px)',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'},
          display: 'flex',
          flexDirection: 'column',
          minHeight: 250,  }}>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 ,}}>
                  <Avatar src={student?.image} alt={student?.first_name} sx={{ width: 64, height: 64, mr: 2,  background: 'linear-gradient(to right, #3b82f6, #7c3aed)',
                           color: 'white',  
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center', }} />
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 'bold',fontWeight: 'bold',  
                           background: 'linear-gradient(to right, #2563eb, #7c3aed)',  
                           WebkitBackgroundClip: 'text',  
                           WebkitTextFillColor: 'transparent' ,
                           display: 'inline-block',  }}>{student?.first_name}</Typography>
                    <Typography variant="body2" sx={{ color: '#4b5563' }}>Student ID: {student?.id}</Typography>
                  </Box>
                </Box>

                {/* Contact & Address */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 ,flexGrow: 1}}>

                  <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex',alignItems: 'center',gap: 1,'&:hover': {color: '#1976d2',},transition: 'color 0.3s', }}>
                 

                  <EmailIcon sx={{ fontSize: 20, color: '#3b82f6', verticalAlign: 'middle', mb: 0.5 }} />
                     
                   <strong>Email:</strong> {student?.email}
                  </Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary',display: 'flex',alignItems: 'center',gap: 1,'&:hover': {color: '#8b5cf6',},transition: 'color 0.3s',  }}>
                  <CallIcon sx={{ fontSize: 20, color: '#8b5cf6', verticalAlign: 'middle', mb: 0.5 }} />
                   <strong>Phone:</strong> +91 {student?.contact_info?.phone_number}
                  </Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary',display: 'flex',alignItems: 'center',gap: 1,'&:hover': {color: '#6366f1',},transition: 'color 0.3s',  }}>
                  <LocationOnIcon sx={{ fontSize: 20, color: '#6366f1', verticalAlign: 'middle', mb: 0.5 }} />
                  <strong>Address:</strong> {student?.contact_info?.address1}, {student?.contact_info?.city}, {student?.contact_info?.state}, {student?.contact_info?.pincode}
                  </Typography>

                </Box>

              </Card>
            </Grid>
          ))}
        </Grid>
       



        
      </Grid>
      <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination count={10} color="primary" />
      </Grid>
    </>
  );
};

ViewBatchTable.propTypes = {
  students: PropTypes.any
};

export default ViewBatchTable;
