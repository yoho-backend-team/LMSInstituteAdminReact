import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Icon from 'components/icon';
import CustomAvatar from "@core/compoents/mui/avatar/index"
import PropTypes from 'prop-types';

const CardStatsHorizontalWithDetails = (props) => {
  const { sx, icon, stats, title, subtitle, iconSize = 24, avatarSize = 42, avatarColor = 'primary' } = props;

  return (
    <Card sx={{ ...sx ,
      transition: 'box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      maxHeight: "110px",
      minHeight : "104px",
      boxShadow: "0px 0px 0px 0px rgba(47, 43, 61, 0.0)",
      ":hover": {
        transition: "box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: "0px 4px 18px 0px rgba(47, 43, 61, 0.1)",
    },
    }}>
      <CardContent sx={{ gap: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography sx={{ mb: 1, color: 'text.secondary', fontSize: "1.125rem", fontWeight: 500, lineHeight: 1.3334 }}>{title}</Typography>
          <Box sx={{ mb: 1, columnGap: 1.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography variant="h4"  >{stats}</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            {subtitle}
          </Typography>
        </Box>
        <CustomAvatar skin="light"  color={avatarColor} sx={{ width: avatarSize, height: avatarSize }}>
          <Icon icon={icon} fontSize={iconSize} />
        </CustomAvatar>
      </CardContent>
    </Card>
  );
};

CardStatsHorizontalWithDetails.propTypes = {
  sx: PropTypes.any,
  icon: PropTypes.any,
  stats: PropTypes.any,
  title: PropTypes.any,
  subtitle: PropTypes.any
};

export default CardStatsHorizontalWithDetails;
