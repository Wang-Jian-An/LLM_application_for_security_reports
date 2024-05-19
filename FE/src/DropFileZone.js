import React, { useState, useEffect } from 'react';
import 'react-dropzone-uploader/dist/styles.css'
import './DropFileZone.css'
import ButtonColorChange from './ButtonColorChange';
import ErrorMessage from './ErrorMessage';
import { useDropzone } from 'react-dropzone';
import CorrectMessage from './CorrectMessage';
import WaitPredict from "./WaitPredict";
import ShowAnalysisButton from './ReportButton';
import { v4 as uuidv4 } from 'uuid';
import Component from './DataPipeline'

const getColor = (props) => {
  if (props.isDragAccept) {
      return '#00e676';
  }
  if (props.isDragReject) {
      return '#ff1744';
  }
  if (props.isFocused) {
      return '#2196f3';
  }
  return '#eeeeee';
}

const isValidFasta = (content) => {
  const lines = content.split('\n');
  const containATCG = /[ATCG]/;
  const regex = /[RNDQEHILKMFPSWYVU]/;
  return lines.length > 1 && lines[0].startsWith('>') &&  !(regex.test(lines[1])) && containATCG.test(lines[1]);
};


const FileUpload = () => {
  const [showError, setShowError] = useState(false);
  const [showuuid, setuuid] = useState("");
  const [showfilename, setfilename] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showColor, setColor] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showDataBackSuccess, setDataBackSuccess] = useState(false);
  const [showData, setData] = useState(null);

  const handleButtonClick = () => {
    // setStartTime(new Date()); // 記錄開始時間
    // setProgress(0); // 重置進度
    setButtonClicked(true); // 設置按鈕被點擊
    // 在這裡執行後端程式碼，你可以使用 async/await 或 Promise
    // 例如：await fetch('/your-backend-endpoint');

    // 虛擬的進度更新
    // const intervalId = setInterval(() => {
    //   setProgress((prevProgress) => prevProgress + 1);

    //   if (progress >= 100) {
    //     clearInterval(intervalId);
    //   }
    // }, 1000); // 每秒更新一次進度

    let config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',  
        'Authorization': `Bearer ${showuuid}`, 
      },
    };

    fetch('http://10.70.71.46:5000/compute', {
      method: 'POST',
      body: JSON.stringify({ setButtonClicked: buttonClicked }),
      credentials: 'include',
      headers: config.headers,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then(data => {
        console.log('Response from server');
        setData(data)
        setDataBackSuccess(true);
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  };


  const onUpdateFiles = (files) => {
    return new Promise((resolve) => {
      const promises = files.map((file) => {
        return new Promise((innerResolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            
            const fileContentString = e.target.result;
            const fileContentBlob = new Blob([e.target.result]);
            const formData = new FormData();
            formData.append('file', fileContentBlob, file.name);
            setfilename(file.name)
            const token = uuidv4();

            setuuid(`${token}.fasta`);
            if (isValidFasta(fileContentString)) {
              console.log('File content is valid Fasta format:');
              innerResolve(true);
            } else {
              console.log('File content is not valid Fasta format');
              innerResolve(false);
            }
            // multipart/form-data, 
            const xhr = new XMLHttpRequest();
            xhr.upload.addEventListener("progress", (event) => {

              if (event.lengthComputable) {

                setColor(1);
                setTimeout(() => {
                  const percentCompleted = Math.round((event.loaded * 100) / event.total);
                  setColor(2);
                  setUploadProgress(percentCompleted);
                }, 1000); 

              }
            });
            // application/x-www-form-urlencoded
            // let config = {
            //   headers: {
            //     'Content-Type': 'application/x-www-form-urlencoded',  
            //     'Authorization': `Bearer ${token}`, 
            //   },
            // };

            // fetch('http://10.70.71.46:5000/upload-fasta', {
            //   method: 'POST',
            //   body: formData,
            //   credentials: 'include',
            //   headers: config.headers,
            // })
            //   .then((response) => {
            //     console.log('Response from server:', response.data);
            //   })
            //   .catch((error) => {
            //     console.error('Error:', error.message);
            //   });
            
            xhr.open("POST", "http://10.70.71.46:5000/upload-fasta");
            // xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=some-unique-boundary');
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            xhr.send(formData);


          };
          reader.readAsText(file);
        });
      });

      Promise.all(promises).then((results) => {
        const isValid = results.every((result) => result === true);
        console.log('Overall files validity:', isValid);
        resolve(isValid);
      });
    });
  };

  useEffect(() => {
    if (isUploading === false){
      setUploadProgress(0)
      setButtonClicked(false)
    } if (showColor === 2){
      setColor(0)
    } if (showDataBackSuccess === true) {
      setDataBackSuccess(false)
    }
    
  }, [isUploading]);

  const handleDropzoneSubmit = (acceptedFiles, { isDragAccept, isDragReject, isFocused }) => {
    setIsUploading(true);
    console.log(isUploading);

    onUpdateFiles(acceptedFiles).then((isValid) => {
      setIsUploading(false);

      setShowError(!isValid);
      console.log(isValid ? 'Valid files' : 'Invalid files');
    });
  };

  const { 
    getRootProps, 
    getInputProps,
    isDragAccept,
    isDragReject,
    isFocused
   } = useDropzone({
    onDrop: handleDropzoneSubmit,
    accept: 'application/x-www-form-urlencoded',
    maxFiles: 1,
    multiple: false,
  });


  return (
    <div>
      <div {...getRootProps({className: 'custom-dropzone'})}
            style={{
              borderColor: getColor({ isDragAccept, isDragReject, isFocused }),
            }}>
        <input {...getInputProps()} />
        <br />
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
          <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
        </svg>     
        <p>Drag or click files here!</p>
      </div>
      {showError === false  && isUploading && <CorrectMessage uploadProgress={uploadProgress}/>}
      {showError === false  && isUploading === false && uploadProgress !== 100 && <CorrectMessage uploadProgress={uploadProgress}/>}
      {showError === true && <ErrorMessage />}
      { showError === false &&
        uploadProgress === 100 &&
        (<div className='fileuploaded'>
          <p>File {showfilename}: was uploaded!</p>
        </div>)
      }
      { showError === false &&
       showDataBackSuccess === false && 
       buttonClicked === false &&
        <ButtonColorChange 
        colorChangeVerbose={showColor} 
        clickHistory={buttonClicked} 
        handleButtonClick={handleButtonClick} />
      }

      { showError === false && showDataBackSuccess === false && buttonClicked === true && <WaitPredict ButtonClicked={buttonClicked}/> }
      { showError === false &&
       showDataBackSuccess === true && 
       buttonClicked ===true && 
       <ButtonColorChange 
        colorChangeVerbose={3} 
        clickHistory={buttonClicked} 
        handleButtonClick={handleButtonClick} /> 
      } 
      { showError === false &&
       showDataBackSuccess === true && 
       buttonClicked ===true && 
       <ShowAnalysisButton />
      } 

      { showError === false &&
       showDataBackSuccess === true && 
       buttonClicked ===true && 
       <Component Data={showData} filename={showfilename}/ >
      }



    </div>
  );
};


export default FileUpload;