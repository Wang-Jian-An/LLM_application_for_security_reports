import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import ModalButtonContainer from './ModalButtonContainer';
import PressChatComponent from './pressChat';
import PopularComponent from './Popular';
import PressPopularComponent  from './pressPopular';
import PressSearchComponent from './presssearch';
// import ErrorMessage from './ErrorMessage';

// import  { validTypeChecker } from './DropFileZone'


function Home() {
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [isPopVisible, setIsPopVisible] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isSearch1Visible, setIsSearch1Visible] = useState(false);

    const handleKeyPress = (key) => {
      switch (key) {
        case 'A':
          setIsChatVisible(true);
          setIsPopVisible(false);
          setIsSearchVisible(false);
          setIsSearch1Visible(false);
          break;
        case 'B':
          setIsChatVisible(false);
          setIsPopVisible(true);
          setIsSearchVisible(false);
          setIsSearch1Visible(false);
          break;
        case 'C':
          setIsChatVisible(false);
          setIsPopVisible(false);
          setIsSearchVisible(true);
          setIsSearch1Visible(false);
          break;
        case 'D':
          setIsChatVisible(false);
          setIsPopVisible(false);
          setIsSearchVisible(false);
          setIsSearch1Visible(true);
          break;
        default:
          setIsChatVisible(false);
          setIsPopVisible(false);
          setIsSearchVisible(false);
          setIsSearch1Visible(false);
      }
    };


  return (
      <div className="App">
        <header className="App-header">
          <Link to="/">
            <button className="home">
              <i className="fa fa-home"></i> &gt; 資訊安全威脅情資互動平台
            </button>
          </Link>
          <div className="title">
            <h1>
               資訊安全威脅情資互動平台
            </h1>
          </div>
          <div className='objective-1'>
            <p>
              資訊安全威脅情資互動平台結合先進的對話機器人技術和知識圖譜，
            </p>
          </div>
          <div className='objective-2'>
            <p>
            為用戶提供即時、精準的安全威脅情報和解決方案。通過我們的平台，用戶可以輕鬆獲得最新的科普文章，增強對資訊安全領域的理解與防護能力。
            </p>
          </div>

          <br />

        </header>
        <section className="App-content">
          <div className='vertical-container'>
            <div className='content-container-outer'>
              <div className="title">
                  <h3 style={{textAlign: "center"}}>
                    資訊安全威脅情資互動平台人工智慧分析流程
                  </h3>
              </div>
              <div className="button-list">
                <button onClick={() => handleKeyPress('A')} type="button" class="btn btn-primary btn-lg btn-custom">對話機器人</button>
                <button onClick={() => handleKeyPress('C')} type="button" class="btn btn-secondary btn-lg btn-custom">知識圖譜</button>
                <button onClick={() => handleKeyPress('B')} type="button" class="btn btn-success btn-lg btn-custom">科普文章</button>
                {/* <button onClick={() => handleKeyPress('D')} type="button" class="btn btn-danger btn-lg btn-custom">文章摘要</button> */}
              </div>
            </div>
            <hr style={{ border:"1px dashed #000" }}/>
            <div className='content-container-outer' id='reason'>
              <div className='content-container'>

              {isChatVisible && !isPopVisible && !isSearchVisible && !isSearch1Visible && (
                <div className='chat-container'>
                  <PressChatComponent getChatVisible={isChatVisible}/>
                </div>
              )}

              {isPopVisible && !isChatVisible && !isSearchVisible && !isSearch1Visible && (
                <div>
                  <PressPopularComponent getPopVisible={isPopVisible}/>
                </div>
              )}

              {isSearchVisible && !isChatVisible && !isPopVisible && !isSearch1Visible && (
                <div>
                  <PressSearchComponent getSearchVisible={isSearchVisible}/>
                </div>
              )}

              {/* {isSearch1Visible && !isChatVisible && !isPopVisible && !isSearchVisible && (
                <div>
                  <PressSearchComponent getSearchVisible={isSearch1Visible}/>
                </div>
              )} */}
 
              </div>
            </div>
          </div>
        </section>
        <hr style={{ border:"1px dashed #000" }}/>
        <nav className="navbar navbar-light">
          <span>
            Copyright (c) 2024 Wei-Ting Lin, Jian-An Wang. All rights reserved.
          </span>
        </nav>
      </div>
    );


}

export default Home;
