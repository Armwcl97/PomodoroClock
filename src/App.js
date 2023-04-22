import React, {useEffect, useState} from 'react';
import sound from '../src/mp3/breakTime.mp3'
import './css/App.css';
import Length from './component/length'

function App() {
  const [displayTime, setDisplayTime] = useState(25*60)
  const [breakTime, setBreakTime] = useState(5*60)
  const [sessionTime, setSessionTime] = useState(25*60)
  const [timerOn, setTimerOne] = useState(false)
  const [onBreak, setOnBreak] = useState(false)
  const [breakAudio] = useState(new Audio(sound))


  useEffect(()=>{})

  const playBreakSound = () => {
    breakAudio.currentTime = 0;
    breakAudio.play();
  }

  const formatTime = (time) =>{
    let minutes = Math.floor(time/60)
    let seconds = time % 60
    return (
       (minutes < 10 ?"0"+ minutes : minutes) + 
       ":" + 
       (seconds < 10 ?"0"+ seconds : seconds)
      )
  }

  const changeTime = (amount, type)=>{
    if(type === 'break'){
      if(breakTime <= 30 && amount < 0 ){
        return;
      }
      setBreakTime((prev)=> prev + amount)
    } else {
      if(sessionTime <= 30 && amount < 0 ){
        return;
      }
      setSessionTime((prev)=> prev + amount)
      if(!timerOn){
        setDisplayTime(sessionTime + amount)
      }
    } 
  }

  const controlTime = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVariable = onBreak;
    if (!timerOn) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if (date > nextDate) {
          setDisplayTime((prev) =>{
            if (prev <= 0 && !onBreakVariable) {
              playBreakSound();
              onBreakVariable = true;
              setOnBreak(true);
              return breakTime;
            } else if (prev <= 0 && onBreakVariable) {
              playBreakSound();
              onBreakVariable = false;
              setOnBreak(false);
              return sessionTime
            }
            return prev - 1;
          });
          nextDate += second;
        }
      }, 30);
      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    }
    if (timerOn){
      clearInterval(localStorage.getItem("interval-id"));
    }
    setTimerOne(!timerOn)
  }

  const resetTime = ()=>{
    setDisplayTime(25*60);
    setBreakTime(5*60)
    setSessionTime(25*60)
  }

  return (
    <div className="center-align">
      <h1>Pomodoro Clock</h1>
      <div className="dual-container">
      <Length 
      idForDiv="break-label"
      idForButtonDec="break-decrement"
      idForButtonInc="break-increment"
      idForTimer="timer-label"
      title={"break length"}
      changeTime={changeTime} 
      type={"break"} 
      time={breakTime} 
      formatTime={formatTime}
      />
      <Length 
      idForDiv="session-label"
      idForButtonDec="session-decrement"
      idForButtonInc="session-increment"
      title={"session length"} 
      changeTime={changeTime} 
      type={"session"} 
      time={sessionTime} 
      formatTime={formatTime}
      />
      </div>
      <h3>
        {onBreak?"Break":"Session"}
      </h3>
      <h1>{formatTime(displayTime)}</h1>
      <button id="start_stop" onClick={controlTime} className="btn-large deep-purple lighten-2">
        {timerOn? (
          <i className="material-icons">pause_circle_filled</i>
        ) : (
          <i className="material-icons">play_circle_filled</i>
        )       
        }
      </button>
      <button id="reset" onClick={resetTime} className="btn-large deep-purple lighten-2">
        <i className="material-icons">autorenew</i>
      </button>
    </div>
  );
}

export default App;
