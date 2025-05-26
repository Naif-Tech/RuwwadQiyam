// إعدادات اللعبة الأساسية
let stars = 0;
let currentHadithIndex = 0;
let completedHadiths = [];
const starCounter = document.getElementById('starCounter');
const mainMenu = document.getElementById('mainMenu');
const gameArea = document.getElementById('gameArea');

// مجموعة الأحاديث الشريفة مع الشرح والأسئلة
const hadithData = [
  {
    text: 'إنما الأعمال بالنيات وإنما لكل امرئ ما نوى',
    narrator: 'رواه البخاري ومسلم',
    explanation: 'هذا الحديث يعلمنا أن الأعمال الجميلة تُحسب لنا عند الله حسب نيتنا الطيبة',
    quiz: {
      question: 'ما معنى هذا الحديث؟',
      options: [
        'الأعمال تُقبل بحسب النية',
        'العمل أهم من النية',
        'النية لا تؤثر على العمل'
      ],
      correctAnswer: 0
    }
  },
  {
    text: 'تبسمك في وجه أخيك صدقة',
    narrator: 'رواه الترمذي',
    explanation: 'حتى الابتسامة البسيطة للآخرين تُعتبر عملاً طيباً يحبه الله ويثاب عليه المسلم',
    quiz: {
      question: 'ما الذي يُعتبر صدقة حسب هذا الحديث؟',
      options: [
        'إعطاء المال فقط',
        'الابتسامة في وجه الآخرين',
        'الصمت'
      ],
      correctAnswer: 1
    }
  },
  {
    text: 'خير الناس أنفعهم للناس',
    narrator: 'رواه الطبراني',
    explanation: 'أفضل الناس هم الذين يساعدون الآخرين ويفعلون الخير معهم',
    quiz: {
      question: 'من هم خير الناس حسب هذا الحديث؟',
      options: [
        'الذين يساعدون الآخرين',
        'الذين يهتمون بأنفسهم فقط',
        'الذين لا يتعاملون مع أحد'
      ],
      correctAnswer: 0
    }
  },
  {
    text: 'من لم يرحم الناس لم يرحمه الله',
    narrator: 'رواه البخاري ومسلم',
    explanation: 'الله يرحم الذين يرحمون الآخرين، فيجب أن نكون رحماء مع جميع الناس والحيوانات',
    quiz: {
      question: 'متى يرحمنا الله؟',
      options: [
        'عندما نرحم الآخرين',
        'عندما نكون قساة',
        'عندما نهمل الآخرين'
      ],
      correctAnswer: 0
    }
  },
  {
    text: 'بر الوالدين أفضل الأعمال',
    narrator: 'رواه البخاري ومسلم',
    explanation: 'طاعة الوالدين والإحسان إليهما من أحب الأعمال إلى الله بعد الصلاة',
    quiz: {
      question: 'ما أفضل الأعمال بعد الصلاة؟',
      options: [
        'اللعب',
        'بر الوالدين',
        'النوم'
      ],
      correctAnswer: 1
    }
  }
];

// تحديث عداد النجوم
function updateStarCounter() {
  starCounter.textContent = `⭐ ${stars}`;
}

// عرض القائمة الرئيسية
function showMainMenu() {
  gameArea.classList.add('hidden');
  mainMenu.classList.remove('hidden');
}

// عند الضغط على "عمل خيري"
document.getElementById('goodDeedsBtn').addEventListener('click', () => {
  mainMenu.classList.add('hidden');
  gameArea.classList.remove('hidden');
  showGoodDeedScenario();
});

// عند الضغط على "أحاديث نبوية"
document.getElementById('hadithBtn').addEventListener('click', () => {
  mainMenu.classList.add('hidden');
  gameArea.classList.remove('hidden');
  showHadithSection();
});

// عرض سيناريو عمل خيري بسيط
function showGoodDeedScenario() {
  gameArea.innerHTML = `
    <h2>عمل خيري</h2>
    <p>ابتسمت لأخيك الصغير 😊</p>
    <button id="collectStarBtn" class="choice-btn">احصل على نجمة!</button>
    <button id="backBtn" class="choice-btn">العودة للقائمة الرئيسية</button>
    <div id="feedback" class="feedback hidden"></div>
  `;

  document.getElementById('collectStarBtn').onclick = () => {
    stars++;
    updateStarCounter();
    showFeedback('أحسنت! نجمة جديدة 🌟');
  };

  document.getElementById('backBtn').onclick = () => {
    showMainMenu();
  };
}

