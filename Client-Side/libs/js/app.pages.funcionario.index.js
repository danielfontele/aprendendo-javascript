let app = { pages: { funcionario: {} } };

app.pages.funcionario.index = function($el) {
    if(!$el) throw ("Elemento não definido")

    this.$el = $el;
    this.BD_func = new bd("data_tabelaFuncionario")

    this.initialize();
}

app.pages.funcionario.index.prototype = {
    initialize: function () {
        // Mapear Campos
        this.$elTabela = this.$el.parentElement.querySelector('#tabelaFuncionario');
        this.$elCampo_procura = this.$el.parentElement.querySelector('#campoProcurarFuncionario')
        this.$elBody = this.$el.parentElement.getElementsByTagName('tbody')[0]

        // Preparar Componentes
        this.prepareComponente()


        // Ligar os Eventos
        this.ligarEventos()

    },

    prepareComponente: function () {
        this.dataToTable()
        this.estabelecerRelacoes()
    },

    ligarEventos: function () {
        this.listenRowClicked()
        
        let _this = this;

        this.$elCampo_procura.addEventListener("keyup", () => _this.procurarFuncionario());
    },

    rowClicked: function (row) {

        const idClicked = row.cells[0].innerHTML
    
    
        window.location.href = '../../pages/funcionario/edit.html?id=' + idClicked
    
    },

    procurarLinhasNaTabelaFuncionario: function (param) {

        let linhasParaMostrar = [0]
    
        for (let linha = 1; linha < this.$elTabela.rows.length; linha++) {
            for (let coluna = 0; coluna < this.$elTabela.rows[linha].cells.length; coluna++) {
                if (this.$elTabela.rows[linha].cells[coluna].innerHTML.toLowerCase().includes(param.toLowerCase().trim())) {
                    linhasParaMostrar.push(this.$elTabela.rows[linha].rowIndex)
                }
            }
        }
    
        return linhasParaMostrar
    
    },

    mostrarLinhasFuncionario: function (linhasParaMostrar) {

        if (linhasParaMostrar == [0]) {
            this.$elTabela.rows.forEach(linha => {
                linhasParaMostrar.push(linha.rowIndex)
            });
        }
    
    
        for (let linha = 1; linha < this.$elTabela.rows.length; linha++) {
            this.$elTabela.rows[linha].style.display = 'none'
        }
    
    
        linhasParaMostrar.forEach((linhaParaMostrar) => {
            this.$elTabela.rows[linhaParaMostrar].style.display = ''
        });
    
    },

    adicionarLinha: function (id, descricao) {

        let novaLinha = this.$elBody.insertRow(this.$elBody.rows.length)
    
        let colunaId = novaLinha.insertCell();
        let colunaDescricao = novaLinha.insertCell();
    
    
        colunaId.innerHTML = id
        colunaDescricao.innerHTML = descricao
    
    },
    
    procurarFuncionario: function () {
    
        const textoDeProcura = this.$elCampo_procura.value;
    
        const tbl_linhasParaMostrar = this.procurarLinhasNaTabelaFuncionario(textoDeProcura)
    
    
        this.mostrarLinhasFuncionario(tbl_linhasParaMostrar)
    },
    
    novo: function () {
    
        window.location.href = '../../pages/funcionario/edit.html'
    
    },
    
    dataToTable: function () {
    
        this.BD_func.obterLista().forEach(linha => {
            this.adicionarLinha(linha.id, linha.descricao)
    
        });
    
    },
    
    listenRowClicked: function () {
    
        this.$elBody.addEventListener("click", (event) => {
            this.rowClicked(event.target.parentElement)
        })
    
    },
    
    // Relação estabelecida Funcionario (1..n) -> Departamento (n..1)
    estabelecerRelacoes: function () {
        
        const BD_dep = new bd("data_tabelaDepartamento")

        const data_Departamento = BD_dep.obterLista()
        const data_Funcionario = this.BD_func.obterLista()
    
        
        const funcionarios_semRelacao = data_Funcionario.filter(item_funcionario => {
            return this.relacaoExist(item_funcionario)
        })
        
        funcionarios_semRelacao.forEach(function (item_funcionario) {
    
            const departamento_index = data_Departamento.findIndex(function (item_departamento) {
                return item_departamento.id == item_funcionario.departamento
            }) || -1
    
            if(data_Departamento[departamento_index]) data_Departamento[departamento_index].funcionarios.push(item_funcionario.id)    
    
        })
    
    },
    
    // 
    
    // Return Boolean
    relacaoExist: function (item_funcionario) {
    
        const BD_dep = new bd("data_tabelaDepartamento")

        return BD_dep.obterLista().every(element => {
            return element.funcionarios.forEach(e => {
                return e
            }) != item_funcionario.departamento
        });
    
    },

}

















