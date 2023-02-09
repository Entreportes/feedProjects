import { SignOut } from 'phosphor-react'
import {Routes, Route} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Admin } from '../pages/Admin'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'

export function Router(){
    
    const {user,signOut} = useAuth()
    { user.id ? console.log('USUÁRIO LOGADO:',user) : console.log('USUÁRIO NÃO LOGADO')}
    
    // if(isLoadingUserStorageData){
    //     return <div>ESPERAR CARREGAR</div>
    // }
    return(
        <Routes>
            {user.id ?
                
                user.admin ? <Route path='/' element={<Admin/>}/> : <Route path='/' element={<Home/>}/>
                // <Route path='/admin/:nome/:empresa' element={<Admin/>}/>
                :
                <Route path='/' element={<Login/>}/>        
            }
        </Routes>

    )
}