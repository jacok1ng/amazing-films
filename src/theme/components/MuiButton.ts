import { Components } from '@mui/material'

const MuiButton: Components['MuiButton'] = {
  defaultProps: { variant: 'contained', color: 'primary' },
  styleOverrides: { root: { borderWidth: 2, ':hover': { borderWidth: 2 } } },
}

export default MuiButton
