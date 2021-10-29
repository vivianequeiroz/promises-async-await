const el = document.getElementById("box");
const regexCep = /\d{3}\d{3}\d{2}/;

function toggleShow() {
  var invalidCep = document.getElementById("invalidCep");
  invalidCep.innerHTML = "";

  function validateCep() {
    if (!regexCep.test(el.value.toString())) {
      invalidCep.classList.add("invalidCepMessage");
      invalidCep.innerHTML = "CEP inválido, revise os números digitados.";
      console.log("teste cep invaldio");
      tableValues.innerHTML = "";
      console.log(!regexCep.test(el.value.toString()));
    } else {
      invalidCep.classList.remove("invalidCepMessage");
      invalidCep.innerHTML = "";
      getContent();
      console.log("teste valdio");
    }
  }

  validateCep();

  async function getContent() {
    try {
      var cepId = el.value.toString();
      const responseCep = await fetch(`http://localhost:3333/ceps/${cepId}`);
      console.log("responseCep", responseCep);
      console.log(cepId);
      const cepInfo = await responseCep.json();

      console.log("cepInfo", cepInfo);

      const responseCovid = await fetch(
        `https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${cepInfo.uf}`
      );
      console.log(responseCovid);
      const covidInfo = await responseCovid.json();

      if (cepInfo != undefined && covidInfo != undefined) {
        showData(cepInfo, covidInfo);
      } else {
        const invalidCep = document.getElementById("invalidCep");
        invalidCep.classList.toggle("redBorder");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function showData(cepInfo, covidInfo) {
    let localeFound = "";
    localeFound += `${cepInfo.localidade}`;

    document.getElementById("locale").innerHTML = localeFound;

    let confirmedCases = "";
    confirmedCases += `${covidInfo.cases}`;

    document.getElementById("confirmedCases").innerHTML = confirmedCases;

    let suspectedCases = "";
    suspectedCases += `${covidInfo.suspects}`;

    document.getElementById("suspectedCases").innerHTML = suspectedCases;

    let totalDeaths = "";
    totalDeaths += `${covidInfo.deaths}`;

    document.getElementById("totalDeaths").innerHTML = totalDeaths;
  }
}
