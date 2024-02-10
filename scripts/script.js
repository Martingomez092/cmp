const route = "http://127.0.0.1:5500/scripts/base.json";

fetch(route)
  .then((response) => response.json())
  .then((data) => {
    const selectGroup = document.getElementById("selectGroup");
    const selectDancers = document.getElementById("selectDancers");
    const searchBTN = document.getElementById("searchBTN");
    selectGroup.classList.add("form-select");
    selectDancers.classList.add("form-select");

    data.groups.forEach((group) => {
      const option = document.createElement("option");
      option.value = group.idGroup;
      option.text = group.name;
      selectGroup.appendChild(option);
    });

    selectGroup.addEventListener("change", () => {
      const selectedGroupId = parseInt(selectGroup.value);
      const selectedGroup = data.groups.find(
        (grupo) => grupo.idGroup === selectedGroupId
      );
      selectDancers.innerHTML =
        '<option value="">Selecciona un bailarín</option>';
      selectedGroup.dancers.forEach((dancer) => {
        const option = document.createElement("option");
        option.value = dancer.id;
        option.textContent = dancer.name;
        selectDancers.appendChild(option);
      });
    });

    selectDancers.addEventListener("change", function () {
      if (selectDancers.value !== "") {
        searchBTN.disabled = false;
      } else {
        searchBTN.disabled = true;
      }
    });

    function searchDancer() {
      const dancerSelected = selectDancers.value;
      const showResults = document.getElementById("results");
      showResults.classList.remove("d-none");
      // debo encontrar la bailarina con un find
      const group = data.groups.find((group) =>
        group.dancers.some((dancer) => dancer.id === parseInt(dancerSelected))
      );
      const dancer = group.dancers.find(
        (dancer) => dancer.id === parseInt(dancerSelected)
      );
      let paymentStatus = "";
      if (dancer.payment === true) {
        paymentStatus = `${dancer.name} pagó la cuota`;
      } else {
        paymentStatus = `${dancer.name} no pagó la cuota`;
      }
      const result = document.getElementById("payments-tab-pane");
      result.innerHTML = paymentStatus;
    }

    searchBTN.addEventListener("click", searchDancer);
  })
  .catch((error) => console.error("Error al cargar el archivo JSON", error));
