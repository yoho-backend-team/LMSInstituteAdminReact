// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// ** Custom Component Import


const CardData = props => {
  // ** Props
  const {
    sx,
    stats,
    title,
  } = props
 

  return (
      <Card sx={{ ...sx, minHeight: '100%' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', pb: 0 }}>
        <Typography variant='h4' sx={{ mb: 1, color: 'text.secondary' }}>{stats}</Typography>
        <Typography  variant='body1' sx={{ color: 'text.disabled' }}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardData
