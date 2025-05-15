import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { IconCalendar } from '@tabler/icons';
import { selectLiveClasses } from 'features/class-management/live-classes/redux/liveClassSelectors';
import { getAllLiveClasses } from 'features/class-management/live-classes/redux/liveClassThunks';
import { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useInstitute } from 'utils/get-institute-details';
import { getStaffClassesWithStaffId } from '../services/teachingStaffServices';

const LiveClassCard = ({staff}) => {
  const [page,setPage] = useState(1)
  const [classes,setClasses] = useState(null)
  const liveClasses = useSelector(selectLiveClasses);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const { getInstituteId } = useInstitute();
  const institute = getInstituteId();

  const dispatch = useDispatch();

  const getClassesDetails = async (data) => {
    try {
      const response = await getStaffClassesWithStaffId(data)
      console.log(response)  
      setClasses(response)
    } catch (error) {
      toast.message(error?.message)
    }
  }

  useEffect(() => {
  const params = { staff : staff}
  getClassesDetails(params)
  },[])

  useEffect(() => {
    const data = {
      type: 'live',
      branch: selectedBranchId,
      institute
    };
    dispatch(getAllLiveClasses(data));
  }, [dispatch, selectedBranchId]);

  const handleCopyLink = (index) => {
    toast.success('Link copied to clipboard');
  };

  function convertTo12HourFormat(timestamp) {
    const date = new Date(timestamp);

    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();

    const meridiem = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    minutes = minutes < 10 ? '0' + minutes : minutes;

    return hours + ':' + minutes + ' ' + meridiem;
  }

  console.log(liveClasses,"liveClasses")

  return (
    <>
      <Grid container spacing={2}>
        {Array.isArray(classes?.classes) &&
          classes?.classes?.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ p: 3, position: 'relative', borderTop: card.status === 'pending' ? '4px solid green' : '4px solid #7cf2e1' }}>
                <Grid container direction="column" spacing={1}>
                  <Grid item sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', mt: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography
                        sx={{
                          mb: 0,
                          flexShrink: 2,
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          textAlign: 'center'
                        }}
                        variant="h3"
                        gutterBottom
                        textAlign="center"
                      >
                        {card?.class_name}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item sx={{ justifyContent: 'center', display: 'flex', mb: 2, mt: 1 }}>
                    <AvatarGroup className="pull-up" max={4}>
                      {card?.batch_class?.batch_student?.map((student, studentIndex) => {
                        return (
                          <Avatar
                            key={studentIndex}
                            src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${student?.student?.image}`}
                            alt={student?.student?.first_name}
                          />
                        );
                      })}
                    </AvatarGroup>
                  </Grid>
                  <Grid item justifyContent="center" display="flex">
                    <Typography sx={{ fontWeight: '500' }}>
                      {card?.batch?.student?.length ?? 0} Students on this class
                    </Typography>
                  </Grid>

                  <Grid item justifyContent="center" alignItems="center" sx={{ verticalAlign: 'center' }} display="flex" mb={2}>
                    <Box>
                      <IconCalendar />
                    </Box>
                    <Box sx={{ ml: 1 }}>
                      <Typography variant="h6" sx={{ alignItems: 'center', display: 'flex', fontWeight: 'bold' }}>
                        {card?.class_date} / {convertTo12HourFormat(card?.start_time)} to {convertTo12HourFormat(card?.end_time)}{' '}
                      </Typography>
                    </Box>
                  </Grid>
                  {card.class_link && (
                    <Grid sx={{ mb: 1 }}>
                      <Box sx={{ alignItems: 'center', display: 'flex' }}>
                        <IconButton onClick={() => handleCopyLink(card.class_link)} sx={{ color: 'primary.main' }} aria-label="copy-link">
                          <FileCopyIcon />
                        </IconButton>
                        <Typography>{card?.class_link}</Typography>
                      </Box>
                    </Grid>
                  )}

                  <Grid container p={1} justifyContent="center" alignItems={'center'}>
                    <Box>
                      <Button
                        variant="contained"
                        size="medium"
                        component={Link}
                        state={{ id: card?.class_id }}
                        to={`/class-management/live-classes/${card?.uuid}`}
                      >
                        View More
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
      </Grid>
      {
      classes?.last_page !== 1 &&
      <Grid container justifyContent="flex-end" mt={2}>
        <div className="demo-space-y">
          <Pagination 
          count={classes?.last_page} 
          page={page}
          onChange={(e,page) => {
          setPage(page)
          const data = {
           page : page,
           staff
          };
          getClassesDetails(data)
          }}
          color="primary"

          />
        </div>
      </Grid>
      }
    </>
  );
};

export default LiveClassCard;
