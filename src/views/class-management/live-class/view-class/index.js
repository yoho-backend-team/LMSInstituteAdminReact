// material-ui
import { Box, CardContent, CardHeader, Typography } from '@mui/material';
import AvatarGroup from '@mui/material/AvatarGroup';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import Avatar from 'components/mui/avatar';
// ** React Imports
import { useState } from 'react';

// ** MUI Imports
import { DataGrid } from '@mui/x-data-grid';

// ** Custom Components
// import { TextField } from '@mui/material';
// import MenuItem from '@mui/material/MenuItem';
// import { getOfflineClassDetails } from 'features/class-management/offline-classes/services/offlineClassServices';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { getLiveClassDetails } from 'features/class-management/live-classes/services/liveClassServices';

const ViewLiveClass = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();
  const liveClassId = location.state.id;
  const [liveClassData, setLiveClassData] = useState(null);

  useEffect(() => {
    const data = {
      class_id: liveClassId
    };
    getLiveClassData(data);
  }, [dispatch, liveClassId]);

  // const userStatusObj = {
  //   1: 'success',
  //   0: 'error'
  // };

  const getLiveClassData = async (data) => {
    try {
      const result = await getLiveClassDetails(data);
      if (result.success) {
        console.log('live Class:', result.data);
        setLiveClassData(result.data); // Assuming result.data is an array
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(getLiveClassData);

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 });

  const [statusValue] = useState({});

  // const handleStatusValue = (event, users) => {
  //   setStatusValue(users);
  // };

  const handleStatusChangeApi = async () => {
    console.log('entered', statusValue);
    const data = {
      status: statusValue?.is_active === '1' ? '0' : '1',
      id: statusValue?.id
    };
    const response = await updateCourseStudyMaterialStatus(data);
    if (response.success) {
      toast.success(response.message);
      setRefetch((state) => !state);
    } else {
      toast.error(response.message);
    }
  };

  console.log(handleStatusChangeApi);

  const columns = [
    {
      flex: 0.2,
      minWidth: 120,
      headerName: 'Student ID',
      field: 'student_id',
      renderCell: ({ row }) => (
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
          {row?.student?.student_id}
        </Typography>
      )
    },
    {
      flex: 0.275,
      minWidth: 290,
      field: 'full_name',
      headerName: 'Student Name',
      renderCell: (params) => {
        const student = params?.row?.student;
        const fullName = `${student.first_name} ${student.last_name}`;
        const email = student.email;
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
              {fullName}
            </Typography>
            <Typography noWrap variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
              {email}
            </Typography>
          </Box>
        );
      }
    },
    {
      flex: 0.275,
      minWidth: 290,
      field: 'City',
      headerName: 'city',
      renderCell: (params) => {
        const student = params?.row?.student;
        const city = student.city;
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
              {city}
            </Typography>
          </Box>
        );
      }
    }
    // {
    //   flex: 1,
    //   field: 'status',
    //   headerName: 'Status',
    //   renderCell: ({ row }) => (
    //     <div>
    //       <TextField
    //         size="small"
    //         select
    //         value={row?.is_active}
    //         label="status"
    //         id="custom-select"
    //         sx={{
    //           color: userStatusObj[row?.is_active]
    //         }}
    //         onChange={(e) => handleStatusValue(e, row)}
    //         SelectProps={{
    //           sx: {
    //             borderColor: row.is_active === '1' ? 'success' : 'error',
    //             color: userStatusObj[row?.is_active]
    //           }
    //         }}
    //       >
    //         <MenuItem value={1}>Active</MenuItem>
    //         <MenuItem value={0}>Inactive</MenuItem>
    //       </TextField>
    //     </div>
    //   )
    // }
  ];

  // const offlineClassArray = [liveClassData];

  return (
    <Box>
      <Grid container>
        {/* header */}
        {/* {offlineClassArray?.map((card, index) => ( */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title={liveClassData?.data?.class_name} />
            <CardContent sx={{ mt: 0, pt: 0 }}>
              <Grid container spacing={4}>
                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Course
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    {liveClassData?.data?.batch_class?.batch?.institute_course?.institute_course_branch?.course_name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Batch
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    {liveClassData?.data?.batch_class?.batch?.batch_id}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Duration
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    {liveClassData?.data?.batch_class?.batch?.institute_course?.institute_course_branch?.course_duration}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Date
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    {liveClassData?.data?.class_date}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Sarted At
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    {liveClassData?.data?.batch_class?.batch?.start_date}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Ended At
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    {liveClassData?.data?.batch_class?.batch?.end_date}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent sx={{ mt: 0, pt: 0 }}>
              <Grid container spacing={4}>
                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Instructor
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <AvatarGroup className="pull-up" sx={{ display: 'flex', alignItems: 'center' }}>
                      {liveClassData?.instructor?.class_staff.map((staff) => (
                        <Tooltip key={staff.id} title={staff.staff.staff_name}>
                          <Avatar
                            src={staff.staff.image_url} // Assuming the image URL is available in the staff object
                            alt={staff.staff.staff_name}
                            sx={{ width: 25, height: 25 }}
                          />
                        </Tooltip>
                      ))}
                    </AvatarGroup>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Coordinator
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <AvatarGroup className="pull-up" sx={{ display: 'flex', alignItems: 'center' }}>
                      {liveClassData?.coordinator?.class_staff.map((staff) => (
                        <Tooltip key={staff.id} title={staff.staff.staff_name}>
                          <Avatar
                            src={staff.staff.image_url} // Assuming the image URL is available in the staff object
                            alt={staff.staff.staff_name}
                            sx={{ width: 25, height: 25 }}
                          />
                        </Tooltip>
                      ))}
                    </AvatarGroup>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Class Type
                  </Typography>
                  <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h4">{liveClassData?.data?.type}</Typography>
                    <Typography variant="h5" sx={{ color: theme.palette.primary.main, ml: 1 }}>
                      Visit Previous Class
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        {/* ))} */}
        {/* body */}
        {liveClassData && (
          <Grid item xs={12} mt={3}>
            <DataGrid
              autoHeight
              rowHeight={80}
              disableRowSelectionOnClick
              rows={liveClassData?.data?.batch_class?.batch?.institute_batch_student}
              columns={columns}
              pageSizeOptions={[7, 10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ViewLiveClass;
