// José Rodrigo Lins de Barros - Matrícula: 01349064

// Use o comando no terminal: node gramatica.js


//Essa função eliminarRecursaoEsquerdaDireta recebe uma gramática como argumento e implementa o algoritmo para eliminar a recursão à esquerda direta na gramática. O algoritmo funciona da seguinte maneira:

//Obtém uma lista de todos os não-terminais da gramática.
//Itera sobre cada não-terminal, identificado como A.
//Obtém as regras de produção associadas ao não-terminal A.
//Inicia uma nova lista vazia chamada novasRegrasA para armazenar as novas regras de produção.
//Itera sobre os não-terminais que apareceram antes de A.
//Verifica se alguma das regras de produção de A começa com o não-terminal B.
//Se sim, para cada regra regraB do não-terminal B, concatena regraB com o restante da regra regraA a partir do segundo caractere (usando .slice(1)) e adiciona essa nova regra à lista novasRegrasA.
//Se não, adiciona a regra regraA diretamente à lista novasRegrasA.
//Cria duas listas vazias: novosNaoTerminais para armazenar as novas regras que não têm recursão à esquerda, e regrasRecursivasA para armazenar as regras recursivas removendo o primeiro caractere.
//Itera sobre as regras em novasRegrasA.
//Se alguma regra começa com o não-terminal A, adiciona a regra sem o primeiro caractere em regrasRecursivasA.
//Caso contrário, adiciona a regra em novosNaoTerminais.
//Se regrasRecursivasA tiver pelo menos uma regra, cria um novo não-terminal chamado novoNaoTerminal adicionando um apóstrofo ao final de A, e o adiciona em novosNaoTerminais.
//Cria uma lista vazia chamada novasRegrasRecursivasA.
//Itera sobre as regras em regrasRecursivasA e concatena cada regra com novoNaoTerminal e adiciona o resultado em novasRegrasRecursivasA.
//Atualiza a gramática adicionando novasRegrasRecursivasA ao não-terminal novoNaoTerminal.
//Atualiza a gramática removendo as regras antigas associadas a A e substituindo-as por novosNaoTerminais.

function eliminarRecursaoEsquerdaDireta(gramatica) {
  let naoTerminais = Object.keys(gramatica);

  for (let i = 0; i < naoTerminais.length; i++) {
    let A = naoTerminais[i];
    let regrasA = gramatica[A];
    let novasRegrasA = [];

    for (let j = 0; j < i; j++) {
      let B = naoTerminais[j];
      let regrasB = gramatica[B];

      for (let regraA of regrasA) {
        if (regraA[0] === B) {
          for (let regraB of regrasB) {
            novasRegrasA.push(regraB + regraA.slice(1));
          }
        } else {
          novasRegrasA.push(regraA);
        }
      }
    }

    let novosNaoTerminais = [];
    let regrasRecursivasA = [];

    for (let regraA of novasRegrasA) {
      if (regraA[0] === A) {
        regrasRecursivasA.push(regraA.slice(1));
      } else {
        novosNaoTerminais.push(regraA);
      }
    }

    if (regrasRecursivasA.length > 0) {
      let novoNaoTerminal = A + "'";
      novosNaoTerminais.push(novoNaoTerminal);

      let novasRegrasRecursivasA = [];

      for (let regra of regrasRecursivasA) {
        novasRegrasRecursivasA.push(regra + novoNaoTerminal);
      }

      gramatica[novoNaoTerminal] = novasRegrasRecursivasA;
    }

    gramatica[A] = novosNaoTerminais;
  }
}

//Essa função eliminarRecursaoEsquerdaIndireta recebe uma gramática como argumento e implementa o algoritmo para eliminar a recursão à esquerda indireta na gramática. O algoritmo funciona da seguinte maneira:

