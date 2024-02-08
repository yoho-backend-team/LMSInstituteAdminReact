import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
// import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CustomAvatar from 'components/mui/avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import { styled } from '@mui/material/styles';

// import PerfectScrollbarComponent from 'react-perfect-scrollbar';

// const PerfectScrollbar = styled(PerfectScrollbarComponent)(({ theme }) => ({
//   padding: theme.spacing(5)
// }));

const ChatLog = (props) => {
  const { data, hidden } = props;
  const chatArea = useRef(null);

  const scrollToBottom = () => {
    if (chatArea.current) {
      if (hidden) {
        chatArea.current.scrollTop = chatArea.current.scrollHeight;
      } else {
        chatArea.current._container.scrollTop = chatArea.current._container.scrollHeight;
      }
    }
  };

  useEffect(() => {
    if (data && data.chat && data.chat.length) {
      scrollToBottom();
    }
  }, [data]);

  return (
    // <PerfectScrollbar ref={chatArea} options={{ wheelPropagation: false }}>
      <Box sx={{pt:3,pb:3}}>
        <Card sx={{ maxWidth: 800, margin: 'auto', }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CustomAvatar
                skin="light"
                color={data.contact.avatarColor ? data.contact.avatarColor : undefined}
                sx={{ width: 48, height: 48, mr: 2 }}
                {...(data.contact.avatar
                  ? {
                      src: data.contact.avatar,
                      alt: data.contact.fullName
                    }
                  : {})}
              />
              <Typography variant="h5">{data.contact.fullName}</Typography>
            </Box>
            <Box sx={{ ml: 7 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                To: {data.contact.email}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Subject: {data.subject}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Date: {new Date().toLocaleDateString()}
              </Typography>
              {data.chat.map((chat, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="body1">{chat.message}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {new Date(chat.time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
 
  );
};

export default ChatLog;
