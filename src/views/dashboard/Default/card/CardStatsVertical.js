import Card from '@mui/material/Card';
import { Box } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Icon from 'components/icon';
import CustomAvatar from 'components/mui/avatar';

const CardStatsVertical = (props) => {
  const { sx, stats, title, avatarIcon, avatarSize = 55, iconSize = '1.75rem', avatarColor = 'primary' } = props;
  return (
    <Card sx={{ ...sx ,border: "1px solid #E5E7EB",boxShadow: "none",borderRadius: "8px"}}>
      <CardContent sx={{ display: 'flex', flexDirection: "row", alignItems: 'flex-start', justifyContent: "space-between", padding: "24px" }}>
        <CustomAvatar skin="light" variant="rounded" color={avatarColor} sx={{  width: avatarSize, height: avatarSize }}>
          <Icon icon={avatarIcon} fontSize={iconSize} />
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: "center"}} >
          <Typography variant="h2" sx={{ mb: 1, color: 'text.primary' }}>
            {stats}
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.disabled', fontWeight: '600' }}>
            {title}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardStatsVertical;
