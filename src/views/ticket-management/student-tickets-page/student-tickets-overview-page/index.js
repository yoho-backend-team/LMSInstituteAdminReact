import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Pagination, Tab, Typography, useTheme } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MainCard from 'components/cards/MainCard';
import StudentTicketsCardsSkeleton from 'components/cards/Skeleton/StudentTicketSkeleton';
import ClosedTicketCard from 'features/ticket-management/student/components/ClosedTicketCard';
import OpenTicketCard from 'features/ticket-management/student/components/OpenTicketCard';
import { selectStudentClosedTickets } from 'features/ticket-management/student/redux/closed-tickets/studentClosedTicketSelectors';
import { getAllStudentClosedTickets } from 'features/ticket-management/student/redux/closed-tickets/studentClosedTicketThunks';
import { selectLoading, selectStudentOpenTickets } from 'features/ticket-management/student/redux/open-tickets/studentOpenTicketSelectors';
import { getAllStudentOpenTickets } from 'features/ticket-management/student/redux/open-tickets/studentOpenTicketThunks';
import { useInstitute } from 'utils/get-institute-details';
import NoDataFoundComponent from 'components/empty/noDataFound';
import { useNavigate } from 'react-router';
import { IconArrowLeft } from '@tabler/icons-react';

const StudentTicketsPage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('open');
  const dispatch = useDispatch();
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const studentOpenTickets = useSelector(selectStudentOpenTickets);
  const studentClosedTickets = useSelector(selectStudentClosedTickets);
  const studentLoading = useSelector(selectLoading);
  const [openResolveDrawer, setOpenResolveDrawer] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState({});
  const [refetch, setRefetch] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    dispatch(getAllStudentOpenTickets({ branch_id: selectedBranchId, institute_id: useInstitute().getInstituteId(), status: 'opened' }));
  }, [selectedBranchId, dispatch, refetch]);

  useEffect(() => {
    dispatch(getAllStudentClosedTickets({ branch_id: selectedBranchId, institute_id: useInstitute().getInstituteId(), status: 'closed' }));
  }, [selectedBranchId, dispatch, refetch]);

  const handleCloseDrawer = () => {
    setOpenResolveDrawer((state) => !state);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelectedTicket = (data) => {
    setSelectedTicket(data);
  };

  return (
    <>
      <Button variant='contained' sx={{my:2}} onClick={() => navigate('/ticket-management/staff-ticket')}><IconArrowLeft stroke={2}/></Button>
      <MainCard title="Student Tickets" sx={{ minHeight: '100vh' }}>
        {studentLoading ? (
          <StudentTicketsCardsSkeleton />
        ) : (
          <>
            <TabContext value={value}>
              <TabList
                onChange={handleChange}
                aria-label="customized tabs example"
                sx={{
                  '& .MuiTabs-indicator': {
                    backgroundColor: theme.palette.primary.main,
                    height: 4
                  },
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    minWidth: 100,
                    fontWeight: theme.typography.fontWeightRegular,
                    marginRight: theme.spacing(1),
                    color: theme.palette.text.secondary,
                    transition: 'all 0.3s ease',
                    overflow: 'visible',
                    '&.Mui-selected': {
                      color: theme.palette.primary.main,
                      fontWeight: theme.typography.fontWeightMedium
                    },
                    '&:hover': {
                      transform: 'translateY(2px)'
                    },
                    borderRadius: '8px',
                    padding: '12px 16px',
                    background: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
                    boxShadow: `0 4px 15px rgba(0, 0, 0, 0.1)`
                  },
                  mb: 2
                }}
              >
                <Tab value="open" label={<Typography variant="h6">Opened Tickets</Typography>} />
                <Tab value="close" label={<Typography variant="h6">Closed Tickets</Typography>} />
              </TabList>
              <TabPanel value="open" sx={{ pl: 0, pr: 0 }}>
                {studentOpenTickets?.data?.data?.length > 0 ? (
                  <Grid container spacing={2}>
                    {studentOpenTickets?.data?.data?.map((ticket, index) => (
                      <OpenTicketCard
                        key={index}
                        ticket={ticket}
                        handleSelectedTicket={handleSelectedTicket}
                        onClick={() => setOpenResolveDrawer(true)}
                      />
                    ))}
                  </Grid>
                ) : (
                  <NoDataFoundComponent
                    title="No Open Tickets Found"
                    description="There are currently no open tickets."
                    buttonText="Refresh"
                    onAdd={() => setRefetch(!refetch)}
                  />
                )}
              </TabPanel>
              <TabPanel value="close" sx={{ pl: 0, pr: 0 }}>
                {studentClosedTickets?.data?.data?.length > 0 ? (
                  <Grid container spacing={2}>
                    {studentClosedTickets?.data?.data?.map((ticket, index) => (
                      <ClosedTicketCard key={index} ticket={ticket} />
                    ))}
                  </Grid>
                ) : (
                  <NoDataFoundComponent
                    title="No Closed Tickets Found"
                    description="There are currently no closed tickets."
                    buttonText="Refresh"
                    onAdd={() => setRefetch(!refetch)}
                  />
                )}
              </TabPanel>
            </TabContext>
            {studentOpenTickets?.data?.last_page !== 1 && (
              <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination
                  count={studentOpenTickets?.data?.last_page}
                  color="primary"
                  onChange={(e, page) => {
                    dispatch(getAllStudentOpenTickets({ branch_id: selectedBranchId, page: page }));
                  }}
                />
              </Grid>
            )}
          </>
        )}
      </MainCard>
    </>
  );
};

export default StudentTicketsPage;
