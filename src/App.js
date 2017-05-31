import React from 'react';
import { Provider } from 'react-redux';
import { NavigationProvider, NavigationContext } from '@expo/ex-navigation';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import store from './store';
import router from './router';
import AppContent from './AppContent';


const navigationContext = new NavigationContext({
  router,
  store,
});

export default class App extends React.Component {

  render() {
    return (
      <ActionSheetProvider>
        <Provider store={store}>
          <NavigationProvider context={navigationContext}>
            <AppContent />
          </NavigationProvider>
        </Provider>
      </ActionSheetProvider>
    );
  }
}
