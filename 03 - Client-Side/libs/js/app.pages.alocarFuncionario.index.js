const tabela = document.getElementById("tabelaFuncionario");
const campo_procura = document.getElementById("campoProcurarFuncionario");
const body = tabela.getElementsByTagName("tbody")[0];

//

onLoadPage();
listenCellClicked();

//

function onLoadPage() {
  dataToTable();
  estabelecerRelacoes();
}

//

function cellClicked(celula) {
  const elementClicked = celula.innerHTML;

  campo_procura.value = elementClicked

  procurarFuncionario()
}

//

function procurarLinhasNaTabelaFuncionario(param) {
  let linhasParaMostrar = [0];

  for (let linha = 1; linha < tabela.rows.length; linha++) {
    for (let coluna = 0; coluna < tabela.rows[linha].cells.length; coluna++) {
      if (
        tabela.rows[linha].cells[coluna].innerHTML
          .toLowerCase()
          .includes(param.toLowerCase().trim())
      ) {
        linhasParaMostrar.push(tabela.rows[linha].rowIndex);
      }
    }
  }

  return linhasParaMostrar;
}

//

function mostrarLinhasFuncionario(linhasParaMostrar) {
  if (linhasParaMostrar == [0]) {
    tabela.rows.forEach((linha) => {
      linhasParaMostrar.push(linha.rowIndex);
    });
  }

  for (let linha = 1; linha < tabela.rows.length; linha++) {
    tabela.rows[linha].style.display = "none";
  }

  linhasParaMostrar.forEach((linhaParaMostrar) => {
    tabela.rows[linhaParaMostrar].style.display = "";
  });
}

//

function adicionarLinha(id, descricao) {
  let novaLinha = body.insertRow(body.rows.length);

  let colunaId = novaLinha.insertCell();
  let colunaDescricao = novaLinha.insertCell();

  colunaId.innerHTML = id;
  colunaDescricao.innerHTML = descricao;
}

//

function procurarFuncionario() {
  const textoDeProcura = campo_procura.value;

  const tbl_linhasParaMostrar =
    procurarLinhasNaTabelaFuncionario(textoDeProcura);

  mostrarLinhasFuncionario(tbl_linhasParaMostrar);
}

//

function dataToTable() {
  const data_Funcionario = JSON.parse(
    localStorage.getItem("data_tabelaFuncionario")
  );
  const data_Departamento = JSON.parse(
    localStorage.getItem("data_tabelaDepartamento")
  );

  data_Funcionario.forEach((funcionario) => {
    const index_departamento = data_Departamento.findIndex((e) => {
      return e.id == funcionario.departamento;
    });

    if (
      data_Departamento.every((departamento) => {
        return funcionario.departamento != departamento.id
      })
    ) {
      adicionarLinha(funcionario.descricao, "Nenhum");
    }

    if (data_Departamento[index_departamento]) {
      adicionarLinha(
        funcionario.descricao,
        data_Departamento[index_departamento].descricao
      );
    }
  });
}

//

function listenCellClicked() {
  body.addEventListener("click", (event) => {
    cellClicked(event.target);
  });
}

//

// Relação estabelecida Funcionario (1..n) -> Departamento (n..1)
function estabelecerRelacoes() {
  const data_Departamento = JSON.parse(
    localStorage.getItem("data_tabelaDepartamento")
  );
  const data_Funcionario = JSON.parse(
    localStorage.getItem("data_tabelaFuncionario")
  );

  const funcionarios_semRelacao = data_Funcionario.filter(
    (item_funcionario) => {
      return relacaoExist(item_funcionario);
    }
  );

  funcionarios_semRelacao.forEach(function (item_funcionario) {
    const departamento_index = data_Departamento.findIndex(function (
      item_departamento
    ) {
      return item_departamento.id == item_funcionario.departamento;
    });

    if (data_Departamento[departamento_index])
      data_Departamento[departamento_index].funcionarios.push(
        item_funcionario.id
      );
  });
}

//

// Return Boolean
function relacaoExist(item_funcionario) {
  const data_Departamento = JSON.parse(
    localStorage.getItem("data_tabelaDepartamento")
  );

  return data_Departamento.every((element) => {
    return (
      element.funcionarios.forEach((e) => {
        return e;
      }) != item_funcionario.departamento
    );
  });
}

//

campo_procura.addEventListener("keyup", function () {
  procurarFuncionario();
});
