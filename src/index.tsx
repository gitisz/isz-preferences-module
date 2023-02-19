import * as React from 'react';
import type { PiletApi } from 'isz-app';
import Preferences from './Preferences';
import {  ListItemText, ListItemIcon } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from "react-router-dom";
import HomeMenuItem from './MenuItem';

const Page = React.lazy(() => import('./Preferences'));

export function setup(app: PiletApi) {

  app.registerPage('/preferences', Preferences);
  app.registerMenu(() => <HomeMenuItem piral={app} />);
  app.registerMenu("preferences", () =>
    <MenuItem
      key="preferences-menu-item"
      component={Link}
      to="/preferences">
      <ListItemIcon>
        <SettingsIcon sx={{ width: 24, height: 24 }}></SettingsIcon>
      </ListItemIcon>
      <ListItemText primary="Preferences" />
    </MenuItem>,
    {
      type: 'header',
    }
  );
}
