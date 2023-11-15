import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./store/store";
import Authentication from "./Authentication";
import LanguageSelect from "./components/language/LanguageSelect";
import "./styles/index.scss";
import "./styles/App.scss";

// Set the query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <LanguageSelect />
          <div className="wrapper bg-blue df fdc aic">
            <Authentication />
          </div>
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
