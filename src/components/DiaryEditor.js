import {useRef, useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router';
import MyHeader from './MyHeader';
import MyButton from './MyButton';
import EmotionItem from './EmotionItem';
import { DiaryDispatchContext } from '../App';
const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";
const emotionList = [
    {
        emotion_id:1,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion1.png`,
        emotion_descript: '완전 좋음'
    },
    {
        emotion_id:2,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion2.png`,
        emotion_descript: '좋음'
    },
    {
        emotion_id:3,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion3.png`,
        emotion_descript: '그럭저럭'
    },
    {
        emotion_id:4,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion4.png`,
        emotion_descript: '나쁨'
    },
    {
        emotion_id:5,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion5.png`,
        emotion_descript: '완전 나쁨'
    },
]
const DiaryEditor = ({isEdit,originData}) => {
    const getStringDate = (date) => {
        return date.toISOString().slice(0,10);
    }
    const contentRef = useRef();
    const [content, setContent] = useState("");
    const [emotion, setEmotion] = useState(3);
    const [date,setDate] = useState(getStringDate(new Date()));
    const {onCreate, onEdit} = useContext(DiaryDispatchContext);
    const navigate = useNavigate();

    const handleClickEmote = (emotion) => {
        setEmotion(emotion);
    }
    const handleSubmit = () => {
        if(content.length <1) {
            contentRef.current.focus();
            return;
        }
        if(window.confirm(isEdit? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"))
        {if(!isEdit){
            console.log('수정중이아님.');
            onCreate(date, content,emotion);
        }else{
            console.log(originData.id)
            onEdit(originData.id, date,content,emotion)
        }
    }
        // 뒤로가기 했을때 실행 안되도록 막기 위해
        navigate("/", {replace:true});
    }
    useEffect(()=> {
        if(isEdit){
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    },[isEdit, originData])
    
    return (
        <div className='DiaryEditor'>
            <MyHeader headtext={isEdit ? "일기 수정하기":"새 일기쓰기"} leftChild={<MyButton onClick={()=> {navigate(-1)}} text={"< 뒤로가기"}/>}/>
            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className="input_box">
                        <input className="input_date" value={date} onChange={(e)=> {setDate(e.target.value)}} type="date"/>
                    </div>
                </section>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className='input_box emotion_list_wrapper'>
                        {emotionList.map((it)=> (
                       <EmotionItem onClick={handleClickEmote} key={it.emotion_descript_id} {...it} 
                       isSelected={it.emotion_id === emotion}/> 
                   ))}
                    </div>
                </section>
                <section>
                    <h4>오늘의 일기</h4>
                    <div className='input_box text_wrapper'>
                        <textarea ref={contentRef} 
                        placeholder="오늘은 어땠나요?" value={content} 
                        onChange={(e)=> setContent(e.target.value)} />
                    </div>
                </section>
                <section>
                    <div className='control_box'>
                        <MyButton text={"취소하기"} onCliick={()=> {navigate(-1)}} />
                        <MyButton text={"작성완료"} type={"positive"} onClick={handleSubmit} /> 
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DiaryEditor;