var data = [
    {
      question : "What is the standard distance between the target and archer in Olympics?",
      options : [
        "50 meters",
        "70 meters",
        "100 meters",
        "120 meters"
      ],
      correctAnswerIndex: 1
    },
    {
      question : "How many legs do insects have?",
      options: [
        "11",
        "4",
        "6",
        "2"
      ],
      correctAnswerIndex: 2
    },
    {
      question : "In which country can you find the Eiffel Tower?",
      options: [
        "Spain",
        "China",
        "Papua New Guinea",
        "France"
      ],
      correctAnswerIndex: 3
    },
    {
      question : "What is the name of the tallest mountain on earth?",
      options: [
        "Mount Everest",
        "K2",
        "Mount Kilimanjaro",
        "Volcano Tajumulco"
      ],
      correctAnswerIndex: 0
    },
    {
      question : "Which is the largest ocean on Earth?",
      options:  [
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean",
        "Pacific Ocean"
      ],
      correctAnswerIndex: 3
    }
]
  
var quizContainerElement = null; // HTML quiz container
var quizOptionsElement = null; // HTML question wrapper
var quizAnswerElement = null; // HTML answers wrapper

var now = 0; // current question
var score = 0; // current score

var init = function () {
quizContainerElement = document.getElementById("quizWrap");

// QUESTIONS SECTION
quizOptionsElement = document.createElement("div");
quizOptionsElement.id = "quizQuestionsWrapper";
quizContainerElement.appendChild(quizOptionsElement);

// ANSWERS SECTION
quizAnswerElement = document.createElement("div");
quizAnswerElement.id = "quizAnswersWrapper";
quizContainerElement.appendChild(quizAnswerElement);

// Draw elements
draw();
};

var draw = function() {
quizOptionsElement.innerHTML = data[now].question;

quizAnswerElement.innerHTML = "";

for (let i in data[now].options) {
    let radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "quiz";
    radio.id = "quizo" + i;
    quizAnswerElement.appendChild(radio);

    let label = document.createElement("label");
    label.innerHTML = data[now].options[i];
    label.setAttribute("for", "quizo" + i);
    label.dataset.idx = i;

    label.addEventListener("click", function() {
    select(label)
    });

    quizAnswerElement.appendChild(label);
}
}

select = function(option) {
let all = quizAnswerElement.getElementsByTagName("label");

for (let label of all) {
    label.removeEventListener("click", select);
}

let correct = option.dataset.idx == data[now].correctAnswerIndex;

if (correct) {
    score++;
    option.classList.add("correct");
} else {
    option.classList.add("wrong");
}

now++;
setTimeout(function() {
    if (now < data.length) { draw(); }
        else {
        quizOptionsElement.innerHTML = `You have answered ${score} of ${data.length} correctly.`;
        quizAnswerElement.innerHTML = "";

        var resetButton = document.createElement('button');
        resetButton.classList.add('reset-button', 'btn', 'btn-dark', 'btn-md');
        resetButton.innerText = "Reset Quiz";

        resetButton.addEventListener('click', reset)

        quizAnswerElement.appendChild(resetButton);
        }
    }, 1000);
};

reset = function() {
    now = 0;
    score = 0;
    draw();
}

window.addEventListener("load", init);

