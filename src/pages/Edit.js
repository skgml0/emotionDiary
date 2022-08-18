import React,{useContext, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DiaryStateContext } from '../App';
import DiaryEditor from '../components/DiaryEditor';

const Edit = () => {
    const [originData,setOriginData] = useState();
    const navigate = useNavigate();
    const {id} = useParams();
    const diaryList = useContext(DiaryStateContext);
    // id값과 일치하는 데이터 뽑아오기 
    useEffect(()=> {
        if(diaryList.length >=1) {
            const targetDiary = diaryList.find((it)=> parseInt(it.id) === parseInt(id));
            if(targetDiary){
                setOriginData(targetDiary);
            }else{
                navigate('/',{replace:true});
            }
        }
    },[id,diaryList]);
    return (
        <div>
            {originData && <DiaryEditor isEdit={true} originData={originData} />}
        </div>
    );
};

export default Edit; 