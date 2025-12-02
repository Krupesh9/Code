// Gujarati Adventure Game Logic

// Game Data
const gameData = {
    vowels: [
        { id: 1, english: "A", gujarati: "અ", pronunciation: "/a/", icon: "🕉️" },
        { id: 2, english: "Aa", gujarati: "આ", pronunciation: "/aa/", icon: "🕉️" },
        { id: 3, english: "I", gujarati: "ઇ", pronunciation: "/i/", icon: "🕉️" },
        { id: 4, english: "Ee", gujarati: "ઈ", pronunciation: "/ee/", icon: "🕉️" },
        { id: 5, english: "U", gujarati: "ઉ", pronunciation: "/u/", icon: "🕉️" },
        { id: 6, english: "Oo", gujarati: "ઊ", pronunciation: "/oo/", icon: "🕉️" },
        { id: 7, english: "Ru", gujarati: "ઋ", pronunciation: "/ru/", icon: "🕉️" },
        { id: 8, english: "E", gujarati: "એ", pronunciation: "/e/", icon: "🕉️" },
        { id: 9, english: "Ai", gujarati: "ઐ", pronunciation: "/ai/", icon: "🕉️" },
        { id: 10, english: "O", gujarati: "ઓ", pronunciation: "/o/", icon: "🕉️" },
        { id: 11, english: "Au", gujarati: "ઔ", pronunciation: "/au/", icon: "🕉️" },
        { id: 12, english: "Am", gujarati: "અં", pronunciation: "/am/", icon: "🕉️" },
        { id: 13, english: "Ah", gujarati: "અઃ", pronunciation: "/ah/", icon: "🕉️" }
    ],
    consonants: [
        { id: 1, english: "Ka", gujarati: "ક", pronunciation: "/ka/", icon: "📝" },
        { id: 2, english: "Kha", gujarati: "ખ", pronunciation: "/kha/", icon: "📝" },
        { id: 3, english: "Ga", gujarati: "ગ", pronunciation: "/ga/", icon: "📝" },
        { id: 4, english: "Gha", gujarati: "ઘ", pronunciation: "/gha/", icon: "📝" },
        { id: 5, english: "Cha", gujarati: "ચ", pronunciation: "/cha/", icon: "📝" },
        { id: 6, english: "Chha", gujarati: "છ", pronunciation: "/chha/", icon: "📝" },
        { id: 7, english: "Ja", gujarati: "જ", pronunciation: "/ja/", icon: "📝" },
        { id: 8, english: "Jha", gujarati: "ઝ", pronunciation: "/jha/", icon: "📝" },
        { id: 9, english: "Ta", gujarati: "ટ", pronunciation: "/ta/", icon: "📝" },
        { id: 10, english: "Tha", gujarati: "ઠ", pronunciation: "/tha/", icon: "📝" },
        { id: 11, english: "Da", gujarati: "ડ", pronunciation: "/da/", icon: "📝" },
        { id: 12, english: "Dha", gujarati: "ઢ", pronunciation: "/dha/", icon: "📝" },
        { id: 13, english: "Na", gujarati: "ણ", pronunciation: "/na/", icon: "📝" },
        { id: 14, english: "Ta", gujarati: "ત", pronunciation: "/ta/", icon: "📝" },
        { id: 15, english: "Tha", gujarati: "થ", pronunciation: "/tha/", icon: "📝" },
        { id: 16, english: "Da", gujarati: "દ", pronunciation: "/da/", icon: "📝" },
        { id: 17, english: "Dha", gujarati: "ધ", pronunciation: "/dha/", icon: "📝" },
        { id: 18, english: "Na", gujarati: "ન", pronunciation: "/na/", icon: "📝" },
        { id: 19, english: "Pa", gujarati: "પ", pronunciation: "/pa/", icon: "📝" },
        { id: 20, english: "Pha", gujarati: "ફ", pronunciation: "/pha/", icon: "📝" },
        { id: 21, english: "Ba", gujarati: "બ", pronunciation: "/ba/", icon: "📝" },
        { id: 22, english: "Bha", gujarati: "ભ", pronunciation: "/bha/", icon: "📝" },
        { id: 23, english: "Ma", gujarati: "મ", pronunciation: "/ma/", icon: "📝" },
        { id: 24, english: "Ya", gujarati: "ય", pronunciation: "/ya/", icon: "📝" },
        { id: 25, english: "Ra", gujarati: "ર", pronunciation: "/ra/", icon: "📝" },
        { id: 26, english: "La", gujarati: "લ", pronunciation: "/la/", icon: "📝" },
        { id: 27, english: "Va", gujarati: "વ", pronunciation: "/va/", icon: "📝" },
        { id: 28, english: "Sha", gujarati: "શ", pronunciation: "/sha/", icon: "📝" },
        { id: 29, english: "Sha", gujarati: "ષ", pronunciation: "/sha/", icon: "📝" },
        { id: 30, english: "Sa", gujarati: "સ", pronunciation: "/sa/", icon: "📝" },
        { id: 31, english: "Ha", gujarati: "હ", pronunciation: "/ha/", icon: "📝" },
        { id: 32, english: "La", gujarati: "ળ", pronunciation: "/la/", icon: "📝" },
        { id: 33, english: "Ksha", gujarati: "ક્ષ", pronunciation: "/ksha/", icon: "📝" },
        { id: 34, english: "Gna", gujarati: "જ્ઞ", pronunciation: "/gna/", icon: "📝" }
    ],
    simple_words: [
        { id: 1, english: "Bus", gujarati: "બસ", pronunciation: "/bas/", icon: "🚌" },
        { id: 2, english: "Cup", gujarati: "કપ", pronunciation: "/kap/", icon: "☕" },
        { id: 3, english: "Ten", gujarati: "દસ", pronunciation: "/das/", icon: "🔟" },
        { id: 4, english: "One", gujarati: "એક", pronunciation: "/ek/", icon: "1️⃣" },
        { id: 5, english: "Pen", gujarati: "પેન", pronunciation: "/pen/", icon: "🖊️" },
        { id: 6, english: "Car", gujarati: "કાર", pronunciation: "/kar/", icon: "🚗" },
        { id: 7, english: "Cow", gujarati: "ગાય", pronunciation: "/gay/", icon: "🐮" },
        { id: 8, english: "Nose", gujarati: "નાક", pronunciation: "/nak/", icon: "👃" },
        { id: 9, english: "Ear", gujarati: "કાન", pronunciation: "/kan/", icon: "👂" },
        { id: 10, english: "Hand", gujarati: "હાથ", pronunciation: "/hath/", icon: "✋" },
        { id: 11, english: "Leg", gujarati: "પગ", pronunciation: "/pag/", icon: "🦶" },
        { id: 12, english: "Hair", gujarati: "વાળ", pronunciation: "/val/", icon: "💇" },
        { id: 13, english: "Name", gujarati: "નામ", pronunciation: "/nam/", icon: "🏷️" },
        { id: 14, english: "Work", gujarati: "કામ", pronunciation: "/kam/", icon: "💼" },
        { id: 15, english: "Village", gujarati: "ગામ", pronunciation: "/gam/", icon: "🏡" },
        { id: 16, english: "Shop", gujarati: "દુકાન", pronunciation: "/du-kan/", icon: "🏪" },
        { id: 17, english: "House", gujarati: "ઘર", pronunciation: "/ghar/", icon: "🏠" },
        { id: 18, english: "Water", gujarati: "જળ", pronunciation: "/jal/", icon: "💧" },
        { id: 19, english: "Fruit", gujarati: "ફળ", pronunciation: "/fal/", icon: "🍇" },
        { id: 20, english: "Plough", gujarati: "હળ", pronunciation: "/hal/", icon: "🚜" }
    ],
    numbers: [
        { id: 1, english: "One", gujarati: "એક", pronunciation: "/ek/", icon: "1️⃣" },
        { id: 2, english: "Two", gujarati: "બે", pronunciation: "/be/", icon: "2️⃣" },
        { id: 3, english: "Three", gujarati: "ત્રણ", pronunciation: "/tran/", icon: "3️⃣" },
        { id: 4, english: "Four", gujarati: "ચાર", pronunciation: "/char/", icon: "4️⃣" },
        { id: 5, english: "Five", gujarati: "પાંચ", pronunciation: "/paanch/", icon: "5️⃣" },
        { id: 6, english: "Six", gujarati: "છ", pronunciation: "/chha/", icon: "6️⃣" },
        { id: 7, english: "Seven", gujarati: "સાત", pronunciation: "/saat/", icon: "7️⃣" },
        { id: 8, english: "Eight", gujarati: "આઠ", pronunciation: "/aath/", icon: "8️⃣" },
        { id: 9, english: "Nine", gujarati: "નવ", pronunciation: "/nav/", icon: "9️⃣" },
        { id: 10, english: "Ten", gujarati: "દસ", pronunciation: "/das/", icon: "🔟" },
        { id: 11, english: "Eleven", gujarati: "અગિયાર", pronunciation: "/agiyar/", icon: "1️⃣1️⃣" },
        { id: 12, english: "Twelve", gujarati: "બાર", pronunciation: "/baar/", icon: "1️⃣2️⃣" },
        { id: 13, english: "Thirteen", gujarati: "તેર", pronunciation: "/ter/", icon: "1️⃣3️⃣" },
        { id: 14, english: "Fourteen", gujarati: "ચૌદ", pronunciation: "/chaud/", icon: "1️⃣4️⃣" },
        { id: 15, english: "Fifteen", gujarati: "પંદર", pronunciation: "/pandar/", icon: "1️⃣5️⃣" },
        { id: 16, english: "Sixteen", gujarati: "સોળ", pronunciation: "/sol/", icon: "1️⃣6️⃣" },
        { id: 17, english: "Seventeen", gujarati: "સત્તર", pronunciation: "/sattar/", icon: "1️⃣7️⃣" },
        { id: 18, english: "Eighteen", gujarati: "અઢાર", pronunciation: "/adhaar/", icon: "1️⃣8️⃣" },
        { id: 19, english: "Nineteen", gujarati: "ઓગણીસ", pronunciation: "/ognis/", icon: "1️⃣9️⃣" },
        { id: 20, english: "Twenty", gujarati: "વીસ", pronunciation: "/vees/", icon: "2️⃣0️⃣" },
        { id: 30, english: "Thirty", gujarati: "ત્રીસ", pronunciation: "/trees/", icon: "3️⃣0️⃣" },
        { id: 40, english: "Forty", gujarati: "ચાલીસ", pronunciation: "/chalis/", icon: "4️⃣0️⃣" },
        { id: 50, english: "Fifty", gujarati: "પચાસ", pronunciation: "/pachas/", icon: "5️⃣0️⃣" },
        { id: 60, english: "Sixty", gujarati: "સાઈઠ", pronunciation: "/saith/", icon: "6️⃣0️⃣" },
        { id: 70, english: "Seventy", gujarati: "સિત્તેર", pronunciation: "/sitter/", icon: "7️⃣0️⃣" },
        { id: 80, english: "Eighty", gujarati: "એંસી", pronunciation: "/ensi/", icon: "8️⃣0️⃣" },
        { id: 90, english: "Ninety", gujarati: "નેવું", pronunciation: "/nevu/", icon: "9️⃣0️⃣" },
        { id: 100, english: "One Hundred", gujarati: "સો", pronunciation: "/so/", icon: "💯" }
    ],
    colors: [
        { id: 1, english: "Red", gujarati: "લાલ", pronunciation: "/lal/", icon: "🟥" },
        { id: 2, english: "Blue", gujarati: "વાદળી", pronunciation: "/vadali/", icon: "🟦" },
        { id: 3, english: "Green", gujarati: "લીલો", pronunciation: "/lilo/", icon: "🟩" },
        { id: 4, english: "Yellow", gujarati: "પીળો", pronunciation: "/pilo/", icon: "🟨" },
        { id: 5, english: "Orange", gujarati: "નારંગી", pronunciation: "/narangi/", icon: "🟧" },
        { id: 6, english: "Purple", gujarati: "જાંબલી", pronunciation: "/jambli/", icon: "🟪" },
        { id: 7, english: "Pink", gujarati: "ગુલાબી", pronunciation: "/gulabi/", icon: "🩷" },
        { id: 8, english: "Black", gujarati: "કાળો", pronunciation: "/kalo/", icon: "⬛" },
        { id: 9, english: "White", gujarati: "સફેદ", pronunciation: "/safed/", icon: "⬜" },
        { id: 10, english: "Brown", gujarati: "કથ્થઈ", pronunciation: "/katthai/", icon: "🟫" },
        { id: 11, english: "Gray", gujarati: "રાખોડી", pronunciation: "/rakhodi/", icon: "🩶" },
        { id: 12, english: "Gold", gujarati: "સોનેરી", pronunciation: "/soneri/", icon: "🥇" },
        { id: 13, english: "Silver", gujarati: "રૂપેરી", pronunciation: "/ruperi/", icon: "🥈" }
    ],
    days: [
        { id: 1, english: "Monday", gujarati: "સોમવાર", pronunciation: "/som-var/", icon: "📅" },
        { id: 2, english: "Tuesday", gujarati: "મંગળવાર", pronunciation: "/mangal-var/", icon: "📅" },
        { id: 3, english: "Wednesday", gujarati: "બુધવાર", pronunciation: "/budh-var/", icon: "📅" },
        { id: 4, english: "Thursday", gujarati: "ગુરુવાર", pronunciation: "/guru-var/", icon: "📅" },
        { id: 5, english: "Friday", gujarati: "શુક્રવાર", pronunciation: "/shukra-var/", icon: "📅" },
        { id: 6, english: "Saturday", gujarati: "શનિવાર", pronunciation: "/shani-var/", icon: "🎉" },
        { id: 7, english: "Sunday", gujarati: "રવિવાર", pronunciation: "/ravi-var/", icon: "☀️" }
    ],
    months: [
        { id: 1, english: "January", gujarati: "જાન્યુઆરી", pronunciation: "/jan-yu-a-ri/", icon: "❄️" },
        { id: 2, english: "February", gujarati: "ફેબ્રુઆરી", pronunciation: "/feb-ru-a-ri/", icon: "❤️" },
        { id: 3, english: "March", gujarati: "માર્ચ", pronunciation: "/march/", icon: "🍀" },
        { id: 4, english: "April", gujarati: "એપ્રિલ", pronunciation: "/april/", icon: "🌧️" },
        { id: 5, english: "May", gujarati: "મે", pronunciation: "/may/", icon: "🌸" },
        { id: 6, english: "June", gujarati: "જૂન", pronunciation: "/june/", icon: "☀️" },
        { id: 7, english: "July", gujarati: "જુલાઈ", pronunciation: "/ju-lai/", icon: "🍦" },
        { id: 8, english: "August", gujarati: "ઓગસ્ટ", pronunciation: "/august/", icon: "🏖️" },
        { id: 9, english: "September", gujarati: "સપ્ટેમ્બર", pronunciation: "/sep-tem-ber/", icon: "🎒" },
        { id: 10, english: "October", gujarati: "ઓક્ટોબર", pronunciation: "/oc-to-ber/", icon: "🎃" },
        { id: 11, english: "November", gujarati: "નવેમ્બર", pronunciation: "/no-vem-ber/", icon: "🦃" },
        { id: 12, english: "December", gujarati: "ડિસેમ્બર", pronunciation: "/de-cem-ber/", icon: "🎄" }
    ],
    shapes: [
        { id: 1, english: "Circle", gujarati: "વર્તુળ", pronunciation: "/var-tul/", icon: "🔴" },
        { id: 2, english: "Square", gujarati: "ચોરસ", pronunciation: "/cho-ras/", icon: "🟥" },
        { id: 3, english: "Triangle", gujarati: "ત્રિકોણ", pronunciation: "/tri-kon/", icon: "🔺" },
        { id: 4, english: "Rectangle", gujarati: "લંબચોરસ", pronunciation: "/lamb-cho-ras/", icon: "▬" },
        { id: 5, english: "Star", gujarati: "તારો", pronunciation: "/ta-ro/", icon: "⭐" },
        { id: 6, english: "Heart", gujarati: "હૃદય", pronunciation: "/hru-day/", icon: "❤️" },
        { id: 7, english: "Diamond", gujarati: "હીરો", pronunciation: "/hi-ro/", icon: "♦️" },
        { id: 8, english: "Oval", gujarati: "લંબગોળ", pronunciation: "/lamb-gol/", icon: "🥚" }
    ],
    body_parts: [
        { id: 1, english: "Head", gujarati: "માથું", pronunciation: "/ma-thu/", icon: "👤" },
        { id: 2, english: "Eye", gujarati: "આંખ", pronunciation: "/aankh/", icon: "👁️" },
        { id: 3, english: "Nose", gujarati: "નાક", pronunciation: "/naak/", icon: "👃" },
        { id: 4, english: "Mouth", gujarati: "મોં", pronunciation: "/mo/", icon: "👄" },
        { id: 5, english: "Ear", gujarati: "કાન", pronunciation: "/kaan/", icon: "👂" },
        { id: 6, english: "Hand", gujarati: "હાથ", pronunciation: "/haath/", icon: "✋" },
        { id: 7, english: "Foot", gujarati: "પગ", pronunciation: "/pag/", icon: "🦶" },
        { id: 8, english: "Hair", gujarati: "વાળ", pronunciation: "/vaal/", icon: "💇" },
        { id: 9, english: "Finger", gujarati: "આંગળી", pronunciation: "/aang-li/", icon: "👆" },
        { id: 10, english: "Teeth", gujarati: "દાંત", pronunciation: "/daant/", icon: "🦷" },
        { id: 11, english: "Tongue", gujarati: "જીભ", pronunciation: "/jeebh/", icon: "👅" },
        { id: 12, english: "Face", gujarati: "ચહેરો", pronunciation: "/che-he-ro/", icon: "😀" }
    ],
    food: [
        { id: 1, english: "Apple", gujarati: "સફરજન", pronunciation: "/sa-far-jan/", icon: "🍎" },
        { id: 2, english: "Banana", gujarati: "કેળું", pronunciation: "/ke-lu/", icon: "🍌" },
        { id: 3, english: "Bread", gujarati: "રોટલી", pronunciation: "/rot-li/", icon: "🍞" },
        { id: 4, english: "Milk", gujarati: "દૂધ", pronunciation: "/doodh/", icon: "🥛" },
        { id: 5, english: "Water", gujarati: "પાણી", pronunciation: "/pa-ni/", icon: "💧" },
        { id: 6, english: "Cheese", gujarati: "ચીઝ", pronunciation: "/cheese/", icon: "🧀" },
        { id: 7, english: "Egg", gujarati: "ઈંડું", pronunciation: "/in-du/", icon: "🥚" },
        { id: 8, english: "Rice", gujarati: "ભાત", pronunciation: "/bhaat/", icon: "🍚" },
        { id: 9, english: "Ice Cream", gujarati: "આઈસ્ક્રીમ", pronunciation: "/ice-cream/", icon: "🍦" },
        { id: 10, english: "Chocolate", gujarati: "ચોકલેટ", pronunciation: "/cho-co-late/", icon: "🍫" },
        { id: 11, english: "Juice", gujarati: "જ્યુસ", pronunciation: "/juice/", icon: "🧃" },
        { id: 12, english: "Fruit", gujarati: "ફળ", pronunciation: "/fal/", icon: "🍇" },
        { id: 13, english: "Vegetable", gujarati: "શાકભાજી", pronunciation: "/shaak-bha-ji/", icon: "🥦" }
    ],
    jobs: [
        { id: 1, english: "Doctor", gujarati: "ડોક્ટર", pronunciation: "/doc-tor/", icon: "👨‍⚕️" },
        { id: 2, english: "Teacher", gujarati: "શિક્ષક", pronunciation: "/shik-shak/", icon: "👨‍🏫" },
        { id: 3, english: "Police", gujarati: "પોલીસ", pronunciation: "/po-lice/", icon: "👮" },
        { id: 4, english: "Farmer", gujarati: "ખેડૂત", pronunciation: "/khe-dut/", icon: "👨‍🌾" },
        { id: 5, english: "Driver", gujarati: "ડ્રાઈવર", pronunciation: "/dri-ver/", icon: "🚕" },
        { id: 6, english: "Singer", gujarati: "ગાયક", pronunciation: "/ga-yak/", icon: "🎤" },
        { id: 7, english: "Artist", gujarati: "કલાકાર", pronunciation: "/ka-la-kar/", icon: "🎨" },
        { id: 8, english: "Soldier", gujarati: "સૈનિક", pronunciation: "/sai-nik/", icon: "💂" }
    ],
    sports: [
        { id: 1, english: "Cricket", gujarati: "ક્રિકેટ", pronunciation: "/cri-cket/", icon: "🏏" },
        { id: 2, english: "Soccer", gujarati: "ફૂટબોલ", pronunciation: "/foot-ball/", icon: "⚽" },
        { id: 3, english: "Tennis", gujarati: "ટેનિસ", pronunciation: "/te-nis/", icon: "🎾" },
        { id: 4, english: "Running", gujarati: "દોડવું", pronunciation: "/dod-vu/", icon: "🏃" },
        { id: 5, english: "Swimming", gujarati: "તરવું", pronunciation: "/tar-vu/", icon: "🏊" },
        { id: 6, english: "Yoga", gujarati: "યોગ", pronunciation: "/yo-ga/", icon: "🧘" }
    ],
    transport: [
        { id: 1, english: "Car", gujarati: "ગાડી", pronunciation: "/ga-di/", icon: "🚗" },
        { id: 2, english: "Bus", gujarati: "બસ", pronunciation: "/bus/", icon: "🚌" },
        { id: 3, english: "Train", gujarati: "ટ્રેન", pronunciation: "/train/", icon: "🚂" },
        { id: 4, english: "Airplane", gujarati: "વિમાન", pronunciation: "/vi-maan/", icon: "✈️" },
        { id: 5, english: "Bicycle", gujarati: "સાયકલ", pronunciation: "/cy-cle/", icon: "🚲" },
        { id: 6, english: "Boat", gujarati: "હોડી", pronunciation: "/ho-di/", icon: "⛵" },
        { id: 7, english: "Rickshaw", gujarati: "રિક્ષા", pronunciation: "/rik-sha/", icon: "🛺" }
    ],
    places: [
        { id: 1, english: "School", gujarati: "શાળા", pronunciation: "/sha-la/", icon: "🏫" },
        { id: 2, english: "Park", gujarati: "બગીચો", pronunciation: "/ba-gi-cho/", icon: "🌳" },
        { id: 3, english: "House", gujarati: "ઘર", pronunciation: "/ghar/", icon: "🏠" },
        { id: 4, english: "Shop", gujarati: "દુકાન", pronunciation: "/du-kaan/", icon: "🏪" },
        { id: 5, english: "Hospital", gujarati: "હોસ્પિટલ", pronunciation: "/hos-pi-tal/", icon: "🏥" },
        { id: 6, english: "Temple", gujarati: "મંદિર", pronunciation: "/man-dir/", icon: "🛕" },
        { id: 7, english: "Village", gujarati: "ગામ", pronunciation: "/gaam/", icon: "🏡" },
        { id: 8, english: "City", gujarati: "શહેર", pronunciation: "/sha-her/", icon: "🏙️" }
    ],
    emotions: [
        { id: 1, english: "Happy", gujarati: "ખુશ", pronunciation: "/khush/", icon: "😊" },
        { id: 2, english: "Sad", gujarati: "ઉદાસ", pronunciation: "/u-daas/", icon: "😢" },
        { id: 3, english: "Angry", gujarati: "ગુસ્સે", pronunciation: "/gus-se/", icon: "😠" },
        { id: 4, english: "Tired", gujarati: "થાકેલું", pronunciation: "/tha-ke-lu/", icon: "😴" },
        { id: 5, english: "Scared", gujarati: "ડરેલું", pronunciation: "/da-re-lu/", icon: "😱" },
        { id: 6, english: "Hungry", gujarati: "ભૂખ્યું", pronunciation: "/bhukh-yu/", icon: "😋" }
    ],
    alphabet: [
        { id: 1, english: "A (Apple)", gujarati: "સફરજન", pronunciation: "/sa-far-jan/", icon: "🍎" },
        { id: 2, english: "B (Ball)", gujarati: "દડો", pronunciation: "/da-do/", icon: "⚽" },
        { id: 3, english: "C (Cat)", gujarati: "બિલાડી", pronunciation: "/bi-la-di/", icon: "🐱" },
        { id: 4, english: "D (Dog)", gujarati: "કૂતરો", pronunciation: "/kut-ro/", icon: "🐶" },
        { id: 5, english: "E (Elephant)", gujarati: "હાથી", pronunciation: "/ha-thi/", icon: "🐘" },
        { id: 6, english: "F (Fish)", gujarati: "માછલી", pronunciation: "/mach-li/", icon: "🐟" },
        { id: 7, english: "G (Goat)", gujarati: "બકરી", pronunciation: "/bak-ri/", icon: "🐐" },
        { id: 8, english: "H (House)", gujarati: "ઘર", pronunciation: "/ghar/", icon: "🏠" },
        { id: 9, english: "I (Ice Cream)", gujarati: "આઈસ્ક્રીમ", pronunciation: "/ice-cream/", icon: "🍦" },
        { id: 10, english: "J (Jug)", gujarati: "જગ", pronunciation: "/jug/", icon: "🍶" },
        { id: 11, english: "K (Kite)", gujarati: "પતંગ", pronunciation: "/pa-tang/", icon: "🪁" },
        { id: 12, english: "L (Lion)", gujarati: "સિંહ", pronunciation: "/sinh/", icon: "🦁" },
        { id: 13, english: "M (Monkey)", gujarati: "વાંદરો", pronunciation: "/vaan-dro/", icon: "🐒" },
        { id: 14, english: "N (Nest)", gujarati: "માળો", pronunciation: "/ma-lo/", icon: "🪺" },
        { id: 15, english: "O (Orange)", gujarati: "નારંગી", pronunciation: "/na-ran-gi/", icon: "🍊" },
        { id: 16, english: "P (Parrot)", gujarati: "પોપટ", pronunciation: "/po-pat/", icon: "🦜" },
        { id: 17, english: "Q (Queen)", gujarati: "રાણી", pronunciation: "/ra-ni/", icon: "👑" },
        { id: 18, english: "R (Rat)", gujarati: "ઉંદર", pronunciation: "/un-dar/", icon: "🐀" },
        { id: 19, english: "S (Sun)", gujarati: "સૂર્ય", pronunciation: "/sur-ya/", icon: "☀️" },
        { id: 20, english: "T (Train)", gujarati: "ટ્રેન", pronunciation: "/train/", icon: "🚂" },
        { id: 21, english: "U (Umbrella)", gujarati: "છત્રી", pronunciation: "/chat-ri/", icon: "☂️" },
        { id: 22, english: "V (Van)", gujarati: "વાન", pronunciation: "/van/", icon: "🚐" },
        { id: 23, english: "W (Watch)", gujarati: "ઘડિયાળ", pronunciation: "/gha-di-yal/", icon: "⌚" },
        { id: 24, english: "X (Xylophone)", gujarati: "ઝાઈલોફોન", pronunciation: "/xy-lo-phone/", icon: "🎹" },
        { id: 25, english: "Y (Yak)", gujarati: "યાક", pronunciation: "/yak/", icon: "🐂" },
        { id: 26, english: "Z (Zebra)", gujarati: "ઝીબ્રા", pronunciation: "/ze-bra/", icon: "🦓" }
    ],
    animals: [
        { id: 1, english: "Cat", gujarati: "બિલાડી", pronunciation: "/bi-la-di/", icon: "🐱" },
        { id: 2, english: "Dog", gujarati: "કૂતરો", pronunciation: "/kut-ro/", icon: "🐶" },
        { id: 3, english: "Lion", gujarati: "સિંહ", pronunciation: "/sinh/", icon: "🦁" },
        { id: 4, english: "Bird", gujarati: "પક્ષી", pronunciation: "/pak-shi/", icon: "🐦" },
        { id: 5, english: "Fish", gujarati: "માછલી", pronunciation: "/mach-li/", icon: "🐟" },
        { id: 6, english: "Elephant", gujarati: "હાથી", pronunciation: "/ha-thi/", icon: "🐘" },
        { id: 7, english: "Monkey", gujarati: "વાંદરો", pronunciation: "/vaan-dro/", icon: "🐒" },
        { id: 8, english: "Tiger", gujarati: "વાઘ", pronunciation: "/vaagh/", icon: "🐅" },
        { id: 9, english: "Rabbit", gujarati: "સસલું", pronunciation: "/sas-lu/", icon: "🐰" },
        { id: 10, english: "Horse", gujarati: "ઘોડો", pronunciation: "/gho-do/", icon: "🐎" },
        { id: 11, english: "Cow", gujarati: "ગાય", pronunciation: "/gaay/", icon: "🐮" },
        { id: 12, english: "Peacock", gujarati: "મોર", pronunciation: "/mor/", icon: "🦚" }
    ],
    nature: [
        { id: 1, english: "Sun", gujarati: "સૂર્ય", pronunciation: "/sur-ya/", icon: "☀️" },
        { id: 2, english: "Moon", gujarati: "ચંદ્ર", pronunciation: "/chan-dra/", icon: "🌙" },
        { id: 3, english: "Star", gujarati: "તારો", pronunciation: "/ta-ro/", icon: "⭐" },
        { id: 4, english: "Tree", gujarati: "ઝાડ", pronunciation: "/jhaad/", icon: "🌳" },
        { id: 5, english: "Flower", gujarati: "ફૂલ", pronunciation: "/fool/", icon: "🌸" },
        { id: 6, english: "Rain", gujarati: "વરસાદ", pronunciation: "/var-saad/", icon: "🌧️" },
        { id: 7, english: "Cloud", gujarati: "વાદળ", pronunciation: "/vaa-dal/", icon: "☁️" },
        { id: 8, english: "River", gujarati: "નદી", pronunciation: "/na-di/", icon: "🌊" }
    ],
    daily_life: [
        { id: 1, english: "Bed", gujarati: "પલંગ", pronunciation: "/pa-lang/", icon: "🛏️" },
        { id: 2, english: "Book", gujarati: "પુસ્તક", pronunciation: "/pus-tak/", icon: "📚" },
        { id: 3, english: "Pencil", gujarati: "પેન્સિલ", pronunciation: "/pen-cil/", icon: "✏️" },
        { id: 4, english: "Ball", gujarati: "દડો", pronunciation: "/da-do/", icon: "⚽" },
        { id: 5, english: "Chair", gujarati: "ખુરશી", pronunciation: "/khur-shi/", icon: "🪑" },
        { id: 6, english: "Table", gujarati: "ટેબલ", pronunciation: "/ta-ble/", icon: "🪑" },
        { id: 7, english: "Door", gujarati: "દરવાજો", pronunciation: "/dar-va-jo/", icon: "🚪" },
        { id: 8, english: "Window", gujarati: "બારી", pronunciation: "/ba-ri/", icon: "🪟" }
    ],
    family: [
        { id: 1, english: "Mom", gujarati: "મમ્મી", pronunciation: "/mam-mi/", icon: "👩" },
        { id: 2, english: "Dad", gujarati: "પપ્પા", pronunciation: "/pap-pa/", icon: "👨" },
        { id: 3, english: "Grandma", gujarati: "દાદી", pronunciation: "/da-di/", icon: "👵" },
        { id: 4, english: "Grandpa", gujarati: "દાદા", pronunciation: "/da-da/", icon: "👴" },
        { id: 5, english: "Brother", gujarati: "ભાઈ", pronunciation: "/bhai/", icon: "👦" },
        { id: 6, english: "Sister", gujarati: "બહેન", pronunciation: "/ba-hen/", icon: "👧" }
    ],
    phrases: [
        { id: 1, english: "Hello", gujarati: "નમસ્તે", pronunciation: "/na-mas-te/", icon: "👋" },
        { id: 2, english: "Goodbye", gujarati: "આવજો", pronunciation: "/aav-jo/", icon: "👋" },
        { id: 3, english: "Please", gujarati: "કૃપા કરીને", pronunciation: "/kru-pa ka-ri-ne/", icon: "🙏" },
        { id: 4, english: "Thank you", gujarati: "આભાર", pronunciation: "/aa-bhar/", icon: "🤝" },
        { id: 5, english: "Yes", gujarati: "હા", pronunciation: "/ha/", icon: "👍" },
        { id: 6, english: "No", gujarati: "ના", pronunciation: "/na/", icon: "👎" },
        { id: 7, english: "Good morning", gujarati: "સુપ્રભાત", pronunciation: "/su-pra-bhat/", icon: "🌅" },
        { id: 8, english: "How are you?", gujarati: "કેમ છો?", pronunciation: "/kem cho/", icon: "❓" },
        { id: 9, english: "I am good", gujarati: "હું મજામાં છું", pronunciation: "/hu ma-ja-ma chu/", icon: "😊" }
    ],
    sentences: [
        { id: 1, english: "The cat is sleeping.", gujarati: "બિલાડી સૂતી છે.", pronunciation: "/bi-la-di su-ti che/", icon: "🐈" },
        { id: 2, english: "I like apples.", gujarati: "મને સફરજન ગમે છે.", pronunciation: "/ma-ne sa-far-jan ga-me che/", icon: "🍎" },
        { id: 3, english: "The sun is hot.", gujarati: "સૂર્ય ગરમ છે.", pronunciation: "/sur-ya ga-ram che/", icon: "☀️" },
        { id: 4, english: "My mom is happy.", gujarati: "મારી મમ્મી ખુશ છે.", pronunciation: "/ma-ri mam-mi khush che/", icon: "👩" },
        { id: 5, english: "I have a ball.", gujarati: "મારી પાસે દડો છે.", pronunciation: "/ma-ri pa-se da-do che/", icon: "⚽" },
        { id: 6, english: "This is my house.", gujarati: "આ મારું ઘર છે.", pronunciation: "/aa ma-ru ghar che/", icon: "🏠" }
    ]
};