// // // Código antes de refatorar p/ prototype


// const tabela = document.getElementById('tabelaFuncionario');
// const campo_procura = document.getElementById('campoProcurarFuncionario')
// const body = tabela.getElementsByTagName('tbody')[0]

// // 

// const BD_func = new bd("data_tabelaFuncionario")
// const BD_dep = new bd("data_tabelaDepartamento")

// // 

// onLoadPage()
// listenRowClicked()

// // ok

// function onLoadPage() {

//     dataToTable()
//     estabelecerRelacoes()

// }

// // ok

// function rowClicked(row) {

//     const idClicked = row.cells[0].innerHTML


//     window.location.href = '../../pages/funcionario/edit.html?id=' + idClicked

// }

// // ok

// function procurarLinhasNaTabelaFuncionario(param) {

//     let linhasParaMostrar = [0]

//     for (let linha = 1; linha < tabela.rows.length; linha++) {
//         for (let coluna = 0; coluna < tabela.rows[linha].cells.length; coluna++) {
//             if (tabela.rows[linha].cells[coluna].innerHTML.toLowerCase().includes(param.toLowerCase().trim())) {
//                 linhasParaMostrar.push(tabela.rows[linha].rowIndex)
//             }
//         }
//     }

//     return linhasParaMostrar

// }

// // ok

// function mostrarLinhasFuncionario(linhasParaMostrar) {

//     if (linhasParaMostrar == [0]) {
//         tabela.rows.forEach(linha => {
//             linhasParaMostrar.push(linha.rowIndex)
//         });
//     }


//     for (let linha = 1; linha < tabela.rows.length; linha++) {
//         tabela.rows[linha].style.display = 'none'
//     }


//     linhasParaMostrar.forEach((linhaParaMostrar) => {
//         tabela.rows[linhaParaMostrar].style.display = ''
//     });

// }

// // 

// function adicionarLinha(id, descricao) {

//     let novaLinha = body.insertRow(body.rows.length)

//     let colunaId = novaLinha.insertCell();
//     let colunaDescricao = novaLinha.insertCell();


//     colunaId.innerHTML = id
//     colunaDescricao.innerHTML = descricao

// }

// // 

// function procurarFuncionario() {

//     const textoDeProcura = campo_procura.value;

//     const tbl_linhasParaMostrar = procurarLinhasNaTabelaFuncionario(textoDeProcura)


//     mostrarLinhasFuncionario(tbl_linhasParaMostrar)
// }

// // 

// function novo() {

//     window.location.href = '../../pages/funcionario/edit.html'

// }

// // 

// function dataToTable() {

//     BD_func.obterLista().forEach(linha => {
//         adicionarLinha(linha.id, linha.descricao)

//     });

// }

// // 

// function listenRowClicked() {

//     body.addEventListener("click", (event) => {
//         rowClicked(event.target.parentElement)
//     })

// }

// // 

// // Relação estabelecida Funcionario (1..n) -> Departamento (n..1)
// function estabelecerRelacoes() {

//     const data_Departamento = BD_dep.obterLista()
//     const data_Funcionario = BD_func.obterLista()

    
//     const funcionarios_semRelacao = data_Funcionario.filter(item_funcionario => {
//         return relacaoExist(item_funcionario)
//     })
    
//     funcionarios_semRelacao.forEach(function (item_funcionario) {

//         const departamento_index = data_Departamento.findIndex(function (item_departamento) {
//             return item_departamento.id == item_funcionario.departamento
//         }) || -1

//         if(data_Departamento[departamento_index]) data_Departamento[departamento_index].funcionarios.push(item_funcionario.id)    

//     })

// }

// // 

// // Return Boolean
// function relacaoExist(item_funcionario) {

//     return BD_dep.obterLista().every(element => {
//         return element.funcionarios.forEach(e => {
//             return e
//         }) != item_funcionario.departamento
//     });

// }

// campo_procura.addEventListener("keyup", function () {
//     procurarFuncionario();
// });