import { LabComponents } from '@mui/lab/themeAugmentation'

const MuiLoadingButton: LabComponents['MuiLoadingButton'] = {
  defaultProps: { variant: 'contained', color: 'secondary' },
  styleOverrides: { root: { borderWidth: 2 } },
}

export default MuiLoadingButton
