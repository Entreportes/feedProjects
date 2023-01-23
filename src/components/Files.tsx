
import { BoxFiles } from './BoxFiles';
import styles from './Files.module.css'


interface FileProps {
    title: string;
    directory: string;

}
export function Files({title, directory}:FileProps){

    return(
        <div className={styles.file}>
            <h3>{title}</h3>
            <BoxFiles
                directory={directory}
                permission
            />
            <button>Enviar arquivos</button>

        </div>
    )
}