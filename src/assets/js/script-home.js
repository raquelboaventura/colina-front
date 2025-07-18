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

// Seletores
const modalLivro = document.getElementById("modal");
const modalCliente = document.getElementById("modal-cliente");
const btnOpenModalCliente = document.getElementById("openModalCliente");
const spanCloseCliente = document.querySelector(".close-cliente");
const formCliente = document.getElementById("clienteForm");
const toastCliente = document.getElementById("toast-cliente");

// Abrir modal Cliente
btnOpenModalCliente.addEventListener("click", () => {
    modalCliente.style.display = "flex"; // Use 'flex' pra centralizar
});

// Fechar modal Cliente (botão X)
spanCloseCliente.addEventListener("click", () => {
    modalCliente.style.display = "none";
});

// Fechar modais clicando fora
window.addEventListener("click", (event) => {
    if (event.target === modalLivro) {
        modalLivro.style.display = "none";
    }
    if (event.target === modalCliente) {
        modalCliente.style.display = "none";
    }
});


function showToastClient() {
    let toast = document.getElementById("toast-cliente");
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 4000);
}

// Submeter formulário Cliente
formCliente.addEventListener("submit", (event) => {
    event.preventDefault();

    const dadosCliente = {
        nome: document.getElementById("nome-cliente").value,
        cpf: document.getElementById("cpf-cliente").value
    };

    // Envia os dados para o backend
    fetch("http://localhost:8081/ApiColina/cliente/cadastro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosCliente),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao cadastrar cliente");
            }
            return response.json();
        })
        .then(data => {
            console.log("Cliente cadastrado:", data);
            modalCliente.style.display = "none";
            showToastClient();
            formCliente.reset();
        })
        .catch(error => {
            console.error("Erro ao cadastrar cliente:", error);
            alert("Erro ao cadastrar cliente. Verifique os dados e tente novamente.");
        });
});

