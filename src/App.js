
import classes from './App.module.css';
import { useState, useEffect } from 'react';

const TILE_COLORS = ['red', 'green', 'blue', 'yellow'];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap the elements at i and randomIndex
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

function App() {
  const [shuffledColors, setShuffledColors] = useState([...shuffle(TILE_COLORS), ...shuffle(TILE_COLORS)]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [matchedColors, setMatchedColors] = useState([]);
  const [isExecute, setIsExecute] = useState(true);

  useEffect(() => {
    if(selectedColors.length < 2) return;

    if(shuffledColors[selectedColors[0]] === shuffledColors[selectedColors[1]]){
      setMatchedColors([...matchedColors, ...selectedColors]);
      setSelectedColors([]);
      
    } else {
      setIsExecute(false);
      setTimeout(() => {
        setIsExecute(true);
        setSelectedColors([]);
      }, 1000);
    }
    
  }, [selectedColors, shuffledColors, matchedColors]);
  console.log(shuffledColors);
  
  function handleClickBoxes(event){
    if(isExecute && !selectedColors.includes(parseInt(event.target.id))){

      const index = parseInt(event.target.id);
      setSelectedColors((lastVal) => {
        return [...lastVal, index]
      });
    }
  }

  function resetGame(){
    setSelectedColors([]);
    setMatchedColors([]);
    setShuffledColors([...shuffle(TILE_COLORS), ...shuffle(TILE_COLORS)]);
  }

  const isWin = matchedColors.length === shuffledColors.length;

  return (
    <div>
      <h1>Memory</h1>
      <div className={classes.board}>
        {shuffledColors.map((el, i) => {
          const isMatched = selectedColors.includes(i) || matchedColors.includes(i);
          return <div onClick={handleClickBoxes} key={i} id={i} className={`${classes.tile} ${isMatched ? classes[el] : ''}`}></div>
        })}
      </div>
      {isWin ? <button onClick={resetGame} type='button'>Restart</button> : ''}
    </div>
  );
}

export default App;
