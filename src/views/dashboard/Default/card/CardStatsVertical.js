// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// ** Custom Component Import
import Icon from 'components/icon'
import CustomAvatar from 'components/mui/avatar'


const CardStatsVertical = props => {
  // ** Props
  const {
    sx,
    stats,
    title,
    avatarIcon,
    avatarSize = 44,
    iconSize = '1.75rem',
    avatarColor = 'primary'
  } = props
 

  return (
    <Card sx={{ ...sx }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <CustomAvatar
          skin='light'
          variant='rounded'
          color={avatarColor}
          sx={{ mb: 3, width: avatarSize, height: avatarSize }}
        >
          <Icon icon={avatarIcon} fontSize={iconSize} />
        </CustomAvatar>
        <Typography  variant='h2' sx={{ mb: 1, color: 'text.secondary' }}>{stats}</Typography>
        <Typography variant='h5' sx={{  color: 'text.disabled' }}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardStatsVertical
