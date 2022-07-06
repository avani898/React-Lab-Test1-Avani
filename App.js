import RootNavigator from './app/navigator/RootNavigator';
import { Provider } from 'react-redux'
import store from './app/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}