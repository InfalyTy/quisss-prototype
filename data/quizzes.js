/**
 * Datos de Quizzes
 * Definición de todos los quizzes disponibles
 */

const quizzes = [
    {
        id: "general",
        title: "Cultura General",
        category: "General",
        difficulty: "Fácil",
        description: "Un poco de todo para poner a prueba tu conocimiento.",
        questions: [
            {
                question: "¿Cuál es el planeta más grande del Sistema Solar?",
                answers: ["Marte", "Júpiter", "Venus", "Mercurio"],
                correct: 1,
                explanation: "Júpiter es el planeta más grande, con un diámetro de aproximadamente 143.000 km."
            },
            {
                question: "¿En qué año llegó el hombre a la Luna?",
                answers: ["1965", "1969", "1972", "1960"],
                correct: 1,
                explanation: "La misión Apolo 11 llegó a la Luna el 20 de julio de 1969."
            },
            {
                question: "¿Cuál es el río más largo del mundo?",
                answers: ["Nilo", "Amazonas", "Yangtsé", "Misisipi"],
                correct: 1,
                explanation: "El Amazonas es el río más largo, con aproximadamente 7.025 km."
            },
            {
                question: "¿Quién pintó la Mona Lisa?",
                answers: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Miguel Ángel"],
                correct: 2,
                explanation: "Leonardo da Vinci pintó la Mona Lisa entre 1503 y 1519."
            },
            {
                question: "¿Cuál es el país más grande del mundo?",
                answers: ["China", "Estados Unidos", "Rusia", "Canadá"],
                correct: 2,
                explanation: "Rusia es el país más grande con 17.098.242 km²."
            },
            {
                question: "¿Qué elemento químico tiene el símbolo O?",
                answers: ["Oro", "Osmio", "Oxígeno", "Olivo"],
                correct: 2,
                explanation: "El oxígeno tiene el símbolo O en la tabla periódica."
            },
            {
                question: "¿Cuántos continentes hay?",
                answers: ["5", "6", "7", "8"],
                correct: 1,
                explanation: "Según el modelo de 6 continentes: América, Europa, África, Asia, Oceanía y Antártida."
            },
            {
                question: "¿Cuál es el animal terrestre más rápido?",
                answers: ["León", "Gacela", "Guepardo", "Tigre"],
                correct: 2,
                explanation: "El guepardo puede alcanzar velocidades de hasta 115 km/h."
            },
            {
                question: "¿En qué continente está Egipto?",
                answers: ["Asia", "Europa", "África", "América"],
                correct: 2,
                explanation: "Egipto está en el noreste de África."
            },
            {
                question: "¿Cuál es el océano más grande?",
                answers: ["Atlántico", "Índico", "Ártico", "Pacífico"],
                correct: 3,
                explanation: "El océano Pacífico cubre aproximadamente 165 millones de km²."
            }
        ]
    },
    {
        id: "ciencia",
        title: "Ciencia",
        category: "Ciencia",
        difficulty: "Medio",
        description: "Preguntas sobre física, química y biología.",
        questions: [
            {
                question: "¿Cuál es la velocidad de la luz?",
                answers: ["300.000 km/s", "150.000 km/s", "1.000.000 km/s", "50.000 km/s"],
                correct: 0,
                explanation: "La luz viaja a aproximadamente 300.000 km/s en el vacío."
            },
            {
                question: "¿Qué partícula tiene carga negativa?",
                answers: ["Protón", "Neutrón", "Electrón", "Fotón"],
                correct: 2,
                explanation: "El electrón tiene carga eléctrica negativa."
            },
            {
                question: "¿Cuál es el hueso más largo del cuerpo humano?",
                answers: ["Tibia", "Fémur", "Húmero", "Radio"],
                correct: 1,
                explanation: "El fémur es el hueso más largo, ubicado en el muslo."
            },
            {
                question: "¿Qué gas respiramos principalmente?",
                answers: ["Oxígeno", "Dióxido de carbono", "Nitrógeno", "Hidrógeno"],
                correct: 2,
                explanation: "El aire que respiramos es 78% nitrógeno, 21% oxígeno."
            },
            {
                question: "¿Cuál es el planeta más caliente?",
                answers: ["Mercurio", "Venus", "Marte", "Júpiter"],
                correct: 1,
                explanation: "Venus es el más caliente debido a su densa atmósfera de CO2."
            },
            {
                question: "¿Qué órgano produce insulina?",
                answers: ["Hígado", "Riñón", "Páncreas", "Bazo"],
                correct: 2,
                explanation: "El páncreas produce insulina para regular la glucosa."
            },
            {
                question: "¿Cuál es el estado de la materia del sol?",
                answers: ["Sólido", "Líquido", "Gas", "Plasma"],
                correct: 3,
                explanation: "El Sol está compuesto principalmente de plasma."
            },
            {
                question: "¿Qué significa ADN?",
                answers: ["Ácido desoxirribonucleico", "Ácido ribonucleico", "Ácido nucleico doble", "Ácido dinucleico"],
                correct: 0,
                explanation: "ADN significa Ácido Desoxirribonucleico."
            },
            {
                question: "¿Cuántos dientes tiene un adulto humano?",
                answers: ["28", "30", "32", "34"],
                correct: 2,
                explanation: "Un adulto tiene 32 dientes incluyendo las muelas del juicio."
            },
            {
                question: "¿Qué fuerza nos mantiene en la Tierra?",
                answers: ["Magnetismo", "Gravedad", "Fricción", "Inercia"],
                correct: 1,
                explanation: "La gravedad es la fuerza que nos atrae hacia el centro de la Tierra."
            }
        ]
    },
    {
        id: "historia",
        title: "Historia Universal",
        category: "Historia",
        difficulty: "Medio",
        description: "Viaja a través de los eventos que marcaron la humanidad.",
        questions: [
            {
                question: "¿En qué año comenzó la Segunda Guerra Mundial?",
                answers: ["1936", "1939", "1941", "1945"],
                correct: 1,
                explanation: "La Segunda Guerra Mundial comenzó el 1 de septiembre de 1939."
            },
            {
                question: "¿Quién fue el primer emperador romano?",
                answers: ["Julio César", "Nerón", "Augusto", "Trajano"],
                correct: 2,
                explanation: "Augusto fue el primer emperador romano, desde el 27 a.C."
            },
            {
                question: "¿Qué civilización construyó Machu Picchu?",
                answers: ["Azteca", "Maya", "Inca", "Olmeca"],
                correct: 2,
                explanation: "Los incas construyeron Machu Picchu en el siglo XV."
            },
            {
                question: "¿En qué año cayó el Imperio Romano de Occidente?",
                answers: ["476", "500", "400", "550"],
                correct: 0,
                explanation: "El Imperio Romano de Occidente cayó en el año 476 d.C."
            },
            {
                question: "¿Quién descubrió América?",
                answers: ["Colón", "Magallanes", "Vespucio", "Cortés"],
                correct: 0,
                explanation: "Cristóbal Colón llegó a América en 1492."
            },
            {
                question: "¿Qué revolución comenzó en 1789?",
                answers: ["Industrial", "Francesa", "Rusa", "Americana"],
                correct: 1,
                explanation: "La Revolución Francesa comenzó en 1789."
            },
            {
                question: "¿Quién fue el primer presidente de EE.UU.?",
                answers: ["Jefferson", "Lincoln", "Washington", "Adams"],
                correct: 2,
                explanation: "George Washington fue el primer presidente (1789-1797)."
            },
            {
                question: "¿Qué muro cayó en 1989?",
                answers: ["Muro de los Lamentos", "Muro de Berlín", "Gran Muralla", "Muro de Adriano"],
                correct: 1,
                explanation: "El Muro de Berlín cayó el 9 de noviembre de 1989."
            },
            {
                question: "¿En qué siglo ocurrió la Revolución Industrial?",
                answers: ["XVI", "XVII", "XVIII", "XIX"],
                correct: 2,
                explanation: "La Revolución Industrial comenzó en el siglo XVIII."
            },
            {
                question: "¿Qué imperio gobernó Genghis Khan?",
                answers: ["Otomano", "Persa", "Mongol", "Bizantino"],
                correct: 2,
                explanation: "Genghis Khan fundó y gobernó el Imperio Mongol."
            }
        ]
    },
    {
        id: "geografia",
        title: "Geografía",
        category: "Geografía",
        difficulty: "Fácil",
        description: "Explora el mundo desde tu pantalla.",
        questions: [
            {
                question: "¿Cuál es la capital de Francia?",
                answers: ["Lyon", "Marsella", "París", "Niza"],
                correct: 2,
                explanation: "París es la capital de Francia."
            },
            {
                question: "¿Qué país tiene forma de bota?",
                answers: ["España", "Italia", "Grecia", "Portugal"],
                correct: 1,
                explanation: "Italia tiene una forma característica de bota."
            },
            {
                question: "¿Cuál es la montaña más alta del mundo?",
                answers: ["K2", "Everest", "Kilimanjaro", "Aconcagua"],
                correct: 1,
                explanation: "El Monte Everest mide 8.848 metros sobre el nivel del mar."
            },
            {
                question: "¿En qué país están las pirámides de Giza?",
                answers: ["México", "Perú", "Egipto", "Sudán"],
                correct: 2,
                explanation: "Las pirámides de Giza están en Egipto."
            },
            {
                question: "¿Cuál es el desierto más grande?",
                answers: ["Sahara", "Gobi", "Antártida", "Arabia"],
                correct: 2,
                explanation: "La Antártida es el desierto más grande del mundo."
            },
            {
                question: "¿Qué río pasa por Londres?",
                answers: ["Sena", "Danubio", "Támesis", "Rin"],
                correct: 2,
                explanation: "El río Támesis pasa por Londres."
            },
            {
                question: "¿Cuál es la capital de Japón?",
                answers: ["Kioto", "Osaka", "Tokio", "Nagoya"],
                correct: 2,
                explanation: "Tokio es la capital de Japón."
            },
            {
                question: "¿En qué continente está Australia?",
                answers: ["Asia", "Oceanía", "América", "África"],
                correct: 1,
                explanation: "Australia está en Oceanía."
            },
            {
                question: "¿Cuál es el país con más habitantes?",
                answers: ["India", "China", "EE.UU.", "Indonesia"],
                correct: 0,
                explanation: "India superó a China como el país más poblado en 2023."
            },
            {
                question: "¿Qué estrecho separa España de Marruecos?",
                answers: ["Bósforo", "Gibraltar", "Magallanes", "Ormuz"],
                correct: 1,
                explanation: "El Estrecho de Gibraltar separa Europa de África."
            }
        ]
    },
    {
        id: "deportes",
        title: "Deportes",
        category: "Deportes",
        difficulty: "Fácil",
        description: "Para los amantes del deporte.",
        questions: [
            {
                question: "¿Cuántos jugadores tiene un equipo de fútbol?",
                answers: ["9", "10", "11", "12"],
                correct: 2,
                explanation: "Un equipo de fútbol tiene 11 jugadores en el campo."
            },
            {
                question: "¿En qué deporte se usa una raqueta?",
                answers: ["Baloncesto", "Tenis", "Fútbol", "Natación"],
                correct: 1,
                explanation: "El tenis usa raquetas para golpear la pelota."
            },
            {
                question: "¿Dónde se celebraron los JJ.OO. de 2016?",
                answers: ["Londres", "Río de Janeiro", "Pekín", "Tokio"],
                correct: 1,
                explanation: "Los Juegos Olímpicos de 2016 fueron en Río de Janeiro."
            },
            {
                question: "¿Qué país ganó el Mundial de Fútbol 2018?",
                answers: ["Brasil", "Alemania", "Francia", "Croacia"],
                correct: 2,
                explanation: "Francia ganó el Mundial de Rusia 2018."
            },
            {
                question: "¿Cómo se llama el estadio del Real Madrid?",
                answers: ["Camp Nou", "Santiago Bernabéu", "Old Trafford", "San Siro"],
                correct: 1,
                explanation: "El Santiago Bernabéu es el estadio del Real Madrid."
            },
            {
                question: "¿En qué deporte existe el Tour de Francia?",
                answers: ["Atletismo", "Ciclismo", "Natación", "Remo"],
                correct: 1,
                explanation: "El Tour de Francia es una competición de ciclismo."
            },
            {
                question: "¿Cuántos anillos olímpicos hay?",
                answers: ["4", "5", "6", "7"],
                correct: 1,
                explanation: "Hay 5 anillos olímpicos que representan los continentes."
            },
            {
                question: "¿Quién es conocido como 'El Rey' del fútbol?",
                answers: ["Messi", "Maradona", "Pelé", "Cristiano"],
                correct: 2,
                explanation: "Pelé es conocido como 'O Rei' (El Rey) del fútbol."
            },
            {
                question: "¿En qué deporte se hace un 'hole in one'?",
                answers: ["Tenis", "Golf", "Béisbol", "Cricket"],
                correct: 1,
                explanation: "Un 'hole in one' es cuando la bola entra al hoyo de un solo golpe en golf."
            },
            {
                question: "¿Qué selección ha ganado más Mundiales?",
                answers: ["Alemania", "Italia", "Brasil", "Argentina"],
                correct: 2,
                explanation: "Brasil ha ganado 5 Copas del Mundo."
            }
        ]
    },
    {
        id: "cine",
        title: "Cine y Series",
        category: "Entretenimiento",
        difficulty: "Medio",
        description: "¿Cuánto sabes sobre el séptimo arte?",
        questions: [
            {
                question: "¿Quién dirigió 'Jurassic Park'?",
                answers: ["Lucas", "Spielberg", "Cameron", "Nolan"],
                correct: 1,
                explanation: "Steven Spielberg dirigió Jurassic Park en 1993."
            },
            {
                question: "¿Qué película ganó el Oscar en 1994?",
                answers: ["Pulp Fiction", "Forrest Gump", "El Rey León", "Cadillac Records"],
                correct: 1,
                explanation: "Forrest Gump ganó el Oscar a Mejor Película en 1994."
            },
            {
                question: "¿Quién es el director de 'El Padrino'?",
                answers: ["Scorsese", "Coppola", "Tarantino", "Eastwood"],
                correct: 1,
                explanation: "Francis Ford Coppola dirigió El Padrino."
            },
            {
                question: "¿En qué año se estrenó la primera película de Star Wars?",
                answers: ["1975", "1977", "1979", "1980"],
                correct: 1,
                explanation: "Star Wars: Episodio IV se estrenó en 1977."
            },
            {
                question: "¿Quién interpretó a Jack en Titanic?",
                answers: ["Brad Pitt", "Tom Cruise", "Leonardo DiCaprio", "Johnny Depp"],
                correct: 2,
                explanation: "Leonardo DiCaprio interpretó a Jack Dawson."
            },
            {
                question: "¿Qué serie tiene a Walter White?",
                answers: ["The Wire", "Breaking Bad", "Mad Men", "Lost"],
                correct: 1,
                explanation: "Walter White es el protagonista de Breaking Bad."
            },
            {
                question: "¿Cuál es la película más taquillera de la historia?",
                answers: ["Titanic", "Avatar", "Endgame", "Star Wars"],
                correct: 1,
                explanation: "Avatar (2009) es la película más taquillera."
            },
            {
                question: "¿Quién dirigió 'Inception'?",
                answers: ["Fincher", "Nolan", "Villeneuve", "Anderson"],
                correct: 1,
                explanation: "Christopher Nolan dirigió Inception en 2010."
            },
            {
                question: "¿Qué actor interpreta a Iron Man?",
                answers: ["Chris Evans", "Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo"],
                correct: 1,
                explanation: "Robert Downey Jr. interpreta a Tony Stark/Iron Man."
            },
            {
                question: "¿En qué ciudad vive Batman?",
                answers: ["Metrópolis", "Gotham", "Central City", "Star City"],
                correct: 1,
                explanation: "Batman protege Gotham City."
            }
        ]
    },
    {
        id: "tecnologia",
        title: "Tecnología",
        category: "Tecnología",
        difficulty: "Difícil",
        description: "Para los amantes de la tecnología.",
        questions: [
            {
                question: "¿Qué significa CPU?",
                answers: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "Central Processor Unit"],
                correct: 1,
                explanation: "CPU significa Central Processing Unit (Unidad Central de Procesamiento)."
            },
            {
                question: "¿Quién fundó Microsoft?",
                answers: ["Jobs", "Gates", "Zuckerberg", "Bezos"],
                correct: 1,
                explanation: "Bill Gates cofundó Microsoft en 1975."
            },
            {
                question: "¿En qué año se lanzó el primer iPhone?",
                answers: ["2005", "2007", "2009", "2010"],
                correct: 1,
                explanation: "El primer iPhone se lanzó en junio de 2007."
            },
            {
                question: "¿Qué empresa creó Android?",
                answers: ["Apple", "Google", "Microsoft", "Samsung"],
                correct: 1,
                explanation: "Google adquirió Android Inc. en 2005."
            },
            {
                question: "¿Qué significa WiFi?",
                answers: ["Wireless Fidelity", "Wireless Field", "Wide Fidelity", "No significa nada"],
                correct: 3,
                explanation: "WiFi no significa nada, es un término comercial creado para sonar como Hi-Fi."
            },
            {
                question: "¿Cuál es el lenguaje de la web?",
                answers: ["Python", "Java", "JavaScript", "C++"],
                correct: 2,
                explanation: "JavaScript es el lenguaje nativo de los navegadores web."
            },
            {
                question: "¿Qué compañía tiene el logo de la manzana?",
                answers: ["Microsoft", "Apple", "IBM", "Intel"],
                correct: 1,
                explanation: "Apple tiene el famoso logo de la manzana mordida."
            },
            {
                question: "¿Qué es un algoritmo?",
                answers: ["Un hardware", "Un conjunto de instrucciones", "Un virus", "Una red"],
                correct: 1,
                explanation: "Un algoritmo es un conjunto de instrucciones para resolver un problema."
            },
            {
                question: "¿En qué década nació Internet?",
                answers: ["1960s", "1970s", "1980s", "1990s"],
                correct: 1,
                explanation: "ARPANET, precursor de Internet, nació en los años 70."
            },
            {
                question: "¿Qué significa RAM?",
                answers: ["Random Access Memory", "Read And Memory", "Run All Memory", "Real Access Module"],
                correct: 0,
                explanation: "RAM significa Random Access Memory (Memoria de Acceso Aleatorio)."
            }
        ]
    }
];

// Hacer disponible globalmente
window.quizzes = quizzes;
