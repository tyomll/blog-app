import { Button, CssVarsProvider } from '@mui/joy';
import React from 'react';
import s from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <ul>
          <CssVarsProvider>
            <Button
              variant="solid"
              sx={{
                width: '100%',
                height: '50px',
                fontSize: '22px',
              }}>
              Dashboard
            </Button>
            <Button
              variant="solid"
              sx={{
                width: '100%',
                height: '50px',
                fontSize: '22px',
              }}>
              Settings
            </Button>
          </CssVarsProvider>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
