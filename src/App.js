import React from 'react';
import { Provider } from 'react-redux';
import {
  NavigationProvider,
  StackNavigation,
  NavigationContext,
} from '@expo/ex-navigation';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { colors } from 'styles';
import store from './store';
import router from './router';


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
            <StackNavigation
              defaultRouteConfig={{
                navigationBar: {
                  backgroundColor: colors.APP_PRIMARY,
                  tintColor: '#fff',
                },
              }}
              initialRoute="patientSearch"
            />
          </NavigationProvider>
        </Provider>
      </ActionSheetProvider>
    );
  }
}
