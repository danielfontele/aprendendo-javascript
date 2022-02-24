let app = { pages: { departamento: {} } };

app.pages.departamento.index = function($el) {
    if(!$el) throw ("Elemento não definido")

    this.$el = $el;
    this.BD_dep = new bd("data_tabelaDepartamento")

    this.initialize();
}

app.pages.departamento.index.prototype = {
    initialize: function () {
        // Mapear Campos
        this.$elTabela = this.$el.parentElement.querySelector('#tabelaDepartamento');
        this.$elCampo_procura = this.$el.parentElement.querySelector('#campoProcurarDepartamento')
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

        this.$elCampo_procura.addEventListener("keyup", () => _this.procurarDepartamento());
    },

    rowClicked: function (row) {

        const idClicked = row.cells[0].innerHTML
    
    
        window.location.href = '../../pages/departamento/edit.html?id=' + idClicked
    
    },

    procurarLinhasNaTabelaDepartamento: function (param) {

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

    mostrarLinhasDepartamento: function (linhasParaMostrar) {

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
    
    procurarDepartamento: function () {
    
        const textoDeProcura = this.$elCampo_procura.value;
    
        const tbl_linhasParaMostrar = this.procurarLinhasNaTabelaDepartamento(textoDeProcura)
    
    
        this.mostrarLinhasDepartamento(tbl_linhasParaMostrar)
    },
    
    novo: function () {
    
        window.location.href = '../../pages/departamento/edit.html'
    
    },
    
    dataToTable: function () {
    
        this.BD_dep.obterLista().forEach(linha => {
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
        
        const BD_func = new bd("data_tabelaFuncionario")

        const data_Departamento = this.BD_dep.obterLista()
        const data_Funcionario = BD_func.obterLista()
    
        
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

        const lista = this.BD_dep.obterLista()

        return lista.every(element => {
            return element.funcionarios.forEach(e => {
                return e
            }) != item_funcionario.departamento
        });
    
    },

}











// const tabela = document.getElementById('tabelaDepartamento');
// const campo_procura = document.getElementById('campoProcurarDepartamento')
// const body = tabela.getElementsByTagName('tbody')[0]

// // 

// const BD_func = new bd("data_tabelaFuncionario")
// const BD_dep = new bd("data_tabelaDepartamento")

// // 

// onLoadPage()
// listenRowClicked()

// // 

// function onLoadPage() {

//     BD_dep.initialize();


//     dataToTable()
//     estabelecerRelacoes()

// }

// // 

// function rowClicked(row) {

//     const idClicked = row.cells[0].innerHTML


//     window.location.href = '../../pages/departamento/edit.html?id=' + idClicked

// }

// // 

// function procurarLinhasNaTabelaDepartamento(param) {

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

// // 

// function mostrarLinhasDepartamento(linhasParaMostrar) {

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

// function procurarDepartamento() {

//     const textoDeProcura = campo_procura.value;

//     const tbl_linhasParaMostrar = procurarLinhasNaTabelaDepartamento(textoDeProcura)


//     mostrarLinhasDepartamento(tbl_linhasParaMostrar)

// }

// // 

// function novoDepartamento() {

//     window.location.href = '../../pages/departamento/edit.html'

// }

// // 

// function dataToTable() {

//     BD_dep.obterLista().forEach(linha => {
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
//         })

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
//     procurarDepartamento();
// });