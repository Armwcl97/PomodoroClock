import React from 'react';

function Length({title, changeTime, type, time, formatTime, idForDiv, idForButtonDec, idForButtonInc, idForTimer}){
    return(
        <div id={idForDiv}>
            <h3>{title}</h3>
            <div className="time-sets">
                <button id={idForButtonDec}
                onClick={()=>{changeTime(-30,type)}} 
                className="btn-small deep-purple lighten-2"
                >
                    <i className="material-icons">arrow_downward</i>
                </button>
                <h3 id={idForTimer}>{formatTime(time)}</h3>
                <button id={idForButtonInc}
                onClick={()=>{changeTime(30,type)}} 
                className="btn-small deep-purple lighten-2"
                >
                    <i className="material-icons">arrow_upward</i>
                </button>
            </div>
        </div>
    )
}

export default Length