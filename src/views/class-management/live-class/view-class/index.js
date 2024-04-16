import { Box, CardContent, CardHeader, TextField, Typography } from '@mui/material';
import AvatarGroup from '@mui/material/AvatarGroup';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Avatar from 'components/mui/avatar';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CustomAvatar from 'components/mui/avatar';
import { getLiveClassDetails } from 'features/class-management/live-classes/services/liveClassServices';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { getInitials } from 'utils/get-initials';

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

const ViewLiveClass = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const liveClassId = location.state.id;
  const [liveClassData, setLiveClassData] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = liveClassData?.data?.batch_class?.batch?.institute_batch_student?.filter((student) =>
    student?.student?.first_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const data = {
      class_id: liveClassId
    };
    getLiveClassData(data);
  }, [dispatch, liveClassId]);

  const getLiveClassData = async (data) => {
    try {
      const result = await getLiveClassDetails(data);
      if (result.success) {
        setLiveClassData(result.data);
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
          {row?.student?.student_id}
        </Typography>
      )
    },
    {
      minWidth: 290,
      field: 'full_name',
      headerName: 'Student Name',
      renderCell: (params) => {
        const student = params?.row?.student;
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
    },
    {
      minWidth: 360,
      field: 'address',
      headerName: 'Address',
      renderCell: (params) => {
        const student = params?.row?.student;
        const address = `${student.address_line_1} ${student.address_line_2}`;
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
                      {liveClassData?.instructorStaff?.class_staff.map((staff) => (
                        <Tooltip key={staff.id} title={staff.staff.staff_name}>
                          <Avatar src={staff.staff.image_url} alt={staff.staff.staff_name} sx={{ width: 25, height: 25 }} />
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
                          <Avatar src={staff.staff.image_url} alt={staff.staff.staff_name} sx={{ width: 25, height: 25 }} />
                        </Tooltip>
                      ))}
                    </AvatarGroup>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Class Type
                  </Typography>
                  <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h4">{liveClassData?.data?.type}</Typography>
                  </Box>
                </Grid>

                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Class Link
                  </Typography>
                  <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h4">{liveClassData?.data?.class_link}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} display={'flex'} justifyContent={'flex-end'} marginTop={2}>
          <TextField placeholder="Search Student" value={searchQuery} onChange={handleSearchChange} />
        </Grid>

        {liveClassData && (
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

export default ViewLiveClass;
