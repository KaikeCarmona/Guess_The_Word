import "./EndScreen.css";

export default function EndScreen({retry, score}) {
  return (
    <div className="start-container">
      <h1>Fim De Jogo!</h1>
      <p>A sua pontuação foi: <span>{score}</span></p>
      <button onClick={retry}>Recomeçar Jogo</button>
    </div>
  );
}
