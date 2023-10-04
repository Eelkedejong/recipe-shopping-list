import { Link, BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import CreateForm from './components/user/CreateForm'
import CreateRecipe from "./components/recipe/CreateRecipe";
import Start from "./pages/Start";

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
      <QueryClientProvider 
        client={queryClient}
      >
        <header>
          <Link to="/">Recipe shopping list</Link>
        </header>
        <Routes>
          <Route path="/recipes" element={<h1> Recipe overview </h1>} />
          <Route path="/recipe/create" element={<CreateRecipe />} />
          <Route path="/recipe/:id" element={<h1> Edit recipe </h1>} />
          <Route path="/new-user" element={<CreateForm />} />
          <Route path="/" element={
            <>
              <h1> React query </h1>
              <Start />
            </>
            }
          />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
