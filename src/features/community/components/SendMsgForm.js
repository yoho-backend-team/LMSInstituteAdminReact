import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { getAllBatchChats, sendMessage } from './../services/communityServices';

import CustomTextField from 'components/mui/text-field';
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
  const { selectedBatch, setChats } = props;
  const [msg, setMsg] = useState('');
  console.log(selectedBatch);
  const getMessages = async () => {
    const result = await getAllBatchChats({ inst_batch_community_id: selectedBatch?.institute_branch_comm_id });
    if (result) {
      setChats(result?.data?.data);
    }
  };

  useEffect(() => {
    console.log('hello', selectedBatch);
    const intervalId = setInterval(getMessages, 5000); // Set interval for every 2 seconds

    // Call getMessages immediately when the component mounts
    getMessages();

    // Clean up the interval when the component unmounts or when selectedBatch changes
    return () => clearInterval(intervalId);
  }, [selectedBatch]); // Dependency on selectedBatch to re-run effect when it changes

  const handleSendMsg = async (e) => {
    e.preventDefault();

    const data = {
      inst_batch_community_id: selectedBatch?.institute_branch_comm_id,
      message: msg
    };

    const response = await sendMessage(data);
    if (response) {
      getMessages(selectedBatch);
    }

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

export default SendMsgForm;
