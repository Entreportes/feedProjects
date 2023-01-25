import styles from './LoginComponent.module.css'

import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm, Controller} from 'react-hook-form'


type FormDataProps = {
    email: string;
    password: string;
}


const signUpSchema = yup.object({
    email: yup.string().required('Informe o email').trim().email('E-mail inválido'),
    password: yup.string().required('Informe a senha').min(6,'A senha deve ter no mínimo 6 caracteres.'),
})

export function LoginComponent(){

    const {control, handleSubmit, formState: {errors}} = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    });
    
    function handleSignIn({email,password}: FormDataProps){
        
        console.log('ENTROU')

        const email_aux = email.split("@")
        const nome = email_aux[0].replace("_"," ")
        const empresa = email_aux[1].split(".")[0].replace("_"," ")
        location.href = `https://feed-projects-git-master-entreportes.vercel.app/home/${nome}/${empresa}`
        
    }
    return(
        <div className={styles.container}>

            <h3>Acesso restrito</h3>
            <label>Login: </label>
            <Controller
                control={control}
                name="email"
                render={({field: {onChange, value}}) => (
                    <input
                        type='email'
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
                        placeholder='Senha'
                        onChange={onChange}
                        value={value}
                    />
                )}
            />
            <span>{errors.password?.message}</span>

            <button
                type='submit'
                onClick={handleSubmit(handleSignIn)}                
            >
                Entrar
            </button>
            <p>Esqueceu a senha? <a target='_blank' href="https://api.whatsapp.com/send?phone=5561981664662&text=Olá, Renato! Esqueci minha senha, poderia me auxiliar?">Clique aqui</a></p>
            
        </div>        
    )
}