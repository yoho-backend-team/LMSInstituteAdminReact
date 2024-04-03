import MuiAvatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import CustomAvatar from 'components/mui/avatar';
import OptionsMenu from 'components/option-menu';
import ChatLog from './ChatLog';
import SendMsgForm from './SendMsgForm';
import UserProfileRight from './UserProfileRight';

// const ChatWrapperStartChat = styled(Box)(({ theme }) => ({
//   flexGrow: 1,
//   height: '100%',
//   display: 'flex',
//   borderRadius: 1,
//   alignItems: 'center',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   backgroundColor: theme.palette.action.hover
// }));

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
    communityDetails
  } = props;

  // const handleStartConversation = () => {
  //   if (!mdAbove) {
  //     handleLeftSidebarToggle();
  //   }
  // };
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
                    {getInitials(selectedBatch?.batch?.batch_name)}
                  </CustomAvatar>
                )}
              </Badge>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5">{selectedBatch?.batch_community?.batch?.batch_name}</Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: 10, mt: 0.5 }}>
                  {selectedBatch?.batch_community?.batch?.institute_course_branch?.course_name}
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

          {selectedChat ? <ChatLog hidden={hidden} data={selectedChat} /> : null}
          <SendMsgForm store={store} dispatch={dispatch} sendMsg={sendMsg} selectedBatch={selectedBatch} setChats={setChats} />
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
      return null;
    }
  };
  return renderContent();
};

export default ChatContent;
