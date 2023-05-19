document.querySelector("#salvar").addEventListener("click", cadastrar);

let lista_tarefas = []

window.addEventListener("load", () => {
    lista_tarefas = JSON.parse(localStorage.getItem("lista_tarefas")) || []
    atualizar()
})

document.querySelector("#pendentes").addEventListener("click",() => {
    lista_tarefas = JSON.parse(localStorage.getItem("lista_tarefas")) || []
    lista_tarefas = lista_tarefas.filter(tarefa => !tarefa.concluida)
    atualizar()
})

document.querySelector("#busca").addEventListener("keyup", () => {
    lista_tarefas = JSON.parse(localStorage.getItem("lista_tarefas")) || []
    const nome = document.querySelector("busca").value
    lista_tarefas=
        lista_tarefas.filter(tarefa => tarefa.nome.includes(nome))
    atualizar()
})

document.querySelector("#concluidas").addEventListener("click", () => {
    lista_tarefas = JSON.parse(localStorage.getItem("lista_tarefas")) || []
    lista_tarefas = lista_tarefas.filter(tarefa => tarefa.concluida)
    atualizar()
})

function atualizar() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
    document.querySelector("#tarefas").innerHTML = ""
    tarefas.forEach(tarefa =>
        document.querySelector("#tarefas").innerHTML += criarCard(tarefa))
}

function filtrar(lista) {
    document.querySelector("#tarefas").innerHTML = ""
    lista.forEach(tarefa =>
        document.querySelector("#tarefas").innerHTML += criarCard(tarefa)
    )
}

function cadastrar() {
    let nome = document.querySelector("#nome").value;
    let marca = document.querySelector("#marca").value;
    let categoria = document.querySelector("#categoria").value;
    const modal = bootstrap.Modal.getInstance(
        document.querySelector("#exampleModal"))

    const tarefa = {
        id: Date.now(),
        nome,
        marca,
        categoria,
        concluida: false
    }

    if (tarefa.nome.length == 0){
        document.querySelector("#nome").classList.add("is-invalid")
        return
    }

    lista_tarefas.push(tarefa)

    document.querySelector("#tarefas").innerHTML += criarCard(tarefa)
    document.querySelector("nome").value = ""
    document.querySelector("marca").value = ""

    
    salvar()
    modal.hide()
}

    // if (!isValid(tarefa.Nome, document.querySelector("#nome"))) return
    // if (!isValid(tarefa.Marca, document.querySelector("#marca"))) return

    // tarefas.push(tarefa)

    // atualizar()
    // modal.hide()

    //   document.querySelector("#tarefas").innerHTML += criarCard(tarefa);


// function isValid(valor, campo) {
//     if (valor.length == 0) {
//         campo.classList.add("is-invalid")
//         campo.classList.remove("is-valid")
//         return false
//     } else {
//         campo.classList.add("is-valid")
//         campo.classList.remove("is-invalid")
//         return true
//     }
// }

function atualizar(){
    document.querySelector("#tarefas").innerHTML = ""
    lista_tarefas.forEach((tarefa) => {
        document.querySelector("tarefas");innerHTML += criarCard(tarefa)
    })
}

function salvar(){
    localStorage.setItem("lista_tarefas", JSON.stringify(lista_tarefas))
}

function apagar(id) {
    lista_tarefas = lista_tarefas.filter(tarefa => tarefa.id !== id)
    salvar()
    atualizar()
}

function concluir(id) {
    let tarefa_encontrada = lista_tarefas.find(tarefa => tarefa.id == id)
    tarefa_encontrada.concluida = true
    salvar()
    atualizar()
}
// function apagar(botao) {
//   botao.parentNode.parentNode.parentNode.remove();
// }

function criarCard(tarefa) {
    let disabled = tarefa.concluida ? "disabled" : ""

    const card = `
            <div class="col-lg-3 col-md-6 col-sm-12">
            <div class="card">
                <div class="card-header">
                    ${tarefa.nome}
                </div>
                <div class="card-body">
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <p class="card-text">${tarefa.categoria}</p>
                    <span class="badge text-bg-warning">${tarefa.marca}pt</span>
                </div>
                <div class="card-footer">
                    <a onClick="concluir(${tarefa.id})" href="#" class="btn btn-success ${disabled}" title="marcar como concluída">
                        <i class="bi bi-check2"></i>
                    </a>
                    <a href="#" onClick="apagar(${tarefa.id})" class="btn btn-danger" title="apagar tarefa">
                        <i class="bi bi-trash3"></i>
                    </a>
                </div> <!-- card footer -->
            </div> <!-- card -->
        </div> <!-- col -->
        `
    return card
}