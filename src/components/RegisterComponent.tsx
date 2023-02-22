import styles from './RegisterComponent.module.css'

import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm, Controller} from 'react-hook-form'
import axios from 'axios'


type FormDataProps = {
    email: string;
    password: string;
    password_confirm: string;
    name: string;
}


const signUpSchema = yup.object({
    email: yup.string().required('Informe o email').trim().email('E-mail inválido'),
    password: yup.string().required('Informe a senha').min(6,'A senha deve ter no mínimo 6 caracteres.'),  
    password_confirm: yup.string().required('Confirme a senha').oneOf([yup.ref('password'),null],'As senhas não coincidem'),
    name: yup.string().required('Informe o nome').trim()
})
interface RegisterComponentProps {
    signIn: (email:string, password:string) => void
    setUser: (estado:boolean) => void;
}
export function RegisterComponent( {signIn, setUser}:RegisterComponentProps){

    // const [auth] = useLocalStorage('auth',{} as UserDTO)
    // const userData = auth as UserDTO
    // console.log('user do auth',userData)
    // if(user){
    //     return null 
    //     // location.href = `http://localhost:5173/home/${user.name}/${user.company.name}`
    // }


    const {control, handleSubmit, formState: {errors}} = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    });


    async function handleSignUp({email,password,name}: FormDataProps){
        
        
        const res = await axios({
            method: 'post',
            baseURL:'http://localhost:3000',
            url: '/users',
            data:{
                name,
                email,
                password
            }
        })
        console.log('resposta server:',res)

        setUser(false)
        

        signIn(email,password);

        
        // location.href = `https://feed-projects-git-master-entreportes.vercel.app/home/${nome}/${empresa}`
        // location.href = `http://localhost:5173/home/${nome}/${empresa}` 
    }

    return(
        <form>
            <div className={styles.container}>
    
                <h3>Bem vindo</h3>
                <label>Nome: </label>
                <Controller
                    control={control}
                    name="name"
                    render={({field: {onChange, value}}) => (
                        <input
                            className={styles.inputs}
                            type='text'
                            placeholder='Nome'
                            onChange={onChange}
                            value={value}
                        />
                    )}
                />
                <span>{errors.name?.message}</span>
                <label>E-mail: </label>
                <Controller
                    control={control}
                    name="email"
                    render={({field: {onChange, value}}) => (
                        <input
                            type='email'
                            className={styles.inputs}
                            placeholder='E-mail'
                            onChange={onChange}
                            value={value}
                        />
                    )}
                />
                <span>{errors.email?.message}</span>
    
                <label>Senha: </label>
                <Controller
                    control={control}
                    name="password"
                    render={({field: {onChange, value}}) => (
                        <input
                            type='password'
                            className={styles.inputs}
                            placeholder='Senha'
                            onChange={onChange}
                            value={value}
                        />
                    )}
                />
                <span>{errors.password?.message}</span>
                
                <label>Confirmar senha: </label>
                <Controller
                    control={control}
                    name="password_confirm"
                    render={({field: {onChange, value}}) => (
                        <input
                            type='password'
                            className={styles.inputs}
                            placeholder='Repetir senha'
                            onChange={onChange}
                            value={value}
                        />
                    )}                  
                />            
                <span>{errors.password_confirm?.message}</span>
    
                <button
                    type='submit'
                    onClick={handleSubmit(handleSignUp)}                
                >
                    Registrar
                </button>
                <p>Já é cliente? <a onClick={()=>setUser(false)}>Clique aqui</a></p>
                
            </div> 
        </form>       
    )
}