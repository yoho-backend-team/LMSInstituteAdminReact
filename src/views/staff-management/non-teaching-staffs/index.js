// material-ui

// project imports
// import MainCard from 'components/cards/MainCard';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
// import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
import Avatar from 'components/mui/avatar';
import { Chip as CustomChip } from '@mui/material';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import TeacherFilter from './TeacherFilterCard';
import { Link } from 'react-router-dom';
import OptionsMenu from 'components/option-menu';
import Pagination from '@mui/material/Pagination'

// import { Link } from 'react-router-dom';

// Styled Grid component
// const StyledGrid1 = styled(Grid)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'flex-start',
//   [theme.breakpoints.down('md')]: {
//     paddingTop: '0 !important'
//   },
//   '& .MuiCardContent-root': {
//     padding: theme.spacing(3, 3.75),
//     [theme.breakpoints.down('md')]: {
//       paddingTop: 0
//     }
//   }
// }));

// Styled Grid component
// const StyledGrid2 = styled(Grid)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   objectFit: 'cover',
//   [theme.breakpoints.up('md')]: {
//     paddingLeft: '0 !important'
//   },
//   [theme.breakpoints.down('md')]: {
//     order: -1
//   }
// }));

// Styled component for the image
// const Img = styled('img')(({ theme }) => ({
//   height: '7rem',
//   borderRadius: theme.shape.borderRadius,
//   objectFit: 'cover'
// }));

const data = [
  {
    id: '1',
    name: 'John',
    email:'demo@gmail.com',
    rating: '3',
    reviews: '100',
    img: 'https://th.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgAAAA?rs=1&pid=ImgDetMain',
    isConnected: '0'
  },
  {
    id: '2',
    name: 'Doe',
    email:'demo@gmail.com',
    rating: '4',
    reviews: '150',
    img: 'https://sm.askmen.com/t/askmen_in/article/f/facebook-p/facebook-profile-picture-affects-chances-of-gettin_fr3n.1200.jpg',
    isConnected: '1'
  },
  {
    id: '3',
    name: 'Alex Fransis',
    email:'demo@gmail.com',
    rating: '5',
    reviews: '160',
    img: 'https://i1.wp.com/essentiallypop.com/epop/wp-content/uploads/2017/03/Alex-Francis-1.png?fit=1126%2C1130&ssl=1',
    isConnected: '0'
  },
  {
    id: '4',
    name: 'Mark Zuckerberg',
    email:'demo@gmail.com',
    rating: '5',
    reviews: '200',
    img: 'https://th.bing.com/th/id/OIP.2E3Y6iZbN-18fnzwBpX__wExDM?rs=1&pid=ImgDetMain',
    isConnected: '1'
  },
  {
    id: '4',
    name: 'Elon Musk',
    email:'demo@gmail.com',
    rating: '5',
    reviews: '100',
    img: 'https://i1.wp.com/pagesix.com/wp-content/uploads/sites/3/2016/03/471769884.jpg?quality=90&strip=all&ssl=1',
    isConnected: '0'
  },
  {
    id: '6',
    name: 'Jeff Bezos',
    email:'demo@gmail.com',
    rating: '4',
    reviews: '70',
    img: 'https://crooksandliars.com/files/primary_image/19/02/gettyimages-1079533948_copy.jpeg',
    isConnected: '1'
  },
  {
    id: '7',
    name: 'Bill Gates',
    email:'demo@gmail.com',
    rating: '3',
    reviews: '700',
    img: 'https://www.rollingstone.com/wp-content/uploads/2021/02/Gates_thumb_clean.jpg',
    isConnected: '1'
  },
  {
    id: '8',
    name: 'Larry Page',
    email:'demo@gmail.com',
    rating: '4',
    reviews: '900',
    img: 'https://th.bing.com/th/id/R.928fbc6429d99bb33e5d3387d331d994?rik=eiZ1vn1%2bvpr7Zg&riu=http%3a%2f%2fcrowdforthink.com%2fassets%2fuploads%2fstories%2fada9c87f4bb7fc4b55c927ac678a74bb.jpeg&ehk=RPx6fS4SVklzSA%2fQQCWMZ4%2fIUKRbAevxTx0tk3Vh1v0%3d&risl=&pid=ImgRaw&r=0',
    isConnected: '1'
  },
  {
    id: '9',
    name: 'Sundar Pichai',
    email:'demo@gmail.com',
    rating: '5',
    reviews: '1000',
    img: 'https://images.newindianexpress.com/uploads/user/imagelibrary/2015/8/11/7/original/sunder-pichai-twitter.JPG',
    isConnected: '1'
  },
  {
    id: '10',
    name: 'Satya Nadella',
    email:'demo@gmail.com',
    rating: '3.5',
    reviews: '6600',
    img: 'https://pawantech12.github.io/timeshop/images/image1.jpg',
    isConnected: '1'
  }
];


