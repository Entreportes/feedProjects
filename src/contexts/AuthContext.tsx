import { UserDTO } from "../dtos/UserDTO";
import {api} from "../services/api";
import { createContext, ReactNode, useEffect, useState } from "react";
// import { storageUserSave, storageUserGet, storageUserRemove } from "@storage/storageUser";
// import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "@storage/storageAuthToken";
import {useLocalStorage} from 'react-use'

export type AuthContextDataProps = {
    user: UserDTO;
    signIn: (email:string, password:string) => void;
    // isLoadingUserStorageData: boolean;
    signOut: () => Promise<void>;
    // updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
    // refreshedToken: string;
}

type AuthContextProviderProps ={
    children: ReactNode;
}
interface AuthProps{
    id:string;
    token:string;
}


export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps) //inicia vazio, mas vazio do tipo Auth...


export function AuthContextProvider({ children } : AuthContextProviderProps){

    const [user, setUser] = useState({} as UserDTO)
    const [refreshedToken, setRefreshedToken] = useState('')
    const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)


    

    // async function userAndTokenUpdate(userData: UserDTO, token: string|null){
        
    //     api.defaults.headers.common['Authorization'] = `Bearer ${token}`            
    //     setUser(userData)
        
    // }

    async function storageUserAndTokenSave(userData: UserDTO, token: string){
        // try {
            
        //     setIsLoadingUserStorageData(true)
        //     await storageUserSave(userData)
        //     await storageAuthTokenSave(token)

        // } catch (error) {
        //     throw error;
        // }finally{            
        //     setIsLoadingUserStorageData(false)
        // }
        

    }
    const userData2 = {
        name: 'Renato Pantoja',
        avatar: 'https://github.com/renatomh.png',
        email: 'renatopantoja@pantoja.com',
        id:'u1',
        company: {
            name: 'Pantoja Contabilidade',
            id: 'c1'
        },
        admin: true,


    } as UserDTO

    async function signIn(email:string, password:string){

        // try{
        //     const { data } = await api.post('/sessions',{email,password})
            
        //     if(data.user && data.token){
        //         await storageUserAndTokenSave(data.user, data.token)
        //         userAndTokenUpdate(data.user, data.token)
        //     }

        // }catch(error){
        //     throw(error)
        // } finally{        
        //     setIsLoadingUserStorageData(false)
        // }

        

        
        console.log('usario teste cadastrado ->',userData2)

        setUser(userData2)
        const dataToAuth = {id:userData2.id, token:userData2.name} as AuthProps
        localStorage.setItem('auth',JSON.stringify(dataToAuth))

        

        // 
        
        // if(auth?.id){
        //     return <Navigate to = "/dashboard" replace={true}/>
        // }
        
    }

    async function signOut(){
        // try {
        //     setIsLoadingUserStorageData(true)
        //     setUser({} as UserDTO)
        //     await storageAuthTokenRemove()
        //     await storageUserRemove()
        // } catch (error) {
        //     throw(error)
            
        // }finally{
        //     setIsLoadingUserStorageData(false)
        // }
        console.log('SAIR')
        setUser({} as UserDTO)
        localStorage.setItem("auth",'')
        // location.href = 'https://www.pantojacontabilidade.com.br/'
        
    }


    function loadUserData(){

        const storedAuth = localStorage.getItem("auth")
        console.log('storedAuth ->', storedAuth)
        if(storedAuth){
            const authToSearch = JSON.parse(storedAuth) as AuthProps
            if(authToSearch.id){
                //chamada para API para buscar os dados do usuário com login e senha
                console.log('ID usuário:',authToSearch.id)
                console.log('name(token) usuário:',authToSearch.token)
                setUser(userData2)
            }
        }
 
    // try {
    //     setIsLoadingUserStorageData(true)
    //     const userLogged = await storageUserGet();
    //     const token = await storageAuthTokenGet(); 
    //     if(userLogged && token){
    //         userAndTokenUpdate(userLogged,token)
    //     }
    // } catch (error) {
    //     throw(error)
    // }finally{            
    //     setIsLoadingUserStorageData(false)
    // }

    
    }

    // async function updateUserProfile(userUpdated: UserDTO){
    //     try {
    //         setUser(userUpdated)
    //         await storageUserSave(userUpdated)
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // function refreshedTokenUpdated(newToken: string){
    //     setRefreshedToken(newToken);
    // }


    useEffect(( ) => {
        loadUserData()
    },[])
    // useEffect(( ) => {
    //     const subscribe = api.registerInterceptTokenManager({signOut, refreshedTokenUpdated}) //registando na API a função de signout (que não estava disponivel no contexto do API)
    //     return () => {
    //         subscribe(); //funçao de limpeza da memória (entendi nada)
    //     }
    // },[signOut])
    return(
        // <AuthContext.Provider value={{ user, signIn, signOut, isLoadingUserStorageData , updateUserProfile, refreshedToken}}>
        <AuthContext.Provider value={{ user, signIn, signOut}}>
            {children} 
            {/* pegando as informaçoes que estão dentro do AuthContextProvider lá no App.tsx ({fontsLoaded ? <Routes/> : <Loading/>} */}
        </AuthContext.Provider>
    )
}
