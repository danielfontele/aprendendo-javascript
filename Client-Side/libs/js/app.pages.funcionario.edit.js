let app = { pages: { funcionario: {} } };

app.pages.funcionario.edit = function($el) {
    if(!$el) throw ("Elemento não definido")

    this.$el = $el;
    this.BD_func = new bd("data_tabelaFuncionario")
    this.BD_dep = new bd("data_tabelaDepartamento")

    this.initialize();
}

app.pages.funcionario.edit.prototype = {
    initialize: function () {
        // Mapear Campos
        this.$elCampo_descricao = document.getElementById("campoEditarDescricaoFuncionario")
        this.$elCampo_id = document.getElementById("campoEditarIdFuncionario")
        this.$elBotao_deletar = document.getElementById('botaoDeletarFuncionario')
        this.$elSelect = document.getElementById("combo_departamentos")
        this.data = this.BD_func.obterLista()
        this.queryString = window.location.search
        this.lastId = this.BD_func.obterLastId()

        this.idParaEditar = -1

        if (new URLSearchParams(this.queryString).has('id'))
        this.idParaEditar = new URLSearchParams(this.queryString).get('id')

        // Preparar Componentes
        this.prepareComponente()


        // Ligar os Eventos
        this.ligarEventos()

    },

    prepareComponente: function () {
        this.onLoadFuncionarioEdit()
    },

    ligarEventos: function() {
        
    },

    onLoadFuncionarioEdit: function () {

        if (isNovoFuncionario = new URLSearchParams(this.queryString).has('id'))
            this.loadEditModule()
        else
            this.loadNewModule()
    
    },
    
    // 
    
    loadEditModule: function () {
    
        const objectToEdit = this.BD_func.obterItemPorId(this.idParaEditar)
    
        this.$elCampo_id.placeholder = this.idParaEditar
        this.$elCampo_descricao.value = objectToEdit.descricao
    
        this.popularComboBox()
    
    },
    
    // 
    
    loadNewModule: function () {
    
        this.$elCampo_id.value = this.lastId + 1
        this.$elCampo_id.placeholder = 'new'
    
        this.$elBotao_deletar.style.display = 'none'
    
        this.popularComboBox()
    
    },
    
    // 
    
    salvar: function () {
    
        if (isNovoFuncionario = new URLSearchParams(this.queryString).has('id')) { this.salvar_editar() }
        else { this.salvar_novo() }
    
    },
    
    // 
    
    salvar_editar: function () {
    
        if (this.validarSalvar()) { return }
    
        const objeto = {
            id: this.idParaEditar,
            descricao: this.$elCampo_descricao.value,
            departamento: this.getSelectedComboBox()
        }
    
        this.BD_func.editar(objeto)
    
        window.location.href = '../../pages/funcionario/index.html'
    
    },
    
    // 
    
    salvar_novo: function () {
    
        if (this.validarSalvar()) { return };
    
        const temp_id = 0
        const temp_descricao = this.$elCampo_descricao.value
        const temp_departamento = this.getSelectedComboBox()
    
        const novoObjeto = {
            id: temp_id,
            descricao: temp_descricao,
            departamento: temp_departamento
        }
    
        this.BD_func.salvar(novoObjeto)
    
        window.location.href = '../../pages/funcionario/index.html'
    
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
    
        this.BD_func.excluir(this.idParaEditar)
    
        window.location.href = '../../pages/funcionario/index.html'
    
    },
    
    // 
    
    cancelar: function () {
    
        window.location.href = '../../pages/funcionario/index.html'
    
    },
    
    //
    
    popularComboBox: function () {
        const data_Departamento = this.BD_dep.obterLista()
    
        data_Departamento.forEach(departamento => {
            let option = document.createElement("option");
            option.id = departamento.id
            option.value = departamento.id
            option.innerHTML = departamento.id + " - " + departamento.descricao
    
            // debugger
            if (this.idParaEditar !== -1) {
                if(departamento.id == this.data[this.data.findIndex(e => {return e.id == this.idParaEditar})].departamento) {
                    option.selected = true
                }
            }
    
            this.$elSelect.appendChild(option)
        })
    
    },
    
    // 
    
    getSelectedComboBox: function () {
        return parseInt(this.$elSelect.value)
    }

}   























