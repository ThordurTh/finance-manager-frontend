import { Provider } from "react-redux";
import { store } from "./store/store";
import MainNavigation from "./screens/MainNavigation";

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
};

export default App;
