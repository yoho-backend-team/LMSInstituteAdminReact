import Card from '@mui/material/Card'
import Rating from '@mui/material/Rating'
import { Box,IconButton } from '@mui/material';
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/Grid'
import React from 'react'
import Icon from 'components/icon';


// Styled Grid component
const StyledGrid1 = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    [theme.breakpoints.down('md')]: {
      paddingTop: '0 !important'
    },
  }))
  
  // Styled Grid component
  const StyledGrid2 = styled(Grid)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '0 !important'
    },
    [theme.breakpoints.down('md')]: {
      order: -1
    }
  }))
  
  // Styled component for the image
  const Img = styled('img')(({ theme }) => ({
    height: '11rem',
    borderRadius: theme.shape.borderRadius
  }))
const CourseCard = (props) => {
  const { sx, title, description, rating, reviews,ratingnumb,image} = props;
  return (
    <Grid item xs={12} sm={12} lg={6}>
    <Card sx={{ ...sx }}>
    <Grid container>
      <StyledGrid1 item xs={12} md={8} >
        <CardContent style={{paddingBottom:0,paddingRight:"20px"}}>
          <Typography variant='h3' sx={{ mb: 2 }}>
           {title}
          </Typography>
          <Box sx={{ mb: 2.75, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Rating readOnly value={ratingnumb} name='read-only' sx={{ mr: 2 }} />
            <Typography sx={{ color: 'text.secondary' }}>{rating} | {reviews}</Typography>
          </Box>
          <Typography sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
        </CardContent>
        <CardActions className='card-action-dense' sx={{ width: '100%',paddingTop:"15px" }}>
        <Box sx={{ display: 'flex'}}>
              <IconButton onClick={() => handleEdit()} aria-label="capture screenshot" color="primary" sx={{pl:0.5}}>
                <Icon icon="tabler:edit" />
              </IconButton>
              <IconButton aria-label="capture screenshot" color="error">
                <Icon icon="tabler:archive-filled" />
              </IconButton>
            </Box>
        </CardActions>
      </StyledGrid1>
      <StyledGrid2 item xs={12} md={4}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',height:"100%",width:"100%",padding:"0px",paddingBottom:"0px !important"}}>
          <Img alt='Stumptown Roasters' src={image} sx={{objectFit:"cover",height:"100%",width:"100%"}} />
        </CardContent>
      </StyledGrid2>
    </Grid>
    
  </Card>
  </Grid>
  )
}

export default CourseCard