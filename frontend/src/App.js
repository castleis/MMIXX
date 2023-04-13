import { RecoilRoot } from "recoil";

import theme from "styles/theme";
import GlobalStyle from "styles/GlobalStyle";
import { ThemeProvider } from "styled-components";

import { Router } from 'router'

const App = () => {

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;