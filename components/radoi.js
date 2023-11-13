import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioButtonsGroup({ value, onChange }) {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">필터</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={onChange}
      >
        <FormControlLabel value="10" control={<Radio />} label="10%" />
        <FormControlLabel value="all" control={<Radio />} label="전체" />
        <FormControlLabel value="5" control={<Radio />} label="Top_5" />
      </RadioGroup>
    </FormControl>
  );
}
