let app = { pages: { departamento: {} } };

app.pages.departamento.edit = function($el) {
    if(!$el) throw ("Elemento não definido")

    this.$el = $el;
    this.BD_func = new bd("data_tabelaFuncionario")
    this.BD_dep = new bd("data_tabelaDepartamento")

    this.initialize();
}

app.pages.departamento.edit.prototype = {
    initialize: function () {
        // Mapear Campos
        this.$elCampo_descricao = document.getElementById("campoEditarDescricaoDepartamento")
        this.$elCampo_id = document.getElementById("campoEditarIdDepartamento")
        this.$elBotao_deletar = document.getElementById('botaoDeletarDepartamento')
        this.data = this.BD_dep.obterLista()
        this.queryString = window.location.search
        this.lastId = this.BD_dep.obterLastId()

        this.idParaEditar = -1

        if (new URLSearchParams(this.queryString).has('id'))
        this.idParaEditar = new URLSearchParams(this.queryString).get('id')

        // Preparar Componentes
        this.prepareComponente()


        // Ligar os Eventos
        this.ligarEventos()

    },

    prepareComponente: function () {
        this.onLoadDepartamentoEdit()
    },

    ligarEventos: function() {
        
    },

    onLoadDepartamentoEdit: function () {

        if (isNovoDepartamento = new URLSearchParams(this.queryString).has('id'))
            this.loadEditModule()
        else
            this.loadNewModule()
    
    },
    
    // 
    
    loadEditModule: function () {
    
        const objectToEdit = this.BD_dep.obterItemPorId(this.idParaEditar)
    
        this.$elCampo_id.placeholder = this.idParaEditar
        this.$elCampo_descricao.value = objectToEdit.descricao
    
    },
    
    // 
    
    loadNewModule: function () {
    
        this.$elCampo_id.value = this.lastId + 1
        this.$elCampo_id.placeholder = 'new'
    
        this.$elBotao_deletar.style.display = 'none'
    
    },
    
    // 
    
    salvar: function () {
    
        if (isNovoDepartamento = new URLSearchParams(this.queryString).has('id')) { this.salvar_editar() }
        else { this.salvar_novo() }
    
    },
    
    // 
    
    salvar_editar: function () {
    
        if (this.validarSalvar()) { return }
    
        const objeto = {
            id: this.idParaEditar,
            descricao: this.$elCampo_descricao.value,
            funcionarios: this.BD_dep.obterItemPorId(this.idParaEditar).funcionarios
        }
    
        this.BD_dep.editar(objeto)
    
        window.location.href = '../../pages/departamento/index.html'
    
    },
    
    // 
    
    salvar_novo: function () {
    
        if (this.validarSalvar()) { return };
    
        const temp_id = 0
        const temp_descricao = this.$elCampo_descricao.value
        const temp_funcionarios = []
    
        const novoObjeto = {
            id: temp_id,
            descricao: temp_descricao,
            funcionarios: temp_funcionarios
        }

        this.BD_dep.salvar(novoObjeto)
    
        window.location.href = '../../pages/departamento/index.html'
    
    },
    
    // 
    
    validarSalvar: function () {
    
        if (this.$elCampo_descricao.value === '' || this.$elCampo_descricao === null) {
            alert("Descrição Vazio")
            return true
        }
    
        return false
    
    },
    
    // 
    
    deletar: function () {
    
        // Validar Id
        if (this.idParaEditar == -1) {
            alert("Erro: ID inválido")
            return
        }
    
        this.BD_dep.excluir(this.idParaEditar)
    
        window.location.href = '../../pages/departamento/index.html'
    
    },
    
    // 
    
    cancelar: function () {
    
        window.location.href = '../../pages/departamento/index.html'
    
    },
    
}   


























// // departamento/edit

