// import React from 'react';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
// import AvatarGroup from '@mui/material/AvatarGroup';

// const OnlineClassCard = () => {
//   const cardData = [
//     // Add your card data here
//     // For example:
//     {
//       classname: 'Introduction to App',
//       location: 'London, UK',
//       time: '5hr',
//       image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
//       avatar: '/images/avatars/1.png',
//       friends: [
//         'https://images.hindustantimes.com/rf/image_size_640x362/HT/p1/2015/03/18/Incoming/Pictures/1327679_Wallpaper2.jpg',
//         'https://media.istockphoto.com/id/1272815911/photo/young-indian-female-university-student-stock-photo.jpg?s=612x612&w=0&k=20&c=Iwdc08GR3pw8_Qg3_nabNJUQYTo52EU3dvW4tsth1tE=',
//         'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
//         'https://media.istockphoto.com/id/1222372717/photo/indian-young-girl-stock-images.jpg?s=612x612&w=0&k=20&c=OYtnDHPUcBMzT_CYBKETl1_f5DFOCHfXo3hY0R9pinM='
//       ]
//     },
//     {
//       classname: 'Introduction to web',
//       location: 'London, UK',
//       time: '2hr',
//       image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
//       avatar: '/images/avatars/1.png',
//       friends: [
//         'https://images.hindustantimes.com/rf/image_size_640x362/HT/p1/2015/03/18/Incoming/Pictures/1327679_Wallpaper2.jpg',
//         'https://media.istockphoto.com/id/1272815911/photo/young-indian-female-university-student-stock-photo.jpg?s=612x612&w=0&k=20&c=Iwdc08GR3pw8_Qg3_nabNJUQYTo52EU3dvW4tsth1tE=',
//         'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
//         'https://media.istockphoto.com/id/1222372717/photo/indian-young-girl-stock-images.jpg?s=612x612&w=0&k=20&c=OYtnDHPUcBMzT_CYBKETl1_f5DFOCHfXo3hY0R9pinM='
//       ]
//     },
//     {
//       classname: 'Block chain',
//       location: 'London, UK',
//       time: '3.5hr',
//       image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
//       avatar: '/images/avatars/1.png',
//       friends: [
//         'https://images.hindustantimes.com/rf/image_size_640x362/HT/p1/2015/03/18/Incoming/Pictures/1327679_Wallpaper2.jpg',
//         'https://media.istockphoto.com/id/1272815911/photo/young-indian-female-university-student-stock-photo.jpg?s=612x612&w=0&k=20&c=Iwdc08GR3pw8_Qg3_nabNJUQYTo52EU3dvW4tsth1tE=',
//         'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
//         'https://media.istockphoto.com/id/1222372717/photo/indian-young-girl-stock-images.jpg?s=612x612&w=0&k=20&c=OYtnDHPUcBMzT_CYBKETl1_f5DFOCHfXo3hY0R9pinM='
//       ]
//     },
//     {
//       classname: 'Figma',
//       location: 'London, UK',
//       time: '5hr',
//       image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
//       avatar: '/images/avatars/1.png',
//       friends: [
//         'https://images.hindustantimes.com/rf/image_size_640x362/HT/p1/2015/03/18/Incoming/Pictures/1327679_Wallpaper2.jpg',
//         'https://media.istockphoto.com/id/1272815911/photo/young-indian-female-university-student-stock-photo.jpg?s=612x612&w=0&k=20&c=Iwdc08GR3pw8_Qg3_nabNJUQYTo52EU3dvW4tsth1tE=',
//         'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
//         'https://media.istockphoto.com/id/1222372717/photo/indian-young-girl-stock-images.jpg?s=612x612&w=0&k=20&c=OYtnDHPUcBMzT_CYBKETl1_f5DFOCHfXo3hY0R9pinM='
//       ]
//     },
//     {
//       classname: 'Analysis',
//       location: 'London, UK',
//       time: '1hr',
//       image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
//       avatar: '/images/avatars/1.png',
//       friends: [
//         'https://images.hindustantimes.com/rf/image_size_640x362/HT/p1/2015/03/18/Incoming/Pictures/1327679_Wallpaper2.jpg',
//         'https://media.istockphoto.com/id/1272815911/photo/young-indian-female-university-student-stock-photo.jpg?s=612x612&w=0&k=20&c=Iwdc08GR3pw8_Qg3_nabNJUQYTo52EU3dvW4tsth1tE=',
//         'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
//         'https://media.istockphoto.com/id/1222372717/photo/indian-young-girl-stock-images.jpg?s=612x612&w=0&k=20&c=OYtnDHPUcBMzT_CYBKETl1_f5DFOCHfXo3hY0R9pinM='
//       ]
//     }
//     // Add more card data as needed
//   ];

