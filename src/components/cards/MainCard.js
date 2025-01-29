import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Typography, Box, Divider } from '@mui/material';
// import { green } from '@mui/material/colors';

// ==============================|| MODERN MAIN CARD ||============================== //

const MainCard = forwardRef(
  (
    {
      // border = true,
      // boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      secondary,
      // shadow,
      sx = {},
      title,
    },
  ) => {
    const theme = useTheme();

    return (
      <>
        <Box
        >
          <CardHeader
          sx={{height: '20px'}}
            title={
              <>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 200,
                  color: 'green',
                  textAlign: 'start',
                  mt: 0,
                  padding: 0,
                  height: '20px'
                  // textTransform: 'uppercase'
                }}
              >
                Welcome to 

              </Typography>
              <Typography
                variant="h3"
                sx={{color: 'black', fontWeight: 200}}
                > Customer Service</Typography>
              </>
            }
          />
          <Divider sx={{margin: '10px 0', color: 'grey' }} />
          <CardContent>
            <Typography variant="body1" sx={{ color: 'white', textAlign: 'center' }}>

            </Typography>
          </CardContent>

          {/* Subtle Divider */}
        {title && (
          <Divider
            sx={{
              backgroundColor: 'red',
              height: 2, // Slim divider
              width: '90%',
              margin: '8px auto',
              display: 'none', // Creates space after title
              title: 'hello'
            }}
          />
        )}

          {/* Card Content */}
        {content && (
          <CardContent sx={{ padding: '16px 24px', ...contentSX }} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
        </Box>
      </>
    );
  }
);

MainCard.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  children: PropTypes.node,
  content: PropTypes.bool,
  contentClass: PropTypes.string,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
  shadow: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};

export default MainCard;
