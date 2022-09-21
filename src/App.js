import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import OtUiThemeProvider from './components/OtUiThemeProvider';
import initLocalStorage from './utils/initLocalStorage';
import theme from './theme';
import MaintenancePage from './pages/MaintenancePage';

class App extends Component {
  componentDidMount() {
    initLocalStorage();
  }

  render() {
    return (
      <RecoilRoot>
          <OtUiThemeProvider theme={theme}>
            <Router>
              <Switch>
                <Route component={MaintenancePage} />
              </Switch>
            </Router>
          </OtUiThemeProvider>
      </RecoilRoot>
    );
  }
}

export default App;
