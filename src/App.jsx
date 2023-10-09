import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Authentication from "./Authentication"
import LanguageSelect from "./components/LanguageSelect"
import './styles/index.scss'
import './styles/App.scss'

// Set the query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
})

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <LanguageSelect />
        <main className="bg-blue df fdc">
          {/* <h1 className="centered">Cookbook</h1> */}
          <Authentication />
        </main>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
