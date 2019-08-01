function load(){
    makeRequest("GET", "http://api.penheaven.site:8081/penHeavenAPI/api/access/catalogue/getAll")
    .then((response) => {
        console.info(response);
        const cat = response.data;
        loadPart2(cat);
    }).catch((error)=> {
        console.warn("Empty Catalogue Recieved" + error)
    });
}

function loadPart2(cat){
    const length = Object.keys(cat).length;
    const tableBody = document.getElementById('tableBody');
    for(i=0; i<length; i++){
        const item = cat[i];
        const newRow = tableBody.insertRow();
        // Add item id
        const idCell = newRow.insertCell(0);
        idCell.innerText = item.itemId;

        // Add item name
        const nameCell = newRow.insertCell(1);
        nameCell.innerText = item.itemName;

        //add item brand
        const brandCell = newRow.insertCell(2);
        brandCell.innerText =item.itemBrand;

        //add item colour
        const   colourCell = newRow.insertCell(3);
        colourCell.innerText =item.itemColour;

        //add item type
        const typeCell = newRow.insertCell(4);
        typeCell.innerText =item.itemType.toLowerCase();
    }
}