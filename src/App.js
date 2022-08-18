import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useReducer, useRef } from 'react';
import './App.css';
import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import Diary from './pages/Diary';
import RouteTest from './components/RouteTest';
import MyButton from './components/MyButton';
import MyHeader from './components/MyHeader';

let reducer = (state, action) => {
  let newState = [];
  switch(action.type){
    case 'INIT':{
      return action.data;
    }
    case 'CREATE': {
      const newItem = { 
        ...action.data
      };
      newState= [newItem, ...state];
      break;
    }
    case 'REMOVE' : {
      newState = state.filter((it)=> it.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map((it)=> it.id === action.data.id ? {...action.date} : it)
    };
    default: return state;
  }
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();
const dummyDate =[{
  id: 1,
  emotion: 1,
  content: "오늘의 일기 1번",
  date: 1659683159537
},
{
  id: 2,
  emotion: 2,
  content: "오늘의 일기 2번",
  date: 1659683159538
},
{
  id: 3,
  emotion: 3,
  content: "오늘의 일기 3번",
  date: 1659683159539
},
{
  id: 4,
  emotion: 4,
  content:"오늘의 일기 4번",
  date: 1659683159540
},
{
  id: 5,
  emotion: 5,
  content: "오늘의 일기 5번",
  date: 1659683159541
}];

function App() {
  const [data, dispatch] = useReducer(reducer, dummyDate);
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
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || ""; 
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
        <RouteTest /> 
    </div>
    </BrowserRouter>
    </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );}

export default App;
