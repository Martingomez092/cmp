const route = "http://127.0.0.1:5500/scripts/base.json";

function saveData(data) {
  fetch('https://jsonbin.org/martingomez092/', {
    method: "POST",
    headers: {
      authorization: 'token 0b913a08-a18b-46ed-8dfc-a06909afc48a'
    },
    body: JSON.stringify(data)
  }).then(res => res.json());
}

function getData() {
  return fetch('https://jsonbin.org/martingomez092/', {
    method: "GET",
    headers: {
      authorization: 'token 0b913a08-a18b-46ed-8dfc-a06909afc48a'
    }
  }).then(res => res.json());
}


async function useData() {
  const promise = getData()
  const data = await promise; 
  console.log(data)
}

const objetin = { name: "agus"}
saveData(objetin)
getData()
useData()


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
        '<option value="">Selecciona una bailarina</option>';
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
        table.classList.add('table-striped')
        const thead = document.createElement('thead');
        const trHead = document.createElement('tr');
        const tbody = document.createElement('tbody');

    
        const headers = ['Fecha', 'Mes abonado', 'Valor cuota', 'Pagó', 'Saldo']
        headers.forEach( header => {
          const th = document.createElement('th')
          th.textContent = header;
          header == 'Valor cuota' ? th.classList.add('text-end') : "";
          header == 'Pagó' ? th.classList.add('text-end') : "";
          header == 'Saldo' ? th.classList.add('text-end') : "";
          trHead.appendChild(th);
        })

        const rows = dancer.payments;
        rows.forEach( (row, index) => {
          const trBody = document.createElement('tr');
          const tdDate = document.createElement('td');
          const tdMonth = document.createElement('td');
          const tdMonthValue = document.createElement('td');
          const tdPayment = document.createElement('td');
          const tdBalance = document.createElement('td');

          tdMonthValue.classList.add('text-end');
          tdPayment.classList.add('text-end');
          tdBalance.classList.add('text-end');

          tdDate.textContent = dancer.payments[index].date;
          tdMonth.textContent = dancer.payments[index].month;
          tdMonthValue.textContent = dancer.payments[index].monthValue;
          tdPayment.textContent = dancer.payments[index].payment;  
          tdBalance.textContent = tdMonthValue.textContent - tdPayment.textContent;
          tdBalance.textContent !== "0" ? tdBalance.style.color = "red" : tdBalance.style.color = "green";

        
          trBody.appendChild(tdDate);
          trBody.appendChild(tdMonth);
          trBody.appendChild(tdMonthValue);
          trBody.appendChild(tdPayment);
          trBody.appendChild(tdBalance);
          tbody.appendChild(trBody);
        } )
 
       
        thead.appendChild(trHead);
        table.appendChild(thead);
        table.appendChild(tbody);
        tableContainer.appendChild(table);    
      }

      // MUESTRO ALERT DE ACUERDO AL ESTADO DE LA DEUDA
      if (dancer.paymentStatus === true) {
        alertContainer = createAlert(`Cuenta al día`, `success`);

      } else {
        alertContainer = createAlert(`Saldo pendiente de pago`, `danger`);
      }

      // MUESTRO TABLA
      createTable()


    }

    searchBTN.addEventListener("click", searchDancer);
  })
  .catch((error) => console.error("Error al cargar el archivo JSON", error));