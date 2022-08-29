import React, { useState, useContext, useEffect } from 'react';
import { DiaryStateContext } from '../App';
import MyHeader from '../components/MyHeader';
import MyButton from '../components/MyButton';
import DiaryList from './../components/DiaryList';

const Home = () => {
    const diaryList = useContext(DiaryStateContext);
    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth()+ 1}월`

    useEffect(()=>{
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = `감정일기장`
    },[])
    

    useEffect(() => {
        if (diaryList.length >=1){
        const firstDay = new Date(curDate.getFullYear(), curDate.getMonth(),1).getTime();
        // 시간을 비교할 때 시,분,초 까지 비교한다. 마지막날은 말일의 시간 끝으로 설정해야 함
        const lastDay = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0,23,59,59).getTime();
        setData(diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay))
        // console.log(dataList);
    }else {setData([])}
},[diaryList,curDate]);
    // diaryList 추가, 삭제되었을 때 변경일어나야함 setdata가. 

    useEffect(() => {
        console.log(data);
    },[data])

    const increaseMonth = ()=> {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth()+1 )
        )
    }
    const decreaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth()-1)
        )
    }
    return (
        <div>
           <MyHeader headtext={headText} leftChild={<MyButton text={"<"} onClick={decreaseMonth} />} 
           rightChild={<MyButton text={">"} onClick={increaseMonth} />}
           />
           <DiaryList diaryList={data} />
        </div>
    );
};

export default Home;
