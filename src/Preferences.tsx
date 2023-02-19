import { createTheme, PaletteMode } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import * as React from "react";
import FormControl from '@mui/material/FormControl';
import { PageComponentProps } from "isz-app";

const Preferences: React.FC<PageComponentProps> = ({ piral }) => {

  let prefers = piral.getTheme();

  if (prefers === undefined) {
    prefers = createTheme({
      palette: {
        mode: 'light',
      },
    });
  }

  const [theme, setTheme] = React.useState(prefers);

  const handleThemeChange = (event: SelectChangeEvent) => {
    const prefers = createTheme({
      palette: {
        mode: event.target.value as PaletteMode,
      },
    });
    setTheme(prefers);
    piral.setTheme(prefers);
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="select-theme">Theme</InputLabel>
        <Select
          key="select-theme"
          labelId="select-theme"
          id="select-theme"
          value={theme.palette.mode as string}
          label="Theme"
          onChange={handleThemeChange}
        >
          <MenuItem value={"light"} key="light">Light Theme</MenuItem>
          <MenuItem value={"dark"} key="dark">Dark Theme</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}

export default Preferences;