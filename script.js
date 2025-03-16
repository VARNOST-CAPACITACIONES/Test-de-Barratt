// Constantes para EmailJS
const EMAIL_SERVICE_ID = 'service_s3owm6v';
const EMAIL_TEMPLATE_ID = 'template_mqm0q8n';

// Variables globales
let currentQuestionIndex = 0;
let userAnswers = {};
let userData = {};
let testQuestionsList = [];

// Elementos DOM
const sections = document.querySelectorAll('.section');
const progressBar = document.getElementById('progressBar');
const accessForm = document.getElementById('access-form');
const personalForm = document.getElementById('personal-form');
const startTestBtn = document.getElementById('start-test');
const prevQuestionBtn = document.getElementById('prev-question');
const nextQuestionBtn = document.getElementById('next-question');
const closeTestBtn = document.getElementById('close-test');
const loadingModal = document.getElementById('loading-modal');

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Generar preguntas aleatorias
    testQuestionsList = window.testQuestions.randomized;
    
    // Configurar manejadores de eventos
    setupEventListeners();
});

// Configurar todos los manejadores de eventos
function setupEventListeners() {
    // Verificación de clave de acceso
    accessForm.addEventListener('submit', handleAccessForm);
    
    // Datos personales
    document.getElementById('fecha-nacimiento').addEventListener('change', calculateAge);
    personalForm.addEventListener('submit', handlePersonalFormSubmit);
    
    // Controles del test
    startTestBtn.addEventListener('click', startTest);
    prevQuestionBtn.addEventListener('click', showPreviousQuestion);
    nextQuestionBtn.addEventListener('click', handleNextQuestion);
    
    // Botón de cerrar (cierra la ventana)
    closeTestBtn.addEventListener('click', function() {
        window.close();
        // Alternativa por si window.close() no funciona (depende del navegador)
        document.body.innerHTML = `
            <div style="text-align:center; padding:50px; font-family:Arial, sans-serif;">
                <h1 style="color:#7C0010;">Test Finalizado</h1>
                <p style="font-size:18px;">Puede cerrar esta ventana ahora.</p>
            </div>
        `;
    });
}

// Función para manejar el formulario de acceso
function handleAccessForm(e) {
    e.preventDefault();
    
    const accessKey = document.getElementById('access-key').value;
    
    if (accessKey === 'Varnost') {
        showSection('personal-info');
    } else {
        alert('Clave de acceso incorrecta. Por favor, inténtelo nuevamente.');
        document.getElementById('access-key').value = '';
    }
}

// Función para calcular la edad automáticamente
function calculateAge() {
    const birthDateInput = document.getElementById('fecha-nacimiento');
    const ageInput = document.getElementById('edad');
    
    if (birthDateInput.value) {
        const birthDate = new Date(birthDateInput.value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        ageInput.value = age;
    }
}

// Función para manejar el envío del formulario personal
function handlePersonalFormSubmit(e) {
    e.preventDefault();
    
    userData = {
        nombre: document.getElementById('nombre').value,
        cedula: document.getElementById('cedula').value,
        direccion: document.getElementById('direccion').value,
        fechaNacimiento: document.getElementById('fecha-nacimiento').value,
        edad: document.getElementById('edad').value,
        telefono: document.getElementById('telefono').value,
        email: document.getElementById('email').value
    };
    
    showSection('introduction');
}

// Función para mostrar una sección específica
function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    document.getElementById(sectionId).classList.add('active');
    
    // Actualizar barra de progreso
    updateProgressBar(sectionId);
}

// Función para actualizar la barra de progreso
function updateProgressBar(currentSection) {
    let progress = 0;
    
    if (currentSection === 'access') {
        progress = 0;
    } else if (currentSection === 'personal-info') {
        progress = 10;
    } else if (currentSection === 'introduction') {
        progress = 20;
    } else if (currentSection === 'questions') {
        progress = 20 + ((currentQuestionIndex + 1) / testQuestionsList.length) * 70;
    } else if (currentSection === 'completion') {
        progress = 100;
    }
    
    progressBar.style.width = `${progress}%`;
}

// Función para iniciar el test
function startTest() {
    showSection('questions');
    showQuestion(0);
}

