import { useRef, useState } from "react";
import "./GameScreen.css";

export default function GameScreen({
  verifyLatter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetter,
  wrongLetters,
  guessees,
  score,
}) {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null)

  function handleSubmit(e){
    e.preventDefault()

    verifyLatter(letter)

    setLetter("")

    letterInputRef.current.focus();

  }

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guessees} tentativas.</p>
      <div className="wordContainer">
        {letters.map((latter, i) =>
          guessedLetter.includes(latter) ? (
            <span key={i} className="letter">
              {latter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}

        {/* <span className="letter">A</span>
        <span className="blankSquare"></span> */}
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
          />
          <button>Jogar</button>
        </form>
      </div>
      <div className="wrongLettersContainers">
        <p>Letras já utilizadas: </p>

        {wrongLetters.map((letters, i) => (
          <span key={i}>{letters}, </span>
        ))}

        {/* <span>a,</span>
        <span>b,</span> */}
      </div>
    </div>
  );
}
