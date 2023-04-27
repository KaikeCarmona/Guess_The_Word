import "./app.css";

//method
import { useCallback, useEffect, useState } from "react";

//words
import { wordList } from "./data/words";

//components that
import StartScreen from "./components/Start/StartScreen";
import GameScreen from "./components/Game/GameScreen";
import EndScreen from "./components/end/EndScreen";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQty = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetter, setGuessedLetter] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(-100);

  function pickWordAndCategory() {
    //pick a random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    //pick a random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  }

  //start the game
  function startGame(){
    //clear all letters
    clearLetterStates()

    //pick wort and pick category
    const { word, category } = pickWordAndCategory();

    //create an array of letters
    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    console.log(word, category);
    console.log(wordLetters);

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }

//[pickWordAndCategory]

  //process teh latter input
  function verifyLatter(letter) {
    // console.log(letter)
    // setGameStage(stages[2].name);
    const normalizedLetter = letter.toLowerCase();

    //check if letter is a already been utilized
    if (
      guessedLetter.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // push guessed letter or remove a guess
    if(letters.includes(normalizedLetter)){
      setGuessedLetter((actualGuessedLetter) => [
        ...actualGuessedLetter,
        normalizedLetter,
      ])
    }else{
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ])
      setGuesses((actualGuesses) => actualGuesses - 1)
    }

  

    // console.log(guessedLetter)
    // console.log(wrongLetters )
  }

  function  clearLetterStates(){
    setGuessedLetter([])
    setWrongLetters([])
  }


  //check if guesses ended
  useEffect(()=>{
    if(guesses <= 0){
      //reset all states

      clearLetterStates()

      setGameStage(stages[2].name)

    }
  }, [guesses])

  useEffect(()=>{

    const uniqueLetters = [... new Set(letters)]

    //win condition
    if(guessedLetter.length === uniqueLetters.length){
      //add score
      setScore((actualScore) => (actualScore += 100))

      //restart game with new word
      startGame()

    }


    console.log(uniqueLetters)

  },[guessedLetter, letters, startGame])

  function restartGame() {
    setScore(0)
    setGuesses(guessesQty)
    setGameStage(stages[0].name);
  }

  return (
    <div className="app">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <GameScreen
          verifyLatter={verifyLatter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetter={guessedLetter}
          wrongLetters={wrongLetters}
          guessees={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <EndScreen retry={restartGame} score={score} />}
    </div>
  );
}

export default App;
