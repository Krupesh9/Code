// Spanish Adventure Game Logic

// Game Data
const gameData = {
    numbers: [
        { id: 1, english: "One", spanish: "Uno", pronunciation: "/u-no/", icon: "1️⃣" },
        { id: 2, english: "Two", spanish: "Dos", pronunciation: "/dos/", icon: "2️⃣" },
        { id: 3, english: "Three", spanish: "Tres", pronunciation: "/tres/", icon: "3️⃣" },
        { id: 4, english: "Four", spanish: "Cuatro", pronunciation: "/kua-tro/", icon: "4️⃣" },
        { id: 5, english: "Five", spanish: "Cinco", pronunciation: "/sin-ko/", icon: "5️⃣" },
        { id: 6, english: "Six", spanish: "Seis", pronunciation: "/seis/", icon: "6️⃣" },
        { id: 7, english: "Seven", spanish: "Siete", pronunciation: "/sie-te/", icon: "7️⃣" },
        { id: 8, english: "Eight", spanish: "Ocho", pronunciation: "/o-cho/", icon: "8️⃣" },
        { id: 9, english: "Nine", spanish: "Nueve", pronunciation: "/nue-ve/", icon: "9️⃣" },
        { id: 10, english: "Ten", spanish: "Diez", pronunciation: "/dies/", icon: "🔟" },
        { id: 11, english: "Eleven", spanish: "Once", pronunciation: "/on-se/", icon: "1️⃣1️⃣" },
        { id: 12, english: "Twelve", spanish: "Doce", pronunciation: "/do-se/", icon: "1️⃣2️⃣" },
        { id: 13, english: "Thirteen", spanish: "Trece", pronunciation: "/tre-se/", icon: "1️⃣3️⃣" },
        { id: 14, english: "Fourteen", spanish: "Catorce", pronunciation: "/ka-tor-se/", icon: "1️⃣4️⃣" },
        { id: 15, english: "Fifteen", spanish: "Quince", pronunciation: "/kin-se/", icon: "1️⃣5️⃣" },
        { id: 16, english: "Sixteen", spanish: "Dieciséis", pronunciation: "/die-si-seis/", icon: "1️⃣6️⃣" },
        { id: 17, english: "Seventeen", spanish: "Diecisiete", pronunciation: "/die-si-sie-te/", icon: "1️⃣7️⃣" },
        { id: 18, english: "Eighteen", spanish: "Dieciocho", pronunciation: "/die-si-o-cho/", icon: "1️⃣8️⃣" },
        { id: 19, english: "Nineteen", spanish: "Diecinueve", pronunciation: "/die-si-nue-ve/", icon: "1️⃣9️⃣" },
        { id: 20, english: "Twenty", spanish: "Veinte", pronunciation: "/bein-te/", icon: "2️⃣0️⃣" },
        { id: 30, english: "Thirty", spanish: "Treinta", pronunciation: "/trein-ta/", icon: "3️⃣0️⃣" },
        { id: 40, english: "Forty", spanish: "Cuarenta", pronunciation: "/kua-ren-ta/", icon: "4️⃣0️⃣" },
        { id: 50, english: "Fifty", spanish: "Cincuenta", pronunciation: "/sin-kuen-ta/", icon: "5️⃣0️⃣" },
        { id: 60, english: "Sixty", spanish: "Sesenta", pronunciation: "/se-sen-ta/", icon: "6️⃣0️⃣" },
        { id: 70, english: "Seventy", spanish: "Setenta", pronunciation: "/se-ten-ta/", icon: "7️⃣0️⃣" },
        { id: 80, english: "Eighty", spanish: "Ochenta", pronunciation: "/o-chen-ta/", icon: "8️⃣0️⃣" },
        { id: 90, english: "Ninety", spanish: "Noventa", pronunciation: "/no-ben-ta/", icon: "9️⃣0️⃣" },
        { id: 100, english: "One Hundred", spanish: "Cien", pronunciation: "/sien/", icon: "💯" }
    ],
    colors: [
        { id: 1, english: "Red", spanish: "Rojo", pronunciation: "/ro-ho/", icon: "🟥" },
        { id: 2, english: "Blue", spanish: "Azul", pronunciation: "/a-sul/", icon: "🟦" },
        { id: 3, english: "Green", spanish: "Verde", pronunciation: "/ber-de/", icon: "🟩" },
        { id: 4, english: "Yellow", spanish: "Amarillo", pronunciation: "/a-ma-ri-yo/", icon: "🟨" },
        { id: 5, english: "Orange", spanish: "Naranja", pronunciation: "/na-ran-ha/", icon: "🟧" },
        { id: 6, english: "Purple", spanish: "Morado", pronunciation: "/mo-ra-do/", icon: "🟪" },
        { id: 7, english: "Pink", spanish: "Rosa", pronunciation: "/ro-sa/", icon: "🩷" },
        { id: 8, english: "Black", spanish: "Negro", pronunciation: "/ne-gro/", icon: "⬛" },
        { id: 9, english: "White", spanish: "Blanco", pronunciation: "/blan-co/", icon: "⬜" },
        { id: 10, english: "Brown", spanish: "Marrón", pronunciation: "/ma-rron/", icon: "🟫" },
        { id: 11, english: "Gray", spanish: "Gris", pronunciation: "/gris/", icon: "🩶" },
        { id: 12, english: "Gold", spanish: "Dorado", pronunciation: "/do-ra-do/", icon: "🥇" },
        { id: 13, english: "Silver", spanish: "Plateado", pronunciation: "/pla-te-a-do/", icon: "🥈" },
        { id: 14, english: "Violet", spanish: "Violeta", pronunciation: "/bio-le-ta/", icon: "🟣" },
        { id: 15, english: "Turquoise", spanish: "Turquesa", pronunciation: "/tur-ke-sa/", icon: "💎" }
    ],
    days: [
        { id: 1, english: "Monday", spanish: "Lunes", pronunciation: "/lu-nes/", icon: "📅" },
        { id: 2, english: "Tuesday", spanish: "Martes", pronunciation: "/mar-tes/", icon: "📅" },
        { id: 3, english: "Wednesday", spanish: "Miércoles", pronunciation: "/mier-co-les/", icon: "📅" },
        { id: 4, english: "Thursday", spanish: "Jueves", pronunciation: "/hue-bes/", icon: "📅" },
        { id: 5, english: "Friday", spanish: "Viernes", pronunciation: "/bier-nes/", icon: "📅" },
        { id: 6, english: "Saturday", spanish: "Sábado", pronunciation: "/sa-ba-do/", icon: "🎉" },
        { id: 7, english: "Sunday", spanish: "Domingo", pronunciation: "/do-min-go/", icon: "☀️" }
    ],
    months: [
        { id: 1, english: "January", spanish: "Enero", pronunciation: "/e-ne-ro/", icon: "❄️" },
        { id: 2, english: "February", spanish: "Febrero", pronunciation: "/fe-bre-ro/", icon: "❤️" },
        { id: 3, english: "March", spanish: "Marzo", pronunciation: "/mar-so/", icon: "🍀" },
        { id: 4, english: "April", spanish: "Abril", pronunciation: "/a-bril/", icon: "🌧️" },
        { id: 5, english: "May", spanish: "Mayo", pronunciation: "/ma-yo/", icon: "🌸" },
        { id: 6, english: "June", spanish: "Junio", pronunciation: "/hu-nio/", icon: "☀️" },
        { id: 7, english: "July", spanish: "Julio", pronunciation: "/hu-lio/", icon: "🍦" },
        { id: 8, english: "August", spanish: "Agosto", pronunciation: "/a-gos-to/", icon: "🏖️" },
        { id: 9, english: "September", spanish: "Septiembre", pronunciation: "/sep-tiem-bre/", icon: "🎒" },
        { id: 10, english: "October", spanish: "Octubre", pronunciation: "/oc-tu-bre/", icon: "🎃" },
        { id: 11, english: "November", spanish: "Noviembre", pronunciation: "/no-biem-bre/", icon: "🦃" },
        { id: 12, english: "December", spanish: "Diciembre", pronunciation: "/di-siem-bre/", icon: "🎄" }
    ],
    shapes: [
        { id: 1, english: "Circle", spanish: "Círculo", pronunciation: "/cir-cu-lo/", icon: "🔴" },
        { id: 2, english: "Square", spanish: "Cuadrado", pronunciation: "/cua-dra-do/", icon: "🟥" },
        { id: 3, english: "Triangle", spanish: "Triángulo", pronunciation: "/trian-gu-lo/", icon: "🔺" },
        { id: 4, english: "Rectangle", spanish: "Rectángulo", pronunciation: "/rec-tan-gu-lo/", icon: "▬" },
        { id: 5, english: "Star", spanish: "Estrella", pronunciation: "/es-tre-ya/", icon: "⭐" },
        { id: 6, english: "Heart", spanish: "Corazón", pronunciation: "/co-ra-son/", icon: "❤️" },
        { id: 7, english: "Diamond", spanish: "Diamante", pronunciation: "/dia-man-te/", icon: "♦️" },
        { id: 8, english: "Oval", spanish: "Óvalo", pronunciation: "/o-ba-lo/", icon: "🥚" }
    ],
    body_parts: [
        { id: 1, english: "Head", spanish: "Cabeza", pronunciation: "/ca-be-sa/", icon: "👤" },
        { id: 2, english: "Eye", spanish: "Ojo", pronunciation: "/o-ho/", icon: "👁️" },
        { id: 3, english: "Nose", spanish: "Nariz", pronunciation: "/na-ris/", icon: "👃" },
        { id: 4, english: "Mouth", spanish: "Boca", pronunciation: "/bo-ca/", icon: "👄" },
        { id: 5, english: "Ear", spanish: "Oreja", pronunciation: "/o-re-ha/", icon: "👂" },
        { id: 6, english: "Hand", spanish: "Mano", pronunciation: "/ma-no/", icon: "✋" },
        { id: 7, english: "Foot", spanish: "Pie", pronunciation: "/pie/", icon: "🦶" },
        { id: 8, english: "Arm", spanish: "Brazo", pronunciation: "/bra-so/", icon: "💪" },
        { id: 9, english: "Leg", spanish: "Pierna", pronunciation: "/pier-na/", icon: "🦵" },
        { id: 10, english: "Hair", spanish: "Pelo", pronunciation: "/pe-lo/", icon: "💇" }
    ],
    alphabet: [
        { id: 1, english: "A (Apple)", spanish: "A (Manzana)", pronunciation: "/a/", icon: "🍎" },
        { id: 2, english: "B (Boat)", spanish: "B (Barco)", pronunciation: "/be/", icon: "⛵" },
        { id: 3, english: "C (House)", spanish: "C (Casa)", pronunciation: "/se/", icon: "🏠" },
        { id: 4, english: "D (Finger)", spanish: "D (Dedo)", pronunciation: "/de/", icon: "👆" },
        { id: 5, english: "E (Elephant)", spanish: "E (Elefante)", pronunciation: "/e/", icon: "🐘" },
        { id: 6, english: "F (Flower)", spanish: "F (Flor)", pronunciation: "/e-fe/", icon: "🌸" },
        { id: 7, english: "G (Cat)", spanish: "G (Gato)", pronunciation: "/he/", icon: "🐱" },
        { id: 8, english: "H (Ice)", spanish: "H (Hielo)", pronunciation: "/a-che/", icon: "🧊" },
        { id: 9, english: "I (Island)", spanish: "I (Isla)", pronunciation: "/i/", icon: "🏝️" },
        { id: 10, english: "J (Giraffe)", spanish: "J (Jirafa)", pronunciation: "/ho-ta/", icon: "🦒" },
        { id: 11, english: "K (Kiwi)", spanish: "K (Kiwi)", pronunciation: "/ka/", icon: "🥝" },
        { id: 12, english: "L (Lion)", spanish: "L (León)", pronunciation: "/e-le/", icon: "🦁" },
        { id: 13, english: "M (Mom)", spanish: "M (Mamá)", pronunciation: "/e-me/", icon: "👩" },
        { id: 14, english: "N (Nest)", spanish: "N (Nido)", pronunciation: "/e-ne/", icon: "🪺" },
        { id: 15, english: "O (Bear)", spanish: "O (Oso)", pronunciation: "/o/", icon: "🐻" },
        { id: 16, english: "P (Dog)", spanish: "P (Perro)", pronunciation: "/pe/", icon: "🐶" },
        { id: 17, english: "Q (Cheese)", spanish: "Q (Queso)", pronunciation: "/ku/", icon: "🧀" },
        { id: 18, english: "R (Mouse)", spanish: "R (Ratón)", pronunciation: "/e-rre/", icon: "🐁" },
        { id: 19, english: "S (Sun)", spanish: "S (Sol)", pronunciation: "/e-se/", icon: "☀️" },
        { id: 20, english: "T (Train)", spanish: "T (Tren)", pronunciation: "/te/", icon: "🚂" },
        { id: 21, english: "U (Grape)", spanish: "U (Uva)", pronunciation: "/u/", icon: "🍇" },
        { id: 22, english: "V (Cow)", spanish: "V (Vaca)", pronunciation: "/u-be/", icon: "🐮" },
        { id: 23, english: "W (Waffle)", spanish: "W (Waffle)", pronunciation: "/do-ble u/", icon: "🧇" },
        { id: 24, english: "X (Xylophone)", spanish: "X (Xilófono)", pronunciation: "/e-kis/", icon: "🎹" },
        { id: 25, english: "Y (Yoyo)", spanish: "Y (Yoyó)", pronunciation: "/i grie-ga/", icon: "🪀" },
        { id: 26, english: "Z (Shoe)", spanish: "Z (Zapato)", pronunciation: "/se-ta/", icon: "👞" }
    ],
    animals: [
        { id: 1, english: "Cat", spanish: "Gato", pronunciation: "/ga-to/", icon: "🐱" },
        { id: 2, english: "Dog", spanish: "Perro", pronunciation: "/pe-rro/", icon: "🐶" },
        { id: 3, english: "Lion", spanish: "León", pronunciation: "/le-on/", icon: "🦁" },
        { id: 4, english: "Bird", spanish: "Pájaro", pronunciation: "/pa-ha-ro/", icon: "🐦" },
        { id: 5, english: "Fish", spanish: "Pez", pronunciation: "/pes/", icon: "🐟" },
        { id: 6, english: "Elephant", spanish: "Elefante", pronunciation: "/e-le-fan-te/", icon: "🐘" },
        { id: 7, english: "Giraffe", spanish: "Jirafa", pronunciation: "/hi-ra-fa/", icon: "🦒" },
        { id: 8, english: "Monkey", spanish: "Mono", pronunciation: "/mo-no/", icon: "🐒" },
        { id: 9, english: "Tiger", spanish: "Tigre", pronunciation: "/ti-gre/", icon: "🐅" },
        { id: 10, english: "Rabbit", spanish: "Conejo", pronunciation: "/co-ne-ho/", icon: "🐰" },
        { id: 11, english: "Bear", spanish: "Oso", pronunciation: "/o-so/", icon: "🐻" },
        { id: 12, english: "Horse", spanish: "Caballo", pronunciation: "/ca-ba-yo/", icon: "🐎" },
        { id: 13, english: "Cow", spanish: "Vaca", pronunciation: "/ba-ca/", icon: "🐮" },
        { id: 14, english: "Pig", spanish: "Cerdo", pronunciation: "/ser-do/", icon: "🐷" },
        { id: 15, english: "Chicken", spanish: "Pollo", pronunciation: "/po-yo/", icon: "🐔" },
        { id: 16, english: "Duck", spanish: "Pato", pronunciation: "/pa-to/", icon: "🦆" },
        { id: 17, english: "Sheep", spanish: "Oveja", pronunciation: "/o-be-ha/", icon: "🐑" },
        { id: 18, english: "Butterfly", spanish: "Mariposa", pronunciation: "/ma-ri-po-sa/", icon: "🦋" },
        { id: 19, english: "Turtle", spanish: "Tortuga", pronunciation: "/tor-tu-ga/", icon: "🐢" },
        { id: 20, english: "Snake", spanish: "Serpiente", pronunciation: "/ser-pien-te/", icon: "🐍" }
    ],
    nature: [
        { id: 1, english: "Sun", spanish: "Sol", pronunciation: "/sol/", icon: "☀️" },
        { id: 2, english: "Moon", spanish: "Luna", pronunciation: "/lu-na/", icon: "🌙" },
        { id: 3, english: "Star", spanish: "Estrella", pronunciation: "/es-tre-ya/", icon: "⭐" },
        { id: 4, english: "Tree", spanish: "Árbol", pronunciation: "/ar-bol/", icon: "🌳" },
        { id: 5, english: "Flower", spanish: "Flor", pronunciation: "/flor/", icon: "🌸" },
        { id: 6, english: "Rain", spanish: "Lluvia", pronunciation: "/yu-via/", icon: "🌧️" },
        { id: 7, english: "Cloud", spanish: "Nube", pronunciation: "/nu-be/", icon: "☁️" },
        { id: 8, english: "Mountain", spanish: "Montaña", pronunciation: "/mon-ta-ña/", icon: "⛰️" },
        { id: 9, english: "River", spanish: "Río", pronunciation: "/ri-o/", icon: "🌊" },
        { id: 10, english: "Fire", spanish: "Fuego", pronunciation: "/fue-go/", icon: "🔥" },
        { id: 11, english: "Ocean", spanish: "Océano", pronunciation: "/o-se-a-no/", icon: "🌊" },
        { id: 12, english: "Beach", spanish: "Playa", pronunciation: "/pla-ya/", icon: "🏖️" },
        { id: 13, english: "Forest", spanish: "Bosque", pronunciation: "/bos-ke/", icon: "🌲" },
        { id: 14, english: "Snow", spanish: "Nieve", pronunciation: "/nie-be/", icon: "❄️" },
        { id: 15, english: "Wind", spanish: "Viento", pronunciation: "/bien-to/", icon: "💨" },
        { id: 16, english: "Rainbow", spanish: "Arcoíris", pronunciation: "/ar-co-i-ris/", icon: "🌈" },
        { id: 17, english: "Leaf", spanish: "Hoja", pronunciation: "/o-ha/", icon: "🍃" },
        { id: 18, english: "Rock", spanish: "Piedra", pronunciation: "/pie-dra/", icon: "🪨" },
        { id: 19, english: "Sky", spanish: "Cielo", pronunciation: "/sie-lo/", icon: "🌌" },
        { id: 20, english: "Earth", spanish: "Tierra", pronunciation: "/tie-rra/", icon: "🌍" }
    ],
    daily_life: [
        { id: 1, english: "Bed", spanish: "Cama", pronunciation: "/ca-ma/", icon: "🛏️" },
        { id: 2, english: "School", spanish: "Escuela", pronunciation: "/es-cue-la/", icon: "🏫" },
        { id: 3, english: "Book", spanish: "Libro", pronunciation: "/li-bro/", icon: "📚" },
        { id: 4, english: "Pencil", spanish: "Lápiz", pronunciation: "/la-pis/", icon: "✏️" },
        { id: 5, english: "Ball", spanish: "Pelota", pronunciation: "/pe-lo-ta/", icon: "⚽" },
        { id: 6, english: "Car", spanish: "Coche", pronunciation: "/co-che/", icon: "🚗" },
        { id: 7, english: "House", spanish: "Casa", pronunciation: "/ca-sa/", icon: "🏠" },
        { id: 8, english: "Chair", spanish: "Silla", pronunciation: "/si-ya/", icon: "🪑" },
        { id: 9, english: "Table", spanish: "Mesa", pronunciation: "/me-sa/", icon: "🪑" },
        { id: 10, english: "Phone", spanish: "Teléfono", pronunciation: "/te-le-fo-no/", icon: "📱" },
        { id: 11, english: "Door", spanish: "Puerta", pronunciation: "/puer-ta/", icon: "🚪" },
        { id: 12, english: "Window", spanish: "Ventana", pronunciation: "/ben-ta-na/", icon: "🪟" },
        { id: 13, english: "Kitchen", spanish: "Cocina", pronunciation: "/co-si-na/", icon: "🍳" },
        { id: 14, english: "Bathroom", spanish: "Baño", pronunciation: "/ba-ño/", icon: "🚽" },
        { id: 15, english: "Shirt", spanish: "Camisa", pronunciation: "/ca-mi-sa/", icon: "👕" },
        { id: 16, english: "Pants", spanish: "Pantalones", pronunciation: "/pan-ta-lo-nes/", icon: "👖" },
        { id: 17, english: "Shoes", spanish: "Zapatos", pronunciation: "/sa-pa-tos/", icon: "👞" },
        { id: 18, english: "Hat", spanish: "Sombrero", pronunciation: "/som-bre-ro/", icon: "🧢" },
        { id: 19, english: "Clock", spanish: "Reloj", pronunciation: "/re-loh/", icon: "⏰" },
        { id: 20, english: "Computer", spanish: "Computadora", pronunciation: "/com-pu-ta-do-ra/", icon: "💻" },
        { id: 21, english: "Water", spanish: "Agua", pronunciation: "/a-gua/", icon: "💧" },
        { id: 22, english: "Food", spanish: "Comida", pronunciation: "/co-mi-da/", icon: "🍲" }
    ],
    family: [
        { id: 1, english: "Mom", spanish: "Mamá", pronunciation: "/ma-ma/", icon: "👩" },
        { id: 2, english: "Dad", spanish: "Papá", pronunciation: "/pa-pa/", icon: "👨" },
        { id: 3, english: "Grandma", spanish: "Abuela", pronunciation: "/a-bue-la/", icon: "👵" },
        { id: 4, english: "Grandpa", spanish: "Abuelo", pronunciation: "/a-bue-lo/", icon: "👴" },
        { id: 5, english: "Baby", spanish: "Bebé", pronunciation: "/be-be/", icon: "👶" },
        { id: 6, english: "Brother", spanish: "Hermano", pronunciation: "/er-ma-no/", icon: "👦" },
        { id: 7, english: "Sister", spanish: "Hermana", pronunciation: "/er-ma-na/", icon: "👧" },
        { id: 8, english: "Uncle", spanish: "Tío", pronunciation: "/ti-o/", icon: "👨" },
        { id: 9, english: "Aunt", spanish: "Tía", pronunciation: "/ti-a/", icon: "👩" },
        { id: 10, english: "Cousin", spanish: "Primo", pronunciation: "/pri-mo/", icon: "🧒" }
    ],
    phrases: [
        { id: 1, english: "Hello", spanish: "Hola", pronunciation: "/o-la/", icon: "👋" },
        { id: 2, english: "Goodbye", spanish: "Adiós", pronunciation: "/a-dios/", icon: "👋" },
        { id: 3, english: "Please", spanish: "Por favor", pronunciation: "/por fa-vor/", icon: "🙏" },
        { id: 4, english: "Thank you", spanish: "Gracias", pronunciation: "/gra-cias/", icon: "🤝" },
        { id: 5, english: "Yes", spanish: "Sí", pronunciation: "/si/", icon: "👍" },
        { id: 6, english: "No", spanish: "No", pronunciation: "/no/", icon: "👎" },
        { id: 7, english: "Good morning", spanish: "Buenos días", pronunciation: "/bue-nos di-as/", icon: "🌅" },
        { id: 8, english: "Good night", spanish: "Buenas noches", pronunciation: "/bue-nas no-ches/", icon: "🌃" },
        { id: 9, english: "How are you?", spanish: "¿Cómo estás?", pronunciation: "/co-mo es-tas/", icon: "❓" },
        { id: 10, english: "I am good", spanish: "Estoy bien", pronunciation: "/es-toy bien/", icon: "😊" },
        { id: 11, english: "What is your name?", spanish: "¿Cómo te llamas?", pronunciation: "/co-mo te ya-mas/", icon: "🏷️" },
        { id: 12, english: "My name is...", spanish: "Me llamo...", pronunciation: "/me ya-mo/", icon: "📛" },
        { id: 13, english: "Excuse me", spanish: "Perdón", pronunciation: "/per-don/", icon: "🙇" },
        { id: 14, english: "I am sorry", spanish: "Lo siento", pronunciation: "/lo sien-to/", icon: "😔" },
        { id: 15, english: "See you later", spanish: "Hasta luego", pronunciation: "/as-ta lue-go/", icon: "👋" },
        { id: 16, english: "Nice to meet you", spanish: "Mucho gusto", pronunciation: "/mu-cho gus-to/", icon: "🤝" },
        { id: 17, english: "Help me", spanish: "Ayúdame", pronunciation: "/a-yu-da-me/", icon: "🆘" },
        { id: 18, english: "I love you", spanish: "Te quiero", pronunciation: "/te kie-ro/", icon: "❤️" },
        { id: 19, english: "Happy Birthday", spanish: "Feliz Cumpleaños", pronunciation: "/fe-lis cum-ple-a-ños/", icon: "🎂" },
        { id: 20, english: "Good job", spanish: "Buen trabajo", pronunciation: "/buen tra-ba-ho/", icon: "🌟" }
    ],
    sentences: [
        { id: 1, english: "The cat is sleeping.", spanish: "El gato está durmiendo.", pronunciation: "/el ga-to es-ta dur-mien-do/", icon: "🐈" },
        { id: 2, english: "I like apples.", spanish: "Me gustan las manzanas.", pronunciation: "/me gus-tan las man-sa-nas/", icon: "🍎" },
        { id: 3, english: "The sun is hot.", spanish: "El sol está caliente.", pronunciation: "/el sol es-ta ca-lien-te/", icon: "☀️" },
        { id: 4, english: "My mom is happy.", spanish: "Mi mamá está feliz.", pronunciation: "/mi ma-ma es-ta fe-lis/", icon: "👩" },
        { id: 5, english: "The dog runs fast.", spanish: "El perro corre rápido.", pronunciation: "/el pe-rro co-rre ra-pi-do/", icon: "🐕" },
        { id: 6, english: "I have a ball.", spanish: "Tengo una pelota.", pronunciation: "/ten-go u-na pe-lo-ta/", icon: "⚽" },
        { id: 7, english: "The sky is blue.", spanish: "El cielo es azul.", pronunciation: "/el sie-lo es a-sul/", icon: "🌌" },
        { id: 8, english: "I go to school.", spanish: "Voy a la escuela.", pronunciation: "/boy a la es-cue-la/", icon: "🏫" },
        { id: 9, english: "She is my sister.", spanish: "Ella es mi hermana.", pronunciation: "/e-ya es mi er-ma-na/", icon: "👧" },
        { id: 10, english: "He is my brother.", spanish: "Él es mi hermano.", pronunciation: "/el es mi er-ma-no/", icon: "👦" },
        { id: 11, english: "I want water.", spanish: "Quiero agua.", pronunciation: "/kie-ro a-gua/", icon: "💧" },
        { id: 12, english: "It is raining.", spanish: "Está lloviendo.", pronunciation: "/es-ta yo-bien-do/", icon: "🌧️" },
        { id: 13, english: "The flower is red.", spanish: "La flor es roja.", pronunciation: "/la flor es ro-ha/", icon: "🌹" },
        { id: 14, english: "I read a book.", spanish: "Leo un libro.", pronunciation: "/le-o un li-bro/", icon: "📖" },
        { id: 15, english: "We are friends.", spanish: "Somos amigos.", pronunciation: "/so-mos a-mi-gos/", icon: "🤝" },
        { id: 16, english: "The car is big.", spanish: "El coche es grande.", pronunciation: "/el co-che es gran-de/", icon: "🚗" },
        { id: 17, english: "I see a bird.", spanish: "Veo un pájaro.", pronunciation: "/be-o un pa-ha-ro/", icon: "🐦" },
        { id: 18, english: "Good night, Mom.", spanish: "Buenas noches, Mamá.", pronunciation: "/bue-nas no-ches ma-ma/", icon: "🌙" },
        { id: 19, english: "I like to play.", spanish: "Me gusta jugar.", pronunciation: "/me gus-ta hu-gar/", icon: "🎮" },
        { id: 20, english: "This is my house.", spanish: "Esta es mi casa.", pronunciation: "/es-ta es mi ca-sa/", icon: "🏠" }
    ]
};

