import PopularComponent from './Popular';

function PressPopularComponent(getPopVisible) {

    return (
    
        <div>

            {/* 根據按鈕是否被點擊來決定顯示 ChatComponent 或空白 */}
            {getPopVisible['getPopVisible'] ? <PopularComponent /> : <div></div>}
        </div>
    );
}

export default PressPopularComponent;