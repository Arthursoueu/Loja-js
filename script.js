// Função para adicionar um produto
function addProduto() {
    const nomeProduto = document.getElementById('nome-produto').value;
    const precoProduto = document.getElementById('preco-produto').value;
    const fotoProduto = document.getElementById('foto-produto').files[0];
    
    if (nomeProduto && precoProduto && fotoProduto) {
        const fotoURL = URL.createObjectURL(fotoProduto);

        const produto = {
            nome: nomeProduto,
            preco: precoProduto,
            foto: fotoURL
        };

        // Obter produtos existentes do LocalStorage
        let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        produtos.push(produto);
        localStorage.setItem('produtos', JSON.stringify(produtos));

        displayProdutos();
        document.getElementById('produto-form').reset();
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Função para exibir produtos
function displayProdutos() {
    const listaProdutos = document.getElementById('produto-lista');
    listaProdutos.innerHTML = '';

    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    produtos.forEach(function(produto) {
        const produtoItem = document.createElement('div');
        produtoItem.classList.add('produto-item');
        
        const img = document.createElement('img');
        img.src = produto.foto;
        img.alt = produto.nome;
        produtoItem.appendChild(img);
        
        const nome = document.createElement('div');
        nome.textContent = `Nome: ${produto.nome}`;
        produtoItem.appendChild(nome);
        
        const preco = document.createElement('div');
        preco.textContent = `Preço: R$ ${parseFloat(produto.preco).toFixed(2)}`;
        produtoItem.appendChild(preco);
        
        listaProdutos.appendChild(produtoItem);
    });
}

// Adiciona o evento de submit ao formulário
const formProduto = document.getElementById('produto-form');
formProduto.addEventListener('submit', function(e) {
    e.preventDefault();
    addProduto();
});

// Exibe produtos ao carregar a página
displayProdutos();
