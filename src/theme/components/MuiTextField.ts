import { Components } from '@mui/material'

const MuiTextField: Components['MuiTextField'] = {
  styleOverrides: { root: { '& .MuiInputBase-input': { padding: 7 } } },
}

export default MuiTextField
