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
import { getImageUrl } from 'utils/imageUtils';

const ChatWrapperStartChat = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  height: '100%',
  display: 'flex',
  borderRadius: 1,
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: "#2A2F32"
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
    socket,setMessages,messages
  } = props;
  
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    if (typeof Notification !== "undefined") {

      Notification.requestPermission().then(permission => {
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
    socket.on("newMessage", (message, callback) => {
      setMessages((messages) => [...messages, message]);
      if (callback) callback({ status: "success" });
      // if (permissionGranted) {
      //   new Notification(communityDetails?.group, {
      //     body: message.message,
      //   });
      // }
    });
  },[])
  console.log(messages,"messages",selectedBatch)
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
              backgroundColor: '#2A2F32',
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
              boxShadow: '0px 4px 10px -4px rgba(0, 0, 0, 0.1)'
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
                {selectedChat?.batch?.course?.image ? (
                  <MuiAvatar sx={{ width: 38, height: 38 }} src={getImageUrl(selectedChat?.batch?.course?.image)} alt={selectedChat?.batch?.batch_name} />
                ) : (
                  <CustomAvatar
                    skin="light"
                    color={selectedChat?.avatarColor}
                    sx={{ width: 38, height: 38, fontSize: (theme) => theme.typography.body1.fontSize }}
                  >
                    {getInitials(selectedBatch?.batch?.batch_name)}
                  </CustomAvatar>
                )}
              </Badge>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" sx={{ color: "white"}}>{selectedBatch?.batch?.batch_name}</Typography>
                <Typography sx={{ color: "white", fontSize: 10, mt: 0.5 }}>
                  {selectedBatch?.batch?.course?.course_name}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "none", alignItems: 'center' }}>
              <OptionsMenu
                menuProps={{ sx: { mt: 2 } }}
                icon={<Icon icon="tabler:dots-vertical" />}
                iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
                options={['View Contact', 'Mute Notifications', 'Block Contact', 'Clear Chat', 'Report']}
              />
            </Box>
          </Box>

          {messages ? <ChatLog hidden={hidden} data={messages} socket={socket} /> : null}
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
    width: 110,
    height: 110,
    boxShadow: 3,
    backgroundColor: '#0CCE7F',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <Icon icon="tabler:message" fontSize="3rem" />
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
