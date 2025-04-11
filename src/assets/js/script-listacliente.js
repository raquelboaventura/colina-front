document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.getElementById("clientes-tbody");

    fetch("http://localhost:8081/ApiColina/cliente/all")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar os clientes");
            }
            return response.json();
        })
        .then(clientes => {
            tbody.innerHTML = ""; // limpa antes de adicionar
            clientes.forEach(cliente => {
                const tr = document.createElement("tr");

                tr.innerHTML = `
                    <td>${cliente.id}</td>
                    <td>${cliente.nome}</td>
                    <td>${cliente.cpf}</td>
                `;

                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error("Erro:", error);
        });
});
