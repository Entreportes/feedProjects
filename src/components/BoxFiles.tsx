
import styles from './BoxFiles.module.css'
import { ChangeEvent, useRef, useState } from 'react';
interface BoxFilesProps {
    directory :string;
    permission?: boolean;
}

 
export function BoxFiles({directory,permission = false}: BoxFilesProps){

    const [fileList, setFileList] = useState<FileList | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      setFileList(e.target.files);
    };
    const handleChooseFile = () => {
        // 👇 We redirect the click event onto the hidden input element
        inputRef.current?.click();
      }
  
    const handleUploadClick = () => {
      if (!fileList) {
        return;
      }
  
      // 👇 Create new FormData object and append files
      const data = new FormData();
      files.forEach((file, i) => {
        data.append(`file-${i}`, file, file.name);
        console.log(file)
      });
      console.log(data)
  
      // 👇 Uploading the files using the fetch API to the server
    //   fetch('https://httpbin.org/post', {
    //     method: 'POST',
    //     body: data,
    //   })
    //     .then((res) => res.json())
    //     .then((data) => console.log(data))
    //     .catch((err) => console.error(err))

    };
  
    // 👇 files is not an array, but it's iterable, spread to get an array of files
    const files = fileList ? [...fileList] : [];

    //ESCONDENDO INPUT FILE
    const inputRef = useRef<HTMLInputElement | null>(null);




    return(
        <div>
            <div className={styles.container}>
                {/* <p>{directory}</p>
                { permission === true ?
                    <p>Permissão para edição</p>
                    :
                    <p>Sem permissão</p>
                }
                <p>API criptografia opcao</p>
                <p>API assinatura digital opcao</p> */}
                <input 
                    style={{display:'none'}}
                    ref={inputRef}
                    type="file" 
                    onChange={handleFileChange} 
                    multiple
                    accept='image/*, .pdf, .doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'

                />

                <ul>
                    {files.map((file, i) => (
                    <li key={i}>
                        {/* {file.name} - {file.size/1024}Kb */}
                        {file.name}
                    </li>
                    ))}
                </ul>
                <button id='ChooseFile' onClick={handleChooseFile}>+</button>

                
            </div>
            <button onClick={handleUploadClick}>Enviar arquivos</button>
        </div>
    )
}