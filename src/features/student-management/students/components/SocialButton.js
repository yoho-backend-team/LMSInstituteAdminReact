import { Button, IconButton, Stack, Tooltip } from '@mui/material';
import { alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Iconify from '../../../../components/icon';

SocialsButton.propTypes = {
  initialColor: PropTypes.bool,
  links: PropTypes.objectOf(PropTypes.string),
  simple: PropTypes.bool,
  sx: PropTypes.object
};

export default function SocialsButton({ item, initialColor = false, simple = true, links = {}, sx, ...other }) {
  const SOCIALS = [
    {
      name: `${item.student.phone_no}`,
      icon: 'eva:phone-fill',
      socialColor: 'primary.dark',
      path: links.instagram || ''
    },
    {
      name: `${item.student.email}`,
      icon: 'eva:email-fill',
      socialColor: 'primary.dark',
      path: links.instagram || ''
    },

    {
      name: `${item.student.is_active==='1' ? 'Active':'Inactive'}`,
      icon: 'eva:person-done-fill',
      socialColor: 'primary.dark',
      path: links.twitter || ''
    },
    {
      name: 'See Full Profile',
      icon: 'eva:navigation-2-fill',
      socialColor: 'primary.dark',
      path: `students/${item.student.user_id.toString()}`
    }
  ];

  return (
    <Stack direction="row" flexWrap="wrap" alignItems="center">
      {SOCIALS.map((social) => {
        const { name, icon, path, socialColor } = social;
        return simple ? (
          <Link key={name} to={path} state={{ id: item.student.user_id }}>
            <Tooltip title={name} placement="top">
              <IconButton
                color="inherit"
                sx={{
                  ...(initialColor && {
                    color: socialColor,
                    '&:hover': {
                      bgcolor: (socialColor, 0.08)
                    }
                  }),
                  ...sx
                }}
                {...other}
              >
                <Iconify icon={icon} sx={{ width: 20, height: 20 }} />
              </IconButton>
            </Tooltip>
          </Link>
        ) : (
          <Button
            key={name}
            href={path}
            color="inherit"
            variant="outlined"
            size="small"
            startIcon={<Iconify icon={icon} />}
            sx={{
              m: 1,
              flexShrink: 0,
              ...(initialColor && {
                color: socialColor,
                borderColor: socialColor,
                '&:hover': {
                  borderColor: socialColor,
                  bgcolor: alpha(socialColor, 0.08)
                }
              }),
              ...sx
            }}
            {...other}
          >
            {name}
          </Button>
        );
      })}
    </Stack>
  );
}
