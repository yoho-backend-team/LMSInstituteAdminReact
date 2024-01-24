// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'
// ** Icon Imports
import Icon from 'components/icon'

// ** Custom Components Imports
import CustomChip from 'components/mui/chip'
import OptionsMenu from 'components/option-menu'


const teams= [
  {
    extraMembers: 25,
    title: 'React Developers',
    avatar: '/images/icons/project-icons/react-label.png',
    avatarGroup: [
      { avatar: '/images/avatars/1.png', name: 'Vinnie Mostowy' },
      { avatar: '/images/avatars/2.png', name: 'Allen Rieske' },
      { avatar: '/images/avatars/3.png', name: 'Julee Rossignol' },
      { avatar: '/images/avatars/4.png', name: 'George Burrill' }
    ],
    description:
      'We don’t make assumptions about the rest of your technology stack, so you can develop new features in React.',
    chips: [
      {
        title: 'React',
        color: 'primary'
      },
      {
        title: 'MUI',
        color: 'info'
      }
    ]
  },
  {
    extraMembers: 15,
    title: 'Vue.js Dev Team',
    avatar: '/images/icons/project-icons/vue-label.png',
    avatarGroup: [
      { avatar: '/images/avatars/5.png', name: "Kaith D'souza" },
      { avatar: '/images/avatars/6.png', name: 'John Doe' },
      { avatar: '/images/avatars/7.png', name: 'Alan Walker' },
      { avatar: '/images/avatars/8.png', name: 'Calvin Middleton' }
    ],
    description:
      'The development of Vue and its ecosystem is guided by an international team, some of whom have chosen to be featured below.',
    chips: [
      {
        title: 'Vuejs',
        color: 'success'
      },
      {
        color: 'error',
        title: 'Developer'
      }
    ]
  },
  {
    extraMembers: 55,
    title: 'Creative Designers',
    avatar: '/images/icons/project-icons/xd-label.png',
    avatarGroup: [
      { avatar: '/images/avatars/9.png', name: 'Jimmy Ressula' },
      { avatar: '/images/avatars/10.png', name: 'Kristi Lawker' },
      { avatar: '/images/avatars/11.png', name: 'Danny Paul' },
      { avatar: '/images/avatars/12.png', name: 'Alicia Littleton' }
    ],
    description:
      'A design or product team is more than just the people on it. A team includes the people, the roles they play.',
    chips: [
      {
        title: 'Sketch',
        color: 'warning'
      },
      {
        title: 'XD',
        color: 'error'
      }
    ]
  },
  {
    extraMembers: 35,
    title: 'Support Team',
    avatar: '/images/icons/project-icons/support-label.png',
    avatarGroup: [
      { avatar: '/images/avatars/5.png', name: 'Andrew Tye' },
      { avatar: '/images/avatars/12.png', name: 'Rishi Swaat' },
      { avatar: '/images/avatars/7.png', name: 'Rossie Kim' },
      { avatar: '/images/avatars/8.png', name: 'Mary Hunter' }
    ],
    description:
      'Support your team. Your customer support team is fielding the good, the bad, and the ugly day in and day out.',
    chips: [
      {
        color: 'info',
        title: 'Zendesk'
      }
    ]
  },
  {
    extraMembers: 19,
    title: 'Digital Marketing',
    avatar: '/images/icons/project-icons/social-label.png',
    avatarGroup: [
      { avatar: '/images/avatars/13.png', name: 'Kim Merchent' },
      { avatar: '/images/avatars/12.png', name: "Sam D'souza" },
      { avatar: '/images/avatars/11.png', name: 'Nurvi Karlos' },
      { avatar: '/images/avatars/10.png', name: 'Margorie Whitmire' }
    ],
    description:
      'Digital marketing refers to advertising delivered through digital channels such as search engines, websites…',
    chips: [
      {
        color: 'primary',
        title: 'Twitter'
      },
      {
        title: 'Email',
        color: 'success'
      }
    ]
  },
  {
    title: 'Event',
    extraMembers: 55,
    avatar: '/images/icons/project-icons/event-label.png',
    avatarGroup: [
      { avatar: '/images/avatars/6.png', name: 'Vinnie Mostowy' },
      { avatar: '/images/avatars/5.png', name: 'Allen Rieske' },
      { avatar: '/images/avatars/4.png', name: 'Julee Rossignol' },
      { avatar: '/images/avatars/7.png', name: 'Daniel Long' }
    ],
    description:
      'Event is defined as a particular contest which is part of a program of contests. An example of an event is the long…',
    chips: [
      {
        title: 'Hubilo',
        color: 'success'
      }
    ]
  },
  {
    extraMembers: 45,
    title: 'Figma Resources',
    avatar: '/images/icons/project-icons/figma-label.png',
    avatarGroup: [
      { avatar: '/images/avatars/8.png', name: 'Andrew Mostowy' },
      { avatar: '/images/avatars/1.png', name: 'Micky Ressula' },
      { avatar: '/images/avatars/3.png', name: 'Michel Pal' },
      { avatar: '/images/avatars/12.png', name: 'Herman Lockard' }
    ],
    description:
      'Explore, install, use, and remix thousands of plugins and files published to the Figma Community by designers and developers.',
    chips: [
      {
        title: 'UI/UX',
        color: 'success'
      },
      {
        title: 'Figma',
        color: 'secondary'
      }
    ]
  },
  {
    extraMembers: 50,
    title: 'Only Beginners',
    avatar: '/images/icons/project-icons/html-label.png',
    avatarGroup: [
      { avatar: '/images/avatars/11.png', name: 'Kim Karlos' },
      { avatar: '/images/avatars/10.png', name: 'Katy Turner' },
      { avatar: '/images/avatars/9.png', name: 'Peter Adward' },
      { avatar: '/images/avatars/6.png', name: 'Leona Miller' }
    ],
    description:
      'Learn the basics of how websites work, front-end vs back-end, and using a code editor. Learn basic HTML, CSS, and…',
    chips: [
      {
        title: 'CSS',
        color: 'info'
      },
      {
        title: 'HTML',
        color: 'warning'
      }
    ]
  }
]

