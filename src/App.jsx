import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./store/store";
import Authentication from "./Authentication";
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
          <div className="wrapper bg-main df fdc aic">
            <Authentication />
          </div>
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
