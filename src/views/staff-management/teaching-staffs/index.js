// material-ui

// project imports
// import MainCard from 'components/cards/MainCard';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

// Styled Grid component
const StyledGrid1 = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    paddingTop: '0 !important'
  },
  '& .MuiCardContent-root': {
    padding: theme.spacing(3, 3.75),
    [theme.breakpoints.down('md')]: {
      paddingTop: 0
    }
  }
}));

// Styled Grid component
const StyledGrid2 = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  objectFit:'cover',
  [theme.breakpoints.up('md')]: {
    paddingLeft: '0 !important'
  },
  [theme.breakpoints.down('md')]: {
    order: -1
  }
}));

// Styled component for the image
const Img = styled('img')(({ theme }) => ({
  height: '7rem',
  borderRadius: theme.shape.borderRadius,
  objectFit:'cover'
}));

const data=[
  {
    id:'1',
    name:'John',
    rating:'3',
    reviews:'100',
    img:'https://th.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgAAAA?rs=1&pid=ImgDetMain'
  },
  {
    id:'2',
    name:'Doe',
    rating:'4',
    reviews:'150',
    img:'https://sm.askmen.com/t/askmen_in/article/f/facebook-p/facebook-profile-picture-affects-chances-of-gettin_fr3n.1200.jpg'
  },
  {
    id:'3',
    name:'Alex Fransis',
    rating:'5',
    reviews:'160',
    img:'https://i1.wp.com/essentiallypop.com/epop/wp-content/uploads/2017/03/Alex-Francis-1.png?fit=1126%2C1130&ssl=1'
  },
  {
    id:'4',
    name:'Mark Zuckerberg',
    rating:'5',
    reviews:'200',
    img:'https://th.bing.com/th/id/OIP.2E3Y6iZbN-18fnzwBpX__wExDM?rs=1&pid=ImgDetMain'
  },
  {
    id:'4',
    name:'Elon Musk',
    rating:'5',
    reviews:'100',
    img:'https://i1.wp.com/pagesix.com/wp-content/uploads/sites/3/2016/03/471769884.jpg?quality=90&strip=all&ssl=1'
  },
  {
    id:'6',
    name:'Jeff Bezos',
    rating:'4',
    reviews:'70',
    img:'https://crooksandliars.com/files/primary_image/19/02/gettyimages-1079533948_copy.jpeg'
  },
  {
    id:'7',
    name:'Bill Gates',
    rating:'3',
    reviews:'700',
    img:'https://www.rollingstone.com/wp-content/uploads/2021/02/Gates_thumb_clean.jpg'
  },
  {
    id:'8',
    name:'Larry Page',
    rating:'4',
    reviews:'900',
    img:'https://th.bing.com/th/id/R.928fbc6429d99bb33e5d3387d331d994?rik=eiZ1vn1%2bvpr7Zg&riu=http%3a%2f%2fcrowdforthink.com%2fassets%2fuploads%2fstories%2fada9c87f4bb7fc4b55c927ac678a74bb.jpeg&ehk=RPx6fS4SVklzSA%2fQQCWMZ4%2fIUKRbAevxTx0tk3Vh1v0%3d&risl=&pid=ImgRaw&r=0'
  },
  {
    id:'9',
    name:'Sundar Pichai',
    rating:'5',
    reviews:'1000',
    img:'https://images.newindianexpress.com/uploads/user/imagelibrary/2015/8/11/7/original/sunder-pichai-twitter.JPG'
  },
  {
    id:'10',
    name:'Satya Nadella',
    rating:'3.5',
    reviews:'6600',
    img:'https://pawantech12.github.io/timeshop/images/image1.jpg'
  },
]

// ==============================|| SAMPLE PAGE ||============================== //

const Teaching = () => (
  <>
    <Grid container xs={12} spacing={3}>
      {data.map((item,i)=>(
        <Grid item xs={12} sm={12} lg={6} xl={6} key={i} >
        <Card>
          <Grid container>
            <StyledGrid1 item xs={12} sm={6} >
              <CardContent>
                <Typography variant="h4" sx={{ mb: 2 }}>
                 {item.name}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Rating readOnly value={item.rating} name="read-only" sx={{ mr: 2 }} />
                  <Typography sx={{ color: 'text.secondary' }}>{item.rating} Star | {item.reviews} reviews</Typography>
                </Box>
                {/* <Typography sx={{ mb: 4, color: 'text.secondary' }}>
              Before there was a United States of America, there were coffee houses, because how are you supposed to
              build.
            </Typography> */}
              </CardContent>
              <CardActions className="card-action-dense" sx={{ width: '100%', p: 1 }}>
                {/* <Button sx={{ p: 1, m: 1 }}>contact</Button> */}
                <Link to='/'>
                <Button sx={{ p: 1,ml:2 }}>View Profile</Button>
                </Link>
              </CardActions>
            </StyledGrid1>
            <StyledGrid2 item xs={12} sm={6}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Img alt="Stumptown Roasters" src={item.img}/>
              </CardContent>
            </StyledGrid2>
          </Grid>
        </Card>
      </Grid>

      )

     
      )}
     
    </Grid>
  </>
);

export default Teaching;
