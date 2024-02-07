import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import CustomAvatar from 'components/mui/avatar';
import CustomChip from 'components/mui/chip';
import ChatLog from './ChatLog';
import SendMsgForm from './SendMsgForm';



const ChatContent = (props) => {
  const { mdAbove, handleLeftSidebarToggle, handleUserProfileRightSidebarToggle } = props;

 

  const renderContent = () => {
    const selectedChat = {
      contact: {
        fullName: 'John Doe',
        avatar: 'https://via.placeholder.com/150',
        status: 'online'
      },
      chat: [
        { time: new Date(), message: 'Please let me know if there are any specific procedures or paperwork I need to complete for this leave request. I am more than willing to fulfill any requirements necessary.' },
        { time: new Date(), message: ' Thank you!' }
      ]
    };

    return (
      <Box sx={{ width: 0, flexGrow: 1, height: '100%', backgroundColor: 'action.hover' }}>
        <Box
          sx={{
            px: 5,
            py: 2.5,
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'background.paper',
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`
          }}
        >
          <Box sx={{ alignItems: 'center' }}>
            {mdAbove ? null : (
              <IconButton onClick={handleLeftSidebarToggle} sx={{ mr: 2 }}>
                <Icon icon="tabler:menu-2" />
              </IconButton>
            )}
            <Box onClick={handleUserProfileRightSidebarToggle} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <CustomAvatar
                skin="light"
                sx={{ width: 38, height: 38, mr: 2 }}
                src={selectedChat.contact.avatar}
                alt={selectedChat.contact.fullName}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h4">{selectedChat.contact.fullName}</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', mt: 2, gap: 3 }}>
            <CustomChip circle size="small" skin="light" color={'primary'} label={'BATP'} />
            <CustomChip circle size="small" skin="light" color={'secondary'} label={'BA'} />
            <CustomChip circle size="small" skin="light" color={'secondary'} label={'BATP'} />
          </Box>
        </Box>
        <ChatLog hidden={false} data={{ ...selectedChat, userContact: {} }} />
        <SendMsgForm store={{}} dispatch={() => {}} sendMsg={() => {}} />
      </Box>
    );
  };

  return renderContent();
};

export default ChatContent;
