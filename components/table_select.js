import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({onChange}) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    const newValue = event.target.value;
    setAge(newValue);
    if (onChange) {
        onChange(newValue);
    }
  };
  const all = "all";
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">개수</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="데이터 개수"
          onChange={handleChange}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={all}>전체</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
