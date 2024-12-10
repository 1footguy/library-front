import { useEffect } from "react"
import { useState } from "react"
import { useForm } from "react-hook-form";

function App() {
  const [livros, setLivros] = useState([]);
  const {register, handleSubmit} = useForm();

  async function salvar(data){
    const {titulo, autor, paginas} = data;
    await fetch("http://localhost:3000/livros", {
      method: "POST",
      headers: { "Content-Type" : "application/json"},
      body: JSON.stringify({titulo, autor, paginas})
    });

  }

  async function loadData() {
    const response = await fetch("http://localhost:3000/livros");
    const data = await response.json();
      setLivros(data);
    loadData();

  }

  async function excluir(id) {
    await fetch(`http://localhost:3000/livros/${id}`, {
      method: "DELETE"
    })
    loadData();
  }

  async function editar(id) {
    const titulo = window.prompt("Digite o novo título")
    await fetch (`http://localhost:3000/livros/${id}`, {
      method: "PUT",
      headers: { "Content-Type" : "application/json"},
      body: JSON.stringify({titulo})
    })
    loadData();
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit(salvar)}>
        <label htmlFor="titulo">Titulo</label>
        <input type="text" id="titulo" {...register("titulo")}/>
        
        <label htmlFor="autor">Autor</label>
        <input type="text" id="autor" {...register("autor")} />
        
        <label htmlFor="paginas">Qtd. Paginas</label>
        <input type="number" id="paginas" {...register("paginas")}/>

        <button type="submit">Salvar</button>
      </form>

      <h1>Livros</h1>
      <table>
        <thead>
          <tr>
            <td>Titulo</td>
            <td>Autor</td>
            <td>Categoria</td>
            <td>Qtd pag.</td>
          </tr>
        </thead>
        <tbody>
          {livros.map(livro => {
            return(
            <tr key={livro.id}>
              <td>{livro.titulo}</td>
              <td>{livro.autor}</td>
              <td>{livro.categoria}</td>
              <td>{livro.paginas}</td>
              <td>
                <button type="button" onClick={() => editar(livro.id)}> Editar </button>
              </td>
              <td>
                <button type="button" onClick={() => excluir(livro.id)}> Excluir </button>
              </td>
            </tr>
            )
          })}

        </tbody>
      </table>
    </div>
  )
}

export default App
