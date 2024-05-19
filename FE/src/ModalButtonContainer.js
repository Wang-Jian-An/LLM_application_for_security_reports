import React, { useState } from 'react';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ModalButtonConatiner.css';
import FileUpload from './DropFileZone';



function ModalButtonContainer() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
  
    const openModal = () => {
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
      
    };
  
    return (
      <div>
        <div className='button-container'>
          <button onClick={openModal} type="button" className="btn btn-success btn-lg button-2">
            上傳您的Contig FASTA格式
          </button>
          <button className="btncustom">
            <i className="fa fa-download">
              <a id='example-fasta' href="./example/example.fasta" download="example.fasta">Download Example</a>
            </i> 
          </button>
        </div>
        
        
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        appElement={document.getElementById('root')}
        contentLabel="Example Modal"
        style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            content: {
              width: '40%',
              height: '50%', 
              margin: 'auto', 
            },
          }}
  
        >   
            <div className='close-obj-outer'>
              <div className='close-obj'>
                  <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
              </div>
              <div>
                <FileUpload />
              </div>
              {/* <div> 
                <button type="button" className="btn btn-success btn-lg button-1">
                  立即預測
                </button>
              </div> */}
            </div>

        </Modal>

      </div>
    );
  };

export default ModalButtonContainer;