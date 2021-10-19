import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { InputDemo, ChildrenDemo } from './pages';
import { theme } from './theme';

function App() {
  return (
    <>
      <InputDemo />
      <ThemeProvider theme={theme}>
        <ChildrenDemo />
      </ThemeProvider>
    </>
  );
}
export default App;