// State
let currentLevel = null;
let currentIndex = 0;
let score = 0;
let quizScore = 0;
let voices = [];
let autoAdvanceTimer = null;
let speakTimers = [];
let autoAdvanceDuration = 15000; // Default 15s

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

// Navigation Functions
function showScreen(screenName) {
    clearTimers(); // Clear any active game timers
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[screenName].classList.add('active');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
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

    // Timer Toggle
    const timerBtn = document.getElementById('timer-toggle');
    timerBtn.addEventListener('click', () => {
        if (autoAdvanceDuration === 15000) {
            autoAdvanceDuration = 30000;
            timerBtn.textContent = '⏱️ 30s';
        } else {
            autoAdvanceDuration = 15000;
            timerBtn.textContent = '⏱️ 15s';
        }
        // Restart timer if in game
        if (screens.game.classList.contains('active')) {
            updateCard();
        }
    });

    document.getElementById('start-quiz-5').addEventListener('click', () => startQuiz(5));
    document.getElementById('start-quiz-10').addEventListener('click', () => startQuiz(10));
    document.getElementById('quit-quiz').addEventListener('click', () => showScreen('level'));

    // Writing Canvas Functionality
    initWritingCanvas();
});

// Writing Canvas State
let canvas, ctx;
let isDrawing = false;
let currentColor = '#0ABDE3';
let rainbowMode = false;
let hue = 0;

