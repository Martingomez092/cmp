const route = 'http://127.0.0.1:5500/scripts/base.json'

   fetch(route)
      .then(response => response.json())
      .then(data => {
         const groupsSel = document.getElementById("groups");
        groupsSel.classList.add('form-select')
         data.groups.forEach(group => {
            const option = document.createElement('option');
            option.value = group.id; 
            option.text = group.name; 
            groupsSel.appendChild(option);
         });
      })
      .catch(error => console.error('Error al cargar el archivo JSON', error));



