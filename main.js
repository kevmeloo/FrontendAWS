const produtoForm = document.getElementById('produtoForm');
const produtoList = document.getElementById('produtoList');

produtoForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const nomeInput = document.getElementById('nome');
  const precoInput = document.getElementById('preco');
  
  const nome = nomeInput.value;
  const preco = precoInput.value;
  
  // Cadastrar um produto (POST)
  const response = await fetch('3.95.161.52/produtos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, preco })
  });
  
  if (response.ok) {
    const produto = await response.json();
    addProdutoToList(produto);
    nomeInput.value = '';
    precoInput.value = '';
  } else {
    alert('Erro ao cadastrar o produto');
  }
});

async function fetchProdutos() {
  // Consultar todos os produtos (GET)
  const response = await fetch('3.95.161.52/produtos');
  const produtos = await response.json();
  
  produtos.forEach(addProdutoToList);
}

async function fetchProdutoById(id) {
  // Consultar um produto individualmente pelo ID (GET)
  const response = await fetch(`3.95.161.52/produtos/${id}`);
  const produto = await response.json();
  
  // Fazer algo com o produto retornado, como exibir os dados em um formulário de edição
}

async function alterarProduto(id, novoNome, novoPreco) {
  // Alterar um produto (PUT)
  const response = await fetch(`3.95.161.52/produtos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome: novoNome, preco: novoPreco })
  });
  
  if (response.ok) {
    // Atualizar a exibição do produto alterado na interface
  } else {
    alert('Erro ao alterar o produto');
  }
}

async function deletarProduto(id) {
  // Deletar um produto (DELETE)
  const response = await fetch(`3.95.161.52/produtos/${id}`, {
    method: 'DELETE'
  });
  
  if (response.ok) {
    // Remover o produto da interface
  } else {
    alert('Erro ao deletar o produto');
  }
}

function addProdutoToList(produto) {
  const li = document.createElement('li');
  li.textContent = `${produto.nome} - R$ ${produto.preco}`;
  
  const editarBtn = document.createElement('button');
  editarBtn.textContent = 'Editar';
  editarBtn.addEventListener('click', () => {
    fetchProdutoById(produto.id);
  });
  
  const deletarBtn = document.createElement('button');
  deletarBtn.textContent = 'Deletar';
  deletarBtn.addEventListener('click', () => {
    deletarProduto(produto.id);
  });
  
  li.appendChild(editarBtn);
  li.appendChild(deletarBtn);
  
  produtoList.appendChild(li);
}

// Carregar os produtos ao carregar a página
fetchProdutos();
