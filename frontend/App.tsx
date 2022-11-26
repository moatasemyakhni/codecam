import React from 'react';
import StackSwitcher from './src/navigation/StackSwitcher';

import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { RootSiblingParent } from 'react-native-root-siblings';


const App = () => {

  return (
    
    <Provider store={store}>
      <RootSiblingParent>
          <StackSwitcher /> 
      </RootSiblingParent>
    </Provider>
  )
}

export default App;