// ** React Imports
import { useEffect, useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// ** Store & Actions Imports
import { fetchUserProfile, removeSelectedChat, selectChat, sendMsg } from 'features/community/components/AppChat';
import { useDispatch, useSelector } from 'react-redux';

// ** Utils Imports
import { formatDateToMonthShort } from 'utils/format';
import { getInitials } from 'utils/get-initials';

// ** Chat App Components Imports
import CommunitySkeleton from 'components/cards/Skeleton/CommunitySkeleton';
import ChatContent from 'features/community/components/ChatContent';
import SidebarLeft from 'features/community/components/SidebarLeft';
import { getAllCommunities } from 'features/community/redux/communityThunks';
import { selectCommunities } from 'features/community/redux/communitySelectors';
import { getCommunityDetails } from 'features/community/services/communityServices';

const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);

    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};

const Community = () => {
  // ** States
  const [userStatus, setUserStatus] = useState('online');
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [userProfileLeftOpen, setUserProfileLeftOpen] = useState(false);
  const [userProfileRightOpen, setUserProfileRightOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [communityDetails, setCommunityDetails] = useState(null);
  const communities = useSelector(selectCommunities);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  console.log(communities);

  // ** Hooks
  const theme = useTheme();
  const dispatch = useDispatch();
  const hidden = useMediaQuery(theme.breakpoints.down('lg'));
  const store = useSelector((state) => state.chat);

  // ** Vars
  const skin = 'default';
  const smAbove = useMediaQuery(theme.breakpoints.up('sm'));
  const sidebarWidth = smAbove ? 360 : 300;
  const mdAbove = useMediaQuery(theme.breakpoints.up('md'));

  const statusObj = {
    busy: 'error',
    away: 'warning',
    online: 'success',
    offline: 'secondary'
  };

  useEffect(() => {
    const data = {
      institute_branch_id: selectedBranchId
    };
    dispatch(getAllCommunities(data));
  }, [dispatch, selectedBranchId]);
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen);
  const handleUserProfileLeftSidebarToggle = () => setUserProfileLeftOpen(!userProfileLeftOpen);
  const handleUserProfileRightSidebarToggle = async () => {
    const result = await getCommunityDetails({ batch_id: selectedBatch?.batch_community?.institute_batch_id });
    if (result) {
      setCommunityDetails(result?.data?.data);
    }
    console.log('result  yuyueyu ', result);
    setUserProfileRightOpen(!userProfileRightOpen);
  };
  console.log(selectChat);
  const [loading, setLoading] = useState(true);

  useTimeout(() => {
    setLoading(false);
  }, 1000);

  return (
    <>
      {loading ? (
        <CommunitySkeleton />
      ) : (
        <Box
          className="app-chat"
          sx={{
            width: '100%',
            display: 'flex',
            height: '81vh',
            flexDirection: 'row',
            borderRadius: 1,
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: 'background.paper',
            boxShadow: skin === 'bordered' ? 0 : 6,
            ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` })
          }}
        >
          <SidebarLeft
            store={store}
            hidden={hidden}
            mdAbove={mdAbove}
            dispatch={dispatch}
            statusObj={statusObj}
            userStatus={userStatus}
            selectChat={selectChat}
            getInitials={getInitials}
            sidebarWidth={sidebarWidth}
            setUserStatus={setUserStatus}
            leftSidebarOpen={leftSidebarOpen}
            removeSelectedChat={removeSelectedChat}
            userProfileLeftOpen={userProfileLeftOpen}
            formatDateToMonthShort={formatDateToMonthShort}
            handleLeftSidebarToggle={handleLeftSidebarToggle}
            handleUserProfileLeftSidebarToggle={handleUserProfileLeftSidebarToggle}
            communities={communities}
            setChats={setChats}
            setSelectedBatch={setSelectedBatch}
            setCommunityDetails={setCommunityDetails}
            communityDetails={communityDetails}
          />
          <ChatContent
            store={store}
            hidden={hidden}
            sendMsg={sendMsg}
            mdAbove={mdAbove}
            dispatch={dispatch}
            statusObj={statusObj}
            getInitials={getInitials}
            sidebarWidth={sidebarWidth}
            userProfileRightOpen={userProfileRightOpen}
            handleLeftSidebarToggle={handleLeftSidebarToggle}
            handleUserProfileRightSidebarToggle={handleUserProfileRightSidebarToggle}
            chats={chats}
            selectedBatch={selectedBatch}
            setChats={setChats}
            communityDetails={communityDetails}
          />
        </Box>
      )}
    </>
  );
};
Community.contentHeightFixed = true;

export default Community;
