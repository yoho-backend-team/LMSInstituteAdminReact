import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getImageUrl } from 'utils/imageUtils';

const data = [
  {
    amount: '10 Modules',
    title: 'Office Productivity',
    subtitle: 'Excel Esssential For real world (Complete Excel Course)',
    imgSrc: 'https://img.lovepik.com/free-png/20210924/lovepik-vector-work-people-illustration-png-image_401321431_wh1200.png'
  },
  {
    amount: '20 Modules',
    title: 'Ui & Motion Design',
    subtitle: 'How to make ui basic motion course',
    imgSrc: 'https://i.pinimg.com/originals/6d/b6/63/6db6631e4079e6819e7ad9f50529ea6f.png'
  },
  {
    amount: '2 Modules',
    title: 'Development',
    subtitle: 'Complete Datascience manage Bootcamp',
    imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkO6fYHDKuGtTz9TfO-7dweNqKTDuS70iPYQ&usqp=CAU'
  },
  {
    amount: '$249.99',
    subtitle: 'Item: #FXZ-2345',
    title: 'Apple Watch Series 7',
    imgSrc: '/images/cards/apple-watch-series-7.png'
  },
  {
    amount: '$79.40',
    title: 'Amazon Echo Dot',
    subtitle: 'Item: #FXZ-8959',
    imgSrc: '/images/cards/amazon-echo-dot.png'
  },
  {
    amount: '$129.48',
    subtitle: 'Item: #FXZ-7892',
    title: 'PlayStation Console',
    imgSrc: '/images/cards/play-station-console.png'
  }
];

const CardPopularCourse = ({courses}) => {
  const handleSortChange = (event) => {
    const selectedSortOption = event.target.value;
  };
  const limitedData = data.slice(0, 3);
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Box component={'h2'} sx={{ fontSize: 16 }}>
          Popular Course
        </Box>
        <Box sx={{ display: "none", justifyContent: 'center', alignItems: 'center' }}>
          <Typography sx={{ mr: 2, fontSize: 12 }}>Sort By:</Typography>
          <Select
            label="Sort By"
            variant="standard"
            defaultValue="best_seller"
            onChange={handleSortChange}
            sx={{ maxWidth: 80, border: 0, fontSize: 12, fontWeight: 'bold' }}
          >
            <MenuItem value="price_low_to_high">Price - Low to High</MenuItem>
            <MenuItem value="price_high_to_low">Price - High to Low</MenuItem>
            <MenuItem value="best_seller">Trending</MenuItem>
          </Select>
        </Box>
      </Box>
      <Box>
        <Box sx={{}}>
          {courses?.map((item, index) => (
            <Card
              key={item.course_name}
              sx={{
                display: 'flex',
                // boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)",
                border : "1px solid #E5E7EB",
                borderRadius : "8px",
                boxShadow : "none",
                '& img': { mr: 2 },
                alignItems: 'center',
                mb: index !== courses.length - 1 ? 1.2 : undefined,
                padding: 2
              }}
            >
              <img width={75} height={75} style={{ borderRadius: 20 }} src={getImageUrl(item?.image)} alt={item.course_name} />

              <Box
                sx={{
                  rowGap: 1,
                  columnGap: 4,
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Typography variant="p" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 'bold' }}>
                    {item.course_name}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '13px', mt: 1 ,maxHeight: "32px", overflow: "scroll"}}>
                    {item.description}
                  </Typography>
                </Box>
                <Typography sx={{ color: 'text.secondary', fontSize: 12,  }}>{item?.coursemodules?.length || 0} Modules</Typography>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CardPopularCourse;