// ==============================|| SAMPLE PAGE ||============================== //

const Teaching = () => (
  <Grid>
    <TeacherFilter />
    <Grid>
    <Grid container xs={12} spacing={2} mt={2}>
      {data.map((item, i) => (
         <Grid key={i} item xs={12} sm={6} md={3}>
         <Card sx={{ position: 'relative' }}>
           <OptionsMenu
             iconButtonProps={{
               size: 'small',
               sx: { top: 12, right: 12, position: 'absolute', color: 'text.disabled' }
             }}
             options={[
               'Share Connection',
               'Block Connection',
               { divider: true },
               { text: 'Delete', menuItemProps: { sx: { color: 'error.main' } } }
             ]}
           />
           <CardContent sx={{ pt: 2.5 }}>
             <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
               <Avatar src={item.img} sx={{ mb: 2, width: 100, height: 100 }} />
               <Typography variant='h4' sx={{mb:2}}>{item.name}</Typography>
               <Typography variant='h6'>{item.email}</Typography>
               {/* <Typography sx={{ mb: 2, color: 'text.secondary', fontWeight: 500 }}>{item.designation}</Typography> */}
               <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                 {item.chips &&
                   item.chips.map((chip, index) => (
                     <Box
                       href='/'
                       key={index}
                       component={Link}
                       onClick={e => e.preventDefault()}
                       sx={{
                         textDecoration: 'none',
                         '&:not(:last-of-type)': { mr: 2.5 },
                         '& .MuiChip-root': { cursor: 'pointer' }
                       }}
                     >
                       <CustomChip rounded size='small' skin='light' color={chip.color} label={chip.title} />
                     </Box>
                   ))}
               </Box>
               {/* <Box
                 sx={{
                   mb: 5,
                   gap: 2,
                   width: '100%',
                   display: 'flex',
                   flexWrap: 'wrap',
                   alignItems: 'center',
                   justifyContent: 'space-around'
                 }}
               >
                 <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                   <Typography variant='h4'>{item.projects}</Typography>
                   <Typography sx={{ color: 'text.secondary' }}>Projects</Typography>
                 </Box>
                 <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                   <Typography variant='h4'>{item.tasks}</Typography>
                   <Typography sx={{ color: 'text.secondary' }}>Tasks</Typography>
                 </Box>
                 <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                   <Typography variant='h4'>{item.connections}</Typography>
                   <Typography sx={{ color: 'text.secondary' }}>Connections</Typography>
                 </Box>
               </Box> */}
               <Box component={Link} to={item.id} sx={{ display: 'flex', alignItems: 'center',textDecoration:'none' }} >
                 <Button variant='tonal' sx={{px:4}}>
                  View Profile
                 </Button>
               </Box>
             </Box>
           </CardContent>
         </Card>
       </Grid>
      ))}
    </Grid>
  </Grid>
  <Grid sx={{mt:2,display:"flex",justifyContent:"flex-end"}} >
      <Pagination count={10} color='primary' />
      </Grid>
  </Grid>
);

export default Teaching;
