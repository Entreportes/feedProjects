
import styles from './BoxFiles.module.css'

interface BoxFilesProps {
    directory :string;
    permission?: boolean;
}

export function BoxFiles({directory,permission = false}: BoxFilesProps){

    return(
        <div className={styles.container}>
            <p>Arquivos aqui</p>
            <p>{directory}</p>
            { permission === true ?
                <p>Permissão para edição</p>
                :
                <p>Sem permissão</p>
            }
            <p>API criptografia opcao</p>
            <p>API assinatura digital opcao</p>
        </div>

    )
}