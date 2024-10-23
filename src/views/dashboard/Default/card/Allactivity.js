import { Divider, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import client from 'api/client';
import { useEffect, useState } from 'react';
import { imagePlaceholder } from 'utils/placeholders';

const AllActivity = () => {
  const theme = useTheme();
  const [Logs, setLogs] = useState([]);

  useEffect(() => {
    const getAllUserActivity = async () => {
      const response = await client.activity.get();
      setLogs(response?.data);
    };
    getAllUserActivity();
  }, []);

  return (
    <>
      <Typography variant="h4" sx={{ ml: 1, mb: 2 }}>
        Recent Activities
      </Typography>
      <Card
        sx={{
          backgroundColor: "white",
          p: 3,
          height: 450,
          overflow: 'auto',
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px"
        }}
      >
        <Box>
          {Logs.map((item, index) => {
            return (
              <Box key={index} sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                    backgroundColor: theme.palette.grey[100],
                    borderRadius: '8px',
                    p: 2,
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                      backgroundColor: theme.palette.grey[200],
                    },
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginRight: 2,
                    }}
                    src={item.imgSrc ?? imagePlaceholder}
                    alt={item.title}
                  />
                  <Box>
                    <Typography variant="h6" sx={{ color: theme.palette.primary.dark, mb: 0.5 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: '0.9rem' }}>
                      {item.user?.first_name} | {item?.action} | {item?.details}
                    </Typography>
                  </Box>
                </Box>
                {index !== Logs.length - 1 && (
                  <Divider sx={{ borderColor: theme.palette.grey[300] }} />
                )}
              </Box>
            );
          })}
        </Box>
      </Card>
    </>
  );
};

export default AllActivity;
