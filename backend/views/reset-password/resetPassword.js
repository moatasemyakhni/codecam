const password = document.getElementById('password');
const passwordRepeat = document.getElementById('password-repeat');
const btnSubmit = document.getElementById('btn-submit');
const statusMessage = document.getElementById('status-message');


const minimumPasswordLength = 6;
const passwordValidation = (password) => password.length >= minimumPasswordLength;
const comparePasswords = (password, confirmPassword) => password === confirmPassword;


const changePassword = async (url, data={}) => {

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return response.json();
  }

btnSubmit.addEventListener('click', async (e) => {
    try {
        e.preventDefault();
        if(!passwordValidation(password.value)) {
            statusMessage.innerText = `Password should be at least ${minimumPasswordLength} chars`;
            return
        }
    
        if(!comparePasswords(password.value, passwordRepeat.value)) {
            statusMessage.innerText = 'Passwords do not match';
            return;
        }
    
        const href = location.pathname.split('/');
        const id = href[href.length-2];
        const token = href[href.length-1];
        const idPlusToken = `${id}/${token}`;
        const response = await changePassword('http://localhost:3500/change-password', {
            idPlusToken: idPlusToken,
            password: password.value,
        });

        if(response.error) {
            statusMessage.innerText = response.message;
            return;
        }

        statusMessage.innerText = response.message;

        password.value = '';
        passwordRepeat.value = '';
    } catch (error) {
        statusMessage.innerText = error.message;
    }
    
});

password.addEventListener('focus', () => {
    statusMessage.innerText = '';
});

passwordRepeat.addEventListener('focus', () => {
    statusMessage.innerText = '';
});