import MuiAvatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import CustomAvatar from 'components/mui/avatar';
import OptionsMenu from 'components/option-menu';
import PropTypes from 'prop-types';
import ChatLog from './ChatLog';
import SendMsgForm from './SendMsgForm';
import UserProfileRight from './UserProfileRight';
import { useState } from 'react';
import { useEffect } from 'react';

const ChatWrapperStartChat = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  height: '100%',
  display: 'flex',
  borderRadius: 1,
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: theme.palette.action.hover
}));

const ChatContent = (props) => {
  // ** Props
  const {
    store,
    hidden,
    sendMsg,
    dispatch,
    mdAbove,
    statusObj,
    getInitials,
    sidebarWidth,
    userProfileRightOpen,
    handleLeftSidebarToggle,
    handleUserProfileRightSidebarToggle,
    chats,
    selectedBatch,
    setChats,
    communityDetails,
    socket
  } = props;
  const [messages,setMessages] =useState([])
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    if (typeof Notification !== "undefined") {
      console.log("notifications")
      Notification.requestPermission().then(permission => {
        console.log(permission,"permission")
        if (permission === 'granted') {
          setPermissionGranted(true);
        }
      });
    }
  }, []);

  const handleStartConversation = () => {
    if (!mdAbove) {
      handleLeftSidebarToggle();
    }
  };
  useEffect(()=>{
    socket.on("message",(message)=>{
      setMessages((messages)=>[...messages,message])
      console.log(Notification.permission)
      if (permissionGranted) {
        console.log(permissionGranted,"permissionGranted")
        new Notification(communityDetails?.group, {
          body: message.message,
        });
      }
    })
  },[])
  
  const renderContent = () => {
    if (chats) {
      const selectedChat = chats;

      return (
        <Box
          sx={{
            width: 0,
            flexGrow: 1,
            height: '100%',
            backgroundColor: 'action.hover'
          }}
        >
          <Box
            sx={{
              px: 5,
              py: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'background.paper',
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`
            }}
          >
            {mdAbove ? null : (
              <IconButton onClick={handleLeftSidebarToggle} sx={{ mr: 2 }}>
                <Icon icon="tabler:menu-2" />
              </IconButton>
            )}

            <Box onClick={handleUserProfileRightSidebarToggle} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <Badge
                overlap="circular"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                sx={{ mr: 3 }}
                badgeContent={
                  <Box
                    component="span"
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      color: `${statusObj[selectedChat?.status]}.main`,
                      boxShadow: (theme) => `0 0 0 2px ${theme.palette.background.paper}`,
                      backgroundColor: `${statusObj[selectedChat?.status]}.main`
                    }}
                  />
                }
              >
                {selectedChat?.avatar ? (
                  <MuiAvatar sx={{ width: 38, height: 38 }} src={selectedChat?.avatar} alt={selectedChat?.fullName} />
                ) : (
                  <CustomAvatar
                    skin="light"
                    color={selectedChat?.avatarColor}
                    sx={{ width: 38, height: 38, fontSize: (theme) => theme.typography.body1.fontSize }}
                  >
                    {getInitials(selectedBatch?.chatName)}
                  </CustomAvatar>
                )}
              </Badge>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5">{selectedBatch?.chatName}</Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: 10, mt: 0.5 }}>
                  {selectedBatch?.batch?.batch?.course_name}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <OptionsMenu
                menuProps={{ sx: { mt: 2 } }}
                icon={<Icon icon="tabler:dots-vertical" />}
                iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
                options={['View Contact', 'Mute Notifications', 'Block Contact', 'Clear Chat', 'Report']}
              />
            </Box>
          </Box>

          {messages ? <ChatLog hidden={hidden} data={messages} /> : null}
          <SendMsgForm store={store} socket={socket} dispatch={dispatch} sendMsg={sendMsg} selectedBatch={selectedBatch} setChats={setChats} />
          <UserProfileRight
            store={store}
            hidden={hidden}
            statusObj={statusObj}
            getInitials={getInitials}
            sidebarWidth={sidebarWidth}
            userProfileRightOpen={userProfileRightOpen}
            handleUserProfileRightSidebarToggle={handleUserProfileRightSidebarToggle}
            communityDetails={communityDetails}
          />
        </Box>
      );
    } else {
      return (
        <ChatWrapperStartChat
          sx={{
            ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {})
          }}
        >
          <MuiAvatar
            sx={{
              mb: 6,
              pt: 8,
              pb: 7,
              px: 7.5,
              width: 110,
              height: 110,
              boxShadow: 3,
              backgroundColor: 'background.paper'
            }}
          >
            <Icon icon="tabler:message" fontSize="3.125rem" />
          </MuiAvatar>
          <Box
            onClick={handleStartConversation}
            sx={{
              py: 2,
              px: 6,
              boxShadow: 3,
              borderRadius: 5,
              backgroundColor: 'background.paper',
              cursor: mdAbove ? 'default' : 'pointer'
            }}
          >
            <Typography sx={{ fontWeight: 500, fontSize: '1.125rem', lineHeight: 'normal' }}>Start Conversation</Typography>
          </Box>
        </ChatWrapperStartChat>
      );
    }
  };
  return renderContent();
};

ChatContent.propTypes = {
  store: PropTypes.any,
  hidden: PropTypes.any,
  sendMsg: PropTypes.any,
  dispatch: PropTypes.any,
  mdAbove: PropTypes.any,
  statusObj: PropTypes.any,
  getInitials: PropTypes.any,
  sidebarWidth: PropTypes.any,
  userProfileRightOpen: PropTypes.any,
  handleLeftSidebarToggle: PropTypes.any,
  handleUserProfileRightSidebarToggle: PropTypes.any,
  chats: PropTypes.any,
  selectedBatch: PropTypes.any,
  setChats: PropTypes.any,
  communityDetails: PropTypes.any
};

export default ChatContent;
