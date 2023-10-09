"use client";
import React, { useState, useEffect } from "react";
import "../globals.css";
import { saveMarkedWebsite } from '../api/firebaseApi/firebaseDatabase'
import markIcon from '@/public/asset/mark_icon.png'; // 导入图片

interface MarkButtonProps {
    title: string;
}

const MarkButton: React.FunctionComponent<MarkButtonProps> = ({title}) => {
  
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
        <button onClick={() => handleMark(title)}>
            <img src={markIcon.src} alt="Mark" className="h-6 w-6" /> {/* 使用图片 */}
        </button>
      </div>
    );
};

export default MarkButton;
