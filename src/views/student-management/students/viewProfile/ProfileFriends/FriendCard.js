import React from 'react'

FriendCard.propTypes = {
    friend: PropTypes.object,
  };
  
const FriendCard = () => {
    const { name, role, avatarUrl } = friend;
  return (
    <Card
    sx={{
      py: 5,
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
      flexDirection: 'column',
    }}
  >
    <Avatar alt={name} src={avatarUrl} sx={{ width: 64, height: 64, mb: 3 }} />
    <Link variant="subtitle1" color="text.primary">
      {name}
    </Link>

    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
      {role}
    </Typography>

    <SocialsButton initialColor />

    <IconButton sx={{ top: 8, right: 8, position: 'absolute' }}>
      <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
    </IconButton>
  </Card>
  )
}

export default FriendCard