import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Typography, Box, Divider } from '@mui/material';

// Custom Header Styles with New Background Color
const headerSX = {
  padding: '24px 24px',
  backgroundColor: (theme) => '#0CCE7F', // Custom background color
  '& .MuiCardHeader-action': { marginRight: 0 },
};

// ==============================|| MODERN MAIN CARD ||============================== //

const MainCard = forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      ...others
    },
    ref
  ) => {
    const theme = useTheme();

    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          border: border ? `1px solid ${theme.palette.divider}` : 'none',
          borderRadius: '10px', // Rounded corners for a modern look
          boxShadow: boxShadow ? shadow || '0px 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
          // transition: 'box-shadow 0.3s ease-in-out',
          // ':hover': {
          //   boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.15)',
          // },
          ...sx,
        }}
      >
        {/* Card Header */}
        {title && (
          <CardHeader
            sx={headerSX}
            title={
              <Typography
                variant="h5" // Increase the size for a bolder, more prominent font
                component="div"
                sx={{
                  fontWeight: 700, // Make the font bold
                  color: theme.palette.common.white, // Make the title text white
                  letterSpacing: '0.8px', // Add slight letter spacing for a clean look
                  textTransform: 'uppercase', // Uppercase for emphasis
                }}
              >
                {darkTitle ? (
                  <Typography variant="h4" component="div">
                    {title}
                  </Typography>
                ) : (
                  title
                )}
              </Typography>
            }
            action={secondary && <Box>{secondary}</Box>}
          />
        )}

        {/* Subtle Divider */}
        {title && (
          <Divider
            sx={{
              backgroundColor: theme.palette.primary.light,
              height: 2, // Slim divider
              width: '90%',
              margin: '8px auto', 
              display: "none",// Creates space after title
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
      </Card>
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
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
};

export default MainCard;