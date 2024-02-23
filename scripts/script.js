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

    // ALTERNO ATTR. DISABLE AL BOTÓN DE CONSULTAR
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

      // REFERENCIA DE LA TAB DE ASISTENCIAS
      // const resultAttendances = document.getElementById("attendances-tab-pane");

      // BUSCA EL GRUPO DONDE ESTÁ EL ID DE LA BAILARINA SELECCIONADA
      const group = data.groups.find(group =>
        group.dancers.some(dancer => dancer.id === parseInt(dancerSelected)));

      // BUSCA A LA BAILARINA DENTRO DEL GRUPO
      const dancer = group ? group.dancers.find(dancer => dancer.id === parseInt(dancerSelected)) :
        alert('No se encontró la bailarina seleccionada');

      function createAlert(message, status) {
        const alertContainer = document.getElementById('payment-status-alert');
        alertContainer.textContent = message;
        alertContainer.classList.add('alert');

        if (status === "success") {
          alertContainer.classList.add('alert-success');
          alertContainer.classList.remove('alert-danger');
        } else {
          alertContainer.classList.add('alert-danger');
          alertContainer.classList.remove('alert-success');
        }
      }

      // CREO TABLA
      function createTable() {
        const existingTable = document.querySelector('#payment-status-table table');
        existingTable ? existingTable.remove(): "";
        const tableContainer = document.getElementById('payment-status-table');
        const table = document.createElement('table');
        table.classList.add('table')
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');
        const headers = ['Fecha', 'Mes', 'Tipo', 'Monto']
        headers.forEach( header => {
          const th = document.createElement('th')
          th.textContent = header;
          tr.appendChild(th);
        })
        thead.appendChild(tr);
        table.appendChild(thead);
        tableContainer.appendChild(table);  
        
      }

      // MUESTRO ALERT DE ACUERDO AL ESTADO DE LA DEUDA
      if (dancer.paymentStatus === true) {
        alertContainer = createAlert(`Cuota al día`, `success`);

      } else {
        alertContainer = createAlert(`Cuota pendiente de pago`, `danger`);
      }

      // MUESTRO TABLA
      createTable()


    }

    searchBTN.addEventListener("click", searchDancer);
  })
  .catch((error) => console.error("Error al cargar el archivo JSON", error));