const SkillsAndTools = () => {
  return (
    <Grid container spacing={2}>
      { teams.map((item, index) => {
          return (
            <Grid key={index} item xs={12} md={6} lg={4}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar src={item.avatar} sx={{ mr: 2.5, height: 38, width: 38 }} />
                      <Typography variant='h5'>{item.title}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton size='small' sx={{ color: 'text.disabled' }}>
                        <Icon fontSize='1.25rem' icon='tabler:star' />
                      </IconButton>
                      <OptionsMenu
                        iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }}
                        options={[
                          'Rename Team',
                          'View Details',
                          'Add to Favorites',
                          { divider: true, dividerProps: { sx: { my: theme => `${theme.spacing(2)} !important` } } },
                          { text: 'Delete Team', menuItemProps: { sx: { color: 'error.main' } } }
                        ]}
                      />
                    </Box>
                  </Box>
                  <Typography sx={{ my: 4, color: 'text.secondary' }}>{item.description}</Typography>
                  <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AvatarGroup className='pull-up' sx={{ alignItems: 'center' }}>
                        {item.avatarGroup.map((person, index) => {
                          return (
                            <Tooltip key={index} title={person.name}>
                              <Avatar src={person.avatar} alt={person.name} sx={{ height: 32, width: 32 }} />
                            </Tooltip>
                          )
                        })}
                        <Avatar color='secondary' sx={{ height: 32, width: 32, fontWeight: 500, fontSize: '0.75rem' }}>
                          +{item.extraMembers}
                        </Avatar>
                      </AvatarGroup>
                    </Box>
                    <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                      {item.chips &&
                        item.chips.map((chip, index) => (
                          <Box
                            href='/'
                            key={index}
                            onClick={e => e.preventDefault()}
                            sx={{
                              textDecoration: 'none',
                              '&:not(:last-of-type)': { mr: 2.5 },
                              '& .MuiChip-root': { cursor: 'pointer' }
                            }}
                          >
                            <CustomChip rounded size='small' skin='light' color={chip.color} label={chip.title} />
                          </Box>
                        ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
    </Grid>
  ) 
}

export default SkillsAndTools
