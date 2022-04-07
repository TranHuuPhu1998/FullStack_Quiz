import AppRouter from "./AppRouter";
import { StyledThemeProvider } from "./definitions/styled-components";
import AntdConfigProvider from './AntdConfigProvider';
import i18next from 'i18next';
import 'moment/locale/ja';
import { I18nextProvider } from 'react-i18next';
import GlobalStyle from "./styles/globalStyles";
import 'validations/locales';
import "./i18n";

function App(): JSX.Element {
  return (
    <I18nextProvider i18n={i18next}>
      <StyledThemeProvider>
        <AntdConfigProvider>
          <GlobalStyle />
          <AppRouter />
        </AntdConfigProvider>
      </StyledThemeProvider>
    </I18nextProvider>
  );
}

export default App;
