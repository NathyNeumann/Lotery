// função que gera 6 números aleatórios e os retona num array
function aleatorios() {
    let sorteioAle = [];
    for (let i = 0; sorteioAle.length < 6; i++) {
        let aleatorio = Number((Math.random() * 60).toFixed(0));
        if (sorteioAle.indexOf(aleatorio)== -1) {
            sorteioAle.push(aleatorio)
        }
    }
    return sorteioAle;
}
//armazenar valores digitados pelo usuário (entre 6 e 15 numeros - de 1 a 60 sem repetir)
let aposta = [];
document.querySelector('input[value="ARMAZENAR"]').addEventListener('click',armazenarNumero);
function armazenarNumero() {
    if (aposta.length < 15) {
        let num = Number(document.getElementById("idAposta").value);
        if (num <= 0 || num > 60 || isNaN(num)) {
            alert("número inválido");
        } else {
            if (aposta.indexOf(num) == -1){
                aposta.push(num);
            } else {
                alert("número reptido!")
            }
            document.getElementById("idAposta").value = "";
            document.getElementById("idAposta").focus();
        }
    } else {
        alert("Chega de números! Máximo 15.")
    }
    //mostra os números digitados pelo usuário
    aposta.sort((a,b)=>a-b)
    document.getElementById("idSaida1").value = aposta.join(" - ");
}

//compara os valores - usuario e aleatorio e o tempo 
document.querySelector('input[value="CALCULAR"]').addEventListener('click', rodar);
function rodar() {
    //pega o momento que pediu para verificar
    var antes = Date.now();

    //verifica se o usuário digitou no mim 6 digitos 
    if (aposta.length < 6) {
        alert("mínimo 6 números!");
    } else {
        //exibe campos de resultados html
        document.getElementById("exibir").hidden = false;
        //controle do acerto dos 6 numetos 
        let stop = true;
        //conta quantos sorteios foram realizados
        let repeticao = 0;
        do {
            
            //chama a funcao para dos numeros aleatorios, guarda os valores para comparar e mostra no console
            let outroSorte = aleatorios().sort((a,b)=>a-b);
            console.log(outroSorte.join(" - "));

            //zera o contador de numeros acertados
            let contador = 0;

            //faz a comparação de cada valor usuário e numeros aleatorios se compativel soma 1
            for (let index = 0; index < aposta.length; index++) {
                for (let j = 0; j < outroSorte.length; j++) {
                    if (aposta[index] == outroSorte[j]) {
                        contador++;
                    }
                }
            }
            //se 6 numeros baterem mostra os números sorteados e o intervalo de tempo que demorou.
            if (contador == 6) {
                document.getElementById("idSaida2").innerHTML = "<p>Os números sorteados foram: <strong> " + outroSorte.join(" - ")+"</strong></p>";
                var duracao = (Date.now() - antes) / 1000;

                stop = false;
            }
            repeticao++
        } while (stop)

        let propabilidade;
        let valorUnitario = 0;
        let valorToral = 0;
        switch(aposta.length){
            case 6: 
            valorUnitario = 2.50;
            valorToral = valorUnitario * repeticao;
            propabilidade = "1 em 50 milhões";
            break;
            case 7: 
            valorUnitario = 17.50;
            valorToral = valorUnitario * repeticao;
            propabilidade = "1 em 7,1 milhões.";
            break;
            case 8: 
            valorUnitario = 70.00;
            valorToral = valorUnitario * repeticao;
            propabilidade = "1 em 1,78 milhões.";
            break;
            case 9: 
            valorUnitario = 210.00;
            valorToral = valorUnitario * repeticao;
            propabilidade = "1 em 595,9 mil.";
            break;
            case 10: 
            valorUnitario = 525.00;
            valorToral = valorUnitario * repeticao;
            propabilidade = "1 em 238,3 mil.";
            break;
            case 11: 
            valorUnitario = 1155.00;
            valorToral = valorUnitario * repeticao;
            propabilidade = "1 em 108,3 mil.";
            break;
            case 12: 
            valorUnitario = 2310.00;
            valorToral = valorUnitario * repeticao;
            propabilidade = "1 em 54,1 mil.";
            break;
            case 13: 
            valorUnitario = 4290.00;
            valorToral = valorUnitario * repeticao;
            propabilidade = "1 em 29,1 mil.";
            break;
            case 14: 
            valorUnitario = 7507.50;
            valorToral = valorUnitario * repeticao;
            propabilidade = "1 em 16,6 mil.";
            break;
            case 15: 
            valorUnitario = 12512.50;
            valorToral = valorUnitario * repeticao;
            propabilidade = "1 em 10 mil.";
            break;
        }
        //exibição para os usuários
        document.getElementById("idSaida2").innerHTML += "<p> Foram  realizados <strong>" + repeticao + "</strong> sorteios até que você acertasse todos os 6 números.</p>";
        document.getElementById("idSaida2").innerHTML += "<p> Tempo de processamento: <strong> " + duracao + "</strong> segundos.</p>";
        document.getElementById("idSaida2").innerHTML += "<p> Você teria gasto R$ "+valorUnitario.toFixed(2).replace(".", ',') +" por bilhete com essa mesma aposta.<br> Num total de <strong> R$ "+ valorToral.toFixed(2).replace(".", ',')+ "</strong>  em apostas até ser sorteado.</p>";
        document.getElementById("idSaida2").innerHTML += "<p> Sua propapiblidade média é de ganhar é cerca de <strong>"+ propabilidade+ "</strong></p>";
    }
}
