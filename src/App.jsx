import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from './store/store';
import Authentication from './Authentication';
import '@/styles/style.scss';
import '@/styles/App.scss';

// Define the quey client used by the application.
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
          <Authentication />
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
