/* ==============
  firebase import 
================= */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js';
import { getDatabase, ref, onValue, push, remove } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js';

const appConfig = {
        apiKey: "AIzaSyC8gIfFiqCeDYdILrUNAtdIDWFDZzhPOaM",
        authDomain: "wechampions-6b78c.firebaseapp.com",
        databaseURL: "https://wechampions-6b78c-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "wechampions-6b78c",
        storageBucket: "wechampions-6b78c.appspot.com",
        messagingSenderId: "351269523666",
        appId: "1:351269523666:web:19fb180da77b79328c9d0b"
};

const app = initializeApp(appConfig);
const database = getDatabase(app);
const endorsementListDB = ref(database, 'EndorsementList');


/* ===============
  DOM manipulation 
================== */

const publishBtn = document.getElementById('publishBtn');
const endorsementInput = document.getElementById('endorsement');
const listItemContainer = document.getElementById('list-item-container');

const listItemUl = document.createElement('ul');
listItemUl.classList.add('list-item-ul');
listItemContainer.append(listItemUl);


/* ==========================
  Event listner on publishBtn 
============================= */

publishBtn.addEventListener('click', () => {
    let inputValue = endorsementInput.value;

    if(inputValue !== '') {
        push(endorsementListDB, inputValue);

        clearInput();
    }

})


/* ===============
  onValue function
================== */

onValue(endorsementListDB, (snapshot) => {
    if(snapshot.exists()) {
        let endorsementListArray = Object.entries(snapshot.val());

        clearUl();

        endorsementListArray.forEach(e => {
            appendListToDB(e);
        })

    } else {
        listItemUl.textContent = 'Nothing in here...yet';
    }
})


/* ===============
  function section
================== */

function appendListToDB(item) {
    let itemId = item[0];
    let itemValue = item[1];

    const listItem = document.createElement('li');
    listItem.textContent = itemValue;
    listItemUl.append(listItem);

    listItem.addEventListener('dblclick', () => {
        let exactLocationInDB = ref(database, `EndorsementList/${itemId}`)

        remove(exactLocationInDB);
    })

}

function clearUl() {
    listItemUl.innerHTML = '';
}


function clearInput() {
    endorsementInput.value = '';
}

