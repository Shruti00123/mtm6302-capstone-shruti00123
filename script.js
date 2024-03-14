document.addEventListener('DOMContentLoaded', function() {
    const questions = {
        Easy: [{
            question: "What is the largest planet in our solar system?",
            options: ["Earth", "Jupiter", "Mars"],
            correctAnswer: "Jupiter"
        }, {
            question: "What is the smallest planet in our solar system?",
            options: ["Mercury", "Venus", "Mars"],
            correctAnswer: "Mercury"
        }],
        Medium: [{
            question: "Who wrote 'Hamlet'?",
            options: ["William Shakespeare", "Charles Dickens", "Leo Tolstoy"],
            correctAnswer: "William Shakespeare"
        }, {
            question: "In which city was the Titanic launched?",
            options: ["Belfast", "Liverpool", "Southampton"],
            correctAnswer: "Belfast"
        }],
        Hard: [{
            question: "What is the chemical symbol for Tungsten?",
            options: ["W", "Tg", "Tu"],
            correctAnswer: "W"
        }, {
            question: "What is the hardest natural substance on Earth?",
            options: ["Gold", "Diamond", "Quartz"],
            correctAnswer: "Diamond"
        }]
    };

    let currentQuestionIndex = 0;
    let currentDifficulty = '';

    const difficultyContainer = document.querySelector('.difficulty-selection');
    const questionContainer = document.getElementById('question');
    const buttons = document.querySelectorAll('.difficulty-button');

    function displayQuestion(difficulty, questionIndex) {
        const item = questions[difficulty][questionIndex];
        const questionHtml = `<div class="question"><h3>Question ${questionIndex + 1}</h3><p>${item.question}</p></div>`;
        const feedbackHtml = `<div id="feedback" class="feedback"></div>`;
        let optionsHtml = item.options.map(option =>
            `<label class="option-label"><input type="radio" name="question" value="${option}">${option}</label>`).join('');

        questionContainer.innerHTML = questionHtml + optionsHtml + feedbackHtml;
        document.querySelectorAll('.option-label input').forEach(input => {
            input.addEventListener('change', () => {
                handleOptionSelect(item.correctAnswer, input.value);
            });
        });
    }

    function handleOptionSelect(correctAnswer, selectedOption) {
        const feedbackElement = document.getElementById('feedback');
        if (selectedOption === correctAnswer) {
            feedbackElement.textContent = "Correct!";
            feedbackElement.style.color = "green";
        } else {
            feedbackElement.textContent = "Incorrect!";
            feedbackElement.style.color = "red";
        }
        document.querySelectorAll('input[name="question"]').forEach(option => {
            option.disabled = true;
        });
        showNextQuestionButton();
    }

    function showNextQuestionButton() {
        let nextQuestionButton = document.getElementById('next-question');
        if (!nextQuestionButton) {
            nextQuestionButton = document.createElement('button');
            nextQuestionButton.id = 'next-question';
            nextQuestionButton.textContent = 'Next Question';
            questionContainer.appendChild(nextQuestionButton);
        }

        nextQuestionButton.onclick = () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions[currentDifficulty].length) {
                displayQuestion(currentDifficulty, currentQuestionIndex);
            } else {
                questionContainer.innerHTML = '<p>You have completed all questions in this difficulty.</p>';
            }
        };
    }

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            currentDifficulty = this.textContent.trim();
            currentQuestionIndex = 0;
            difficultyContainer.style.display = 'none';
            displayQuestion(currentDifficulty, currentQuestionIndex);
        });
    });
});