// Función para mostrar una pregunta específica
function showQuestion(index) {
    const questionContainer = document.getElementById('question-container');
    const question = testQuestionsList[index];
    
    // Actualizar número y texto de la pregunta
    questionContainer.innerHTML = `
        <h2>Pregunta ${index + 1} de ${testQuestionsList.length}</h2>
        <p>${question.text}</p>
        <div class="options">
            <label class="option ${userAnswers[question.id] === 1 ? 'selected' : ''}">
                <input type="radio" name="q${question.id}" value="1" ${userAnswers[question.id] === 1 ? 'checked' : ''}>
                <span class="option-text">Raramente o nunca</span>
            </label>
            <label class="option ${userAnswers[question.id] === 2 ? 'selected' : ''}">
                <input type="radio" name="q${question.id}" value="2" ${userAnswers[question.id] === 2 ? 'checked' : ''}>
                <span class="option-text">Ocasionalmente</span>
            </label>
            <label class="option ${userAnswers[question.id] === 3 ? 'selected' : ''}">
                <input type="radio" name="q${question.id}" value="3" ${userAnswers[question.id] === 3 ? 'checked' : ''}>
                <span class="option-text">A menudo</span>
            </label>
            <label class="option ${userAnswers[question.id] === 4 ? 'selected' : ''}">
                <input type="radio" name="q${question.id}" value="4" ${userAnswers[question.id] === 4 ? 'checked' : ''}>
                <span class="option-text">Siempre o casi siempre</span>
            </label>
        </div>
    `;
    
    // Agregar manejadores de eventos a las opciones
    const options = questionContainer.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            
            // Remover la clase 'selected' de todas las opciones
            options.forEach(opt => opt.classList.remove('selected'));
            
            // Agregar la clase 'selected' a la opción seleccionada
            this.classList.add('selected');
            
            // Guardar la respuesta
            userAnswers[question.id] = parseInt(radio.value);
        });
    });
    
    // Actualizar estado de los botones
    prevQuestionBtn.disabled = index === 0;
    nextQuestionBtn.textContent = index === testQuestionsList.length - 1 ? 'Finalizar' : 'Siguiente';
    
    // Actualizar barra de progreso
    updateProgressBar('questions');
    
    currentQuestionIndex = index;
}

// Función para mostrar la pregunta anterior
function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        showQuestion(currentQuestionIndex - 1);
    }
}

// Función para manejar el botón de siguiente pregunta
function handleNextQuestion() {
    const question = testQuestionsList[currentQuestionIndex];
    
    // Verificar si se ha respondido la pregunta actual
    if (!userAnswers[question.id]) {
        alert('Por favor, seleccione una respuesta antes de continuar.');
        return;
    }
    
    if (currentQuestionIndex < testQuestionsList.length - 1) {
        // Mostrar siguiente pregunta
        showQuestion(currentQuestionIndex + 1);
    } else {
        // Finalizar el test y calcular resultados
        calculateAndSendResults();
    }
}

