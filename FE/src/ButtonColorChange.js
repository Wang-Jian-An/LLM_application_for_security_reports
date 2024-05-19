import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ButtonColorChange(props) {

    const { colorChangeVerbose, clickHistory, handleButtonClick } = props;

    return (
        <div>
            {colorChangeVerbose === 0 && (
            <button type="button" className="btn btn-danger btn-lg button-1">
                請上傳檔案
            </button>
            )}
            {colorChangeVerbose === 1 && (
            <button type="button" className="btn btn-warning btn-lg button-1">
                等待中
            </button>
            )}

            {colorChangeVerbose === 2 && (
            <button type="button" className="btn btn-success btn-lg button-1" disabled={clickHistory} onClick={handleButtonClick}>
                立即預測
            </button>
            )}
            {colorChangeVerbose === 3 && (
            <button type="button" className="btn btn-primary btn-lg button-1" disabled={clickHistory} onClick={handleButtonClick}>
                完成預測
            </button>
            )

            }
        </div>
    );
  };
export default ButtonColorChange;