function initWritingCanvas() {
    canvas = document.getElementById('writing-canvas');
    ctx = canvas.getContext('2d');

    // Set canvas to proper resolution
    const rect = canvas.getBoundingClientRect();
    canvas.width = 400;
    canvas.height = 400;

    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 5;

    // Open writing overlay
    document.getElementById('write-btn').addEventListener('click', () => {
        const data = gameData[currentLevel][currentIndex];
        document.getElementById('writing-letter').textContent = data.gujarati;
        document.getElementById('guide-text').textContent = data.gujarati;
        document.getElementById('writing-overlay').style.display = 'flex';
        clearCanvas();
    });

    // Close writing overlay
    document.getElementById('close-writing').addEventListener('click', () => {
        document.getElementById('writing-overlay').style.display = 'none';
    });

    // Clear canvas
    document.getElementById('clear-canvas').addEventListener('click', clearCanvas);

    // Color selection
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const color = btn.dataset.color;
            if (color === 'rainbow') {
                rainbowMode = true;
                hue = 0;
            } else {
                rainbowMode = false;
                currentColor = color;
            }
        });
    });

    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch events
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', stopDrawing);
}

function startDrawing(e) {
    isDrawing = true;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
}

function draw(e) {
    if (!isDrawing) return;

    e.preventDefault();
    const pos = getPos(e);

    if (rainbowMode) {
        currentColor = `hsl(${hue}, 100%, 50%)`;
        hue = (hue + 2) % 360;
    }

    ctx.strokeStyle = currentColor;
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if (e.touches && e.touches[0]) {
        return {
            x: (e.touches[0].clientX - rect.left) * scaleX,
            y: (e.touches[0].clientY - rect.top) * scaleY
        };
    }

    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    };
}

