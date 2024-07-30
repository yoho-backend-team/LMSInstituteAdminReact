import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { fetchUserProfile, removeSelectedChat, selectChat, sendMsg } from 'features/community/components/AppChat';
import { useDispatch, useSelector } from 'react-redux';
import { formatDateToMonthShort } from 'utils/format';
import { getInitials } from 'utils/get-initials';
import CommunitySkeleton from 'components/cards/Skeleton/CommunitySkeleton';
import ChatContent from 'features/community/components/ChatContent';
import SidebarLeft from 'features/community/components/SidebarLeft';
import { getAllCommunities } from 'features/community/redux/communityThunks';
import { selectCommunities } from 'features/community/redux/communitySelectors';
import { getCommunityDetails } from 'features/community/services/communityServices';
import { io } from 'socket.io-client';

const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);

    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};

const Community = () => {
  const [userStatus, setUserStatus] = useState('online');
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [userProfileLeftOpen, setUserProfileLeftOpen] = useState(false);
  const [userProfileRightOpen, setUserProfileRightOpen] = useState(false);
  const [chats, setChats] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [communityDetails, setCommunityDetails] = useState(null);
  const communities = useSelector(selectCommunities);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const theme = useTheme();
  const dispatch = useDispatch();
  const hidden = useMediaQuery(theme.breakpoints.down('lg'));
  const store = useSelector((state) => state.chat);
  const skin = 'default';
  const smAbove = useMediaQuery(theme.breakpoints.up('sm'));
  const sidebarWidth = smAbove ? 360 : 300;
  const mdAbove = useMediaQuery(theme.breakpoints.up('md'));
  const [socket,setSocket] = useState(null)
  
  const statusObj = {
    busy: 'error',
    away: 'warning',
    online: 'success',
    offline: 'secondary'
  };

  useEffect(()=>{
    const socket = io(process.env.REACT_APP_PUBLIC_API_URL)
    setSocket(socket)
  },[])
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("userData"))
  //   const institute = JSON.parse(localStorage.getItem('institute'))
  //   const data = {
  //     branchid: selectedBranchId,
  //     userId:user._id,
  //     instituteId: institute._id
  //   };    
  //   dispatch(getAllCommunities(data));
  // }, [dispatch, selectedBranchId]);
  // useEffect(() => {
  //   dispatch(fetchUserProfile());
  // }, [dispatch]);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const institute = JSON.parse(localStorage.getItem('institute'));

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        branchid: selectedBranchId,
        userId: userData._id,
        instituteId: institute._id
      };
      
      const response = await dispatch(getAllCommunities(data));

   
      if (response && response.data.data && response.data.data.length > 0) {
        const chatId = response.data.data[0]._id; 
        const updatedData = { ...data, chatId };
     
      }
    };
    

    fetchData();
  }, [dispatch, selectedBranchId, userData._id, institute._id]);

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        branchid: selectedBranchId,
        userId: userData._id,
        instituteId: institute._id
      };
      
      const response = await dispatch(getAllCommunities(data));
  
      if (response && response.data.data && response.data.data.length > 0) {
        const chatId = response.data.data[0]._id; // Set chatId from response
        const updatedData = { ...data, chatId };
  
        // Call getAllBatchChats with updatedData
        const messages = await getAllBatchChats(updatedData);
        if (messages) {
          setChats(messages.data);
        }
      }
    };
    
    fetchData();
  }, [dispatch, selectedBranchId,chats]);
  


  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);


  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen);
  const handleUserProfileLeftSidebarToggle = () => setUserProfileLeftOpen(!userProfileLeftOpen);
  const handleUserProfileRightSidebarToggle = async () => {
    const result = await getCommunityDetails({ chatId: selectedBatch._id });
    if (result) {
      setCommunityDetails(result?.data);
    }
    setUserProfileRightOpen(!userProfileRightOpen);
  };

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
            chats={chats}
            setSelectedBatch={setSelectedBatch}
            setCommunityDetails={setCommunityDetails}
            communityDetails={communityDetails}
            socket ={socket}
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
            socket ={socket}
          />
        </Box>
      )}
    </>
  );
};
Community.contentHeightFixed = true;

export default Community;