// Función para calcular y enviar los resultados
function calculateAndSendResults() {
    // Mostrar el modal de carga
    loadingModal.classList.add('show');
    
    // Calcular puntuaciones
    let totalScore = 0;
    let cognitiveScore = 0;
    let motorScore = 0;
    let nonplanningScore = 0;
    const cognitiveItems = window.testQuestions.cognitiveItems;
    const motorItems = window.testQuestions.motorItems;
    const nonplanningItems = window.testQuestions.nonplanningItems;
    
    // Calcular puntuaciones para todas las preguntas
    window.testQuestions.all.forEach(question => {
        let score;
        
        if (question.inverse) {
            // Puntuación inversa: 1->4, 2->3, 3->2, 4->1
            score = 5 - userAnswers[question.id];
        } else {
            // Puntuación directa
            score = userAnswers[question.id];
        }
        
        totalScore += score;
        
        // Sumar a la subescala correspondiente
        if (cognitiveItems.includes(question.id)) {
            cognitiveScore += score;
        } else if (motorItems.includes(question.id)) {
            motorScore += score;
        } else if (nonplanningItems.includes(question.id)) {
            nonplanningScore += score;
        }
    });
    
    // Determinar nivel de impulsividad
    let impulsivityLevel = '';
    if (totalScore <= 51) {
        impulsivityLevel = 'Bajo';
    } else if (totalScore <= 71) {
        impulsivityLevel = 'Moderado';
    } else {
        impulsivityLevel = 'Alto';
    }
    
    // Generar interpretación basada en el nivel de impulsividad
    let interpretation = '';
    if (totalScore <= 51) {
        interpretation = `El evaluado muestra un nivel bajo de impulsividad. Esto sugiere que generalmente piensa cuidadosamente antes de actuar, planifica sus actividades con anticipación, mantiene un buen nivel de autocontrol y puede concentrarse en tareas durante períodos prolongados. Este perfil de baja impulsividad suele ser beneficioso en entornos laborales que requieren precisión, planificación y atención a los detalles.`;
    } else if (totalScore <= 71) {
        interpretation = `El evaluado muestra un nivel moderado de impulsividad. Esto sugiere un equilibrio entre la reflexión y la acción, donde a veces actúa de forma espontánea, pero generalmente evalúa las consecuencias. Puede planificar adecuadamente, aunque ocasionalmente se deja llevar por impulsos. Mantiene un nivel razonable de autocontrol en la mayoría de situaciones y puede alternar entre tareas que requieren concentración y actividades más dinámicas. Este nivel de impulsividad es adaptativo en muchos entornos laborales, especialmente aquellos que requieren tanto planificación como capacidad de respuesta rápida.`;
    } else {
        interpretation = `El evaluado muestra un nivel alto de impulsividad. Esto sugiere que frecuentemente actúa rápidamente sin considerar todas las consecuencias, puede tener dificultades con la planificación a largo plazo, experimenta desafíos para mantener la concentración en tareas prolongadas y prefiere actividades dinámicas y estimulantes. En el entorno laboral, este nivel de impulsividad puede ser beneficioso en roles que requieren toma de decisiones rápidas, creatividad y adaptabilidad. Sin embargo, podría ser útil desarrollar estrategias adicionales para situaciones que requieren planificación detallada o concentración sostenida.`;
    }
    
    // Crear objeto con los datos a enviar
    const emailData = {
        nombre_completo: userData.nombre,
        cedula: userData.cedula,
        email: userData.email,
        edad: userData.edad,
        telefono: userData.telefono,
        direccion: userData.direccion,
        fecha_test: new Date().toLocaleDateString(),
        
        impulsividad_total: `${totalScore}/120`,
        impulsividad_cognitiva: `${cognitiveScore}/${cognitiveItems.length * 4}`,
        impulsividad_motora: `${motorScore}/${motorItems.length * 4}`,
        impulsividad_no_planificada: `${nonplanningScore}/${nonplanningItems.length * 4}`,
        
        nivel_impulsividad: impulsivityLevel,
        message: interpretation
    };
    
    // Guardar resultados en el objeto userData
    userData.resultados = {
        totalScore,
        cognitiveScore,
        motorScore,
        nonplanningScore,
        impulsivityLevel,
        interpretation
    };
    
    // Enviar resultados por correo electrónico
    emailjs.send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, emailData)
        .then(function(response) {
            console.log('Éxito al enviar email:', response.status, response.text);
            // Ocultar modal de carga
            loadingModal.classList.remove('show');
            // Mostrar pantalla de finalización
            showSection('completion');
        })
        .catch(function(error) {
            console.error('Error al enviar email:', error);
            // Ocultar modal de carga
            loadingModal.classList.remove('show');
            // Aún mostrar pantalla de finalización, pero advertir sobre el error
            alert('Ha ocurrido un error al enviar los resultados por correo electrónico. Por favor, inténtelo nuevamente más tarde.');
            showSection('completion');
        });
}

// Función para verificar si todas las preguntas han sido respondidas
function checkAllQuestionsAnswered() {
    return testQuestionsList.every(question => userAnswers[question.id] !== undefined);
}

// Función para obtener el progreso actual (porcentaje de preguntas respondidas)
function getQuestionProgress() {
    const answeredCount = Object.keys(userAnswers).length;
    return Math.floor((answeredCount / testQuestionsList.length) * 100);
}