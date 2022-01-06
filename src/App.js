import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { RecoilRoot } from 'recoil';
import OtUiThemeProvider from './components/OtUiThemeProvider';
import client from './client';
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
        <ApolloProvider client={client}>
          <OtUiThemeProvider theme={theme}>
            <Router>
              <Switch>
                <Route component={MaintenancePage} />
              </Switch>
            </Router>
          </OtUiThemeProvider>
        </ApolloProvider>
      </RecoilRoot>
    );
  }
}

export default App;
