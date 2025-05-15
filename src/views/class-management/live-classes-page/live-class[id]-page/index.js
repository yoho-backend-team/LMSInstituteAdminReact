import { Box, CardContent, CardHeader, TextField, Typography, IconButton, List, ListItem, ListItemText, Divider } from '@mui/material';
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
import { batch, useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { getInitials } from 'utils/get-initials';
import { profilePlaceholder } from 'utils/placeholders';
import { useSpinner } from 'context/spinnerContext';
import toast from 'react-hot-toast';
import SearchIcon from '@mui/icons-material/Search';
import { getImageUrl } from 'utils/imageUtils';

import OnlineClassSkeleton from 'components/cards/Skeleton/OnlineClassSkeleton.js';

const renderClient = (row) => {
  
  if (row?.image) {
    return (
      <CustomAvatar
        src={getImageUrl(row?.image)}
        sx={{ mr: 2.5, width: 38, height: 38 }}
      />
    );
  } else {
    return (
      <CustomAvatar
        skin="light"
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: (theme) => theme.typography.body1.fontSize }}
      >
        {getInitials(row?.full_name)}
      </CustomAvatar>
    );
  }
};


const ViewLiveClass = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const liveClassId = location.state.id;
  const [liveClassData, setLiveClassData] = useState(null);
  const {show,hide} = useSpinner()
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  const filteredStudents = liveClassData?.batch?.student?.filter((student) =>
    student?.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    show()
    const data = {
      class_id: liveClassId
    };
    getLiveClassData(data);
    if(!liveClassData){
      show()
    }
    hide()
  }, []);


  const getLiveClassData = async (data) => {
    try {
      const result = await getLiveClassDetails(data);
      if (result.success) {
        setLiveClassData(result.data);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false); // Stop loading after data is fetched
    }
  };

  
  
  const columns = [
    {
      headerName: 'Student ID',
      field: 'student_id',
      minWidth: 140,
      flex: 1,  
      renderCell: ({ row }) => <Typography>{row?.id}</Typography>,
    },
    {
      headerName: 'Student Name',
      field: 'full_name',
      minWidth: 220,
      flex: 2,  
      renderCell: (params) => {
        const student = params?.row;
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(params.row)}
            <Box ml={1}>
              <Typography noWrap>{student?.full_name}</Typography>
              <Typography noWrap variant="body2" color="text.secondary">
                {student?.email}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      headerName: 'City',
      field: 'City',
      minWidth: 120,
      flex: 1,
      renderCell: ({ row }) => <Typography>{row?.contact_info?.city}</Typography>,
    },
    {
      headerName: 'Address',
      field: 'address',
      minWidth: 300,
      flex: 2,
      renderCell: ({ row }) => (
        <Typography noWrap>{`${row?.contact_info?.address1} ${row?.contact_info?.address2}`}</Typography>
      ),
    },
  ];

