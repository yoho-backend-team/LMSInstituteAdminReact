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

const CardPopularCourse = ({ courses }) => {
  const handleSortChange = (event) => {
    const selectedSortOption = event.target.value;
  };
  
  const limitedData = data.slice(0, 3);

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h5" sx={{ mb: 2.5, fontWeight: 600, textAlign: 'left',mt:2 }}>
        Popular Courses
      </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ mr: 1, fontSize: 13,fontWeight: 500  }}>Sort By:</Typography>
          <Select
            label="Sort By"
            variant="outlined"
            defaultValue="best_seller"
            onChange={handleSortChange}
            sx={{
              fontSize: 12,
              fontWeight: 'bold',
              width: 150,
              
              
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
              '& .MuiSelect-icon': { color: 'primary.main' }
            }}
          >
            <MenuItem value="price_low_to_high">Price - Low to High</MenuItem>
            <MenuItem value="price_high_to_low">Price - High to Low</MenuItem>
            <MenuItem value="best_seller">Trending</MenuItem>
          </Select>
        </Box>
      </Box>

      {/* Cards Section */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 2 }}>
  {courses?.map((item, index) => (
    <Card
      key={item.course_name}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '16px',
        padding: "18px",
        overflow: 'hidden',
        backgroundColor: '#f0f9ff', // Light blue background color
        '&:hover': {
          boxShadow: '0 6px 18px rgba(0, 0, 0, 0.15)',
          backgroundColor: '#d1e8ff', // Slightly darker blue on hover
        },
        height: '100%',
        marginTop: "5px",
        transition: '0.3s ease',
      }}
    >
      {/* Course Image */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img
          width={60}
          height={60}
          src={getImageUrl(item?.image)}
          alt={item.course_name}
          style={{ borderRadius: '50%', marginRight: 16 }}
        />
      </Box>

      {/* Course Info */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body2" sx={{ color: '#4B5563', fontWeight: 'bold', fontSize: 14 }}>
          {item.course_name}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: 15,
            fontWeight: 500,
            marginTop: 1,
            lineHeight: '1.4',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxHeight: '3em',
            color: '#1F2937', // Darker text for better contrast
          }}
        >
          {item.description}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: 12, color: '#6B7280', marginTop: 1 }}>
          {item?.coursemodules?.length || 0} Modules
        </Typography>
      </Box>
    </Card>
  ))}
</Box>



    </Box>
  );
};

export default CardPopularCourse;
