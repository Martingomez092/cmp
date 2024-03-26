const formCreateGroups = document.getElementById('formCreateGroups');
const nameGroup = document.getElementById('nameGroup');
const descriptionGroup = document.getElementById('descriptionGroup');

async function useData() {
    const promise = getData()
    const data = await promise; 

    let listGroups = data.groups;

    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
    
    function submitCreateGroup(event) {
        event.preventDefault();
        const nameGroupValue = nameGroup.value;
        const descriptionGroupValue = descriptionGroup.value;
        const uuid = generateUUID();
        const newGroup = { name: nameGroupValue, description: descriptionGroupValue, id: uuid };
        const inValidNames = ["", " ", "  "];
        if (!inValidNames.includes(nameGroupValue)) {
            listGroups.push(newGroup);
        }    
        saveData({groups: listGroups})
        
    }
    
    formCreateGroups.addEventListener('submit', submitCreateGroup);
  }

useData()