function calculateTimeDifference(startTime, endTime) {
  const start = new Date(`${startTime}`);
  const end = new Date(`${endTime}`);

  let difference = end - start;

  if (difference < 0) {
    difference += 24 * 60 * 60 * 1000;
  }

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  let difference_timeBetween = '';
  if (hours > 0) difference_timeBetween += `${hours} hour${hours > 1 ? 's' : ''} `;
  if (minutes > 0) difference_timeBetween += `${minutes} minute${minutes > 1 ? 's' : ''} `;
  if (seconds > 0) difference_timeBetween += `${seconds} second${seconds > 1 ? 's' : ''} `;

  return difference_timeBetween.trim()
}

  return (
    <>
   {loading? (<OnlineClassSkeleton/>):
   (

  
    <Box sx={{ p: 3}} >
      
      <Card variant="outlined" sx={{ mb: 3, borderColor: '#ddd', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
        <Box sx={{ display: "flex", gap: "5px" }} >
          <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", color: "#ADB5BD" }} >
            {"Class:"}
          </Typography>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            {liveClassData?.class_name}
          </Typography>
        </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ p: 2, mb: 2, bgcolor: '#f5f5f5' }}>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Course
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {liveClassData?.batch?.course?.course_name}
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ p: 2, mb: 2, bgcolor: '#f5f5f5' }}>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Batch
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {liveClassData?.batch?.batch_name}
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ p: 2, mb: 2, bgcolor: '#f5f5f5' }}>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Duration
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {calculateTimeDifference(liveClassData?.start_time,liveClassData?.end_time)}
                  {/* {liveClassData?.batch?.course?.duration} */}
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ p: 2, mb: 2, bgcolor: '#f5f5f5' }}>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Date
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {new Date(liveClassData?.start_date).toLocaleDateString()}
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ p: 2, mb: 2, bgcolor: '#f5f5f5' }}>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Started At
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {new Date(liveClassData?.start_time).toLocaleTimeString()}
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ p: 2, mb: 2, bgcolor: '#f5f5f5' }}>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Ended At
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {new Date(liveClassData?.end_time).toLocaleTimeString()}
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ p: 2, mb: 2, bgcolor: '#f5f5f5', maxHeight: "92px" }}>
                <Typography variant="subtitle1" color="text.secondary" sx={{ marginBottom: "8px" }} gutterBottom>
                  Instructor
                </Typography>
                <AvatarGroup max={4}>
                  {liveClassData?.instructors?.map((staff) => (
                    <Tooltip key={staff.id} title={staff.full_name}>
                      <Avatar src={getImageUrl(staff?.image)} alt={staff.full_name} sx={{ width: 32, height: 32 }} />
                    </Tooltip>
                  ))}
                </AvatarGroup>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3} sx={{ display: "none" }} >
              <Card sx={{ p: 2, mb: 2, bgcolor: '#f5f5f5' }}>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Coordinator
                </Typography>
                <AvatarGroup max={4}>
                  {liveClassData?.coordinators?.map((staff) => (
                    <Tooltip key={staff.id} title={staff.full_name}>
                      <Avatar src={staff?.image || profilePlaceholder} alt={staff.full_name} sx={{ width: 32, height: 32 }} />
                    </Tooltip>
                  ))}
                </AvatarGroup>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3} sx={{ display: "none" }} >
              <Card sx={{ p: 2, mb: 2, bgcolor: '#f5f5f5' }}>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Class Type
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {liveClassData?.type}
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ p: 2, mb: 2, bgcolor: '#f5f5f5' }}>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Class Link
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {liveClassData?.video_url}
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    

        <Card variant="outlined">
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TextField
              variant="outlined"
              placeholder="Search Student"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
              sx={{ width: '100%', maxWidth: 400 }}
            />
          </Box>
          <DataGrid
            autoHeight
            rowHeight={60}
            rows={filteredStudents || []}
            columns={columns}
            disableColumnMenu
            pagination
            pageSize={paginationModel.pageSize}
            showCellVerticalBorder={false}
            showColumnVerticalBorder={false}
            rowCount={filteredStudents?.length}
            onPageChange={(page) => setPaginationModel((prev) => ({ ...prev, page }))}
            paginationModel={paginationModel}
            rowsPerPageOptions={[10, 25, 50]}
            disableColumnFilter={true}
            disableColumnSorting
            sx={{
              border: 'none',
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f0f0f0',
                fontWeight: 'bold',
                fontSize: '1rem',
                borderBottom: 'none', // Removed border
                borderRadius: '4px 4px 0 0',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              },
              "& .MuiDataGrid-columnSeparator" : {
                  display : "none"
              },
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #ddd',
              },
              '& .MuiDataGrid-footerContainer': {
                borderTop: '1px solid #ddd',
                padding: '8px 0',
              },
              '& .MuiPaginationItem-root': {
                borderRadius: '4px',
              },
            }}
          />
        </CardContent>
      </Card>

    </Box>
     )}
    </>
  );
};

export default ViewLiveClass;
