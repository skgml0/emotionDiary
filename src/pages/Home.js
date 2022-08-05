import React, { useState, useContext, useEffect } from 'react';
import { DiaryStateContext } from '../App';
import MyHeader from '../components/MyHeader';
import MyButton from '../components/MyButton';

const Home = () => {
    const diaryList = useContext(DiaryStateContext);
    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth()+ 1}월`
    useEffect(()=>{
        const firstDay
    },[curDate])
    const increaseMonth = ()=> {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()+1 , curDate.getDate()))
    }
    const decreaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth()-1, curDate.getDate())
        )
    }
    return (
        <div>
           <MyHeader headtext={headText} leftChild={<MyButton text={"<"} onClick={decreaseMonth} />} 
           rightChild={<MyButton text={">"} onClick={increaseMonth} />}
           />
        </div>
    );
};

export default Home;
