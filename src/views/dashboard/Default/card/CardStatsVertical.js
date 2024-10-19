import Card from '@mui/material/Card';
import { Box } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Icon from 'components/icon';
import CustomAvatar from 'components/mui/avatar';

const CardStatsVertical = (props) => {
  const { sx, stats, title, avatarIcon, avatarSize = 55, iconSize = '1.75rem', avatarColor = 'primary',textColor, iconBg } = props;
  return (
    <Card sx={{ ...sx ,boxShadow:"0 .25rem .875rem 0 rgba(38,43,67,.16)",borderRadius: "15px"}}>
      <CardContent sx={{ display: 'flex', flexDirection: "row", alignItems: 'flex-start', justifyContent: "space-between", padding: "24px", }}>
        <CustomAvatar skin="light" variant="rounded" color={avatarColor} sx={{  width: avatarSize, height: avatarSize, backgroundColor: iconBg  }}>
          <Icon icon={avatarIcon} fontSize={iconSize} />
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: "space-between"}} >
          <Typography  sx={{ mb: 1, color: 'text.disabled', fontWeight: '500' }}>
            {title}
          </Typography>
          <Typography  sx={{ color: 'text.primary', fontSize: "18px", fontWeight: 500, color: textColor  }}>
            {stats ?? 0}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardStatsVertical;