// const campo_descricao = document.getElementById("campoEditarDescricaoDepartamento")
// const campo_id = document.getElementById("campoEditarIdDepartamento")
// const botao_deletar = document.getElementById('botaoDeletarDepartamento')
// const data = JSON.parse(localStorage.getItem('data_tabelaDepartamento'))
// const queryString = window.location.search
// const lastId = JSON.parse(localStorage.getItem("data_lastId"))
// let idParaEditar = -1;
// let idParaSalvar = -1;

// // 

// onLoadDepartamentoEdit()

// // 

// function onLoadDepartamentoEdit() {

//     if (isNovoDepartamento = new URLSearchParams(queryString).has('id')&& new URLSearchParams(queryString).get('id') > 0)
//         loadEditModule()
//     else if (!(new URLSearchParams(queryString).has('id')) && idParaEditar === -1 && idParaSalvar === -1)
//         loadNewModule()
//     else
//         throw ("Parâmetros inválidos")
// }

// // 

// function loadEditModule() {

//     const temp_idParaEditar = new URLSearchParams(queryString).get('id')

//     idParaEditar = parseInt(temp_idParaEditar)

//     const objectToEdit = data.find(e => {
//         return e.id === idParaEditar
//     })


//     campo_id.placeholder = idParaEditar
//     campo_descricao.value = objectToEdit.descricao

// }

// // 

// function loadNewModule() {

//     idParaSalvar = lastId[0].id + 1
//     campo_id.value = idParaSalvar
//     campo_id.placeholder = 'new'

//     botao_deletar.style.display = 'none'

// }

// // 

// function salvarDepartamento() {

//     if (isNovoDepartamento = new URLSearchParams(queryString).has('id')) salvar_editar()
//     else salvar_novo()

// }

// // 

// function salvar_editar() {

//     if (validarSalvar()) return

//     const objectToEdit = data.find(e => {
//         return e.id === idParaEditar
//     })

//     const indexToEdit = data.findIndex(e => {
//         return e.id === idParaEditar
//     })


//     objectToEdit.descricao = campo_descricao.value

//     data[indexToEdit] = objectToEdit

//     localStorage.setItem("data_tabelaDepartamento", JSON.stringify(data))

//     window.location.href = '../../pages/departamento/index.html'

// }

// // 

// function salvar_novo() {

//     if (validarSalvar()) return

//     const temp_id = idParaSalvar
//     const temp_descricao = campo_descricao.value

//     const objectToSave = {
//         id: temp_id,
//         descricao: temp_descricao,
//         funcionarios: []
//     }


//     data.push(objectToSave)

//     lastId[0].id = temp_id

//     localStorage.setItem("data_tabelaDepartamento", JSON.stringify(data))
//     localStorage.setItem("data_lastId", JSON.stringify(lastId))

//     window.location.href = '../../pages/departamento/index.html'

// }

// // 

// function validarSalvar() {

//     if (idParaEditar == -1 && idParaSalvar == -1) {
//         console.error("Erro: ID inválido")
//         return true
//     }

//     if (campo_descricao.value === '' || campo_descricao === null) {
//         console.error("Descrição Vazio")
//         return true
//     }

//     return false

// }

// // 

// function deletarDepartamento() {

//     // Validar Id
//     if (idParaEditar == -1)
//         throw ("Erro: ID inválido")
    
//     // Validar se tem funcionarios alocados
//     const data_tabelaFuncionario = JSON.parse(localStorage.getItem("data_tabelaFuncionario"))
//     const existFuncionarioCadastrado = data_tabelaFuncionario.some(funcionario => { return funcionario.departamento == idParaEditar; })
//     if (existFuncionarioCadastrado) throw ("Departamento possui funcionários alocas, impossível deletar")


//     const indexToRemove = data.findIndex(e => {
//         return e.id === idParaEditar
//     })


//     data.splice(indexToRemove, 1)

//     localStorage.setItem("data_tabelaDepartamento", JSON.stringify(data))

//     window.location.href = '../../pages/departamento/index.html'

// }

// // 

// function cancelarDepartamento() {

//     window.location.href = '../../pages/departamento/index.html'

// }

// // 