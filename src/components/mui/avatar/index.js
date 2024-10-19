// ** React Imports
import { forwardRef } from 'react'

// ** MUI Imports
import MuiAvatar from '@mui/material/Avatar'
import { lighten, useTheme } from '@mui/material/styles'

// ** Hooks Imports
import useBgColor from 'hooks/useBgColor'

// Helper function to check if color is a hex code
const isHexColor = (color) => /^#([0-9A-F]{3}){1,2}$/i.test(color)

const Avatar = forwardRef((props, ref) => {
  // ** Props
  const { sx, src, skin, color } = props

  // ** Hook
  const theme = useTheme()
  const bgColors = useBgColor()

  const getAvatarStyles = (skin, skinColor) => {
    let avatarStyles
    if (skin === 'light') {
      avatarStyles = { ...bgColors[`${skinColor}Light`] }
    } else if (skin === 'light-static') {
      avatarStyles = {
        color: bgColors[`${skinColor}Light`].color,
        backgroundColor: lighten(theme.palette[skinColor].main, 0.88)
      }
    } else {
      avatarStyles = { ...bgColors[`${skinColor}Filled`] }
    }

    return avatarStyles
  }

  const colors = {
    primary: getAvatarStyles(skin, 'primary'),
    secondary: getAvatarStyles(skin, 'secondary'),
    success: getAvatarStyles(skin, 'success'),
    error: getAvatarStyles(skin, 'error'),
    warning: getAvatarStyles(skin, 'warning'),
    info: getAvatarStyles(skin, 'info'),
    custom: isHexColor(color) ? { backgroundColor: color, color: '#fff' } : {} // Handle custom hex colors
  }

  // Determine if the color is predefined (e.g., 'primary') or custom (hex code)
  const selectedColor = isHexColor(color) ? 'custom' : color

  return <MuiAvatar ref={ref} {...props} sx={!src && skin && color ? Object.assign(colors[selectedColor], sx) : sx} />
})

Avatar.defaultProps = {
  skin: 'filled',
  color: 'primary' // Default to primary color
}

export default Avatar
