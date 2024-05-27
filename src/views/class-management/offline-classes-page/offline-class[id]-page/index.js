import { Box, CardContent, CardHeader, TextField, Typography } from '@mui/material';
import AvatarGroup from '@mui/material/AvatarGroup';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { default as Avatar, default as CustomAvatar } from 'components/mui/avatar';
import { getOfflineClassDetails } from 'features/class-management/offline-classes/services/offlineClassServices';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { getInitials } from 'utils/get-initials';
import { profilePlaceholder } from 'utils/placeholders';

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
    student?.first_name.toLowerCase().includes(searchQuery.toLowerCase())
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
        console.log(result.message);
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
            <CardHeader title={offlineClassData?.class_name} />
            <CardContent sx={{ mt: 0, pt: 0 }}>
              <Grid container spacing={4}>
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
                    Batch
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    {offlineClassData?.batch?.id}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Duration
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    {offlineClassData?.batch?.course?.duration}
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
                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Sarted At
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    {offlineClassData?.batch?.start_date}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Ended At
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    {offlineClassData?.batch?.end_date}
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
                      {offlineClassData?.instructors?.map((staff) => (
                        <Tooltip key={staff.id} title={staff.full_name}>
                          <Avatar
                            src={staff.image?staff?.image:profilePlaceholder}
                            alt={staff?.full_name}
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
                      {offlineClassData?.coordinators?.map((staff) => (
                        <Tooltip key={staff.id} title={staff.full_name}>
                          <Avatar src={staff?.image?staff?.image:profilePlaceholder} alt={staff.full_name} sx={{ width: 25, height: 25 }} />
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
                    <Typography variant="h4">{"offline"}</Typography>
                    {/* <Typography variant="h5" sx={{ color: theme.palette.primary.main, ml: 1 }}>
                      Visit Previous Class
                    </Typography> */}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* body */}
        <Grid item xs={12} display={'flex'} justifyContent={'flex-end'} marginTop={2}>
          <TextField placeholder="Search Student" value={searchQuery} onChange={handleSearchChange} />
        </Grid>

        {offlineClassData && (
          <Grid item xs={12} mt={3}>
            <DataGrid
              autoHeight
              rowHeight={80}
              rows={filteredStudents}
              columns={columns}
              disableRowSelectionOnClick
              pagination
              pageSize={paginationModel.pageSize}
              rowCount={filteredStudents.length}
              paginationMode="server"
              onPageChange={(page) => setPaginationModel((prevModel) => ({ ...prevModel, page }))}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ViewOfflineClass;
