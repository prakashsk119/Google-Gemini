import './Main.css';
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { Context } from '../../context/Context';

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

  const handleSend = () => {
    onSent(input);
  };

  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt='User Icon'/>
      </div>
      <div className="main-container">
        {showResult ? (
          <div className="result">
            <div className="result-title">
            <img src={assets.user_icon} alt=''/>
            <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
                <img src={assets.gemini_icon} alt=''/>
                {loading
                ?<div className='loader'>
                    <hr/>
                    <hr/>
                    <hr/>

                </div>
                : <p dangerouslySetInnerHTML={{ __html: resultData }} />

                }
            </div>
          </div>

        ) : (
          <>
            <div className="greet">
              <p><span>Hello, Prakash.</span></p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Give a New 7 wonders</p>
                <img src={assets.compass_icon} alt='Compass Icon'/>
              </div>
              <div className="card">
                <p>Who is the best cricketer in the world?</p>
                <img src={assets.bulb_icon} alt='Bulb Icon'/>
              </div>
              <div className="card">
                <p>How to learn React Js</p>
                <img src={assets.message_icon} alt='Message Icon'/>
              </div>
              <div className="card">
                <p>Who win more Oscar awards?</p>
                <img src={assets.code_icon} alt='Code Icon'/>
              </div>
            </div>
          </>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e) => setInput(e.target.value)} value={input} type='text' placeholder='Enter a prompt here'/>
            <div className="icons">
              <img src={assets.gallery_icon} alt='Gallery Icon'/>
              <img src={assets.mic_icon} alt='Mic Icon'/>
              {input?<img onClick={()=>onSent()} src={assets.send_icon} alt=''/>:null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
