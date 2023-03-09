let apiQuestion = "http://localhost:3000/questions"

var btnStart = document.querySelector(".button-start button")
var box = document.querySelector(".box")
var quizBox = document.querySelector(".quiz-box")
var btnExit = document.querySelector(".button .exit")
var btnContinue = document.querySelector(".button .continue")
var nextBtn = document.querySelector("footer .next-btn")
var totalQuestion = document.querySelector(".total-question")
var reSult = document.querySelector(".result")
var question = document.querySelector(".question")
var optionList = document.querySelector(".option-list")
var score = document.querySelector(".score")
var restart = document.querySelector(".restart")
var Exit = document.querySelector(".quit")

btnStart.addEventListener("click", () => {
    box.classList.add('activeBox')
})

btnExit.addEventListener("click", () => {
    box.classList.remove('activeBox')
})

btnContinue.addEventListener("click", () => {
    quizBox.classList.add("activeQuizBox")
    box.classList.remove("activeBox")
    showQuestion(0)
    coutQuestion(1)
})

restart.addEventListener("click", () => {
    quizBox.classList.add("activeQuizBox")
    reSult.classList.remove("activeResult")
    quiz = 0
    quiz_cout = 1
    reSult = 0
    showQuestion(quiz)
    coutQuestion(quiz_cout)
    nextBtn.classList.remove("show")
})

Exit.addEventListener("click", () => {
    window.location.reload()
})


let quiz = 0;
let quiz_cout = 1;
let result = 0;

nextBtn.addEventListener("click", () => {
    // console.log(questions.length - 1);
    if (quiz < questions.length - 1) {
        quiz++;
        quiz_cout++;
        showQuestion(quiz)
        coutQuestion(quiz_cout)
        nextBtn.classList.remove("show")
    } else {
        // console.log('complete');
        resultQuiz()
    }
})

// Hiển thị câu hỏi và câu trả lời
function showQuestion(index) {

    let tagQuestion = '<span>' + questions[index].number + '.' + questions[index].question + '</span>';
    let tagOption = '<div class="option"><span>' + questions[index].option[0] + '</span></div>'
        + '<div class="option"><span>' + questions[index].option[1] + '</span></div>'
        + '<div class="option"><span>' + questions[index].option[2] + '</span></div>'
        + '<div class="option"><span>' + questions[index].option[3] + '</span></div>';
    question.innerHTML = tagQuestion;
    optionList.innerHTML = tagOption;

    var option = document.querySelectorAll(".option")
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)")

    }

}

let iconTick = '<div class="icon tick"><i class="fa-solid fa-check"></i></div>'
let iconCross = '<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>'

// Chọn câu trả lời
function optionSelected(answer) {
    // debugger
    let selectAnswer = answer.textContent;
    let correctAnswer = questions[quiz].answer;
    let optionAll = optionList.children.length;
    if (selectAnswer == correctAnswer) {
        result++;
        answer.classList.add("correct")
        // console.log("answer correct");
        answer.insertAdjacentHTML("beforeend", iconTick)

    } else {
        answer.classList.add("incorrect")
        // console.log("answer error ");
        answer.insertAdjacentHTML("beforeend", iconCross)

        // Nếu chọn câu trả lời sai thì đồng thời cx show kết quả đúng ra mà hình
        for (let i = 0; i < optionAll; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute("class", "option correct")
                optionList.children[i].insertAdjacentHTML("beforeend", iconTick)
            }
        }
    }


    // Sau khi chọn 1 câu trả lời thì ko được chọn câu trả lời nào nữa
    for (let i = 0; i < optionAll; i++) {
        optionList.children[i].classList.add("hide")
    }
    nextBtn.classList.add("show")

}


// Đếm số lượng câu hỏi 
function coutQuestion(index) {
    let tagTotal = '<span><p>' + index + '</p>trong<p>' + questions.length + '</p>Câu hỏi</span>'
    totalQuestion.innerHTML = tagTotal;
}

// Trả kết quả của bài QUIZ
function resultQuiz() {

    quizBox.classList.remove("activeQuizBox")
    reSult.classList.add("activeResult")

    let result_question = document.querySelector(".score")
    if (result > 3) {
        let resultTag = '<span>Chúc mừng! bạn trả lời đúng<p>' + result + '</p>trong<p>' + questions.length + '</p> câu hỏi</span>'
        result_question.innerHTML = resultTag
    } else if (result > 1) {
        let resultTag = '<span>Tuyệt! bạn trả lời đúng<p>' + result + '</p>trong<p>' + questions.length + '</p> câu hỏi</span>'
        result_question.innerHTML = resultTag
    } else {
        let resultTag = '<span>Rất tiếc! bạn chỉ trả lời đúng<p>' + result + '</p>trong<p>' + questions.length + '</p> câu hỏi</span>'
        result_question.innerHTML = resultTag
    }

}