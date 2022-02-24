bd = function(chave) {
    
    if(!chave) throw ("A chave não foi informado.")

    this.chave = chave
    this.initialize()
}

bd.prototype = {
    initialize: function() {
        if (!localStorage.getItem(this.chave)) {
            this._cargaInialLocalStorage();
        }
    },


    obterLista: function() {
        return JSON.parse(localStorage.getItem(this.chave))
    },


    obterItemPorId: function(id) {
        if (!id) throw ("Id não especificado.")
        return this.obterLista().find(x => x.id == Number(id))
    },


    obterIndexPorId: function(id) {
        if (!id) throw ("Id não especificado.")
        return this.obterLista().findIndex(x => x.id == Number(id))
    },


    obterIndexPorItem: function(item) {
        if (!item) throw ("Id não especificado.")
        return this.obterLista().findIndex(x => x.id == item.id)
    },


    excluirLista: function() {
        this._atualizarLocalStorage([])
    },


    excluir: function(id) {
        if (!id) throw ("Id não especificado.")
        let novaLista = this.obterLista().filter(x => x.id != id)

        this._atualizarLocalStorage(novaLista)
    },


    salvar: function(item) {
        if (!item) throw ("Item não especificado.")
        
        let isNovoItem = Number(item.id) === 0;
        
        if (isNovoItem) {
            let lista = this.obterLista()

            item.id = this._novoId()

            lista.push(item)

            this._atualizarLocalStorage(lista)

        }
    },


    editar: function(item) {
        if (!item) throw ("Item não especificado.")

        const idParaEditar = this.obterIndexPorId(item.id)
        let lista = this.obterLista()
        
        lista[idParaEditar] = item
        
        this._atualizarLocalStorage(lista)
    },
    

    obterLastId: function() {
        const data_lastId = JSON.parse(localStorage.getItem("data_lastId"))
        const objeto_lastId = data_lastId.find(x => x.modulo == this.chave.slice(11).toLocaleLowerCase())
        return objeto_lastId.id
    },


    _novoId: function() {

        const lastId = JSON.parse(localStorage.getItem("data_lastId"))
        const novoId = this.obterLastId() + 1
        
        const indexDoModulo = lastId.findIndex(x => x.modulo == this.chave.slice(11).toLocaleLowerCase())

        lastId[indexDoModulo].id = novoId

        localStorage.setItem("data_lastId", JSON.stringify(lastId))

        return novoId
    },


    _atualizarLocalStorage: function(lista) {
        localStorage.setItem(this.chave, JSON.stringify(lista))
    },


    _cargaInialLocalStorage: function() {
        // DEPARTAMENTO ====================
        // Definindo Dados
        const data_tabelaDepartamento = [
            {
                id: 1,
                descricao: "Vendas",
                funcionarios: []
            },
            {
                id: 2,
                descricao: "Desenvolvimento",
                funcionarios: []
            }
        ]

        // FUNCIONARIO ====================
        // Definindo Dados
        let data_tabelaFuncionario = [
            {
                id: 1,
                descricao: "Lavinia Moita",
                departamento: 1
            },
            {
                id: 2,
                descricao: "António Marmou",
                departamento: 2
            },
            {
                id: 3,
                descricao: "Fabiano Ferraço",
                departamento: 1
            },
            {
                id: 4,
                descricao: "Maria Leite",
                departamento: 2
            }
        ]
        
        // data_tabelaFuncionario -> localStorage
        localStorage.setItem("data_tabelaFuncionario", JSON.stringify(data_tabelaFuncionario))
        // data_tabelaDepartamento -> localStorage
        localStorage.setItem("data_tabelaDepartamento", JSON.stringify(data_tabelaDepartamento))


        // LastId
        if(!JSON.parse(localStorage.getItem("data_lastId"))) {
            const data_lastId = [{id: 2, modulo: "departamento"}, {id: 4, modulo: "funcionario"}]
            localStorage.setItem("data_lastId", JSON.stringify(data_lastId))
        }
    }



}