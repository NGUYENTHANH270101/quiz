let apiUser = "http://localhost:3000/user"

var userName = document.querySelector('#username')
var passWord = document.querySelector('#password')
var btnLogin = document.querySelector('.btn-login')

// function showError(intput, message) {
//     let parent = intput.parentElement;
//     let small = parent.querySelector('small')
//     parent.classList.add('error')
//     small.innerText = message

// }
const getUser = async () => {
    const response = await fetch(apiUser);
    const data = await response.json();
    return data;
}

btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    if (userName.value == "" || passWord.value == "") {
        alert("please your enter username password")
    } else {
        getUser().then((data) => {
            // console.log(data);
            // debugger
            const isLoginSuccess = data.find(user => user.username === userName.value && user.password === passWord.value);
            console.log(isLoginSuccess);
            if (isLoginSuccess) {
                alert("Log In Success")
                window.location.href = "quiz.html"
            } else {
                // debugger
                alert("Log In Error")
                showError(userName, 'username or password error')
            }

        })

    }
})