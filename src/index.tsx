import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {store} from './redux/store';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import App from './App';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
        <App /> 
      </Provider>
    </LocalizationProvider>
  </StrictMode>,
);
