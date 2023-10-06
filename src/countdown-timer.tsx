import { useEffect, useState } from "react";

const CountdownTimer = () => {
    const fiveMinutes = new Date(0,0,0,0,5)
    const [timeRemaining, setTimeRemaining] = useState(fiveMinutes)
    const [timerID, setTimerID] = useState<number | null>()

    const formatDate = (DateObj) => {
        let mins = DateObj.getMinutes()
        let secs = DateObj.getSeconds().toString().padStart(2,'0')
        return `${mins}:${secs}`
    }


    const handleStartClick = () => {
       
        if (timerID != null){
            return
        }

        const newTimer = window.setInterval(() => {
            setTimeRemaining(timeRemaining => new Date(timeRemaining.getTime() - 1000))
        },1000)

        setTimerID(newTimer)
    }

    const handleStopClick = () => {
        if (timerID == null){
            return
        }
        clearInterval(timerID)
        setTimerID(null)
    }

    const handleResetClick = () => {
        setTimeRemaining(fiveMinutes)
    }

    useEffect(() => {
        return () => {
          if (timerID !== null) {
            clearInterval(timerID);
          }
        };
      }, []);
    return (

        <div>
           <p>{formatDate(timeRemaining)}</p>
           <button onClick={handleStartClick}>Start</button> 
           <button onClick={handleStopClick}>Stop</button>
           <button onClick={handleResetClick}>Reset</button> 
        </div>
    )
}

export default CountdownTimer;
