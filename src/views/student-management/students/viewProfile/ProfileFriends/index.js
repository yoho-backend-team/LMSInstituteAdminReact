import React from 'react'


function applyFilter(array, query) {
    if (query) {
      return array.filter((friend) => friend.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
  
    return array;
  }
  
  ProfileFriends.propTypes = {
    friends: PropTypes.array,
    findFriends: PropTypes.string,
    onFindFriends: PropTypes.func,
  };

const ProfileFriends = ({ friends, findFriends, onFindFriends }) => {
    
  const friendFiltered = applyFilter(friends, findFriends);

  const isNotFound = friendFiltered.length === 0;
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Friends
      </Typography>

      <InputStyle
        stretchStart={240}
        value={findFriends}
        onChange={(event) => onFindFriends(event.target.value)}
        placeholder="Find friends..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 5 }}
      />

      <Grid container spacing={3}>
        {friendFiltered.map((friend) => (
          <Grid key={friend.id} item xs={12} md={4}>
            <FriendCard friend={friend} />
          </Grid>
        ))}
      </Grid>

      {isNotFound && (
        <Box sx={{ mt: 5 }}>
          <SearchNotFound searchQuery={findFriends} />
        </Box>
      )}
    </Box>
  )
}

export default ProfileFriends