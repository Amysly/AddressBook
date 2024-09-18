let name = document.getElementById('name');
let email = document.getElementById('email');
let phone = document.getElementById('phonenumber');
let addItem = document.getElementById('add');
let errorMessage = document.getElementById('error-message');

addItem.addEventListener('click', function (){
    let nameInput = name.value;
    let emailInput = email.value;
    let phoneInput = phone.value;

    if(nameInput === ''){
        displayError('Name field is required');
        return;
    } 
    if(emailInput === ''){
        displayError('Email field is required');
        return;
    } 
    if(phoneInput === ''){
        displayError('Phone number field is required');
        return;
    } 
    if(phoneInput.length > 11){
        displayError('Phone number is greater than 11 digits');
        return;
    } 
    if(phoneInput.length < 11){
        displayError('Phone number is less than 11 digits');
        return;
    } 
    if(isNaN(phoneInput)){
        displayError('Phone number must be a number');
        return;
    }


    let phoneNum = phoneInput;

    addressBook.push({
        name: nameInput,
        email: emailInput,
        phoneNum: phoneNum,
    });

    name.value = '';
    email.value = '';
    phone.value = '';

    displayAddress();
});

let addressBook = JSON.parse(localStorage.getItem('addressBook')) || [{
    name: 'Mary John',
    email: 'maryjohn@gmail.com',
    phoneNum: '07034267896'
}];

displayAddress();

function displayAddress(){
    let addressContact = '';

    for (let i = 0; i < addressBook.length; i++) {
        const addressInfo = addressBook[i];
        let name = addressInfo.name;
        let email = addressInfo.email;
        let phoneNum = addressInfo.phoneNum;

        const html = `
            <div class="contact-div">
            <div>${name}</div>
            <div>${email}</div>
            <div>${phoneNum}</div>
            <button onclick="
            addressBook.splice(${i}, 1);
            displayAddress();
          " class="delete-contact">Delete</button> 
            </div>
            `;

        addressContact += html;
    }

    document.querySelector('.contact-info').innerHTML = addressContact;
    localStorage.setItem('addressBook', JSON.stringify(addressBook));
}

function displayError(message) {
    errorMessage.textContent = message;
    errorMessage.style.color = 'red';

    setTimeout(function() {
        errorMessage.textContent = '';
    }, 3000);
}

const searchContact = document.getElementById('search-contact');

searchContact.addEventListener('keyup', function (e){
    const searchText = e.target.value.toLowerCase();
    const contactLists = document.querySelectorAll('.contact-div');

    contactLists.forEach(function (contactList) {
        const contactAddress = contactList.textContent.toLowerCase();
        if (contactAddress.includes(searchText)) {
            contactList.style.display = 'grid';
        } else {
            contactList.style.display = 'none';
        }
    });
});