// // funcionario/edit
// // 
    
// const BD_func = new bd("data_tabelaFuncionario")
// const BD_dep = new bd("data_tabelaDepartamento")

// // 

// const campo_descricao = document.getElementById("campoEditarDescricaoFuncionario")
// const campo_id = document.getElementById("campoEditarIdFuncionario")
// const botao_deletar = document.getElementById('botaoDeletarFuncionario')
// const select = document.getElementById("combo_departamentos")
// const data = BD_func.obterLista()
// const queryString = window.location.search
// const lastId = BD_func.obterLastId()

// let idParaEditar = -1

// if (new URLSearchParams(queryString).has('id'))
//     idParaEditar = new URLSearchParams(queryString).get('id')

// // 

// onLoadFuncionarioEdit()

// // 

// function onLoadFuncionarioEdit() {

//     if (isNovoFuncionario = new URLSearchParams(queryString).has('id'))
//         loadEditModule()
//     else
//         loadNewModule()

// }

// // 

// function loadEditModule() {

//     const objectToEdit = BD_func.obterItemPorId(idParaEditar)

//     campo_id.placeholder = idParaEditar
//     campo_descricao.value = objectToEdit.descricao

//     popularComboBox()

// }

// // 

// function loadNewModule() {

//     campo_id.value = lastId + 1
//     campo_id.placeholder = 'new'

//     botao_deletar.style.display = 'none'

//     popularComboBox()

// }

// // 

// function salvar() {

//     if (isNovoFuncionario = new URLSearchParams(queryString).has('id')) { salvar_editar() }
//     else { salvar_novo() }

// }

// // 

// function salvar_editar() {

//     if (validarSalvar()) { return }

//     const objeto = {
//         id: idParaEditar,
//         descricao: campo_descricao.value,
//         departamento: getSelectedComboBox()
//     }

//     BD_func.editar(objeto)

//     window.location.href = '../../pages/funcionario/index.html'

// }

// // 

// function salvar_novo() {

//     if (validarSalvar()) { return };

//     const temp_id = 0
//     const temp_descricao = campo_descricao.value
//     const temp_departamento = getSelectedComboBox()

//     const novoObjeto = {
//         id: temp_id,
//         descricao: temp_descricao,
//         departamento: temp_departamento
//     }

//     BD_func.salvar(novoObjeto)

//     window.location.href = '../../pages/funcionario/index.html'

// }

// // 

// function validarSalvar() {

//     if (campo_descricao.value === '' || campo_descricao === null) {
//         alert("Descrição Vazio")
//         return true
//     }

//     return false

// }

// // 

// function deletar() {

//     // Validar Id
//     if (idParaEditar == -1) {
//         alert("Erro: ID inválido")
//         return
//     }

//     BD_func.excluir(idParaEditar)

//     window.location.href = '../../pages/funcionario/index.html'

// }

// // 

// function cancelar() {

//     window.location.href = '../../pages/funcionario/index.html'

// }

// //

// function popularComboBox() {
//     const data_Departamento = BD_dep.obterLista()

//     data_Departamento.forEach(departamento => {
//         let option = document.createElement("option");
//         option.id = departamento.id
//         option.value = departamento.id
//         option.innerHTML = departamento.descricao

//         // debugger
//         if (idParaEditar !== -1) {
//             if(departamento.id == data[data.findIndex(e => {return e.id == idParaEditar})].departamento) {
//                 option.selected = "selected"
//             }
//         }

//         select.appendChild(option)
//     })

// }

// // 

// function getSelectedComboBox() {
//     return parseInt(select.value)
// }