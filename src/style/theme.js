import { createMuiTheme } from '@material-ui/core/styles';
import { convertHexToRGB } from 'material-ui/utils/colorManipulator';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#1c1c1c',
      main: '#323232',
      dark: '#535353',
    }
  },
});
export default theme;
