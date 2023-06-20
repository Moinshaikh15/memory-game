import { useEffect, useState } from "react";
import Card from "./Card";
let interval;
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
function App() {
  let [matchArr, setMatchArr] = useState([]);
  let [selectedArr, setSelectedArr] = useState([]);
  let [currSelected, setCurrSelected] = useState(null);
  let [score, setScore] = useState(0);
  let [moves, setMoves] = useState(0);
  let [time, setTime] = useState(0);
  let [timerStarted, setTimerStarted] = useState(false);
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  useEffect(() => {
    shuffleArray(arr);
  }, []);

  useEffect(() => {
    if (score === 8) {
      clearInterval(interval);
      setTimerStarted(false);
    }
  }, [score]);

  let handleClick = (i) => {
    setSelectedArr((items) => [...items, i]);
    setCurrSelected(() => i);

    if (selectedArr.length === 1) {
      setMoves(() => moves + 1);
      if (arr[selectedArr[0]] === arr[i] && selectedArr[0] !== i) {
        setScore(() => score + 1);
        setMatchArr((items) => [...items, selectedArr[0], i]);
      }
      setTimeout(() => {
        setSelectedArr(() => []);
        setCurrSelected(null);
      }, 1000);
    }

    // start the timer if clicked for the first time
    if (!timerStarted) {
      interval = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
      setTimerStarted(true);
    }
  };

  let reset = () => {
    setScore(0);
    setTime(0);
    setMoves(0);
    setCurrSelected(null);
    setMatchArr([]);
    setSelectedArr([]);
    clearInterval(interval);
    setTimerStarted(false);
    shuffleArray(arr);
  };

  return (
    <div className="main-container">
      <h1>Memory Game</h1>
      <div className="info-container">
        <p style={{ width: "100px" }}>Time: {time}s</p>
        <p>{moves} Moves</p>
        <p>Score: {score}</p>
        <button onClick={() => reset()} className="reset-btn">
          Restart
        </button>
      </div>

      {score === 8 ? (
        <div>
          <h2>
            Congratulations 🥳! You won in {moves}Moves! You took {time}seconds!
          </h2>
        </div>
      ) : (
        ""
      )}
      <div className="card-container">
        {arr.map((e, indx) => (
          <Card
            key={indx}
            no={e}
            i={indx}
            handleClick={handleClick}
            className={
              matchArr.includes(indx)
                ? "card matched"
                : currSelected === indx
                ? "card flip"
                : selectedArr.includes(indx)
                ? "card flip"
                : "card"
            }
          />
        ))}
      </div>
    </div>
  );
}
export default App;
