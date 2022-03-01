class Produto {
    constructor() {
        this.id = 1;
        this.arrayProdutos = []
        this.editId = null
        this.valorTotal = 0
    }

    salvar() {
        let produto = this.lerDados()
        if (this.validaCampos(produto)) {
            if (this.editId == null) {
                this.adicionar(produto)
            } else {
                this.atualizar(this.editId, produto)

            }
        }
        this.listaTabela()
        this.cancelar()
    }

    listaTabela() {
        let tbody = document.getElementById('tbody')
        tbody.innerText = ''
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow()
            let td_id = tr.insertCell()
            let td_produto = tr.insertCell()
            let td_valor = tr.insertCell()
            let td_acoes = tr.insertCell()

            td_id.innerText = this.arrayProdutos[i].id
            td_produto.innerText = this.arrayProdutos[i].nomeProduto
            td_valor.innerText = this.arrayProdutos[i].preco
            td_acoes.classList.add('center')
            td_id.classList.add('center')
            let imgEdit = document.createElement('img')
            imgEdit.src = 'img/botao-editar.png'
            imgEdit.style.cursor = 'pointer'
            imgEdit.style.marginRight = '20px'
            imgEdit.setAttribute("title", "Editar")
            imgEdit.setAttribute("onclick", "produto.prepararEditacao(" + JSON.stringify(this.arrayProdutos[i]) + ")")

            let imgDelete = document.createElement('img')
            imgDelete.src = 'img/deletar-lixeira.png'
            imgDelete.style.cursor = 'pointer'
            imgDelete.setAttribute("title", "Excluir")
            imgDelete.setAttribute("onclick", "produto.deletar(" + this.arrayProdutos[i].id + ")")

            td_acoes.appendChild(imgEdit)
            td_acoes.appendChild(imgDelete)
        }
        this.totalProdutos()
    }

    adicionar(produto) {
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if (produto.nomeProduto == this.arrayProdutos[i].nomeProduto) {
                alert(`Produto já cadastrado no sistema com o ID número: ${this.arrayProdutos[i].id}`)
                return false
            }
        }
        produto.preco = parseFloat(produto.preco)
        this.arrayProdutos.push(produto)
        this.id++

    }
    atualizar(id, produto) {
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if (this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto
                this.arrayProdutos[i].preco = produto.preco
                for (let i = 0; i < this.arrayProdutos.length; i++) {
                    this.valorTotal += Number(this.arrayProdutos[i].preco)
                }
            }
        }
    }
    prepararEditacao(dados) {
        let produto = document.getElementById('produto')
        let preco = document.getElementById('preco')
        let botao = document.getElementById("btn1")
        let botao2 = document.getElementById("btn2")
        this.editId = dados.id
        produto.setAttribute("placeholder", "Nome atual: " + dados.nomeProduto)
        preco.setAttribute("placeholder", "Preço atual: " + dados.preco)
        produto.style.backgroundColor = "#F5F5DC"
        preco.style.backgroundColor = "#F5F5DC"
        produto.value = dados.nomeProduto
        preco.value = dados.preco
        botao.innerText = 'Atualizar'
        botao.style.backgroundColor = "red"
        botao2.style.backgroundColor = "red"
    }
    lerDados() {
        let produto = {}
        produto.id = this.id
        produto.nomeProduto = document.getElementById('produto').value
        produto.preco = document.getElementById('preco').value
        return produto
    }
    validaCampos(produto) {
        let msg = ''

        if (produto.nomeProduto == '') {
            msg += '-> Informe o nome do produto\n'
        }
        if (produto.preco == '') {
            msg += '-> Informe o preço do produto\n'
        }
        if (msg != '') {
            alert(msg)
            return false
        }
        return true
    }

    cancelar() {
        let produto = document.getElementById('produto')
        let preco = document.getElementById('preco')
        let botao = document.getElementById('btn1')
        let botao2 = document.getElementById('btn2')
        produto.style = ''
        produto.setAttribute("placeholder", "Nome do produto")
        produto.value = ''
        preco.style = ''
        preco.setAttribute("placeholder", "Valor do produto")
        preco.value = ''
        botao.removeAttribute('style')
        botao2.removeAttribute('style')
        botao.innerText = 'Salvar'
        botao.setAttribute("onclick", "produto.salvar()")
        this.editId = null
    }
    deletar(id) {
        let decisao = confirm(`VOCÊ ESTÁ PRESTES A EXCLUIR O ITEM DE ID ${id}!\nVocê tem certeza disso?`)
        let tbody = document.getElementById('tbody')
        if (decisao == true) {

            for (let i = 0; i < this.arrayProdutos.length; i++) {
                if (this.arrayProdutos[i].id == id) {
                    this.valorTotal -= this.arrayProdutos[i].preco
                    this.arrayProdutos.splice(i, 1)
                    tbody.deleteRow(i)
                }
            }
        }
        this.totalProdutos()
    }
    totalProdutos() {
        this.valorTotal = 0
        let totalDeValores = document.getElementById("valorTotal")

        if (this.arrayProdutos.length > 0) {
            for (let i = 0; i < this.arrayProdutos.length; i++) {
                this.valorTotal += Number(this.arrayProdutos[i].preco)
            }
            totalDeValores.innerHTML = `Quantidade de produtos cadastrados: ${this.arrayProdutos.length}<br>Valor total dos produtos: R$${this.valorTotal}`
        } else {
            totalDeValores.innerText = ''
        }
    }
}

var produto = new Produto()