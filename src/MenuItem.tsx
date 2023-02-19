import { Home } from "@mui/icons-material";
import { ListItemButton, ListItemText, ListItemIcon, useTheme, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { MenuComponentProps, PiralStoreDataEvent } from "isz-app";
import * as React from "react";

const MenuItem: React.FC<MenuComponentProps> = ({ piral }) => {

  const theme = useTheme();

  function useSecretsMgmtState(name: string) {

    const [secretsMgmt, setSecretsMgmt] = React.useState({
      menuColor: location.pathname == '/' ? theme.palette.primary.light : 'transparent',
      expanded: false,
    });

    React.useEffect(() => {
      const handler = (ev: PiralStoreDataEvent) => {
        if (ev.name == name) {
          setSecretsMgmt(ev.value);
        } else {
          setSecretsMgmt(
            {
              menuColor: "transparent",
              expanded: false,
            });
        }
      };

      piral.on('store-data', handler);

      return () => {
        piral.off('store-data', handler);
      };
    }, [name]);

    return secretsMgmt;
  }

  const handleClick = () => {
    piral.setData("dashboard", {
      ...secretsMgmtState,
      menuColor: theme.palette.primary.light
    })
  };

  const secretsMgmtState = useSecretsMgmtState("dashboard");

  return (
    <>
      <ListItemButton
        key="dashboard"
        component={Link}
        to="/"
        onClick={handleClick}
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
          ":before": {
            position: 'absolute',
            content: '""',
            left: 0,
            top: 0,
            height: '100%',
            width: '4px',
            background: secretsMgmtState.menuColor
          }
        }}
      >
        <Tooltip title="Dashboard" placement="right">
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <Home />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </>
  )
}

export default MenuItem;
