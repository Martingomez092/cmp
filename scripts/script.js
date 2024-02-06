const route = 'http://127.0.0.1:5500/scripts/base.json'

   fetch(route)
      .then(response => response.json())
      .then(data => {
         const selectGroup = document.getElementById('selectGroup');
         const selectDancers = document.getElementById('selectDancers')
         selectGroup.classList.add('form-select');
         selectDancers.classList.add('form-select')

         data.groups.forEach(group => {
            const option = document.createElement('option');
            option.value = group.idGroup; 
            option.text = group.name; 
            selectGroup.appendChild(option);        
         });

         selectGroup.addEventListener('change', () => {
            const selectedGroupId = parseInt(selectGroup.value);
            const selectedGroup = data.groups.find(grupo => grupo.idGroup === selectedGroupId);
            selectDancers.innerHTML = '<option value="">Selecciona un bailarín</option>';
            selectedGroup.dancers.forEach(dancer => {
              const option = document.createElement('option');
              option.value = dancer.id;
              option.textContent = dancer.name;
              selectDancers.appendChild(option);
            });

         })

      })
      .catch(error => console.error('Error al cargar el archivo JSON', error));



