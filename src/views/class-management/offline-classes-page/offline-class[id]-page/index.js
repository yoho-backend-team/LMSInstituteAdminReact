import { Box, CardContent, CardHeader, TextField, Typography ,Divider,InputAdornment} from '@mui/material';
import AvatarGroup from '@mui/material/AvatarGroup';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { default as Avatar, default as CustomAvatar } from 'components/mui/avatar';
import { getOfflineClassDetails } from 'features/class-management/offline-classes/services/offlineClassServices';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { getInitials } from 'utils/get-initials';
import { profilePlaceholder } from 'utils/placeholders';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { Search, LocationOn } from '@mui/icons-material'
import { styled } from '@mui/material/styles'

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SearchIcon from '@mui/icons-material/Search';


// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.2s",
  "&:hover": {
    transform: "translateY(-2px)",
  },
  marginTop:theme.spacing(2),
  marginBottom: theme.spacing(2),
}))



const ScrollableCardContent = styled(CardContent)(({ theme }) => ({
  maxHeight: "400px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "0.4em",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0,0,0,.1)",
    outline: "1px solid slategrey",
  },
}))


const renderClient = (row) => {
  if (row?.student?.image) {
    return (
      <CustomAvatar
        src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${row?.student?.image}`}
        sx={{ mr: 2.5, width: 38, height: 38 }}
      />
    );
  } else {
    return (
      <CustomAvatar
        skin="light"
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: (theme) => theme.typography.body1.fontSize }}
      >
        {getInitials(row?.name ? row?.name : 'Mohammed Thasthakir')}
      </CustomAvatar>
    );
  }
};

const ViewOfflineClass = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();
  const offlineClassId = location.state.id;
  const [offlineClassData, setOfflineClassData] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = offlineClassData?.batch?.student?.filter((student) =>
    student?.first_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


  useEffect(() => {
    const data = {
      id: offlineClassId
    };
    getOfflineClassData(data);
  }, [dispatch, offlineClassId]);

  const getOfflineClassData = async (data) => {
    try {
      const result = await getOfflineClassDetails(data);
      if (result.success) {
        setOfflineClassData(result.data);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 });

  const columns = [
    {
      minWidth: 160,
      headerName: 'Student ID',
      field: 'student_id',
      renderCell: ({ row }) => (
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
          {row?.id}
        </Typography>
      )
    },
    {
      minWidth: 290,
      field: 'full_name',
      headerName: 'Student Name',
      renderCell: (params) => {
        const student = params?.row;
        const fullName = `${student.first_name} ${student.last_name}`;
        const email = student.email;
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(params.row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {fullName}
              </Typography>
              <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
                {email}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    {
      minWidth: 170,
      field: 'City',
      headerName: 'city',
      renderCell: (params) => {
        const student = params?.row;
        const city = student?.contact_info?.city;
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
              {city}
            </Typography>
          </Box>
        );
      }
    },
    {
      minWidth: 360,
      field: 'address',
      headerName: 'Address',
      renderCell: (params) => {
        const student = params?.row;
        const address = `${student?.contact_info?.address1} ${student?.contact_info?.address2}`;
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
              {address}
            </Typography>
          </Box>
        );
      }
    }
  ];


  return (

    <Box>

      <Grid container>

        <Grid item xs={12}>

          <Card>

            <CardHeader title=<Box sx={{ backgroundColor: 'black', color: 'white', borderRadius: '8px', display: 'inline-block', padding: '8px 12px' }}>
              {offlineClassData?.class_name}
            </Box>
            />

            <CardContent sx={{ mt: 0, pt: 0 }}>

              <Grid container spacing={4} justifyContent="space-between" alignItems="center">

                <Grid item sx={{ mt: -2 }}>
                  <Typography variant="h1" >
                    Batch {offlineClassData?.batch?.id}
                  </Typography>
                </Grid>

                <Grid item sx={{ display: 'flex', alignItems: 'center', mt: -12 }}  >
                  <AccessTimeIcon sx={{ fontSize: 24, color: 'gray', mx: 1 }} /><Typography variant="h3" sx={{ color: 'gray' }}>
                    Duration : {offlineClassData?.batch?.course?.duration}
                  </Typography>

                  <Box sx={{ backgroundColor: 'white', borderRadius: '8px', px: 2, py: 1, ml: 3, border: '1px solid #B0B0B0' }} >
                    <Typography variant="h4">{"offline"}</Typography>
                    {/* <Typography variant="h5" sx={{ color: theme.palette.primary.main, ml: 1 }}>
                      Visit Previous Class
                    </Typography> */}
                  </Box>
                </Grid>

              </Grid>

              <Grid container spacing={4} sx={{ pt: 3 }} justifyContent="space-between" alignItems="center">



                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Course
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    {offlineClassData?.batch?.course?.course_name}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Sarted At
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    {offlineClassData?.batch?.start_date}
                  </Typography>
                </Grid>

                <Grid item >
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Ended At
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    {offlineClassData?.batch?.end_date}
                  </Typography>
                </Grid>



                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Date
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    {offlineClassData?.start_date}
                  </Typography>
                </Grid>





              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ mt: 4 }}>

            <CardHeader title="Faculty & Coordinators" sx={{ width: '100%', '& .MuiCardHeader-title': { fontSize: '1.8rem', fontWeight: 'bold', } }} />

            <CardContent  >

              <Grid container spacing={4}>

                <Grid item>

                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <AvatarGroup className="pull-up" sx={{ display: 'flex', alignItems: 'center' }}>
                      {offlineClassData?.instructors?.map((staff) => (
                        <Tooltip key={staff.id} title={staff.full_name}>
                          <Avatar
                            src={staff.image ? staff?.image : profilePlaceholder}
                            alt={staff?.full_name}
                            sx={{ width: 60, height: 60 }}
                          />
                        </Tooltip>
                      ))}
                    </AvatarGroup>
                    <Box>
                      {offlineClassData?.instructors?.map((staff) => (
                        <Typography title={staff.full_name} sx={{ ml: 2, fontWeight: 'bold', }} >
                          {staff.full_name}
                        </Typography>
                      ))}
                      <Typography variant="h5" sx={{ color: 'grey.500', ml: 2 }}>
                        Instructor
                      </Typography>
                    </Box>
                  </Box>
                </Grid>


                <Grid item>

                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <AvatarGroup className="pull-up" sx={{ display: 'flex', alignItems: 'center' }}>
                      {offlineClassData?.coordinators?.map((staff) => (
                        <Tooltip key={staff.id} title={staff.full_name}>
                          <Avatar
                            src={staff?.image ? staff?.image : profilePlaceholder}
                            alt={staff.full_name}
                            sx={{ width: 35, height: 35 }} />
                        </Tooltip>
                      ))}
                    </AvatarGroup>
                    <Box>

                      <Typography variant="h5" sx={{ color: 'grey.500', ml: 2 }}>
                        Coordinators
                      </Typography>
                    </Box>
                  </Box>
                </Grid>




              </Grid>

            </CardContent>
          </Card>

        </Grid>


       

<Card sx={{mt:4,width:'100%'}}>
<Card  >
  <CardHeader avatar={<PeopleAltIcon sx={{ fontSize: 40,color: 'grey.600' }} />} title="Enrolled Students"  sx={{ width: '100%', '& .MuiCardHeader-title': { fontSize: '1.8rem', fontWeight: 'bold', } }}>
</CardHeader>
  {/* Search */}
  <Grid item xs={12} display={'flex'} justifyContent={'flex-end'} marginTop={-10} marginRight={2} sx={{py:2}}>
         <TextField  placeholder="Search Student"  value={searchQuery} onChange={handleSearchChange}  
         sx={{ width: 300 }}
         InputProps={{
         startAdornment: (<InputAdornment position="start"> <SearchIcon sx={{ color: 'grey.600' }} /></InputAdornment>
    ),
  }} />
        </Grid>
<Divider />
<ScrollableCardContent>

<Grid container spacing={2}>


        {offlineClassData && (

          // <Grid item xs={12} mt={3}>
          //   <DataGrid
          //     autoHeight
          //     rowHeight={80}
          //     rows={filteredStudents}
          //     columns={columns}
          //     disableRowSelectionOnClick
          //     pagination
          //     pageSize={paginationModel.pageSize}
          //     rowCount={filteredStudents.length}
          //     paginationMode="server"
          //     onPageChange={(page) => setPaginationModel((prevModel) => ({ ...prevModel, page }))}
          //   />
          // </Grid>

          <Grid container spacing={3}>
            {filteredStudents.map((student) => (
              
              <Grid item xs={12} key={student.id}>

                

                  <StyledCard>
                  <CardContent>

                 
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {renderClient({ student })}
                        <Box>

                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {`${student.first_name} ${student.last_name}`}
                          </Typography>

                          <Typography variant="body2" color="gray">
                            {student.email}
                          </Typography>

                        </Box>
                      </Box>


                      <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>

                        <Typography variant="body2" sx={{ fontWeight: 500, backgroundColor: 'white', borderRadius: '8px', px: 1, py: 1, ml: 3, border: '1px solid #B0B0B0' }}>
                          ID: {student.id}
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <LocationOn sx={{ fontSize: 20, mr: 1, color: "text.secondary" }} />
                          <Typography variant="body2">{student?.contact_info?.city}</Typography>
                        </Box>

                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            Address
                          </Typography>
                          <Typography variant="body2" sx={{ maxWidth: 300 }} noWrap>
                            {`${student?.contact_info?.address1} ${student?.contact_info?.address2}`}
                          </Typography>

                        </Box>

                      </Box>

                    </Box>
                    
                    </CardContent>

                  </StyledCard>
                 
              </Grid>
            ))}

            
          </Grid>
          
        )}
        </Grid>
        </ScrollableCardContent>
        
        </Card>
 

        </Card>
      </Grid>
    </Box>
  );
};

export default ViewOfflineClass;
