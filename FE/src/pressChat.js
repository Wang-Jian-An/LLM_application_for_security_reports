import ChatComponent from './Chat';

function PressChatComponent(getChatVisible) {

    return (
        
        <div>

            {/* 根據按鈕是否被點擊來決定顯示 ChatComponent 或空白 */}
            {getChatVisible['getChatVisible'] ? <ChatComponent /> : <div></div>}
        </div>
    );
}

export default PressChatComponent;