//Obtém uma lista de todos os não-terminais da gramática.
//Itera sobre cada não-terminal, identificado como A.
//Obtém as regras de produção associadas ao não-terminal A.
//Itera sobre os não-terminais que apareceram antes de A.
//Verifica se alguma das regras de produção de A começa com o não-terminal B.
//Se sim, para cada regra regraB do não-terminal B, concatena regraB com o restante da regra regraA a partir do segundo caractere (usando .slice(1)) e adiciona essa nova regra à lista novasRegrasA.
//Se não, adiciona a regra regraA diretamente à lista novasRegrasA.
//Atualiza a gramática substituindo as regras antigas associadas a A por novasRegrasA.

function eliminarRecursaoEsquerdaIndireta(gramatica) {
  let naoTerminais = Object.keys(gramatica);

  for (let i = 0; i < naoTerminais.length; i++) {
    let A = naoTerminais[i];
    let regrasA = gramatica[A];

    for (let j = 0; j < i; j++) {
      let B = naoTerminais[j];
      let regrasB = gramatica[B];
      let novasRegrasA = [];

      for (let regraA of regrasA) {
        if (regraA[0] !== B) {
          novasRegrasA.push(regraA);
        } else {
          for (let regraB of regrasB) {
            novasRegrasA.push(regraB + regraA.slice(1));
          }
        }
      }

      gramatica[A] = novasRegrasA;
    }
  }
}

//Essa função converterRegrasUnitarias recebe uma gramática como argumento e implementa o algoritmo para converter as regras unitárias na gramática. O algoritmo funciona da seguinte maneira:

//Obtém uma lista de todos os não-terminais da gramática.
//Itera sobre cada não-terminal, identificado como A.
//Obtém as regras de produção associadas ao não-terminal A.
//Inicia uma nova lista vazia chamada novasRegrasA para armazenar as novas regras de produção.
//Itera sobre as regras em regrasA.
//Verifica se a regra regraA tem apenas um caractere e se esse caractere é um não-terminal existente na gramática (gramatica[regraA]).
//Se sim, itera sobre as regras em gramatica[regraA] e adiciona cada regra em novasRegrasA.
//Se não, adiciona a regra regraA diretamente em novasRegrasA.
//Atualiza a gramática substituindo as regras antigas associadas a A por novasRegrasA.

function converterRegrasUnitarias(gramatica) {
  let naoTerminais = Object.keys(gramatica);

  for (let i = 0; i < naoTerminais.length; i++) {
    let A = naoTerminais[i];
    let regrasA = gramatica[A];
    let novasRegrasA = [];

    for (let regraA of regrasA) {
      if (regraA.length === 1 && gramatica[regraA]) {
        for (let regraB of gramatica[regraA]) {
          novasRegrasA.push(regraB);
        }
      } else {
        novasRegrasA.push(regraA);
      }
    }

    gramatica[A] = novasRegrasA;
  }
}

//Essa função converterParaFormaNormal recebe uma gramática como argumento e chama as funções eliminarRecursaoEsquerdaIndireta,
//eliminarRecursaoEsquerdaDireta e converterRegrasUnitarias para converter a gramática para a Forma Normal de Greibach.
//A Forma Normal de Greibach é uma forma canônica para representar gramáticas livres de contexto.

function converterParaFormaNormal(gramatica) {
  eliminarRecursaoEsquerdaIndireta(gramatica);
  eliminarRecursaoEsquerdaDireta(gramatica);
  converterRegrasUnitarias(gramatica);
}

//Esse trecho de código é um exemplo de uso das funções anteriores.
//Ele define uma gramática de exemplo e chama a função converterParaFormaNormal passando essa gramática como argumento.
//Em seguida, imprime a gramática resultante na Forma Normal de Greibach, exibindo cada não-terminal seguido de suas regras de produção.

// Exemplo de gramática
let gramatica = {
  'S': ['aAd', 'A'],
  'A': ['Bc', ''],
  'B': ['Aca']
};

converterParaFormaNormal(gramatica);

// Imprime a gramática na forma normal de Greibach
for (let naoTerminal in gramatica) {
  for (let regra of gramatica[naoTerminal]) {
    console.log(`${naoTerminal} -> ${regra}`);
  }
}
