import React, { useState, useEffect } from 'react';
import '../components/styles/TitleRotator.css'; // تأكد من استيراد ملف CSS الخاص بالتأثيرات

const TitleRotator = () => {
    const titles = [
      "Boost Your Coding Skills!",
      "Join Our Developer Community",
      "Stay Updated with Tech Trends"
    ];
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
    const [fadeState, setFadeState] = useState('fade-in');
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setFadeState('fade-out');
        setTimeout(() => {
          setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
          setFadeState('fade-in');
        }, 500); // Half a second for fade-out effect
      }, 2100); // One second for title display and another half second for fade-out effect
  
      return () => clearInterval(intervalId);
    }, []);
  
    return (
      <div className={`title ${fadeState}`}>
        {titles[currentTitleIndex]}
      </div>
    );
  }
  
  export default TitleRotator;