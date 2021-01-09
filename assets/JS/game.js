const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "What is the HTML tag under which one can write the JavaScript code",
        choice1: "<javascript>",
        choice2: "<scripted>",
        choice3: "<script>",
        choice4: "<js>",
        answer: 3,
    },

    {
        question: "Which of the following is the correct syntax to display “GeeksforGeeks” in an alert box using JavaScript?",
        choice1: "alertbox(“GeeksforGeeks”);",
        choice2: "msg(“GeeksforGeeks”);",
        choice3: "msgbox(“GeeksforGeeks”);",
        choice4: "alert(“GeeksforGeeks”);",
        answer: 4,
    },

    {
        question: "What is the correct syntax for referring to an external script called “geek.js”?",
        choice1: "<script src=”geek.js”>",
        choice2: "<script href=”geek.js”>",
        choice3: "<script ref=”geek.js”>",
        choice4: "<script name=”geek.js”>",
        answer: 1,
    },

    {
        question: "Which of the following is not a reserved word in JavaScript?",
        choice1: "interface",
        choice2: "throws",
        choice3: "program",
        choice4: "short",
        answer: 2,
    },

    {
        question: "How do you create an object in JavaScript?",
        choice1: "var obj = {};",
        choice2: "function Foo() {} var obj = new Foo();",
        choice3: "All of these work.",
        choice4: "var obj = new Object();",
        answer: 3,
    },

    {
        question: "Which of these is a correct method to create a new array?",
        choice1: "var myArray = ();",
        choice2: "var myArray = [];",
        choice3: "var myArray = new Array[];",
        choice4: "var myArray = {};",
        answer: 2,
    },

    {
        question: "To what type are values converted internally when evaluating a conditional statement?",
        choice1: "positive",
        choice2: "integer",
        choice3: "boolean",
        choice4: "tinyint",
        answer: 3,
    },

    {
        question: "Which of these is not a logical operator?",
        choice1: "!",
        choice2: "&",
        choice3: "&&",
        choice4: "||",
        answer: 2,
    },

    {
        question: "How would one declare a string variable?",
        choice1: "Any of these",
        choice2: "var fName = “Mary”;",
        choice3: "var names = “7”;",
        choice4: "var fName = new String;",
        answer: 1,
    },

    {
        question: "Which symbol is not used in logical operations?",
        choice1: "||",
        choice2: "%",
        choice3: "&&",
        choice4: "!",
        answer: 2,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame= () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion= () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign("../html/end.html")
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset ['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()

