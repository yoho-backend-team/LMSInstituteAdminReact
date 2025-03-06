import TabContext from '@mui/lab/TabContext';
import CustomTabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Tab from '@mui/material/Tab';
import MainCard from 'components/cards/MainCard';
import TicketsCardsSkeleton from 'components/cards/Skeleton/TicketsCardsSkeleton';
import ClosedTicketCard from 'features/ticket-management/staff/components/ClosedTicketCard';
import OpenTicketCard from 'features/ticket-management/staff/components/OpenTicketCard';
import TicketResolveDrawer from 'features/ticket-management/staff/components/ResolveTicketDrawer';
import { selectLoading, selectStaffClosedTickets } from 'features/ticket-management/staff/redux/closed-tickets/staffClosedTicketSelectors';
import { getAllStaffClosedTickets } from 'features/ticket-management/staff/redux/closed-tickets/staffClosedTicketThunks';
import { selectStaffOpenTickets } from 'features/ticket-management/staff/redux/open-tickets/staffOpenTicketSelectors';
import { getAllStaffOpenTickets } from 'features/ticket-management/staff/redux/open-tickets/staffOpenTicketThunks';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInstitute } from 'utils/get-institute-details';
import TicketResolutionPage from '../TicketResolutionPage';
import NoDataFoundComponent from 'components/empty/noDataFound';

const StaffTicketsPage = () => {
  const [value, setValue] = useState('open');
  const dispatch = useDispatch();
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const studentOpenTickets = useSelector(selectStaffOpenTickets);
  const studentClosedTickets = useSelector(selectStaffClosedTickets);
  const staffLoading = useSelector(selectLoading);
  const [openResolveDrawer, setOpenResolveDrawer] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState({});
  const [refetch, setRefetch] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOpenTickets = async () => {
      try {
        setError(null); 
        const response = await dispatch(getAllStaffOpenTickets({ 
          branch_id: selectedBranchId, 
          status: 'opened', 
          page: '1', 
          institute_id: useInstitute().getInstituteId() 
        }));
  
        
        if (response.error) {
          throw new Error(response.error.message || "Failed to fetch open tickets.");
        }
      } catch (err) {
        setError(err.message);
      }
    };
  
    fetchOpenTickets();
  }, [selectedBranchId, dispatch, refetch]);
  

  useEffect(() => {
    dispatch(getAllStaffClosedTickets(
      { 
        branch_id: selectedBranchId, 
        status: 'closed', 
        page: '1', 
        institute_id: useInstitute().getInstituteId() 
      }
    ));
  }, [selectedBranchId, dispatch, refetch]);

  const handleCloseDrawer = () => {
    setOpenResolveDrawer((state) => !state);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelectedTicket = (data) => {
    setSelectedTicket(data);
    setOpenResolveDrawer(true);
  };

  return (
    <MainCard title="Staff Tickets" sx={{ minHeight: '100vh', margin: '10 auto', }}>
      {staffLoading ? (
        <TicketsCardsSkeleton />
      ) : (
        <>
          <TabContext value={value}>
            <CustomTabList
              pill="true"
              onChange={handleChange}
              aria-label="customized tabs example"
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: 'primary.main',
                  height: 4,
                },
                '& .MuiTab-root': {
                  textTransform: 'none',
                  minWidth: 100,
                  fontWeight: 'regular',
                  marginRight: 1,
                  color: 'text.secondary',
                  transition: 'all 0.3s ease',
                  overflow: 'visible',
                  '&.Mui-selected': {
                    color: 'primary.main',
                    fontWeight: 'medium',
                  },
                  '&:hover': {
                    transform: 'translateY(2px)',
                  },
                  borderRadius: '8px',
                  padding: '12px 16px',
                  background: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
                  boxShadow: `0 4px 15px rgba(0, 0, 0, 0.1)`,
                },
                mb: 2,
              }}
            >
              <Tab value="open" label={<Typography variant="h6">Opened Tickets</Typography>} />
              <Tab value="close" label={<Typography variant='h6'>Closed Tickets</Typography>} />
            </CustomTabList>
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
            ) : error ? (
                <NoDataFoundComponent title="No Open Tickets Found" description="There are currently no open tickets." buttonText="Refresh" onAdd={() => setRefetch(!refetch)} />
              ) : null }
            </TabPanel>
            <TabPanel value="close" sx={{ pl: 0, pr: 0 }}>
            {studentClosedTickets?.data?.data?.length > 0 ? (
              <Grid container spacing={2}>
                {studentClosedTickets?.data?.data?.map((ticket, index) => (
                  <ClosedTicketCard key={index} ticket={ticket} />
                ))}
              </Grid>
            ) : (
                <NoDataFoundComponent title="No Closed Tickets Found" description="There are currently no closed tickets." buttonText="Refresh" onAdd={() => setRefetch(!refetch)} />
              )}
            </TabPanel>
          </TabContext>
          {studentClosedTickets?.data?.last_page !== 1 && (
            <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Pagination
                count={studentClosedTickets?.data?.last_page}
                color="primary"
                onChange={(e, page) => {
                  dispatch(getAllStaffClosedTickets({ branch_id: selectedBranchId, page: page }));
                }}
              />
            </Grid>
          )}
        </>
      )}
    </MainCard>
  );
};

export default StaffTicketsPage;
