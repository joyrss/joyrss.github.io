const quizData = [
    {
      question: 'Πού και πότε γνωριστήκαμε;',
      options: ['Στο Πόρτο Ράφτη , το καλοκαίρι του 2018', 
      'Στο Πόρτο Ράφτη , την άνοιξη του 2019', 
      'Στο Χαλάνδρι , το καλοκαίρι του 2019', 
      'Στο Χαλάνδρι , την άνοιξη του 2018'],
      answer: 'Στο Πόρτο Ράφτη , το καλοκαίρι του 2018',
    },
    {
      question: 'Ποιος έκανε την πρώτη κίνηση;',
      options: ['Ο Δημήτρης', 'Η Κατερίνα'],
      answer: 'Ο Δημήτρης',
    },
    {
      question: 'Σε ποια περιοχή έγινε το πρώτο ραντεβού;',
      options: ['Πόρτο Ράφτη', 'Χαλάνδρι', 'Γλυφάδα', 'Βουλιαγμένη'],
      answer: 'Γλυφάδα',
    },
    {
      question: 'Πού έγινε η πρόταση γάμου;',
      options: ['Ξυλόκαστρο', 'Θεσσαλονίκη', 'Σουηδία', 'Χαλάνδρι'],
      answer: 'Θεσσαλονίκη',
    },
    {
      question: 'Ποιο είναι το αγαπημένο άθλημα του γαμπρού;',
      options: [
        'Ποδόσφαιρο',
        'Μπάσκετ',
        'Βόλεϊ',
        'Τένις',
      ],
      answer: 'Μπάσκετ',
    },
    {
      question: 'Ποιο είναι το αγαπημένο παγωτό της νύφης;',
      options: ['Βανίλια', 'Παρφέ', 'Φυστίκι', 'Σοκολάτα'],
      answer: 'Παρφέ',
    },
    {
      question: 'Ποιος είναι ο πιο ακατάστατος;',
      options: [
        'Ο Δημήτρης',
        'Η Κατερίνα',
      ],
      answer: 'Ο Δημήτρης',
    },
    {
      question: 'Ποιος είναι ο πιο υπομονετικός;',
      options: ['Ο Δημήτρης', 'Η Κατερίνα'],
      answer: 'Η Κατερίνα',
    },
    {
      question: 'Σε ποιον αρέσει περισσότερο το σινεμά;',
      options: [
        'Δημήτρης',
        'Κατερίνα',
      ],
      answer: 'Δημήτρης',
    },
    {
        question: 'Ποιος είναι πιο παρορμητικός;',
        options: [
          'Δημήτρης',
          'Κατερίνα',
        ],
        answer: 'Κατερίνα',
      },
    {
      question: 'Ποιο είναι το αγαπημένο φαγητό του γαμπρού;',
      options: ['Μουσακάς', 'Σουβλάκι', 'Παστίτσιο', 'Μακαρόνια με κιμά'],
      answer: 'Παστίτσιο',
    },
    {
        question: 'Ποιο είναι το αγαπημένο φαγητό της νύφης;',
        options: ['Μουσακάς', 'Σουβλάκι', 'Παστίτσιο', 'Μακαρόνια με κιμά'],
        answer: 'Μακαρόνια με κιμά',
    },
    {
        question: 'Ποιος μαγειρεύει καλύτερα;',
        options: [
          'Δημήτρης',
          'Κατερίνα',
        ],
        answer: 'Κατερίνα',
      },
      {
        question: 'Ποιος είναι πιο πιθανό να χαθεί στο δρόμο;',
        options: [
          'Δημήτρης',
          'Κατερίνα',
        ],
        answer: 'Κατερίνα',
      },
    
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `Πετύχατε ${score} στις ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Ερώτηση:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Η απάντησή σας:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Σωστή απάντηση:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>Πετύχατε ${score} στις ${quizData.length}!</p>
      <p>Λάθος Απαντήσεις:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();


  