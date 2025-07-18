document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:8081/ApiColina/livros/lista/all")
        .then(response => response.json())
        .then(livros => {
            const tbody = document.getElementById("livros-tbody");
            livros.forEach(livro => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${livro.id}</td>
                    <td class="titulo-cell">
                        <div class="titulo-wrapper">
                            <img src="${livro.imagem || 'assets/img/placeholder.png'}" alt="Capa" class="capa-img" />
                            <span>${livro.titulo}</span>
                        </div>
                    </td>
                    <td>${livro.isbn}</td>
                    <td>${livro.quantidade}</td>
                    <td>${livro.autor}</td>
                    <td>${livro.editora}</td>
                    <td>R$ ${livro.preco.toFixed(2).replace(".", ",")}</td>
                    <td class="acao">
                        <span class="gear-icon" data-id="${livro.id}" data-livro='${JSON.stringify(livro)}'>⚙️</span>
                    </td>
                `;

                // Evento para abrir o modal com os dados preenchidos
                row.querySelector(".gear-icon").addEventListener("click", function () {
                    const livro = JSON.parse(this.getAttribute("data-livro"));

                    document.getElementById("edit-id").value = livro.id;
                    document.getElementById("edit-titulo").value = livro.titulo;
                    document.getElementById("edit-autor").value = livro.autor;
                    document.getElementById("edit-editora").value = livro.editora;
                    document.getElementById("edit-isbn").value = livro.isbn;
                    document.getElementById("edit-paginas").value = livro.paginas;
                    document.getElementById("edit-publicacao").value = livro.publicacao;
                    document.getElementById("edit-genero").value = livro.genero;
                    document.getElementById("edit-quantidade").value = livro.quantidade;
                    document.getElementById("edit-preco").value = livro.preco;

                    document.getElementById("modal-edicao").style.display = "flex";
                });

                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar livros:", error);
        });
});

// Fecha modal ao clicar no X
document.getElementById("fechar-modal-edicao").addEventListener("click", function () {
    document.getElementById("modal-edicao").style.display = "none";
});

// Fecha modal ao clicar fora dele
window.addEventListener("click", function (event) {
    const modal = document.getElementById("modal-edicao");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Submete edição
document.getElementById("form-editar-livro").addEventListener("submit", function (event) {
    event.preventDefault();

    const livroAtualizado = {
        id: document.getElementById("edit-id").value,
        titulo: document.getElementById("edit-titulo").value,
        autor: document.getElementById("edit-autor").value,
        editora: document.getElementById("edit-editora").value,
        isbn: document.getElementById("edit-isbn").value,
        paginas: document.getElementById("edit-paginas").value,
        publicacao: document.getElementById("edit-publicacao").value,
        genero: document.getElementById("edit-genero").value,
        quantidade: document.getElementById("edit-quantidade").value,
        preco: document.getElementById("edit-preco").value
    };

    fetch(`http://localhost:8081/ApiColina/livros/atualiza/${livroAtualizado.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(livroAtualizado)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao atualizar o livro");
        }
        console.log(livroAtualizado)
        return response;
    })
    .then(data => {
        console.log("Livro atualizado:", data);
        document.getElementById("modal-edicao").style.display = "none";
        location.reload(); // Recarrega a tabela
    })
    .catch(error => {
        console.error("Erro ao atualizar livro:", error);
    });
});