// عرض قسم الأحاديث النبوية
function showHadithSection() {
  const currentHadith = hadithData[currentHadithIndex];
  const isCompleted = completedHadiths.includes(currentHadithIndex);
  
  gameArea.innerHTML = `
    <div class="hadith-container">
      <h2>📚 أحاديث نبوية</h2>
      
      <!-- مؤشر التقدم -->
      <div class="progress-container">
        <p>الحديث ${currentHadithIndex + 1} من ${hadithData.length}</p>
        <div class="progress-dots">
          ${hadithData.map((_, index) => 
            `<span class="dot ${index === currentHadithIndex ? 'active' : ''} ${completedHadiths.includes(index) ? 'completed' : ''}"></span>`
          ).join('')}
        </div>
        <p class="stats">🌟 أحاديث مكتملة: ${completedHadiths.length} / ${hadithData.length}</p>
      </div>

      <!-- الحديث الشريف -->
      <div class="hadith-text">
        <p class="hadith-content">${currentHadith.text}</p>
        <p class="hadith-narrator">— ${currentHadith.narrator}</p>
      </div>

      <!-- شرح للأطفال -->
      <div class="explanation">
        <h3>🌟 شرح للأطفال</h3>
        <p>${currentHadith.explanation}</p>
      </div>

      <!-- زر بدء الاختبار -->
      <button id="startQuizBtn" class="choice-btn quiz-btn" ${isCompleted ? 'disabled' : ''}>
        ${isCompleted ? '✅ تم الإجابة' : '🧩 ابدأ الاختبار'}
      </button>

      <!-- أزرار التنقل -->
      <div class="navigation">
        <button id="prevHadithBtn" class="nav-btn">⏮️ السابق</button>
        <button id="backToMenuBtn" class="nav-btn">🏠 القائمة الرئيسية</button>
        <button id="nextHadithBtn" class="nav-btn">التالي ⏭️</button>
      </div>
    </div>
  `;

  // إضافة الأحداث
  if (!isCompleted) {
    document.getElementById('startQuizBtn').onclick = () => showHadithQuiz(currentHadith);
  }
  
  document.getElementById('prevHadithBtn').onclick = () => {
    currentHadithIndex = currentHadithIndex > 0 ? currentHadithIndex - 1 : hadithData.length - 1;
    showHadithSection();
  };
  
  document.getElementById('nextHadithBtn').onclick = () => {
    currentHadithIndex = (currentHadithIndex + 1) % hadithData.length;
    showHadithSection();
  };
  
  document.getElementById('backToMenuBtn').onclick = () => {
    showMainMenu();
  };
}

// عرض اختبار الحديث
function showHadithQuiz(hadith) {
  gameArea.innerHTML = `
    <div class="quiz-container">
      <h2>🧩 اختبار الحديث</h2>
      <h3>${hadith.quiz.question}</h3>
      
      <div class="quiz-options">
        ${hadith.quiz.options.map((option, index) => 
          `<button class="quiz-option" data-index="${index}">${option}</button>`
        ).join('')}
      </div>
      
      <div id="quizFeedback" class="feedback hidden"></div>
    </div>
  `;

  // إضافة أحداث الخيارات
  document.querySelectorAll('.quiz-option').forEach((button, index) => {
    button.onclick = () => handleQuizAnswer(index, hadith.quiz.correctAnswer, hadith.quiz.options);
  });
}

// معالجة إجابة الاختبار
function handleQuizAnswer(selectedIndex, correctIndex, options) {
  const isCorrect = selectedIndex === correctIndex;
  const buttons = document.querySelectorAll('.quiz-option');
  
  // تعطيل جميع الأزرار
  buttons.forEach(btn => btn.disabled = true);
  
  // تلوين الإجابات
  buttons[correctIndex].classList.add('correct');
  if (!isCorrect) {
    buttons[selectedIndex].classList.add('incorrect');
  }
  
  // إظهار التغذية الراجعة
  const feedback = document.getElementById('quizFeedback');
  if (isCorrect) {
    stars++;
    updateStarCounter();
    completedHadiths.push(currentHadithIndex);
    feedback.innerHTML = `
      <div class="success-feedback">
        <p>بارك الله فيك! 🌟</p>
        <p>إجابة صحيحة! حصلت على نجمة جديدة!</p>
      </div>
    `;
    feedback.className = 'feedback success';
  } else {
    feedback.innerHTML = `
      <div class="error-feedback">
        <p>لا بأس، تعلمنا شيئاً جديداً! 💭</p>
        <p>الإجابة الصحيحة هي: <strong>${options[correctIndex]}</strong></p>
      </div>
    `;
    feedback.className = 'feedback error';
  }
  
  // العودة للحديث بعد 3 ثوان
  setTimeout(() => {
    showHadithSection();
  }, 3000);
}

// إظهار رسالة تشجيعية مع تأثير
function showFeedback(msg) {
  const feedback = document.getElementById('feedback');
  feedback.textContent = msg;
  feedback.classList.remove('hidden');
  setTimeout(() => {
    feedback.classList.add('hidden');
  }, 3000);
}

// بدء اللعبة بالقائمة الرئيسية
updateStarCounter();
showMainMenu();