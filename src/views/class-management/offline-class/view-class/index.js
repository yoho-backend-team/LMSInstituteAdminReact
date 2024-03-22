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
import { getOfflineClassDetails } from 'features/class-management/offline-classes/services/offlineClassServices';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@mui/material';


const ViewOfflineClass = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();
  const offlineClassId = location.state.id;
  const [offlineClassData, setOfflineClassData] = useState([]);

  useEffect(() => {
    const data = {
      class_id: offlineClassId
    };
    getOfflineClassData(data);
  }, [dispatch, offlineClassId]);

  const userStatusObj = {
    1: 'success',
    0: 'error'
  };

  const getOfflineClassData = async (data) => {
    try {
      // setLoading(false);
      const result = await getOfflineClassDetails(data);
      if (result.success) {
        console.log('Offline Class:', result.data);
        setOfflineClassData(result.data);
        // setLoading(false);
      } else {
        console.log(result.message);
        // setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(offlineClassData);

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 });

  const [statusValue,setStatusValue]=useState({})

  const handleStatusValue = (event, users) => {
    setStatusValue(users);
  };

  const handleStatusChangeApi = async () => {
    console.log('entered',statusValue);
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
      field: 'start_date',
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
          {params?.row?.batch_class?.batch?.institute_batch_student?.student?.id}
        </Typography>
      )
    },
    {
      flex: 0.275,
      minWidth: 290,
      field: 'full_name',
      headerName: 'Student Name',
      renderCell: (params) => {
        // const { row } = params;
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
              {params?.row?.batch_class?.batch?.institute_batch_student?.student?.first_name}{' '}
              {params?.row?.batch_class?.batch?.institute_batch_student?.student?.last_name}
            </Typography>
          </Box>
        );
      }
    },
    {
      flex: 1,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <div>
            <TextField
              size="small"
              select
              value={row?.is_active}
              label="status"
              id="custom-select"
              sx={{
                color: userStatusObj[row?.is_active]
              }}
              onChange={(e) => handleStatusValue(e, row)}
              SelectProps={{
                sx: {
                  borderColor: row.is_active === '1' ? 'success' : 'error',
                  color: userStatusObj[row?.is_active]
                }
              }}
            >
              <MenuItem value={1}>Active</MenuItem>
              <MenuItem value={0}>Inactive</MenuItem>
            </TextField>
          </div>
        );
      }
    },
  ];

  return (
    <Box>
      <Grid container>
        {/* header */}
        {offlineClassData?.map((card, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardHeader title={card?.class_name} />
              <CardContent sx={{ mt: 0, pt: 0 }}>
                <Grid container spacing={4}>
                  <Grid item>
                    <Typography variant="h5" sx={{ color: 'grey.500' }}>
                      Course
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1 }}>
                      {card?.batch_class?.batch?.institute_course?.institute_course_branch?.course_name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" sx={{ color: 'grey.500' }}>
                      Batch
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1 }}>
                      {card?.batch_class?.batch?.batch_id}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" sx={{ color: 'grey.500' }}>
                      Duration
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1 }}>
                      {card?.batch_class?.batch?.institute_course?.institute_course_branch?.course_duration}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" sx={{ color: 'grey.500' }}>
                      Date
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1 }}>
                      {card?.class_date}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" sx={{ color: 'grey.500' }}>
                      Sarted At
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1 }}>
                      {card?.batch_class?.batch?.start_date}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" sx={{ color: 'grey.500' }}>
                      Ended At
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1 }}>
                      {card?.batch_class?.batch?.end_date}
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
                    {offlineClassData.class_staff?.map((card, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Box>
                          <AvatarGroup className="pull-up" sx={{ display: 'flex', alignItems: 'center' }}>
                            <Tooltip title="Olivia Sparks">
                              <Avatar src="/images/avatars/4.png" alt="Olivia Sparks" sx={{ width: 25, height: 25 }} />
                            </Tooltip>
                            <Tooltip title="Howard Lloyd">
                              <Avatar src="/images/avatars/5.png" alt="Howard Lloyd" sx={{ width: 25, height: 25 }} />
                            </Tooltip>
                            <Tooltip title="Hallie Richards">
                              <Avatar src="/images/avatars/6.png" alt="Hallie Richards" sx={{ width: 25, height: 25 }} />
                            </Tooltip>
                            <Tooltip title="Alice Cobb">
                              <Avatar src="/images/avatars/8.png" alt="Alice Cobb" sx={{ width: 25, height: 25 }} />
                            </Tooltip>
                          </AvatarGroup>
                        </Box>

                        <Box>
                          <Typography variant="h4">Jerome Bell</Typography>
                        </Box>
                      </Box>
                    ))}
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" sx={{ color: 'grey.500' }}>
                      Coordinator
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Box>
                        <AvatarGroup className="pull-up" sx={{ display: 'flex', alignItems: 'center' }}>
                          <Tooltip title="Olivia Sparks">
                            <Avatar src="/images/avatars/4.png" alt="Olivia Sparks" sx={{ width: 25, height: 25 }} />
                          </Tooltip>
                          <Tooltip title="Howard Lloyd">
                            <Avatar src="/images/avatars/5.png" alt="Howard Lloyd" sx={{ width: 25, height: 25 }} />
                          </Tooltip>
                          <Tooltip title="Hallie Richards">
                            <Avatar src="/images/avatars/6.png" alt="Hallie Richards" sx={{ width: 25, height: 25 }} />
                          </Tooltip>
                          <Tooltip title="Alice Cobb">
                            <Avatar src="/images/avatars/8.png" alt="Alice Cobb" sx={{ width: 25, height: 25 }} />
                          </Tooltip>
                        </AvatarGroup>
                      </Box>
                      <Box>
                        <Typography variant="h4">Robert Fox</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" sx={{ color: 'grey.500' }}>
                      Class Type
                    </Typography>
                    <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center' }}>
                      <Typography variant="h4">{card?.type}</Typography>
                      <Typography variant="h5" sx={{ color: theme.palette.primary.main, ml: 1 }}>
                        Visit Previous Class
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {/* body */}
        <Grid item xs={12} mt={3}>
          <DataGrid
            autoHeight
            rows={offlineClassData}
            columns={columns}
            pageSizeOptions={[7, 10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewOfflineClass;
