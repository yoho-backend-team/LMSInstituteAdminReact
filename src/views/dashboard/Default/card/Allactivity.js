// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

// ** Icon Imports

// ** Custom Components Imports

const data = [
  {
    title: 'New Course Upload',
    trendNumber: 25.8,
    subtitle: 'Alex,Update the course',
    imgSrc: 'https://png.pngtree.com/png-vector/20200310/ourmid/pngtree-online-education-training-course-design-concept-vector-illustration-png-image_2158408.jpg'
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
    imgSrc: 'https://png.pngtree.com/png-vector/20190611/ourlarge/pngtree-web-development-illustration-modern-can-be-used-for-landing-pages-web-png-image_1496200.jpg'
  },
  {
    title: 'Close a Course Path',
    subtitle: 'Js,Update the course',
    trendNumber: 14.8,
    imgSrc: 'https://png.pngtree.com/png-vector/20190613/ourlarge/pngtree-web-development-illustration-modern-can-be-used-for-landing-pages-web-png-image_1496223.jpg'
  }
];

const AllActivity = () => {
  return (
    <Box width="100%">
    <Card>
      <CardHeader
        title="All Activity"
      />
      <CardContent sx={{ pt: 2 }}>
        {data.map((item, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: index !== data.length - 1 ? 2.5 : undefined,
              }}
            >
              <img width={34} src={item.imgSrc} alt={item.subtitle} />
              <Box sx={{ marginLeft: 2 }}>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                  {item.subtitle}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </CardContent>
    </Card>
  </Box>
  );
};

export default AllActivity;
