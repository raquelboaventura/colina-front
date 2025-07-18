import { doGet } from './script-request.js';

let clienteId = null;

document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.getElementById("clientes-tbody");

    tbody.addEventListener("click", (event) => {
        if (event.target.classList.contains("gear-icon")) {
            const cliente = JSON.parse(event.target.getAttribute("data-cliente"));
            abrirModalCliente(cliente);
        }
    });

    doGet("/cliente/all")
  .then(clientes => {
    console.log("Clientes:", clientes);
    if (!Array.isArray(clientes)) {
      console.error("Resposta não é array:", clientes);
      return;
    }

    tbody.innerHTML = ""; // limpa antes
    clientes.forEach(cliente => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${cliente.id_cliente}</td>
        <td>${cliente.nome}</td>
        <td>${cliente.cpf}</td>
        <td class="acao">
          <span class="gear-icon" data-id="${cliente.id_cliente}" data-cliente='${JSON.stringify(cliente)}'>⚙️</span>
        </td>
      `;
      tbody.appendChild(tr);
    });
  })
  .catch(error => {
    console.error("Erro ao buscar clientes:", error);
  });
});

function abrirModalCliente(cliente) {
  clienteId = cliente.id_cliente;
  document.getElementById("clienteId").value = clienteId;
  document.getElementById("clienteNome").value = cliente.nome;
  document.getElementById("clienteCpf").value = cliente.cpf;
  document.getElementById("modal-cliente").style.display = "flex";
}

// Fechar modal
document.getElementById("fecharModalCliente").addEventListener("click", () => {
    document.getElementById("modal-cliente").style.display = "none";
});

window.addEventListener("click", (event) => {
    const modal = document.getElementById("modal-cliente");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Enviar alterações para o backend
document.getElementById("clienteForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const clienteAtualizado = {
        nome: document.getElementById("clienteNome").value,
        cpf: document.getElementById("clienteCpf").value
    };

    fetch(`http://localhost:8081/ApiColina/cliente/${clienteId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(clienteAtualizado),
    })
        .then(response => {
            if (response.ok) {
                alert("Cliente atualizado com sucesso!");
                location.reload();
            } else {
                alert("Erro ao atualizar cliente.");
            }
        })
        .catch(error => {
            console.error("Erro ao atualizar cliente:", error);
        });
});