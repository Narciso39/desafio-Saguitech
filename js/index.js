const produtos = [];

function adicionarProduto() {
  const nome = document.getElementById("name").value;
  const preco = parseFloat(document.getElementById("price").value);
  const irpf = parseFloat(document.getElementById("irpf").value) / 100;
  const pis = parseFloat(document.getElementById("pis").value) / 100;
  const cofins = parseFloat(document.getElementById("cofins").value) / 100;
  const inss = parseFloat(document.getElementById("inss").value) / 100;
  const issqn = parseFloat(document.getElementById("issqn").value) / 100;

  if (
    isNaN(preco) ||
    isNaN(irpf) ||
    isNaN(pis) ||
    isNaN(cofins) ||
    isNaN(inss) ||
    isNaN(issqn)
  ) {
    alert("Algum campo está inválido");
  } else {
    const impostos = {
      irpf: preco * irpf,
      pis: preco * pis,
      cofins: preco * cofins,
      inss: preco * inss,
      issqn: preco * issqn,
    };

    const produto = { nome, preco, impostos };
    produtos.push(produto);

    const item = document.createElement("li");
    item.textContent = `${nome} - R$ ${preco.toFixed(2)}`;
    document.getElementById("productItems").appendChild(item);

    document.getElementById("productForm").reset();

    const button = document.getElementById("buttonNfe");
    if (produtos.length > 0) {
      button.classList.remove("button-disable");
      button.removeAttribute("disabled");
    }
  }
}

function gerarNota() {
  const notaDetalhes = document.getElementById("notaDetalhes");
  notaDetalhes.innerHTML = "";

  let totalImpostos = 0;
  let totalPreco = 0;

  if (produtos.length === 0) {
    alert("Adicione produtos antes de gerar a nota.");
    return;
  }

  produtos.forEach((produto) => {
    const { nome, preco, impostos } = produto;
    const totalProduto =
      preco + Object.values(impostos).reduce((a, b) => a + b, 0);
    totalImpostos += Object.values(impostos).reduce((a, b) => a + b, 0);
    totalPreco += preco;

    const div = document.createElement("div");
    div.innerHTML = `
            <p><strong>${nome}</strong></p>
            <p>Preço: R$ ${preco.toFixed(2)}</p>
            <p>IRPF: R$ ${impostos.irpf.toFixed(2)}</p>
            <p>PIS: R$ ${impostos.pis.toFixed(2)}</p>
            <p>COFINS: R$ ${impostos.cofins.toFixed(2)}</p>
            <p>INSS: R$ ${impostos.inss.toFixed(2)}</p>
            <p>ISSQN: R$ ${impostos.issqn.toFixed(2)}</p>
            <p>Total (com impostos): R$ ${totalProduto.toFixed(2)}</p>
          `;
    notaDetalhes.appendChild(div);
  });

  const resumo = document.createElement("div");
  resumo.innerHTML = `
          <hr>
          <p><strong>Número de Produtos:</strong> ${produtos.length}</p>
          <p><strong>Total de Impostos:</strong> R$ ${totalImpostos.toFixed(
            2
          )}</p>
          <p><strong>Valor Total da nota fiscal:</strong> R$ ${totalPreco.toFixed(
            2
          )}</p>
        `;
  notaDetalhes.appendChild(resumo);

  abrirModal();
}

function abrirModal() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("notaModal").style.display = "block";
}

function fecharModal() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("notaModal").style.display = "none";
}
