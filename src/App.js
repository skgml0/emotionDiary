import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect, useReducer, useRef } from 'react';
import './App.css';

import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import Diary from './pages/Diary';

const reducer = (state, action) => {
  let newState = [];
  switch(action.type){
    case 'INIT':{
      return action.data;
    }
    case 'CREATE': {
      newState= [action.data, ...state];
      break;
    }
    case 'REMOVE' : {
      newState = state.filter((it)=> it.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map((it)=> it.id === action.data.id ? {...action.data} : it);
      break;
    };
    default: return state;
  }
  localStorage.setItem("diary", JSON.stringify(newState))
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

//  직렬화(문자열로 변환)해주어야 한다. 객체를 문자열로 압축해서 로컬스토리지에 저장가능 (객체 자체는 받아들일수 없는 값)
function App() {
  // useEffect(()=> {
  //   // 키 값을 기준으로 값 꺼내와서 상수에 저장 가능
  //   const item1 = +localStorage.getItem("item1");
  //   const item2 = +localStorage.getItem("item2");
  //   const item3 =JSON.parse(localStorage.getItem("item3"));
  //   // ,로 이루어진 값들을 {}로 묶어주면 객체로 만들어주어 변수명과 값으로 확인할 수 있다. 
  //   // 기본적으로 local에 들어가는 값은 문자로 바뀌어 들어간다. 나오는 값도 문자!
  //   // 꺼내올때 parseInt / JSON.parse 직렬화 로 다시 복원시켜주어야 한다.
  //   console.log({item1, item2,item3});
  // },[]);
  const [data, dispatch] = useReducer(reducer, []);
  
  useEffect(() => {
    const localData = localStorage.getItem('diary');
    if(localData){
      const diaryList = JSON.parse(localData).sort((a,b)=> parseInt(b.id) - parseInt(a.id));
      if(diaryList.length >=1){
      dataId.current = parseInt(diaryList[0].id) + 1;
      dispatch({type:"INIT", data: diaryList});}
    }
  },[])
  const dataId = useRef(0);
  // CREATE date : 언제 작성된 일기인지
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current +=1;
    };

  // REMOVE
  const onRemove = (targetId) => {dispatch({type: "REMOVE", targetId})};

  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data:{ id: targetId, date : new Date(date).getTime(), content, emotion}
    })
  }

  return (
    <DiaryStateContext.Provider value={data}>
    <DiaryDispatchContext.Provider value={{onCreate, onEdit, onRemove}}>
    <BrowserRouter>
    <div className="App">
        <Routes>
          <Route path="/" element= {<Home />} />
          <Route path="/new" element= {<New />} />
          <Route path="/edit/:id" element= {<Edit />} />
          <Route path="/diary/:id" element= {<Diary />} />
        </Routes>
    </div>
    </BrowserRouter>
    </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );}

export default App;
