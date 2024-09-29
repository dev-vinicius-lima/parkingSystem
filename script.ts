interface VeiculoProps {
  nome: string;
  placa: string;
  entrada: Date | string;
  salvo?: boolean;
}

(function () {
  const $ = (query: string): HTMLInputElement | null =>
    document.querySelector(query);

  function calcTempo(mil: number) {
    const min = Math.floor(mil / 60000);
    const seg = Math.floor(mil % 60000) / 1000;

    return `${min}m e ${seg}s`;
  }

  function patio() {
    function ler(): VeiculoProps[] {
      return localStorage.patio ? JSON.parse(localStorage.patio) : [];
    }

    function salvar(veiculo: VeiculoProps[]) {
      localStorage.setItem("patio", JSON.stringify(veiculo));
    }

    function adicionar({ nome, placa, entrada, salvo }: VeiculoProps) {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${nome}</td> <td>${placa}</td> <td>${entrada}</td> <td><button class="delete" data-placa="${placa}">X</button></td>`;

      row.querySelector(".delete")?.addEventListener("click", function () {
        remover(this.dataset.placa);
        window.location.reload();
      });

      $("#patio")?.appendChild(row);
      if (salvo) salvar([...ler(), { nome, placa, entrada }]);
    }

    function remover(placa: string) {
      const { entrada, nome } = ler().find(
        (veiculo) => veiculo.placa === placa
      );
      const tempo = calcTempo(
        (new Date() as any).getTime() - (new Date(entrada) as any).getTime()
      );

      if (
        !confirm(
          `Deseja remover o veiculo ${nome} do patio? \nTempo de permanencia: ${tempo}`
        )
      )
        return;
      {
        salvar(ler().filter((veiculo) => veiculo.placa !== placa));
        window.location.reload();
        render();
      }
    }

    function render() {
      localStorage;
      const patio = ler();

      if (patio.length) {
        patio.map(({ nome, placa, entrada }: VeiculoProps) => {
          adicionar({ nome, placa, entrada });
        });
      }
    }

    return { ler, adicionar, remover, salvar, render };
  }

  patio().render();
  $("#cadastrar")?.addEventListener("click", () => {
    const nome = $("#nome")?.value;
    const placa = $("#placa")?.value;

    if (nome && placa) {
      patio().adicionar({
        nome,
        placa,
        salvo: true,
        entrada: new Date().toISOString(),
      });
    } else {
      alert("Nome e placa sao obrigatorios!");
    }
  });
})();
