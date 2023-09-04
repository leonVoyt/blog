import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

export default function DropDown() {
  return (
    <Autocomplete
      disablePortal
      id="role"
      options={top100Films}
      sx={{ width: 400, mt: 2 }}
      renderInput={(params) => (
        <TextField {...params} label="Role*" name="role" />
      )}
    />
  )
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { label: 'Author', year: 1994 },
  { label: 'Comentator', year: 1994 },
]