// State
let currentLevel = null;
let currentIndex = 0;
let score = 0;
let quizScore = 0;
let recognition = null;
let voices = [];

// DOM Elements
const screens = {
    welcome: document.getElementById('welcome-screen'),
    level: document.getElementById('level-screen'),
    game: document.getElementById('game-screen'),
    quiz: document.getElementById('quiz-screen')
};

// Initialize Voices
function loadVoices() {
    voices = window.speechSynthesis.getVoices();
}

if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
}

// Initialize Speech Recognition
function initSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.lang = 'es-ES';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            checkPronunciation(transcript);
        };

        recognition.onerror = (event) => {
            showFeedback('Error: ' + event.error, 'error');
            document.getElementById('speak-btn').classList.remove('listening');
        };

        recognition.onend = () => {
            document.getElementById('speak-btn').classList.remove('listening');
        };
    } else {
        console.warn('Speech recognition not supported');
        document.getElementById('speak-btn').style.display = 'none';
    }
}

// Navigation Functions
function showScreen(screenName) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[screenName].classList.add('active');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initSpeechRecognition();
    loadVoices();

    // Start Button
    document.getElementById('start-btn').addEventListener('click', () => {
        showScreen('level');
    });

    // Level Selection
    document.querySelectorAll('.level-card').forEach(card => {
        card.addEventListener('click', () => {
            const level = card.dataset.level;
            startLevel(level);
        });
    });

    // Game Controls
    document.getElementById('back-to-levels').addEventListener('click', () => {
        showScreen('level');
    });

    document.getElementById('prev-word').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCard();
        }
    });

    document.getElementById('next-word').addEventListener('click', () => {
        if (currentIndex < gameData[currentLevel].length - 1) {
            currentIndex++;
            updateCard();
        }
    });

    document.getElementById('listen-btn').addEventListener('click', speakWord);

    document.getElementById('speak-btn').addEventListener('click', () => {
        if (recognition) {
            try {
                recognition.start();
                document.getElementById('speak-btn').classList.add('listening');
                showFeedback('Listening...', 'neutral');
            } catch (e) {
                console.error(e);
            }
        }
    });

    document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
    document.getElementById('quit-quiz').addEventListener('click', () => showScreen('level'));
});

