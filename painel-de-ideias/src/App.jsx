
import { useState } from "react";
import "./App.css";

function App() {
  const [ideias, setIdeias] = useState([]);
  const [novaIdeia, setNovaIdeia] = useState("");
  const [erro, setErro] = useState("");

  
  function adicionarIdeia(event) {
    event.preventDefault();

    if (novaIdeia.trim() === "") {
      setErro("Digite sua ideia antes de adicionar.");
      return;
    }

    const ideia = {
      id: Date.now(),
      texto: novaIdeia,
      feita: false
    };

    setIdeias([...ideias, ideia]);
    setNovaIdeia("");
    setErro("");
  }

  function marcarIdeia(id) {
    setIdeias(
      ideias.map((ideia) => {
        if (ideia.id === id) {
          return {
            ...ideia,
            feita: !ideia.feita
          };
        }

        return ideia;
      })
    );
  }

  function removerIdeia(id) {
    setIdeias(
      ideias.filter((ideia) => ideia.id !== id)
    );
  }

  const concluidas = ideias.filter(
    (ideia) => ideia.feita
  ).length;

  return (
    <div className="container">

      <h1>Painel de Ideias</h1>

      <p className="descricao">
        Adicione suas ideias e marque as que já foram concluídas.
      </p>

      <form onSubmit={adicionarIdeia} className="formulario">

        <input
          type="text"
          placeholder="Digite uma ideia..."
          value={novaIdeia}
          onChange={(event) => setNovaIdeia(event.target.value)}
        />

        <button type="submit">
          Adicionar
        </button>

      </form>

      {erro && (
        <p className="erro">
          {erro}
        </p>
      )}

      <p className="contador">
        {ideias.length} ideias no painel • {concluidas} concluídas
      </p>

      <div className="lista">

        {ideias.map((ideia) => (

          <div
            className="ideia"
            key={ideia.id}
          >

            <label>
              <input
                type="checkbox"
                checked={ideia.feita}
                onChange={() => marcarIdeia(ideia.id)}
              />

              <span className={ideia.feita ? "feita" : ""}>
                {ideia.texto}
              </span>
            </label>

            
            <button
              className="remover"
              onClick={() => removerIdeia(ideia.id)}
            >
              X
            </button>

          </div>

        ))}

      </div>

      {ideias.length === 0 && (
        <p className="vazio">
          Nenhuma ideia adicionada ainda.
        </p>
      )}

    </div>
  );
}

export default App;