document.getElementById("openModal").addEventListener("click", function () {
    document.getElementById("modal").style.display = "flex";
});

document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("modal").style.display = "none";
});

// Fecha o modal se clicar fora dele
window.addEventListener("click", function (event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

function showToast() {
    let toast = document.getElementById("toast");
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 4000);
}

document.getElementById("livroForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o recarregamento da página

    // Captura os valores dos campos do modal
    const dadosLivro = {
        titulo: document.getElementById("titulo").value,
        autor: document.getElementById("autor").value,
        editora: document.getElementById("editora").value,
        isbn: document.getElementById("isbn").value,
        paginas: document.getElementById("paginas").value,
        publicacao: document.getElementById("publicacao").value,
        genero: document.getElementById("genero").value,
        quantidade: document.getElementById("quantidade").value,
        preco: document.getElementById("preco").value
    };

    // Envia os dados ao backend
    fetch("http://localhost:8081/ApiColina/livros/cadastro", { // Substitua pela URL do seu backend
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosLivro),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Resposta do servidor:", data);
        document.getElementById("livroForm").reset(); 
        showToast(); // Limpa o formulário após sucesso
    })
    .catch(error => {
        console.error("Erro ao cadastrar livro:", error, dadosLivro);
    });
});

// Fechar modal ao clicar no "X"
document.getElementById("fecharModal").addEventListener("click", function() {
    document.getElementById("modal").style.display = "none";
});