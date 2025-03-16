// Array con todas las preguntas del Test de Impulsividad de Barratt (BIS-11)
const allQuestions = [
    {
        id: 1,
        text: "Planifico mis tareas con cuidado",
        inverse: true
    },
    {
        id: 2,
        text: "Hago las cosas sin pensarlo",
        inverse: false
    },
    {
        id: 3,
        text: "Casi nunca me tomo las cosas a pecho (no me perturbo con facilidad)",
        inverse: true
    },
    {
        id: 4,
        text: "Mis pensamientos pueden tener gran velocidad (tengo pensamientos que van muy rápido en mi mente)",
        inverse: false
    },
    {
        id: 5,
        text: "Planifico mis viajes con antelación",
        inverse: true
    },
    {
        id: 6,
        text: "Soy una persona con autocontrol",
        inverse: true
    },
    {
        id: 7,
        text: "Me concentro con facilidad (se me hace fácil concentrarme)",
        inverse: true
    },
    {
        id: 8,
        text: "Ahorro con regularidad",
        inverse: true
    },
    {
        id: 9,
        text: "Se me hace difícil estar quieto/a durante largos periodos de tiempo",
        inverse: false
    },
    {
        id: 10,
        text: "Pienso las cosas cuidadosamente",
        inverse: true
    },
    {
        id: 11,
        text: "Planifico para tener un trabajo fijo (me esfuerzo por asegurar que tendré dinero para pagar mis gastos)",
        inverse: true
    },
    {
        id: 12,
        text: "Digo las cosas sin pensarlas",
        inverse: false
    },
    {
        id: 13,
        text: "Me gusta pensar sobre problemas complicados (me gusta pensar sobre problemas complejos)",
        inverse: true
    },
    {
        id: 14,
        text: "Cambio de trabajo frecuentemente (no me quedo en el mismo trabajo durante largos periodos de tiempo)",
        inverse: false
    },
    {
        id: 15,
        text: "Actúo impulsivamente",
        inverse: false
    },
    {
        id: 16,
        text: "Me aburro con facilidad tratando de resolver problemas en mi mente (me aburre pensar en algo por demasiado tiempo)",
        inverse: false
    },
    {
        id: 17,
        text: "Visito al médico y al dentista con regularidad",
        inverse: true
    },
    {
        id: 18,
        text: "Hago las cosas en el momento que se me ocurren",
        inverse: false
    },
    {
        id: 19,
        text: "Soy una persona que piensa sin distraerse (puedo enfocar mi mente en una sola cosa por mucho tiempo)",
        inverse: true
    },
    {
        id: 20,
        text: "Cambio de vivienda a menudo (me mudo con frecuencia o no me gusta vivir en el mismo sitio por mucho tiempo)",
        inverse: false
    },
    {
        id: 21,
        text: "Compro cosas impulsivamente",
        inverse: false
    },
    {
        id: 22,
        text: "Termino lo que empiezo",
        inverse: true
    },
    {
        id: 23,
        text: "Camino y me muevo con rapidez",
        inverse: false
    },
    {
        id: 24,
        text: "Resuelvo los problemas experimentando (resuelvo los problemas empleando una posible solución y viendo si funciona)",
        inverse: false
    },
    {
        id: 25,
        text: "Gasto en efectivo o a crédito más de lo que gano (gasto más de lo que gano)",
        inverse: false
    },
    {
        id: 26,
        text: "Hablo rápido",
        inverse: false
    },
    {
        id: 27,
        text: "Tengo pensamientos extraños cuando estoy pensando (a veces tengo pensamientos irrelevantes cuando pienso)",
        inverse: false
    },
    {
        id: 28,
        text: "Me interesa más el presente que el futuro",
        inverse: false
    },
    {
        id: 29,
        text: "Me siento inquieto/a en clases o charlas (me siento inquieto/a si tengo que oír a alguien hablar durante un largo período de tiempo)",
        inverse: false
    },
    {
        id: 30,
        text: "Planifico el futuro (me interesa más el futuro que el presente)",
        inverse: true
    }
];

// Clasificación de ítems por subescalas
const cognitiveItems = [4, 7, 10, 13, 16, 19, 24, 27];
const motorItems = [2, 6, 9, 12, 15, 18, 21, 23, 26, 29];
const nonplanningItems = [1, 3, 5, 8, 11, 14, 17, 20, 22, 25, 28, 30];

// Función para mezclar aleatoriamente un array (algoritmo Fisher-Yates)
function shuffleArray(array) {
    // Crea una copia del array original para no modificarlo
    const shuffledArray = [...array];
    
    // Implementación del algoritmo Fisher-Yates (o Knuth) shuffle
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        // Generar un índice aleatorio entre 0 e i (inclusive)
        const j = Math.floor(Math.random() * (i + 1));
        // Intercambiar elementos
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    
    return shuffledArray;
}

// Generar un orden aleatorio de preguntas manteniendo sus IDs originales
function getRandomizedQuestions() {
    return shuffleArray(allQuestions);
}

// Exportar funciones y variables para que sean accesibles desde otros scripts
window.testQuestions = {
    all: allQuestions,
    randomized: getRandomizedQuestions(),
    cognitiveItems: cognitiveItems,
    motorItems: motorItems,
    nonplanningItems: nonplanningItems,
    shuffle: getRandomizedQuestions
};