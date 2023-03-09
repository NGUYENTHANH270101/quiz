let apiUser = "http://localhost:3000/user"
var userName = document.querySelector('#username')
var email = document.querySelector('#email')
var passWord = document.querySelector('#password')
var confirmPassword = document.querySelector('#confirm-password')
var btnSignup = document.querySelector('.btn-signup')
var form = document.querySelector('form')

function showError(intput, message) {
    let parent = intput.parentElement;
    let small = parent.querySelector('small')
    parent.classList.add('error')
    small.innerText = message

}

function showSuccess(intput) {
    let parent = intput.parentElement;
    let small = parent.querySelector('small')
    parent.classList.remove('error')
    small.innerText = ''

}

function checkEmptyError(listInput) {
    listInput.forEach(input => {
        input.value = input.value.trim()
        let isEmptyError = false;
        if (!input.value) {
            isEmptyError = true;
            showError(input, 'khong duoc de trong')
        }
        else {
            showSuccess(input)
        }
        return isEmptyError
    })

}

function checkEmailError(input) {
    // debugger

    // console.log("aaa");
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    input.value = input.value.trim()
    let isEmailError = !regexEmail.test(input.value)
    if (regexEmail.test(input.value)) {
        showSuccess(input)
    }
    else {
        showError(input, 'email invalid')
    }

    return isEmailError
}

function checkLengError(input, min, max) {
    input.value = input.value.trim()
    console.log(input.value.length)
    if (input.value.length < min) {
        showError(input, `phai co it nhat ${min} ky tu`)
        return true
    }

    if (input.value.length > max) {
        showError(input, `khong duoc qua ${max} ky tu`)
        return true
    }
    showSuccess(input)
    return false
}

function checkMatchPassWordError(passwordInput, cfPassWord) {
    if (passwordInput !== cfPassWord) {
        showError(cfPassWord, 'password incorrect')
        return true
    }
    return alert("Sign Up Success")

}


form.addEventListener('submit', (e) => {
    e.preventDefault();

    let ischeckEmptyError = checkEmptyError([userName, email, passWord, confirmPassword])
    let ischeckEmailError = checkEmailError(email)
    let ischeckUserName = checkLengError(userName, 5, 20)
    let ischeckPassWord = checkLengError(passWord, 5, 20)
    let ischeckMatchError = checkMatchPassWordError(passWord.value, confirmPassword.value)
    // debugger
    if (ischeckEmptyError || ischeckEmailError || ischeckUserName || ischeckPassWord || ischeckMatchError) {
        return
    } else {
        const user = {
            username: userName.value,
            email: email.value,
            password: passWord.value,
            confirmPassword: confirmPassword.value,
        }
        fetch(apiUser, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        }).then(res => res.json())
            .then(data => console.log(data))
    }
})


