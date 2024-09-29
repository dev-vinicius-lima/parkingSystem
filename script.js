var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
(function () {
    var _a;
    var $ = function (query) {
        return document.querySelector(query);
    };
    function calcTempo(mil) {
        var min = Math.floor(mil / 60000);
        var seg = Math.floor(mil % 60000) / 1000;
        return "".concat(min, "m e ").concat(seg, "s");
    }
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function salvar(veiculo) {
            localStorage.setItem("patio", JSON.stringify(veiculo));
        }
        function adicionar(_a) {
            var _b, _c;
            var nome = _a.nome, placa = _a.placa, entrada = _a.entrada, salvo = _a.salvo;
            var row = document.createElement("tr");
            row.innerHTML = "<td>".concat(nome, "</td> <td>").concat(placa, "</td> <td>").concat(entrada, "</td> <td><button class=\"delete\" data-placa=\"").concat(placa, "\">X</button></td>");
            (_b = row.querySelector(".delete")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
                remover(this.dataset.placa);
                window.location.reload();
            });
            (_c = $("#patio")) === null || _c === void 0 ? void 0 : _c.appendChild(row);
            if (salvo)
                salvar(__spreadArray(__spreadArray([], ler(), true), [{ nome: nome, placa: placa, entrada: entrada }], false));
        }
        function remover(placa) {
            var _a = ler().find(function (veiculo) { return veiculo.placa === placa; }), entrada = _a.entrada, nome = _a.nome;
            var tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
            if (!confirm("Deseja remover o veiculo ".concat(nome, " do patio? \nTempo de permanencia: ").concat(tempo)))
                return;
            {
                salvar(ler().filter(function (veiculo) { return veiculo.placa !== placa; }));
                window.location.reload();
                render();
            }
        }
        function render() {
            localStorage;
            var patio = ler();
            if (patio.length) {
                patio.map(function (_a) {
                    var nome = _a.nome, placa = _a.placa, entrada = _a.entrada;
                    adicionar({ nome: nome, placa: placa, entrada: entrada });
                });
            }
        }
        return { ler: ler, adicionar: adicionar, remover: remover, salvar: salvar, render: render };
    }
    patio().render();
    (_a = $("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        var _a, _b;
        var nome = (_a = $("#nome")) === null || _a === void 0 ? void 0 : _a.value;
        var placa = (_b = $("#placa")) === null || _b === void 0 ? void 0 : _b.value;
        if (nome && placa) {
            patio().adicionar({
                nome: nome,
                placa: placa,
                salvo: true,
                entrada: new Date().toISOString()
            });
        }
        else {
            alert("Nome e placa sao obrigatorios!");
        }
    });
})();
