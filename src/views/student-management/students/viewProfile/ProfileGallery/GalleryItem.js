import React from 'react'


GalleryItem.propTypes = {
    image: PropTypes.object,
    onOpenLightbox: PropTypes.func,
  };
const GalleryItem = ({ image, onOpenLightbox }) => {
    const { imageUrl, title, postAt } = image;

    const CaptionStyle = styled(CardContent)(({ theme }) => ({
        ...cssStyles().bgBlur({ blur: 2, color: theme.palette.grey[900] }),
        bottom: 0,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        justifyContent: 'space-between',
        color: theme.palette.common.white,
      }));
  return (
    <Card sx={{ cursor: 'pointer', position: 'relative' }}>
    <Image alt="gallery image" ratio="1/1" src={imageUrl} onClick={() => onOpenLightbox(imageUrl)} />

    <CaptionStyle>
      <div>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="body2" sx={{ opacity: 0.72 }}>
          {fDate(postAt)}
        </Typography>
      </div>
      <IconButton color="inherit">
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>
    </CaptionStyle>
  </Card>
  )
}

export default GalleryItem