import { Divider, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import client from 'api/client';
import { useEffect,useState } from 'react';

const data = [
  {
    title: 'New Course Upload',
    trendNumber: 25.8,
    subtitle: 'Alex,Update the course',
    imgSrc:
      'https://png.pngtree.com/png-vector/20200310/ourmid/pngtree-online-education-training-course-design-concept-vector-illustration-png-image_2158408.jpg'
  },
  {
    title: 'Close a Course Path',
    trend: 'negative',
    trendNumber: 16.2,
    subtitle: 'Marley,Update the course',
    imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1FqgmFIGXwMW10-Wj1ZxY7hZFdXv-lSv0YQ&usqp=CAU'
  },
  {
    title: 'New Course Upload',
    subtitle: 'Tesla,Update the course',
    trendNumber: 12.3,
    imgSrc: 'https://png.pngtree.com/png-clipart/20200813/ourmid/pngtree-young-people-back-view-illustration-png-image_2324583.jpg'
  },
  {
    title: 'Close a Course Path',
    trend: 'negative',
    trendNumber: 11.9,
    subtitle: 'Apple,Update the course',
    imgSrc: 'https://png.pngtree.com/png-clipart/20200813/ourmid/pngtree-young-people-greeting-illustration-png-image_2324595.jpg'
  },
  {
    title: 'New Course Upload',
    subtitle: 'React,Update the course',
    trendNumber: 16.2,
    imgSrc:
      'https://png.pngtree.com/png-vector/20190611/ourlarge/pngtree-web-development-illustration-modern-can-be-used-for-landing-pages-web-png-image_1496200.jpg'
  }
];



const AllActivity = () => {
  const theme = useTheme();
  const [Logs,setLogs] = useState([])

  useEffect(()=>{
    const getAllUserActivity = async () => {
    const response = await client.activity.get()
    console.log(response,"data")
    setLogs(response?.data)
    }
    getAllUserActivity()
   },[])

  return (
    <>
      <Typography variant="h4"sx={{ml:1,mb:2}}>
        Recent Activities
      </Typography>
      <Card sx={{ backgroundColor: theme.palette.dark.light, p: 3, height: 450, overflow: 'auto' }}>
        <Box>
          <Card sx={{ mt: 2, backgroundColor: theme.palette.primary.main, opacity: 0.8, boxShadow: 'none' }}>
            {Logs.map((item, index) => {
              return (
                <Box key={index}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: index !== data.length - 1 ? 1 : undefined,
                      pb: index === data.length - 1 ? 2 : undefined,
                      pr: 2,
                      pl: 2,
                      pt: 2
                    }}
                  >
                    {/* <img width={40} height={40} style={{ borderRadius: 20 }} src={item.imgSrc} alt={item.subtitle} /> */}
                    <Box sx={{ marginLeft: 2 }}>
                      <Typography variant="h5" sx={{ color: 'white' }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'lightgray', fontSize: '10px', mt: 0.5 }}>
                      {item.user?.first_name}  {"|"}  {item?.action} {"|"} {item?.details}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ mr: 2, ml: 2 }} />
                </Box>
              );
            })}
          </Card>
        </Box>
        <Box>
          {/* <Card sx={{ mt: 4, backgroundColor: theme.palette.primary.main, opacity: 0.8 }}>
            {Logs.map((item, index) => {
              return (
                <Box key={index}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: index !== data.length - 1 ? 1 : undefined,
                      pb: index === data.length - 1 ? 2 : undefined,
                      pr: 2,
                      pl: 2,
                      pt: 2
                    }}
                  >
                    <img width={40} height={40} style={{ borderRadius: 20 }} src={item.imgSrc} alt={item.subtitle} />
                    <Box sx={{ marginLeft: 2 }}>
                      <Typography variant="h5" sx={{ color: 'white' }}>
                        {item.action}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'lightgray', fontSize: '10px', mt: 0.5 }}>
                        {item.deta}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ mr: 2, ml: 2 }} />
                </Box>
              );
            })}
          </Card> */}
        </Box>
      </Card>
    </>
  );
};

export default AllActivity;
