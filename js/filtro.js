document.querySelector("#filtrar_pendentes").addEventListener("click", () =>{
    let tarefasFiltradas = tarefas.filter(tarefa => !tarefa.concluida)
    filtrar(tarefasFiltradas)
})

document.querySelector("#filtrar_concluidas").addEventListener("click", () =>{
    let tarefasFiltradas = tarefas.filter(tarefa => tarefa.concluida)
    filtrar(tarefasFiltradas)
})