function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 'mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });

    if (e.type === 'touchstart') {
        startDrawing(mouseEvent);
    } else if (e.type === 'touchmove') {
        draw(mouseEvent);
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Game Logic
function startLevel(level) {
    currentLevel = level;
    currentIndex = 0;
    score = 0;
    updateScore();
    showScreen('game');
    updateCard();
    document.getElementById('quiz-selection').style.display = 'none';
}

function clearTimers() {
    if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer);
    speakTimers.forEach(timer => clearTimeout(timer));
    speakTimers = [];
    window.speechSynthesis.cancel();

    // Reset progress bar
    const bar = document.querySelector('.btn-progress');
    if (bar) {
        bar.style.transition = 'none';
        bar.style.width = '0%';
    }
}

function updateCard() {
    clearTimers(); // Reset timers for new card

    const data = gameData[currentLevel][currentIndex];

    // Update DOM
    document.getElementById('card-image').textContent = data.icon;
    document.getElementById('word-english').textContent = data.english;
    document.getElementById('word-gujarati').textContent = data.gujarati;
    document.getElementById('pronunciation').textContent = data.pronunciation;

    // Update Progress
    const progress = ((currentIndex + 1) / gameData[currentLevel].length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;

    // Update Buttons
    document.getElementById('prev-word').disabled = currentIndex === 0;
    document.getElementById('next-word').disabled = currentIndex === gameData[currentLevel].length - 1;

    // Show Quiz Selection if at end
    if (currentIndex === gameData[currentLevel].length - 1) {
        document.getElementById('quiz-selection').style.display = 'flex';
    } else {
        document.getElementById('quiz-selection').style.display = 'none';

        // Auto-Advance Logic (only if not at the end)
        // Start Progress Bar Animation
        const bar = document.querySelector('.btn-progress');
        // Force reflow
        void bar.offsetWidth;
        bar.style.transition = `width ${autoAdvanceDuration}ms linear`;
        bar.style.width = '100%';

        autoAdvanceTimer = setTimeout(() => {
            if (currentIndex < gameData[currentLevel].length - 1) {
                currentIndex++;
                updateCard();
            }
        }, autoAdvanceDuration);
    }

    // Clear feedback
    showFeedback('', '');

    // Animation
    const card = document.getElementById('flashcard');
    card.style.transform = 'rotateY(90deg)';
    setTimeout(() => {
        card.style.transform = 'rotateY(0deg)';
    }, 200);

    // Auto-Speak Logic: 3 times with 5s pause
    // 1st: Immediate
    speakWord();

    // 2nd: After 5s
    speakTimers.push(setTimeout(speakWord, 5000));

    // 3rd: After 10s (5s after 2nd)
    speakTimers.push(setTimeout(speakWord, 10000));
}

function speakWord() {
    const text = gameData[currentLevel][currentIndex].gujarati;

    // Clean text for speech (remove parentheses content if it's just a hint)
    let speechText = text;
    if (currentLevel === 'alphabet') {
        speechText = text.replace('(', '. ').replace(')', '');
    }

    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = 'gu-IN';

    // Voice Selection Logic
    // Prioritize Gujarati voices
    const preferredVoices = voices.filter(voice => voice.lang.includes('gu'));
    let selectedVoice = preferredVoices[0]; // Usually there's only one or few

    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    // Adjust pitch and rate for "kid friendly" / "thin" voice
    // Higher pitch makes it sound younger/thinner
    utterance.pitch = 1.2;
    utterance.rate = 0.9; // Slightly slower for clarity

    window.speechSynthesis.speak(utterance);
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

function startQuiz(numQuestions) {
    quizScore = 0;
    currentQuizIndex = 0;
    // Create a copy of current level data and shuffle it
    quizQuestions = [...gameData[currentLevel]].sort(() => Math.random() - 0.5);

    // Limit quiz to requested number of questions
    // If category has fewer items than requested, use all of them
    const limit = Math.min(numQuestions, quizQuestions.length);
    quizQuestions = quizQuestions.slice(0, limit);

    showScreen('quiz');
    showQuizQuestion();
}

function showQuizQuestion() {
    if (currentQuizIndex >= quizQuestions.length) {
        endQuiz();
        return;
    }

    const question = quizQuestions[currentQuizIndex];

    // Update Header
    document.getElementById('quiz-score').textContent = quizScore;
    document.getElementById('quiz-progress').textContent = `Question ${currentQuizIndex + 1}/${quizQuestions.length}`;

    // Update Question with Icon
    const questionEl = document.getElementById('quiz-question');
    questionEl.innerHTML = `
        <div class="question-icon">${question.icon}</div>
        <div>What is "${question.english}" in Gujarati?</div>
    `;

    document.getElementById('quiz-feedback').textContent = '';

    // Clean text for speech (remove parentheses)
    let englishWord = question.english;
    if (englishWord.includes('(')) {
        englishWord = englishWord.split('(')[0].trim();
    }

    // Speak the question
    speakText(`What is ${englishWord} in Gujarati?`, 'en-US');

    // Generate options (1 correct + 3 random wrong)
    const options = [question];

    let pool = gameData[currentLevel];
    if (pool.length < 4) {
        pool = Object.values(gameData).flat();
    }

    while (options.length < 4) {
        const randomWord = pool[Math.floor(Math.random() * pool.length)];
        if (!options.some(o => o.gujarati === randomWord.gujarati)) {
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
        btn.textContent = opt.gujarati;
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

    if (lang === 'gu-IN') {
        const preferredVoices = voices.filter(voice => voice.lang.includes('gu'));
        let selectedVoice = preferredVoices[0];
        if (selectedVoice) utterance.voice = selectedVoice;
        utterance.pitch = 1.2;
    } else if (lang === 'en-US') {
        // Use preferred English voices to avoid robotic default
        const preferredVoices = voices.filter(voice => voice.lang.includes('en'));
        let selectedVoice = preferredVoices.find(v => v.name.includes('Google US English')) ||
            preferredVoices.find(v => v.name.includes('Samantha')) ||
            preferredVoices.find(v => v.name.includes('Victoria')) ||
            preferredVoices.find(v => v.name.includes('Zira')) ||
            preferredVoices[0];
        if (selectedVoice) utterance.voice = selectedVoice;
        utterance.pitch = 1.1; // Slightly higher/thinner to match the style
    }

    window.speechSynthesis.speak(utterance);
}

function checkAnswer(selected, correct, btnElement) {
    // Disable all options
    const allOpts = document.querySelectorAll('.quiz-option');
    allOpts.forEach(opt => opt.style.pointerEvents = 'none');

    if (selected.gujarati === correct.gujarati) {
        btnElement.classList.add('correct');
        showFeedback('Correct! 🎉', 'success');
        quizScore += 10;
        createConfetti();
        playSound('success');
    } else {
        btnElement.classList.add('wrong');
        // Highlight correct answer
        allOpts.forEach(opt => {
            if (opt.textContent === correct.gujarati) {
                opt.classList.add('correct');
            }
        });
        showFeedback(`Wrong! It was ${correct.gujarati}`, 'error');
        playSound('error');
    }

    document.getElementById('quiz-score').textContent = quizScore;

    // Speak the correct word
    setTimeout(() => {
        speakText(correct.gujarati, 'gu-IN');
    }, 500);

    // Next question after delay
    setTimeout(() => {
        currentQuizIndex++;
        showQuizQuestion();
    }, 2500);
}

function endQuiz() {
    const container = document.getElementById('quiz-question');
    container.innerHTML = `
        <h2>Quiz Complete!</h2>
        <div style="font-size: 3rem; margin: 1rem;">🏆</div>
        <div>Your Score: ${quizScore}</div>
    `;
    document.getElementById('quiz-options').innerHTML = '';
    document.getElementById('quiz-feedback').textContent = '';

    // Play fanfare or something
    playSound('success');
}

function playSound(type) {
    // Simple beep/boop for now, or use Audio objects if files exist
    // Since we don't have audio files, we'll skip or use simple synthesis beep?
    // Actually, let's just use speech for feedback which is already there.
}

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }
}
