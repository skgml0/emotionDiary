import React from "react";
import { useParams } from "react-router-dom";
const Diary = () => {
    const {id} =useParams();
    console.log(id);
    return (
        <>
        <h1>Diary</h1>
        <p>다이어리입니다</p>
        </>
    )
}
export default Diary;