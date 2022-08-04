//Local storgae set up




let savedList = JSON.parse(localStorage.getItem('savedList')) || [];

//Example

// const savedList = localStorage.getItem('list') || '{}';
// const collection = JSON.parse(savedList).collection || [];
// localStorage.setItem('collection', JSON.stringify({
//      collection: [{
//          id: 213,
//          value: 'asfas',
//          done: false
//      }]
// }));



// To get access to elements in html
// use document.querySelector
const newInputBlock = document.querySelector('#input-block');


//Below could be used if input processing was done without the form structure
//const InputElement = document.querySelector('#add-item');
//const InputValue = document.querySelector('#field');


newInputBlock.addEventListener('submit', event => {
    //Needed for the forms in order to stop refreshing the page after every use
    event.preventDefault();

    // Creating the array that will be pushed to the local storage
    const newItem = {
        id: Math.round(Math.random() * 1000), // it will be our random identifier
        value: event.target.field.value,
        done: false
    }

    //Pushing created array into the variable with the rest of the arrays
    savedList.push(newItem);
    // Psuhing the updated arrays with the arrays to the local storage
    localStorage.setItem('savedList', JSON.stringify(savedList));

    //Re-setting the form after it has been used
    event.target.reset();

    displaySavedList();

});




const displaySavedList = () => {
    const list = document.querySelector('.list');
    list.innerHTML = "";
    savedList.forEach(newItem => {
        const listItem = document.createElement('div');
        listItem.classList.add('list-item');

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = newItem.done;
        checkBox.classList.add('item-undone');


        // const checkBox = document.createElement('button');
        // checkBox.classList.add('checkbox-button');

        if (newItem.done) listItem.classList.add('active');

        checkBox.addEventListener('click', event => {
            newItem.done = event.target.checked;
            localStorage.setItem('savedList', JSON.stringify(savedList));
            if (newItem.done) {
                listItem.classList.add('active')
            } else {
                listItem.classList.remove('active')
            }
            displaySavedList();
        })



        const content = document.createElement('div');
        content.innerHTML = newItem.value
        content.classList.add('item-content');

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-item');

        listItem.appendChild(checkBox);
        listItem.appendChild(content);
        listItem.appendChild(deleteButton);

        list.appendChild(listItem);


        deleteButton.addEventListener('click', removeFromList(newItem.id))

    });
}



const removeFromList = (id) => () => {
    savedList = savedList.filter(i => i.id != id)
    localStorage.setItem('savedList', JSON.stringify(savedList));
    displaySavedList();
}




displaySavedList();