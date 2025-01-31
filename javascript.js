const formReg = document.getElementById('register');
const formLogin = document.getElementById('login');

const namePattern = /^[A-Za-zА-Яа-яЁё]+$/;
const phonePattern = /^\+\d{8,12}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showErrorMessage(element, message) {
    const errorSpan = element.nextElementSibling;
    if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.classList.remove('success');
    }
}

function clearErrorMessage(element) {
    const errorSpan = element.nextElementSibling;
    if (errorSpan) {
        errorSpan.textContent = '';
        errorSpan.classList.add('success');
    }
}

function saveUser(user) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(u => u.email === user.email);
    if (existingUser) {
        showErrorMessage(userEmailFormTarget, 'Пользователь с таким email уже существует');
        return false;
    }
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}

const userNameFormTarget = document.getElementById('userNameForm');
const phoneUserFormTarget = document.getElementById('phoneUserForm');
const userEmailFormTarget = document.getElementById('userEmailForm');
const userPasswordTarget = document.getElementById('userPasswordForm');

userNameFormTarget.addEventListener('blur', () => {
    const nameUser = userNameFormTarget.value.trim();
    if (nameUser.length < 2 || nameUser.length > 24) {
        showErrorMessage(userNameFormTarget, 'Имя должно быть от 2 до 24 символов.');
        return;
    }
    if (!namePattern.test(nameUser)) {
        showErrorMessage(userNameFormTarget, 'Имя должно содержать только буквы.');
        return;
    }
    clearErrorMessage(userNameFormTarget);
});

phoneUserFormTarget.addEventListener('blur', () => {
    const phoneUser = phoneUserFormTarget.value.trim();
    if (!phonePattern.test(phoneUser)) {
        showErrorMessage(phoneUserFormTarget, 'Телефон должен содержать от 8 до 12 цифр и начинаться с "+"');
        return;
    }
    clearErrorMessage(phoneUserFormTarget);
});

userEmailFormTarget.addEventListener('blur', () => {
    const userEmail = userEmailFormTarget.value.trim();
    if (userEmail.length < 7 || userEmail.length > 24) {
        showErrorMessage(userEmailFormTarget, 'Email должен быть от 7 до 24 символов.');
        return;
    }
    if (!emailPattern.test(userEmail)) {
        showErrorMessage(userEmailFormTarget, 'Введите корректный email-адрес.');
        return;
    }
    clearErrorMessage(userEmailFormTarget);
});

userPasswordTarget.addEventListener('blur', () => {
    const userPassword = userPasswordTarget.value.trim();
    if (userPassword.length < 5 || userPassword.length > 26) {
        showErrorMessage(userPasswordTarget, 'Пароль должен быть от 5 до 26 символов.');
        return;
    }
    clearErrorMessage(userPasswordTarget);
});

formReg.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameUser = event.target.elements['userNameForm'].value;
    const phoneUser = event.target.elements['phoneUserForm'].value;
    const userEmail = event.target.elements['userEmailForm'].value;
    const userPassword = event.target.elements['userPasswordForm'].value;

    const user = {
        name: nameUser,
        phone: phoneUser,
        email: userEmail,
        password: userPassword,
    };
    if (saveUser(user)) {
        alert('Вы успешно зарегистрированы');
        formReg.reset();
        document.querySelectorAll('.error-message').forEach(span => span.textContent = '');
    }
});

formLogin.addEventListener('submit', (event) => {
    event.preventDefault();
    const userEmail = event.target.elements['userEmailFormLogin'].value;
    const userPassword = event.target.elements['userPasswordFormLogin'].value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === userEmail && user.password === userPassword);
    
    const loginError = document.getElementById('loginError');
    if (user) {
        loginError.textContent = 'Вы успешно вошли в систему';
        loginError.classList.add('success');
        formLogin.reset();
    } else {
        loginError.textContent = 'Неверный логин или пароль';
        loginError.classList.remove('success');
    }
});