// Game Logic
function startLevel(level) {
    currentLevel = level;
    currentIndex = 0;
    score = 0;
    updateScore();
    showScreen('game');
    updateCard();
    document.getElementById('start-quiz-btn').style.display = 'none';
}

function updateCard() {
    const data = gameData[currentLevel][currentIndex];

    // Update DOM
    document.getElementById('card-image').textContent = data.icon;
    document.getElementById('word-english').textContent = data.english;
    document.getElementById('word-spanish').textContent = data.spanish;
    document.getElementById('pronunciation').textContent = data.pronunciation;

    // Update Progress
    const progress = ((currentIndex + 1) / gameData[currentLevel].length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;

    // Update Buttons
    document.getElementById('prev-word').disabled = currentIndex === 0;
    document.getElementById('next-word').disabled = currentIndex === gameData[currentLevel].length - 1;

    // Show Quiz Button if at end
    if (currentIndex === gameData[currentLevel].length - 1) {
        document.getElementById('start-quiz-btn').style.display = 'block';
    }

    // Clear feedback
    showFeedback('', '');

    // Animation
    const card = document.getElementById('flashcard');
    card.style.transform = 'rotateY(90deg)';
    setTimeout(() => {
        card.style.transform = 'rotateY(0deg)';
    }, 200);
}

function speakWord() {
    const text = gameData[currentLevel][currentIndex].spanish;

    // Clean text for speech (remove parentheses content if it's just a hint)
    // For alphabet "A (Manzana)", we want to say "A. Manzana."
    let speechText = text;
    if (currentLevel === 'alphabet') {
        speechText = text.replace('(', '. ').replace(')', '');
    }

    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = 'es-ES';

    // Voice Selection Logic
    // Prioritize Google, then Monica/Paulina, then any 'es' voice
    const preferredVoices = voices.filter(voice => voice.lang.includes('es'));
    let selectedVoice = preferredVoices.find(v => v.name.includes('Google')) ||
        preferredVoices.find(v => v.name.includes('Monica')) ||
        preferredVoices.find(v => v.name.includes('Paulina')) ||
        preferredVoices[0];

    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    // Adjust pitch and rate for "kid friendly" / "thin" voice
    // Higher pitch makes it sound younger/thinner
    utterance.pitch = 1.2;
    utterance.rate = 0.9; // Slightly slower for clarity

    window.speechSynthesis.speak(utterance);
}

function checkPronunciation(transcript) {
    let target = gameData[currentLevel][currentIndex].spanish.toLowerCase();

    // Clean target for comparison (remove parentheses)
    if (target.includes('(')) {
        target = target.split('(')[0].trim();
    }

    // Simple fuzzy match or exact match
    if (transcript.includes(target) || target.includes(transcript)) {
        showFeedback('¡Muy bien! (Very Good!)', 'success');
        score += 10;
        updateScore();
        playSound('success');
    } else {
        showFeedback(`Try again! You said: "${transcript}"`, 'error');
        playSound('error');
    }
}

function showFeedback(msg, type) {
    const area = document.getElementById('feedback-area');
    area.textContent = msg;
    area.className = 'feedback-area';
    if (type === 'success') area.classList.add('feedback-success');
    if (type === 'error') area.classList.add('feedback-error');
}

function updateScore() {
    document.getElementById('score').textContent = score;
}

// Quiz Logic
let quizQuestions = [];
let currentQuizIndex = 0;

function startQuiz() {
    quizScore = 0;
    currentQuizIndex = 0;
    // Create a copy of current level data and shuffle it
    quizQuestions = [...gameData[currentLevel]].sort(() => Math.random() - 0.5);
    // Limit quiz to 5 questions if the set is huge (like alphabet)
    if (quizQuestions.length > 5) {
        quizQuestions = quizQuestions.slice(0, 5);
    }

    showScreen('quiz');
    showQuizQuestion();
}

function showQuizQuestion() {
    if (currentQuizIndex >= quizQuestions.length) {
        endQuiz();
        return;
    }

    const question = quizQuestions[currentQuizIndex];
    document.getElementById('quiz-score').textContent = quizScore;
    document.getElementById('quiz-question').textContent = `What is "${question.english}" in Spanish?`;
    document.getElementById('quiz-feedback').textContent = '';

    // Speak the question
    speakText(`What is ${question.english} in Spanish?`, 'en-US');

    // Generate options (1 correct + 3 random wrong)
    const options = [question];
    // Get wrong answers from ANY category to ensure variety, or just current level?
    // Current level is better for context, but if level is small (5 items), we might need more.
    // Let's use all data for distractors to make it fun/harder? No, keep it simple for kids.
    // Use current level first, if not enough, use others.

    let pool = gameData[currentLevel];
    if (pool.length < 4) {
        pool = Object.values(gameData).flat();
    }

    while (options.length < 4) {
        const randomWord = pool[Math.floor(Math.random() * pool.length)];
        if (!options.some(o => o.spanish === randomWord.spanish)) {
            options.push(randomWord);
        }
    }

    // Shuffle options
    options.sort(() => Math.random() - 0.5);

    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';

    options.forEach(opt => {
        const btn = document.createElement('div');
        btn.className = 'quiz-option';
        btn.textContent = opt.spanish;
        btn.onclick = () => checkAnswer(opt, question, btn);
        optionsContainer.appendChild(btn);
    });
}

function speakText(text, lang = 'en-US') {
    // Cancel any current speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;

    if (lang === 'es-ES') {
        // Use the preferred Spanish voice logic if lang is Spanish
        const preferredVoices = voices.filter(voice => voice.lang.includes('es'));
        let selectedVoice = preferredVoices.find(v => v.name.includes('Google')) ||
            preferredVoices.find(v => v.name.includes('Monica')) ||
            preferredVoices.find(v => v.name.includes('Paulina')) ||
            preferredVoices[0];
        if (selectedVoice) utterance.voice = selectedVoice;
        utterance.pitch = 1.2;
    }

    window.speechSynthesis.speak(utterance);
}

function checkAnswer(selected, correct, btnElement) {
    // Disable all options
    const allOpts = document.querySelectorAll('.quiz-option');
    allOpts.forEach(opt => opt.style.pointerEvents = 'none');

    if (selected.spanish === correct.spanish) {
        btnElement.classList.add('correct');
        document.getElementById('quiz-feedback').textContent = '¡Correcto!';
        document.getElementById('quiz-feedback').style.color = '#2ecc71';
        quizScore += 20;
        playSound('success');
    } else {
        btnElement.classList.add('wrong');
        document.getElementById('quiz-feedback').textContent = `Oops! It was "${correct.spanish}"`;
        document.getElementById('quiz-feedback').style.color = '#e74c3c';
        playSound('error');

        // Highlight correct answer
        allOpts.forEach(opt => {
            if (opt.textContent === correct.spanish) opt.classList.add('correct');
        });
    }

    document.getElementById('quiz-score').textContent = quizScore;

    setTimeout(() => {
        currentQuizIndex++;
        showQuizQuestion();
    }, 2000);
}

function endQuiz() {
    document.getElementById('quiz-question').textContent = "Quiz Complete!";
    document.getElementById('quiz-options').innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center;">
            <h3>Final Score: ${quizScore}</h3>
            <p>${quizScore >= 80 ? 'Amazing Job! 🌟' : 'Keep Practicing! 💪'}</p>
        </div>
    `;
    document.getElementById('quiz-feedback').textContent = '';
}

// Simple Sound Effects (Optional)
function playSound(type) {
    // Placeholder for sound effects
}
