import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CustomTextField from 'components/mui/text-field';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getAllBatchChats, sendMessage } from './../services/communityServices';
import { getUserDetails } from 'utils/check-auth-state';

const ChatFormWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0.6),
  boxShadow: theme.shadows[1],
  justifyContent: 'space-between',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper
}));

const Form = styled('form')(({ theme }) => ({
  padding: theme.spacing(0, 2, 2, 2)
}));

const SendMsgForm = (props) => {
  const { selectedBatch, setChats ,socket} = props;
  const [msg, setMsg] = useState('');
  const user = getUserDetails()

  const getMessages = async () => {
    const result = await getAllBatchChats({ inst_batch_community_id: selectedBatch?._id });
    if (result) {
      setChats(result?.data?.data);
    }
  };

  // useEffect(() => {
  //   const intervalId = setInterval(getMessages, 5000);
  //   getMessages();
  //   return () => clearInterval(intervalId);
  // }, [selectedBatch]);

  const handleSendMsg = async (e) => {
    e.preventDefault();
    socket.emit("sendMessage", { senderId : user?._id, content: msg, groupId : selectedBatch?._id, name : user?.full_name || user?.first_name  }, (response) => {
      if (response.status === "success") {
        console.log("Message sent successfully");
      } else {
        console.log("Message sending failed");
      }
    });

    // const response = await sendMessage(data);
    // if (response) {
    //   getMessages(selectedBatch);
    // }

    setMsg('');
  };

  return (
    <Form onSubmit={handleSendMsg}>
      <ChatFormWrapper>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <CustomTextField
            fullWidth
            value={msg}
            placeholder="Type your message here…"
            onChange={(e) => setMsg(e.target.value)}
            sx={{
              '& .Mui-focused': { boxShadow: 'none !important' },
              '& .MuiInputBase-input:not(textarea).MuiInputBase-inputSizeSmall': {
                p: (theme) => theme.spacing(1.875, 2.5)
              },
              '& .MuiInputBase-root': { border: '0 !important' }
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button type="submit" variant="contained">
            Send
          </Button>
        </Box>
      </ChatFormWrapper>
    </Form>
  );
};

SendMsgForm.propTypes = {
  selectedBatch: PropTypes.any,
  setChats: PropTypes.any
};

export default SendMsgForm;
