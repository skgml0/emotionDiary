import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import MyButton from './MyButton';
import DiaryItem from './DiaryItem';

const sortOptionList = [
    {value: "latest", name: "최신순"},
    {value: "oldest", name: "오래된 순"}
]
const filterOptionList = [
    {value:"all", name: "전부다"},
    {value:"good", name: "좋은 감정만"},
    {value:"bad", name: "안좋은 감정만"},
]
// useCallback 함수재사용하도록만들지 않으면, 부모 컴포넌트 리렌더링되면서 변경이 되어 리액트메모가 정상적
// 동작하지 않는다. 여기선 왜 멀쩡? - 
// 여기서 onChange 는 useState가 반환하는 상태변환 
// 동일한 id 보장 - 기본적으로 useCallback 처리가 되어서 나온다. 
// 굳이 핸들러함수 만들필요없으면 당연히 재사용되는 상태변화함수 그대로 내려줘서 쓰면 컴포넌트 최적화를 쓸수 있다.
const ControlMenu = React.memo(({value, onChange, optionList}) => {
    return (
    <select className="ControlMenu" value={value} onChange={(e)=> onChange(e.target.value)}>
        {optionList.map((it,idx) => <option key={idx} value={it.value}>{it.name}</option>)}
    </select>)
});

const DiaryList = ({diaryList}) => {
    const navigate = useNavigate();
    const [sortType,setSortType]=useState('latest');
    const [filter, setFilter] = useState('all');
    
    
    const getProcesseDiaryList = () => {
        const filterCallBack = (item) =>{ if (filter ==="good")
        {return parseInt(item.emotion) <=3;}
         else {return parseInt(item.emotion)>3;}}

        const compare = (a,b) => {
            if (sortType === "latest") {
                return parseInt(b.date) - parseInt(a.date);
            }
            else {
                return parseInt(a.date) - parseInt(b.date);
            }
        };
    // 원본을 건들지 않도록 깊은 복사하는 가장 간단한 방법 배열 -> 문자열 -> 배열 =값만 들어오게 됨 
        const copyList = JSON.parse(JSON.stringify(diaryList));
        const filteredList = filter ==="all" ? copyList : copyList.filter((it)=> filterCallBack(it));
        const sortedList = filteredList.sort(compare);
        return sortedList;
    }
    return (
        <div className='DiaryList'>
            <div className='menu_wrapper'>
                <div className='left_col'>
                    <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
                    <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList} />
                </div>
                <div className='right_col'>
                    <MyButton type={'positive'} text={"새 일기쓰기"} onClick={() => navigate('/new')} />
                </div>
            </div>
           
        
            {getProcesseDiaryList().map((it) => (
                <DiaryItem key={it.id} {...it} />))}
        </div>
    );
};

DiaryList.defaultProps = {
    diaryList: [],
}

export default DiaryList;