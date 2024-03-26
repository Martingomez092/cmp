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
  

  getData()
