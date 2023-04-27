import "./StartScreen.css";

export default function StartScreen({startGame}) {
  return (
    <div className="start-container">
      <h1>Acerte A Palavra</h1>
      <p>Clique no botão abaixo para começar a jogar</p>
      <button onClick={startGame}>Começar o jogo</button>
    </div>
  );
}
