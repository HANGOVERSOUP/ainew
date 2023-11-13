import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function DynamicSelect({ placeholderText, options, onChange }) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 80 }} variant="outlined" fullWidth>
      <InputLabel id="dynamic-select-label">{placeholderText}</InputLabel>
      <Select
        labelId="dynamic-select-label"
        id="dynamic-select"
        value={selectedValue}
        onChange={handleChange}
        label={placeholderText}
        
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default DynamicSelect;
