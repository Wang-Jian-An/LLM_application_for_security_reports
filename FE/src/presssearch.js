import SearchComponent from './OtherSearch';

function PressSearchComponent(getSearchVisible) {

    return (
    
        <div>

            {/* 根據按鈕是否被點擊來決定顯示 ChatComponent 或空白 */}
            {getSearchVisible ? <SearchComponent /> : <div></div>}
        </div>
    );
}

export default PressSearchComponent;