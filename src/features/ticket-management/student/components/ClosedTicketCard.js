import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import { Avatar, Box, Card, CardContent, Grid, Icon, IconButton, keyframes } from '@mui/material';
import Typography from '@mui/material/Typography';
import CustomChip from 'components/mui/chip';
import OptionsMenu from 'components/option-menu';
import PropTypes from 'prop-types';
import { formatDate } from 'utils/format';
import { formatTime } from 'utils/formatDate';
import { getImageUrl } from 'utils/imageUtils';
import { imagePlaceholder } from 'utils/placeholders';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ClosedTicketCard = ({ ticket }) => {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card sx={{ minHeight: 260, 
        boxShadow: "0 .25rem .875rem 0 rgba(38,43,67,.16)",
        transition: 'transform 0.3s ease, background-color 0.3s ease',
        '&:hover': {
            transform: 'scale(1.05)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)', 
            cursor: "pointer"
          },
          animation: `${fadeInUp} 0.5s ease`,
        }}>
        <CardContent>
          <Box sx={{}}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={ticket?.user?.image ? getImageUrl(ticket?.user?.image) : imagePlaceholder} sx={{ mr: 2.5, height: 42, width: 42, transition: "box-shadow 0.3 ease, transform 0.3 ease",
                ":hover": { transform: "scale(1.1)", boxShadow: "0px 4px 12px rgba(0,0,0,0.2)"} }} />
              <Box>
                <Typography variant="h5" sx={{ fontSize: "18px", fontWeight: 600,}}>{ticket?.user?.full_name}</Typography>
                <Typography variant="body4"  sx={{ color: 'text.secondary', fontSize: 14, fontWeight: 500 }}>
                  {ticket?.user?.email}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: "space-between", mt: 0.75, py: 2, alignItems: "center" }}>
              <Typography
            sx={{
              color: 'text.secondary',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              textOverflow: 'ellipsis',
              fontSize: "15px",
              fontWeight: 500
            }}
          >
            {ticket?.query}
          </Typography>
          <Typography sx={{ fontSize: 14, color: 'primary.main' }}>{formatDate(ticket?.createdAt)} - {formatTime(ticket?.createdAt)}</Typography>
            </Box>
          </Box>
         
          <Typography sx={{ my: 2, color: 'text.secondary' }}>{ticket?.solution}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomChip
                icon={<CrisisAlertIcon />}
                rounded
                size="small"
                skin="light"
                color={'error'}
                label={`Priority:${ticket?.priority}`}
                sx={{
                  color: '#FF0000',
                  backgroundColor: '#FFEBEB',
                  borderColor: '#FF0000', 
                  transition: 'background 0.5s ease, color 0.5s ease', 
                  ":hover": {
                 background: `linear-gradient(to right, ${"#FFA500" + "66"}, ${"#FFA500" + "33"} 50%, ${"#FFA500"+"85"}  50%)`,
                 transition: "all 0.5s cubic-bezier(0.000, 0.000, 0.230, 1)",
                 backgroundSize: "200% 100%",
                 backgroundPosition: "0%",
                 ":hover": { backgroundPosition: "100%" }
               }
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton size="small" sx={{ color: 'text.disabled' }}>
                <Icon fontSize="1.25rem" icon="tabler:star" />
              </IconButton>
              <OptionsMenu iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }} options={['Resolve']} />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

ClosedTicketCard.propTypes = {
  ticket: PropTypes.any
};
export default ClosedTicketCard;
