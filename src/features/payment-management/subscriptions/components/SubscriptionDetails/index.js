import { Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import CustomChip from 'components/mui/chip';
import PropTypes from 'prop-types';
import { hexToRGBA } from 'utils/hex-to-rgba';
import { getImageUrl } from 'utils/imageUtils';
import { imagePlaceholder } from 'utils/placeholders';

// ** Styled Component for the wrapper of whole component
const BoxWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(2),
  paddingTop: theme.spacing(10),
  borderRadius: theme.shape.borderRadius
}));

// ** Styled Component for the wrapper of all the features of a plan
const BoxFeature = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& > :not(:last-child)': {
    marginBottom: theme.spacing(2.5)
  }
}));

const SubscriptionDetails = (props) => {
  // ** Props
  const { data, plan } = props;

  const renderFeatures = () => {
    if (!Array.isArray(data?.features)) {
      return null;
    }

    return data.features.map((item, index) => (
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Box component="span" sx={{ display: 'inline-flex', color: 'text.secondary', mr: 2.5 }}>
          <Icon icon="tabler:circle" fontSize="0.875rem" />
        </Box>
        <Typography sx={{ color: 'text.secondary' }}>{item?.feature?.identity}</Typography>
      </Box>
    ));
  };

  return (
    <BoxWrapper>
      {data?.is_popular ? (
        <CustomChip
          rounded
          size="small"
          skin="light"
          label="Popular"
          color="primary"
          sx={{
            top: 24,
            right: 24,
            position: 'absolute',
            '& .MuiChip-label': {
              px: 1.75,
              fontWeight: 500,
              fontSize: '0.75rem'
            }
          }}
        />
      ) : null}
      <Card
        sx={{
          width: '100%',
          height: '50%',
          transition: 'all 0.3s ease-in-out',
          '&:focus-within': {
            outline: '5px solid black',
            boxShadow: 6,
            transform: 'scale(1.05)'
           
          }
        }}
      >
        <CardActionArea>
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
            <CardMedia
              component="img"
              height="150"
              image={`${data?.image ? getImageUrl(data?.image) : imagePlaceholder}`}
              alt={`${data?.identity}-plan-img`}
              sx={{ objectFit: 'contain', maxWidth: '150px' }}
            />
          </Box>
        </CardActionArea>
        <Box sx={{ textAlign: 'center' }}>
          <CardContent>
            <Typography sx={{ mb: 1.5, fontWeight: 500, lineHeight: 1.385, fontSize: '1.625rem', textTransform: 'uppercase' }}>
            {data?.identity.length>10?`${data.identity.substring(0, 5)}...`:data.identity}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>{data?.description}</Typography>
            <Box sx={{ my: 7, position: 'relative' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography sx={{ mt: 2.5, mr: 0.5, fontWeight: 500, color: 'primary.main', alignSelf: 'flex-start' }}>₹</Typography>
                <Typography variant="h1" sx={{ color: 'primary.main', fontSize: '3rem', lineHeight: 1.4168 }}>
                  {data?.price}
                </Typography>
                <Typography sx={{ mb: 1.5, alignSelf: 'flex-end', color: 'text.disabled' }}>/{data?.duration?.unit}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Box>
        {/* <BoxFeature>{renderFeatures()}</BoxFeature> */}
        <Button fullWidth color={data?.currentPlan ? 'success' : 'primary'} variant={data?.popularPlan ? 'contained' : 'tonal'}>
          {data?._id === plan?.[0]?.subscriptionId?._id ? 'Your Current Plan' : 'Upgrade'}
        </Button>
      </Card>
    </BoxWrapper>
  );
};

SubscriptionDetails.propTypes = {
  data: PropTypes.any
};
export default SubscriptionDetails;