//   return (
//     <Grid container spacing={2}>
//       {cardData.map((card, index) => (
//         <Grid item xs={12} sm={6} md={4} key={index}>
//           <Card sx={{ position: 'relative' }}>
//             <CardMedia sx={{ height: '12.625rem' }} image={card.image} />
//             <Avatar
//               alt={card.classname}
//               src={card.avatar}
//               sx={{
//                 width: 75,
//                 height: 75,
//                 left: '1.313rem',
//                 top: '10.28125rem',
//                 position: 'absolute',
//                 border: (theme) => `0.25rem solid ${theme.palette.common.white}`
//               }}
//             />
//             <CardContent>
//               <Box
//                 sx={{
//                   mt: 5.75,
//                   mb: 3.75,
//                   display: 'flex',
//                   flexWrap: 'wrap',
//                   justifyContent: 'space-between'
//                 }}
//               >
//                 <Box sx={{ mr: 2,  display: 'flex', flexDirection: 'column' }}>
//                   <Typography variant="h3">{card.classname}</Typography>
//                   <Typography variant="body2">{card.location}</Typography>
//                 </Box>
//                 <Box>
//                   <Button variant="contained">{card.time}</Button>
//                 </Box>
//               </Box>
//               <Box
//                 sx={{
//                   gap: 2,
//                   display: 'flex',
//                   flexWrap: 'wrap',
//                   justifyContent: 'space-between',
//                   alignItems: 'center'
//                 }}
//               >
//                 <AvatarGroup max={4}>
//                   {card.friends.map((friend, friendIndex) => (
//                     <Avatar key={friendIndex} src={friend} alt={`Friend ${friendIndex + 1}`} />
//                   ))}
//                 </AvatarGroup>
//                 <Typography
//                   variant="subtitle2"
//                   sx={{
//                     whiteSpace: 'nowrap',
//                     color: 'text.primary',
//                     elevation: '1',
//                     // backgroundColor: 'primary.main', // Set your desired background color
//                     borderRadius: '0.5rem', // Optional: Add rounded corners
//                     padding: '0.5rem', // Optional: Add padding
//                     boxShadow: 2, // Add elevation (4 is a common value for a subtle shadow)
//                   }}
//                 >
//                   {card.friends.length} Group Event
//                 </Typography>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default OnlineClassCard;







import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';

const OnlineClassCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCardData, setNewCardData] = useState({
    classname: '',
    location: '',
    time: '',
    image: '',
    avatar: '',
    friends: []
  });
  const cardData = [
    // Add your card data here
    // For example:

    {
      isAddCard: true
    },
    {
      classname: 'Introduction to App',
      location: 'London, UK',
      time: '5hr',
      image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
      avatar: '/images/avatars/1.png',
      friends: [
        'https://images.hindustantimes.com/rf/image_size_640x362/HT/p1/2015/03/18/Incoming/Pictures/1327679_Wallpaper2.jpg',
        'https://media.istockphoto.com/id/1272815911/photo/young-indian-female-university-student-stock-photo.jpg?s=612x612&w=0&k=20&c=Iwdc08GR3pw8_Qg3_nabNJUQYTo52EU3dvW4tsth1tE=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1222372717/photo/indian-young-girl-stock-images.jpg?s=612x612&w=0&k=20&c=OYtnDHPUcBMzT_CYBKETl1_f5DFOCHfXo3hY0R9pinM='
      ]
    },
    {
      classname: 'Introduction to web',
      location: 'London, UK',
      time: '2hr',
      image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
      avatar: '/images/avatars/1.png',
      friends: [
        'https://images.hindustantimes.com/rf/image_size_640x362/HT/p1/2015/03/18/Incoming/Pictures/1327679_Wallpaper2.jpg',
        'https://media.istockphoto.com/id/1272815911/photo/young-indian-female-university-student-stock-photo.jpg?s=612x612&w=0&k=20&c=Iwdc08GR3pw8_Qg3_nabNJUQYTo52EU3dvW4tsth1tE=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1222372717/photo/indian-young-girl-stock-images.jpg?s=612x612&w=0&k=20&c=OYtnDHPUcBMzT_CYBKETl1_f5DFOCHfXo3hY0R9pinM='
      ]
    },
    {
      classname: 'Block chain',
      location: 'London, UK',
      time: '3.5hr',
      image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
      avatar: '/images/avatars/1.png',
      friends: [
        'https://images.hindustantimes.com/rf/image_size_640x362/HT/p1/2015/03/18/Incoming/Pictures/1327679_Wallpaper2.jpg',
        'https://media.istockphoto.com/id/1272815911/photo/young-indian-female-university-student-stock-photo.jpg?s=612x612&w=0&k=20&c=Iwdc08GR3pw8_Qg3_nabNJUQYTo52EU3dvW4tsth1tE=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1222372717/photo/indian-young-girl-stock-images.jpg?s=612x612&w=0&k=20&c=OYtnDHPUcBMzT_CYBKETl1_f5DFOCHfXo3hY0R9pinM='
      ]
    },
    {
      classname: 'Figma',
      location: 'London, UK',
      time: '5hr',
      image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
      avatar: '/images/avatars/1.png',
      friends: [
        'https://images.hindustantimes.com/rf/image_size_640x362/HT/p1/2015/03/18/Incoming/Pictures/1327679_Wallpaper2.jpg',
        'https://media.istockphoto.com/id/1272815911/photo/young-indian-female-university-student-stock-photo.jpg?s=612x612&w=0&k=20&c=Iwdc08GR3pw8_Qg3_nabNJUQYTo52EU3dvW4tsth1tE=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1222372717/photo/indian-young-girl-stock-images.jpg?s=612x612&w=0&k=20&c=OYtnDHPUcBMzT_CYBKETl1_f5DFOCHfXo3hY0R9pinM='
      ]
    },
    {
      classname: 'Analysis',
      location: 'London, UK',
      time: '1hr',
      image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
      avatar: '/images/avatars/1.png',
      friends: [
        'https://images.hindustantimes.com/rf/image_size_640x362/HT/p1/2015/03/18/Incoming/Pictures/1327679_Wallpaper2.jpg',
        'https://media.istockphoto.com/id/1272815911/photo/young-indian-female-university-student-stock-photo.jpg?s=612x612&w=0&k=20&c=Iwdc08GR3pw8_Qg3_nabNJUQYTo52EU3dvW4tsth1tE=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1222372717/photo/indian-young-girl-stock-images.jpg?s=612x612&w=0&k=20&c=OYtnDHPUcBMzT_CYBKETl1_f5DFOCHfXo3hY0R9pinM='
      ]
    }
    // Add more card data as needed
  ];

  const handleAddCard = () => {
    setIsModalOpen(true);
  };

 
  const handleModalClose = () => {
    setIsModalOpen(false);
    // Reset newCardData when modal is closed
    setNewCardData({
      classname: '',
      location: '',
      time: '',
      image: '',
      avatar: '',
      friends: [],
    });
  };

  const handleSaveCard = () => {
    // Add the new card data to the cardData array
    cardData.splice(1, 0, { ...newCardData, isAddCard: false });
    // Close the modal
    handleModalClose();
  };

  return (
    <Grid container spacing={2}>
      {cardData.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          {card.isAddCard ? (
            <Card
              sx={{
                position: 'relative',
                cursor: 'pointer',
                border: '1px solid grey',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '410px', // Set a minimum height to match other cards
              }}
              onClick={handleAddCard}
            >
              <AddIcon fontSize="large" />
            </Card>
          ) : (
            <Card sx={{ position: 'relative' }}>
              <CardMedia sx={{ height: '12.625rem' }} image={card.image} />
              <Avatar
                alt={card.classname}
                src={card.avatar}
                sx={{
                  width: 75,
                  height: 75,
                  left: '1.313rem',
                  top: '10.28125rem',
                  position: 'absolute',
                  border: (theme) => `0.25rem solid ${theme.palette.common.white}`,
                }}
              />
              <CardContent>
                <Box
                  sx={{
                    mt: 5.75,
                    mb: 3.75,
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h3">{card.classname}</Typography>
                    <Typography variant="body2">{card.location}</Typography>
                  </Box>
                  <Box>
                    <Button variant="contained">{card.time}</Button>
                  </Box>
                </Box>
                <Box
                  sx={{
                    gap: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <AvatarGroup max={4}>
                    {card.friends.map((friend, friendIndex) => (
                      <Avatar key={friendIndex} src={friend} alt={`Friend ${friendIndex + 1}`} />
                    ))}
                  </AvatarGroup>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      whiteSpace: 'nowrap',
                      color: 'text.primary',
                      elevation: '1',
                      // backgroundColor: 'primary.main', // Set your desired background color
                      borderRadius: '0.5rem', // Optional: Add rounded corners
                      padding: '0.5rem', // Optional: Add padding
                      boxShadow: 2, // Add elevation (4 is a common value for a subtle shadow)
                    }}
                  >
                    {card.friends.length} Group Event
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
      ))}

      {/* Modal for adding new cards */}
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <TextField
            label="Class Name"
            fullWidth
            margin="normal"
            value={newCardData.classname}
            onChange={(e) => setNewCardData({ ...newCardData, classname: e.target.value })}
          />
          <TextField
            label="Location"
            fullWidth
            margin="normal"
            value={newCardData.location}
            onChange={(e) => setNewCardData({ ...newCardData, location: e.target.value })}
          />
          <TextField
            label="Time"
            fullWidth
            margin="normal"
            value={newCardData.time}
            onChange={(e) => setNewCardData({ ...newCardData, time: e.target.value })}
          />
          <TextField
            label="Image URL"
            fullWidth
            margin="normal"
            value={newCardData.image}
            onChange={(e) => setNewCardData({ ...newCardData, image: e.target.value })}
          />
          <TextField
            label="Avatar URL"
            fullWidth
            margin="normal"
            value={newCardData.avatar}
            onChange={(e) => setNewCardData({ ...newCardData, avatar: e.target.value })}
          />
          {/* Additional fields for friends can be added here */}
          <Button variant="contained" onClick={handleSaveCard}>
            Save
          </Button>
        </Box>
      </Modal>
    </Grid>
  );
};

export default OnlineClassCard;
