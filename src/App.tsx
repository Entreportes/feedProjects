import { Router } from "./routes/Router";
import {BrowserRouter} from 'react-router-dom'
import { AuthContextProvider } from "./contexts/AuthContext";

export function App(){

  return(
    <>
    <BrowserRouter>
      <AuthContextProvider>        
          <Router/>  
      </AuthContextProvider>
    </BrowserRouter>

    </>
  )
}