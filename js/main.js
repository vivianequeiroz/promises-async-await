const el = document.getElementById("box");

let locale = document.getElementById("locale");
let cases = document.getElementById("confirmedCases");
let suspects = document.getElementById("suspectedCases");
let deaths = document.getElementById("totalDeaths");
let invalidCep = document.getElementById("invalidCep");

const invalidCepMessage = "CEP inválido, revise os números digitados.";

const regexCep = /(^[0-9]{5})-?([0-9]{3}$)/;

let zipCode = "";
el.addEventListener("keyup", ({ key }) => {
  zipCode = el.value;
  if (zipCode)
    if (zipCode.length === 6) {
      el.value = `${zipCode.substr(0, 5)}-${zipCode.substr(5, 9)}`;
      console.log(zipCode);
    }
  if (key === "Enter") {
    toggleShow();
  }
});

// el.addEventListener("onkeyup", mask.init(this, mask.cep));
// const mask = {
//   init: function (object, mask) {
//     let obj = object;
//     let mask = mask;
//     setTimeout("mask.execMask", 1);
//   },

//   execMask: function () {
//     obj.value = mask(obj.value);
//   },

//   cep: function (cep) {
//     cep = cep.replace(/\D/g, "");
//     cep = cep.replace(/^(\d{2})(\d)/, "$1.$2");
//     cep = cep.replace(/\.(\d{3})(\d)/, ".$1-$2");
//     return cep;
//   },
// };

el.add;

function toggleShow() {
  invalidCep.innerHTML = "";

  function validateCep() {
    if (!regexCep.test(el.value.toString())) {
      addInvalidCepAttributes();
    } else {
      invalidCep.classList.remove("invalidCepMessage");
      invalidCep.innerHTML = "";

      getContent();
    }
  }

  validateCep();

  async function getContent() {
    try {
      let cepId = el.value.toString();

      const responseCep = await fetch(`http://localhost:3333/ceps/${cepId}`);
      const cepInfo = await responseCep.json();

      const responseCovid = await fetch(
        `https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${cepInfo.uf}`
      );
      const covidInfo = await responseCovid.json();

      showData(cepInfo, covidInfo);
    } catch (error) {
      console.log("Ocorreu um erro ;(", error);
    }
  }

  function showData(cepInfo, covidInfo) {
    if (cepInfo.localidade === undefined) {
      addInvalidCepAttributes();
    } else {
      locale.innerHTML = `${cepInfo.localidade}`;
      cases.innerHTML = `${covidInfo.cases}`;
      suspects.innerHTML = `${covidInfo.suspects}`;
      deaths.innerHTML = `${covidInfo.deaths}`;
    }
  }

  function addInvalidCepAttributes() {
    invalidCep.classList.add("invalidCepMessage");
    invalidCep.innerHTML = invalidCepMessage;

    locale.innerHTML =
      cases.innerHTML =
      suspects.innerHTML =
      deaths.innerHTML =
        "";
  }
}
