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
                    <td>⚙️</td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar livros:", error);
        });
});
