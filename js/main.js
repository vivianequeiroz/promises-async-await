function toggleShow() {
  var el = document.getElementById("box");
  el.classList.toggle("show");

  async function getContent() {
    try {
      var cepId = el.value;
      const response = await fetch(`http://localhost:3333/ceps/${cepId}`);
      console.log(response);
      console.log(cepId);

      const data = await response.json();
      showData(data);
    } catch (error) {
      console.log(error);
    }
  }

  getContent();

  function showData(users) {
    let output = "";

    for (let user of users) {
      output += `<li>${user.name}</li>`;
    }

    document.querySelector("p").innerHTML = output;
  }
}
