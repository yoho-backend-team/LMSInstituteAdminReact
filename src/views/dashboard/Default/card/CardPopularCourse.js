// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

// ** Custom Components Imports
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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

const CardPopularCourse = () => {
    // Handler for sorting change
    const handleSortChange = (event) => {
      const selectedSortOption = event.target.value;
      // Implement your sorting logic here
      console.log('Selected sort option:', selectedSortOption);
    };
  const limitedData = data.slice(0, 3);
  return (
    <Card>
       <CardHeader
        title="Popular Course"
        sx={{pt:4}}
        // titleTypographyProps={{
        //   sx: { pt: 2 }
        // }}
        action={
          <Select
            label="Sort By"
            variant="standard"
            defaultValue="best_seller"
            onChange={handleSortChange}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="price_low_to_high">Price - Low to High</MenuItem>
            <MenuItem value="price_high_to_low">Price - High to Low</MenuItem>
            <MenuItem value="best_seller">Best Seller</MenuItem>
          </Select>
        }
      />
      <CardContent sx={{pt:2}}>
        {limitedData.map((item, index) => (
          <Box
            key={item.title}
            sx={{
              display: 'flex',
              '& img': { mr: 2 },
              alignItems: 'center',
              mb: index !== limitedData.length - 1 ? 3.5 : undefined
            }}
          >
            <img width={46} src={item.imgSrc} alt={item.title} />

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
                <Typography variant="body2" sx={{ color: 'text.disabled'}}>{item.title}</Typography>
                <Typography variant="h4" sx={{ fontWeight: 500,fontSize:"13px" }}>
                  {item.subtitle}
                </Typography>
              </Box>
              <Typography sx={{ color: 'text.secondary' }}>{item.amount}</Typography>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default CardPopularCourse;
