// Set para armazenar todos os números sorteados
let numerosSorteados = new Set();

function realizarSorteio() {
    if (numerosSorteados.size >= 99) {
        alert("Todos os números já foram sorteados!");
        return;
    }

    let numerosPossiveis = Array.from({ length: 99 }, (_, i) => i + 1);

    // Remover os números já sorteados do conjunto de números possíveis
    numerosPossiveis = numerosPossiveis.filter(numero => !numerosSorteados.has(numero));

    // Sortear um número entre os números possíveis restantes
    const indiceSorteado = Math.floor(Math.random() * numerosPossiveis.length);
    const numeroSorteado = numerosPossiveis[indiceSorteado];

    // Adicionar o número sorteado ao conjunto de números sorteados
    numerosSorteados.add(numeroSorteado);

    // Atualizar o número sorteado na tela
    document.getElementById("numero-sorteado").innerText = numeroSorteado.toString().padStart(2, '0');

    // Adicionar o número sorteado aos últimos 5 números sorteados
    ultimosNumerosSorteados.push(numeroSorteado);
    if (ultimosNumerosSorteados.length > 5) {
        ultimosNumerosSorteados.shift();
    }

    // Atualizar os últimos 5 números sorteados na tela
    atualizarUltimosNumeros();

    // Atualizar todos os números sorteados na tela
    atualizarTodosNumeros();
}

function resetarBingo() {
    // Limpar o conjunto de números sorteados
    numerosSorteados.clear();

    // Limpar os últimos 5 números sorteados
    ultimosNumerosSorteados = [];

    // Atualizar o número sorteado na tela para "-"
    document.getElementById("numero-sorteado").innerText = "-";

    // Limpar os últimos 5 números sorteados na tela
    document.getElementById("ultimos-numeros").innerHTML = "";

    // Limpar todos os números sorteados na tela
    document.getElementById("todos-numeros").innerHTML = "";
}

function atualizarUltimosNumeros() {
    const ultimosNumerosElement = document.getElementById("ultimos-numeros");
    ultimosNumerosElement.innerHTML = "";

    // Adicionar os últimos 5 números sorteados à lista
    ultimosNumerosSorteados.forEach(numero => {
        const li = document.createElement("li");
        li.textContent = numero.toString().padStart(2, '0'); // Formatar para sempre exibir 2 dígitos
        li.classList.add("numero-medio");
        ultimosNumerosElement.appendChild(li);
    });
}

function atualizarTodosNumeros() {
    const todosNumerosElement = document.getElementById("todos-numeros");
    todosNumerosElement.innerHTML = "";

    // Converter o conjunto de números sorteados em uma lista e ordenar
    const numerosOrdenados = Array.from(numerosSorteados).sort((a, b) => a - b);

    // Adicionar todos os números sorteados à lista
    let contador = 0;
    let linhaAtual = document.createElement("li");
    numerosOrdenados.forEach(numero => {
        const li = document.createElement("li");
        li.textContent = numero.toString().padStart(2, '0'); // Formatar para sempre exibir 2 dígitos
        linhaAtual.appendChild(li);
        contador++;
        if (contador % 10 === 0) {
            todosNumerosElement.appendChild(linhaAtual);
            linhaAtual = document.createElement("li");
        }
    });
    if (contador % 10 !== 0) {
        todosNumerosElement.appendChild(linhaAtual);
    }
}