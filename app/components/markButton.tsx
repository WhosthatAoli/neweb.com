"use client";
import React, { useState, useEffect } from "react";
import "../globals.css";
import { saveMarkedWebsite, retrieveMarkedWebsites } from '../api/firebaseApi/firebaseDatabase'

interface MarkButtonProps {
    title: string;
}

const MarkButton: React.FunctionComponent<MarkButtonProps> = ({title}) => {
  
    const [markedWebsites, setMarkedWebsites] = useState([]);
    const [userId, setUserId] = useState('')

    useEffect(()=>{
        const user: { uid: string } = JSON.parse(localStorage.getItem("user") || "{}");
        setUserId(user.uid)
    }, [])
  
    const handleMark = (websiteTitle: string) => {
      saveMarkedWebsite(userId, websiteTitle).then(() => {
        console.log('website marked!')
      }).catch((err) => {
        console.error(err)
      })
    } 
  return (
    <div>
      <button onClick={() => handleMark(title)}>Mark</button>
    </div>
  );
};

export default MarkButton;