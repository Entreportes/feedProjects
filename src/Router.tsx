import {Routes, Route} from 'react-router-dom'
import { Admin } from './pages/Admin'
import { Home } from './pages/Home'
import { Login } from './pages/Login'

export function Router(){

    return(
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/home/:nome/:empresa' element={<Home/>}/>
            <Route path='/admin/:nome/:empresa' element={<Admin/>}/>
        </Routes>

    )
}