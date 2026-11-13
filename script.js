document.addEventListener("DOMContentLoaded", function () {
// Explicatie: Așteaptă construirea DOM-ului, apoi browserul apelează funcția primită. [M6, Tema 12 - Events / M4, Tema 7 - Callback si arrow / M6, Tema 11 - DOM]
    const carousels = [];
    // Explicatie: Creează array-ul gol în care vom adăuga cele două carusele. [M2, Tema 3 - Arrays / M1, Tema 1 - Bazele JS]

    function normalizeText(value) {
    // Explicatie: Declară funcția și parametrul în care primește textul. [M2, Tema 4 - Functii]
        return value.toLowerCase().trim();
        // Explicatie: Transformă textul în litere mici, taie spațiile de la capete și returnează rezultatul. [M1, Tema 1 - Bazele JS / M2, Tema 4 - Functii]
    }
    // Explicatie: Închide funcția de normalizare. [M2, Tema 4 - Functii]
    // Logica blocului: Aplicăm aceeași pregătire textului din căutare și titlurilor, ca „ ECLAIR ” să se compare ca „eclair”.

    /* CARUSELELE COFFEE SI DESSERTS */

    const sections = document.querySelectorAll(".section1");
    // Explicatie: Găsește toate elementele cu clasa section1 și le păstrează într-un NodeList. [M6, Tema 11 - DOM]

    for (const section of sections) {
    // Explicatie: Ia secțiunile pe rând, în ordinea din HTML. [M1, Tema 2 - Ramificatii si iteratii / M6, Tema 11 - DOM]
        const cardsContainer = section.querySelector(".cards");
        // Explicatie: Caută containerul cu săgețile și zona produselor în secțiunea curentă. [M6, Tema 11 - DOM]
        const cardsTrack = section.querySelector(".cards-track");
        // Explicatie: Caută elementul care ține cardurile secțiunii curente. [M6, Tema 11 - DOM]

        if (!cardsContainer || !cardsTrack) {
        // Explicatie: Verifică dacă lipsește oricare dintre cele două elemente. querySelector întoarce null când nu găsește nimic. [M1, Tema 2 - Ramificatii si iteratii / M1, Tema 1 - Bazele JS / M6, Tema 11 - DOM]
            continue;
            // Explicatie: Sare peste secțiunea incompletă și trece la următoarea. [M1, Tema 2 - Ramificatii si iteratii]
        }
        // Explicatie: Închide verificarea structurii HTML. [M1, Tema 2 - Ramificatii si iteratii]

        const cards = Array.from(
        // Explicatie: Începe conversia colecției de carduri într-un array cu Array.from. [M2, Tema 3 - Arrays]
            cardsTrack.querySelectorAll(".card")
            // Explicatie: Găsește toate cardurile din zona produselor. [M6, Tema 11 - DOM]
        );
        // Explicatie: Închide conversia și salvează array-ul în cards. [M2, Tema 3 - Arrays]
        // Logica blocului: Fiecare secțiune își ia cardurile din propriul HTML. Dacă structura lipsește, bucla trece mai departe.

        /*
         * Selectăm doar săgețile care sunt copii direcți
         * ai containerului .cards.
         */
        const arrowButtons = Array.from(
        // Explicatie: Începe conversia copiilor containerului într-un array. [M2, Tema 3 - Arrays]
            cardsContainer.children
            // Explicatie: children dă doar elementele aflate imediat în interiorul containerului. [M6, Tema 11 - DOM]
        ).filter(function (element) {
        // Explicatie: filter parcurge array-ul și apelează funcția primită pentru fiecare element. [M4, Tema 8 - Metode de array / M4, Tema 7 - Callback si arrow]
            return element.classList.contains("btn-arrow");
            // Explicatie: Păstrează elementul dacă lista lui de clase conține btn-arrow. [M6, Tema 11 - DOM / M2, Tema 4 - Functii]
        });
        // Explicatie: Închide funcția de test și apelul filter. [M4, Tema 8 - Metode de array]

        const leftBtn = arrowButtons[0];
        // Explicatie: Ia primul buton, cel din stânga, de la indexul zero. [M2, Tema 3 - Arrays]
        const rightBtn = arrowButtons[1];
        // Explicatie: Ia al doilea buton, cel din dreapta, de la indexul unu. [M2, Tema 3 - Arrays]

        if (!leftBtn || !rightBtn || cards.length === 0) {
        // Explicatie: Verifică dacă lipsește o săgeată sau dacă array-ul nu are carduri. [M1, Tema 2 - Ramificatii si iteratii / M1, Tema 1 - Bazele JS / M2, Tema 3 - Arrays]
            continue;
            // Explicatie: Trece la următoarea secțiune dacă aceasta nu poate funcționa ca un carusel. [M1, Tema 2 - Ramificatii si iteratii]
        }
        // Explicatie: Închide verificarea. [M1, Tema 2 - Ramificatii si iteratii]
        // Logica blocului: Luăm săgețile din copiii direcți ai containerului, apoi ne asigurăm că avem două săgeți și cel puțin un card.

        const searchFeedback = document.createElement("p");
        // Explicatie: Creează în memorie un paragraf pentru mesajul de căutare. [M6, Tema 11 - DOM]
        searchFeedback.setAttribute("role", "status");
        // Explicatie: Adaugă role=status ca tehnologiile asistive să poată anunța mesajul. [M6, Tema 11 - DOM / Documentatie suplimentara, lectia exacta nu apare in captura]
        searchFeedback.style.textAlign = "center";
        // Explicatie: Centrează textul paragrafului printr-o proprietate CSS. [M6, Tema 11 - DOM / Documentatie suplimentara, lectia exacta nu apare in captura]
        searchFeedback.hidden = true;
        // Explicatie: Ascunde paragraful până când avem o căutare fără rezultate. [M6, Tema 11 - DOM]
        cardsContainer.before(searchFeedback);
        // Explicatie: Inserează paragraful chiar înaintea containerului cu produse. [M6, Tema 11 - DOM]
        // Logica blocului: Fiecare carusel are propriul mesaj. De exemplu, deserturile pot afișa un produs în timp ce cafelele afișează mesajul.

        const viewport = section.querySelector(".cards-viewport");
        // Găsește zona caruselului. [M6, Tema 11 - DOM]
        function getVisibleCardsNumber() {
            return Number(getComputedStyle(viewport).getPropertyValue("--visible-cards")) || 1;
            // Citește numărul de carduri stabilit în CSS. [Documentație suplimentară]
        }

        const state = {
        // Explicatie: Creează obiectul cu datele caruselului curent. [M3, Tema 5 - Obiecte]
            cards: cards,
            // Explicatie: Păstrează referința la array-ul complet de carduri. [M3, Tema 5 - Obiecte / M2, Tema 3 - Arrays]

            /*
             * Aici păstrăm cardurile care corespund
             * căutării curente.
             */
            filteredCards: cards.slice(),
            // Explicatie: Pornește lista de rezultate cu o copie a array-ului complet, creată prin slice. [M3, Tema 5 - Obiecte / M2, Tema 3 - Arrays]

            /*
             * Indexul primului card vizibil.
             */
            currentIndex: 0
            // Explicatie: Setează indexul primului card vizibil la zero. [M3, Tema 5 - Obiecte / M2, Tema 3 - Arrays]
        };
        // Explicatie: Închide obiectul state. [M3, Tema 5 - Obiecte]
        // Logica blocului: Păstrăm toate cardurile separat de rezultatele curente. Așa putem căuta din nou și în cardurile ascunse.

        function renderCarousel() {
            const visibleCardsNumber = getVisibleCardsNumber();
        // Explicatie: Declară funcția care actualizează ce se vede în carusel. [M2, Tema 4 - Functii]
            /*
             * Dacă avem 6 carduri și afișăm 4,
             * indexul maxim va fi 2.
             */
            const maxIndex = Math.max(
            // Explicatie: Începe calculul celui mai mare index permis, alegând maximul cu Math.max. [M1, Tema 1 - Bazele JS]
                0,
                // Explicatie: Oferă zero ca limită minimă dacă sunt prea puține rezultate pentru a derula. [M1, Tema 1 - Bazele JS]
                state.filteredCards.length - visibleCardsNumber
                // Explicatie: Scade numărul de locuri vizibile din numărul de rezultate. [M2, Tema 3 - Arrays / M1, Tema 1 - Bazele JS]
            );
            // Explicatie: Închide calculul. Cu șase rezultate și patru locuri, indexul maxim este doi. [M1, Tema 1 - Bazele JS]

            /*
             * Ne asigurăm că indexul nu depășește
             * limitele listei filtrate.
             */
            state.currentIndex = Math.max(
            // Explicatie: Actualizează indexul din obiectul state, menținându-l cel puțin la zero. [M3, Tema 5 - Obiecte / M1, Tema 1 - Bazele JS]
                0,
                // Explicatie: Zero este capătul din stânga al intervalului. [M1, Tema 1 - Bazele JS]
                Math.min(state.currentIndex, maxIndex)
                // Explicatie: Math.min oprește indexul la limita din dreapta. [M1, Tema 1 - Bazele JS]
            );
            // Explicatie: Închide calculul indexului valid. [M1, Tema 1 - Bazele JS]

            /*
             * Alegem maximum 4 carduri din lista
             * de rezultate filtrate.
             */
            const visibleCards = new Set(
            // Explicatie: Creează un Set din cardurile care trebuie să fie vizibile. [Documentatie suplimentara, lectia exacta nu apare in captura]
                state.filteredCards.slice(
                // Explicatie: slice extrage o porțiune din array-ul de rezultate. [M2, Tema 3 - Arrays]
                    state.currentIndex,
                    // Explicatie: Începe extragerea la indexul curent. [M2, Tema 3 - Arrays]
                    state.currentIndex + visibleCardsNumber
                    // Explicatie: Oprește extragerea înainte de indexul curent plus numărul de locuri vizibile. [M2, Tema 3 - Arrays / M1, Tema 1 - Bazele JS]
                )
                // Explicatie: Închide apelul slice. [M2, Tema 3 - Arrays]
            );
            // Explicatie: Închide crearea colecției Set. [Documentatie suplimentara, lectia exacta nu apare in captura]

            /*
             * Afișăm numai cele 4 carduri curente.
             * Restul sunt ascunse.
             */
            for (const card of state.cards) {
            // Explicatie: Parcurge toate cardurile din secțiune, inclusiv pe cele ascunse. [M1, Tema 2 - Ramificatii si iteratii / M2, Tema 3 - Arrays]
                if (visibleCards.has(card)) {
                // Explicatie: Verifică prin Set.has dacă acel card face parte din grupul vizibil. [M1, Tema 2 - Ramificatii si iteratii / Documentatie suplimentara, lectia exacta nu apare in captura]
                    card.style.display = "";
                    // Explicatie: Înlătură stilul display setat din JS, astfel încât să se aplice iar CSS-ul paginii. [M6, Tema 11 - DOM / Documentatie suplimentara, lectia exacta nu apare in captura]
                } else {
                // Explicatie: Intră în această ramură când cardul nu este în grupul vizibil. [M1, Tema 2 - Ramificatii si iteratii]
                    card.style.display = "none";
                    // Explicatie: Setează display:none ca acel card să dispară din pagină și din aranjare. [M6, Tema 11 - DOM / Documentatie suplimentara, lectia exacta nu apare in captura]
                }
                // Explicatie: Închide ramura else. [M1, Tema 2 - Ramificatii si iteratii]
            }
            // Explicatie: Închide bucla care actualizează cardurile. [M1, Tema 2 - Ramificatii si iteratii]

            const hasResults =
            // Explicatie: Pregătește o constantă care va primi true sau false. [M1, Tema 1 - Bazele JS]
                state.filteredCards.length > 0;
                // Explicatie: Verifică dacă array-ul filtrat are cel puțin un card. [M2, Tema 3 - Arrays / M1, Tema 1 - Bazele JS]

            /*
             * Dezactivăm săgeata stângă la început
             * și săgeata dreaptă la final.
             */
            leftBtn.disabled =
            // Explicatie: Setează dacă săgeata stângă este dezactivată. [M6, Tema 11 - DOM]
                !hasResults ||
                // Explicatie: Prima condiție este lipsa rezultatelor. Sau verificăm și condiția următoare. [M1, Tema 1 - Bazele JS]
                state.currentIndex === 0;
                // Explicatie: A doua condiție este că suntem deja la primul card. [M2, Tema 3 - Arrays / M1, Tema 1 - Bazele JS]

            rightBtn.disabled =
            // Explicatie: Setează dacă săgeata dreaptă este dezactivată. [M6, Tema 11 - DOM]
                !hasResults ||
                // Explicatie: Prima condiție este lipsa rezultatelor. [M1, Tema 1 - Bazele JS]
                state.currentIndex >= maxIndex;
                // Explicatie: A doua condiție este că indexul a ajuns la ultima poziție permisă. [M1, Tema 1 - Bazele JS]
        }
        // Explicatie: Închide funcția de afișare a caruselului. [M2, Tema 4 - Functii]
        // Logica blocului: Stabilim intervalul permis, alegem grupul vizibil și actualizăm cardurile și săgețile împreună. Poziția 0 începe cu primul card, iar poziția 1 cu al doilea. Numărul vizibil vine din CSS.

        /* SĂGEATA DIN STÂNGA */

        leftBtn.addEventListener("click", function () {
        // Explicatie: La click pe săgeata stângă, browserul apelează această funcție. [M6, Tema 12 - Events / M4, Tema 7 - Callback si arrow]
            if (state.currentIndex > 0) {
            // Explicatie: Verifică dacă mai putem merge spre stânga. [M1, Tema 2 - Ramificatii si iteratii / M1, Tema 1 - Bazele JS]
                state.currentIndex--;
                // Explicatie: Scade indexul cu unu. [M1, Tema 1 - Bazele JS / M3, Tema 5 - Obiecte]

                renderCarousel();
                // Explicatie: Apelează funcția care actualizează cardurile și săgețile. [M2, Tema 4 - Functii]
            }
            // Explicatie: Închide verificarea poziției. [M1, Tema 2 - Ramificatii si iteratii]
        });
        // Explicatie: Închide callback-ul și înregistrarea clickului. [M6, Tema 12 - Events / M4, Tema 7 - Callback si arrow]
        // Logica blocului: Săgeata stângă mută grupul vizibil cu un card spre început.

        /* SĂGEATA DIN DREAPTA */

        rightBtn.addEventListener("click", function () {
            const visibleCardsNumber = getVisibleCardsNumber();
        // Explicatie: La click pe săgeata dreaptă rulează această funcție. [M6, Tema 12 - Events / M4, Tema 7 - Callback si arrow]
            const maxIndex = Math.max(
            // Explicatie: Calculează din nou ultima poziție permisă pentru rezultatele curente. [M1, Tema 1 - Bazele JS]
                0,
                // Explicatie: Folosește zero ca limită minimă. [M1, Tema 1 - Bazele JS]
                state.filteredCards.length -
                // Explicatie: Pornește de la numărul de rezultate filtrate. [M2, Tema 3 - Arrays / M1, Tema 1 - Bazele JS]
                    visibleCardsNumber
                    // Explicatie: Scade numărul de carduri vizibile. [M1, Tema 1 - Bazele JS]
            );
            // Explicatie: Închide calculul limitei. [M1, Tema 1 - Bazele JS]

            if (state.currentIndex < maxIndex) {
            // Explicatie: Verifică dacă mai există loc pentru o mutare spre dreapta. [M1, Tema 2 - Ramificatii si iteratii / M1, Tema 1 - Bazele JS]
                state.currentIndex++;
                // Explicatie: Crește indexul cu unu. [M1, Tema 1 - Bazele JS / M3, Tema 5 - Obiecte]

                renderCarousel();
                // Explicatie: Actualizează afișarea după schimbarea indexului. [M2, Tema 4 - Functii]
            }
            // Explicatie: Închide verificarea limitei. [M1, Tema 2 - Ramificatii si iteratii]
        });
        // Explicatie: Închide funcția de click și apelul addEventListener. [M6, Tema 12 - Events / M4, Tema 7 - Callback si arrow]
        // Logica blocului: Săgeata dreaptă mută grupul cu un card spre final, cât timp mai există rezultate dincolo de grupul afișat.

        /*
         * Filtrarea este făcută pe toate cardurile,
         * nu doar pe cele afișate momentan.
         */
        function applyFilter(searchText) {
        // Explicatie: Declară funcția care primește textul căutat. [M2, Tema 4 - Functii]
            state.filteredCards = state.cards.filter(
            // Explicatie: Reconstruiește lista de rezultate filtrând array-ul complet. [M3, Tema 5 - Obiecte / M4, Tema 8 - Metode de array]
                function (card) {
                // Explicatie: Definește funcția pe care filter o apelează pentru fiecare card. [M4, Tema 7 - Callback si arrow / M4, Tema 8 - Metode de array]
                    const cardTitle =
                    // Explicatie: Pregătește constanta pentru elementul cu titlul produsului. [M1, Tema 1 - Bazele JS]
                        card.querySelector(".card-title");
                        // Explicatie: Caută titlul în interiorul cardului curent. [M6, Tema 11 - DOM]

                    const title = cardTitle
                    // Explicatie: Folosește un operator ternar pentru cazul în care elementul există sau lipsește. [M1, Tema 2 - Ramificatii si iteratii / M6, Tema 11 - DOM]
                        ? normalizeText(cardTitle.textContent)
                        // Explicatie: Dacă există, citește textContent și normalizează textul. [M6, Tema 11 - DOM / M2, Tema 4 - Functii]
                        : "";
                        // Explicatie: Dacă lipsește, folosește un string gol. [M1, Tema 1 - Bazele JS / M1, Tema 2 - Ramificatii si iteratii]

                    return title.includes(searchText);
                    // Explicatie: Returnează true dacă titlul conține textul căutat. [M1, Tema 1 - Bazele JS / M2, Tema 4 - Functii]
                }
                // Explicatie: Închide funcția de test pentru fiecare card. [M4, Tema 7 - Callback si arrow]
            );
            // Explicatie: Închide apelul filter. [M4, Tema 8 - Metode de array]

            /*
             * După fiecare căutare revenim la primul
             * rezultat.
             */
            state.currentIndex = 0;
            // Explicatie: Readuce caruselul la primul rezultat. [M3, Tema 5 - Obiecte / M2, Tema 3 - Arrays]

            renderCarousel();
            // Explicatie: Actualizează cardurile și săgețile cu lista filtrată. [M2, Tema 4 - Functii]
            const showFeedback = searchText !== "" && state.filteredCards.length === 0;
            // Explicatie: Arată că e nevoie de mesaj doar când căutarea are text și nu există rezultate. [M1, Tema 1 - Bazele JS / M2, Tema 3 - Arrays]
            searchFeedback.hidden = !showFeedback;
            // Explicatie: Ascunde mesajul când showFeedback este false. [M6, Tema 11 - DOM / M1, Tema 1 - Bazele JS]
            searchFeedback.textContent = showFeedback ? "No products found." : "";
            // Explicatie: Scrie mesajul în engleză când e necesar. În celălalt caz lasă textul gol. [M6, Tema 11 - DOM / M1, Tema 2 - Ramificatii si iteratii]
            return state.filteredCards.length;
            // Explicatie: Returnează numărul de rezultate, folosit pentru a alege destinația derulării. [M2, Tema 4 - Functii / M2, Tema 3 - Arrays]
        }
        // Explicatie: Închide funcția de filtrare. [M2, Tema 4 - Functii]
        // Logica blocului: Căutăm în toate cardurile secțiunii, revenim la început și actualizăm mesajul. Numărul returnat spune funcției de căutare dacă a găsit ceva aici.

        window.addEventListener("resize", renderCarousel);
        // Reface grupul vizibil când se schimbă lățimea ferestrei. [M6, Tema 12 - Events]
        carousels.push({
        // Explicatie: Adaugă în array-ul carousels un obiect pentru secțiunea curentă. [M2, Tema 3 - Arrays / M3, Tema 5 - Obiecte]
            section: section,
            // Explicatie: Păstrează elementul HTML al secțiunii pentru derulare. [M3, Tema 5 - Obiecte / M6, Tema 11 - DOM]
            applyFilter: applyFilter,
            // Explicatie: Păstrează funcția care aplică o căutare. [M3, Tema 5 - Obiecte / M2, Tema 4 - Functii]
            render: renderCarousel
            // Explicatie: Păstrează funcția care actualizează afișarea. [M3, Tema 5 - Obiecte / M2, Tema 4 - Functii]
        });
        // Explicatie: Închide obiectul și apelul push. [M3, Tema 5 - Obiecte / M2, Tema 3 - Arrays]
    }
    // Explicatie: Închide bucla care pregătește secțiunile. [M1, Tema 2 - Ramificatii si iteratii]
    // Logica blocului: Fiecare carusel primește propriile date și funcții. Bara de căutare poate apoi folosi aceeași operație pe ambele.

    /*
     * La încărcarea paginii sunt afișate primele
     * patru carduri din fiecare secțiune.
     */
    for (const carousel of carousels) {
    // Explicatie: Ia pe rând fiecare carusel pregătit. [M1, Tema 2 - Ramificatii si iteratii / M2, Tema 3 - Arrays]
        carousel.render();
        // Explicatie: Apelează funcția de afișare pentru acel carusel. [M2, Tema 4 - Functii / M3, Tema 5 - Obiecte]
    }
    // Explicatie: Închide afișarea inițială. [M1, Tema 2 - Ramificatii si iteratii]
    // Logica blocului: La deschiderea paginii, fiecare secțiune pornește cu primele carduri care încap pe ecran.

    /* BARA DE SEARCH */

    const searchBar =
    // Explicatie: Declară constanta pentru câmpul de căutare. [M1, Tema 1 - Bazele JS]
        document.querySelector(".search-input");
        // Explicatie: Găsește inputul cu clasa search-input. [M6, Tema 11 - DOM]

    const searchBtn =
    // Explicatie: Declară constanta pentru butonul de căutare. [M1, Tema 1 - Bazele JS]
        document.querySelector(".search-btn");
        // Explicatie: Găsește lupa după clasa search-btn. [M6, Tema 11 - DOM]

    const suggestions = document.querySelector("#product-suggestions");
    // Explicatie: Găsește elementul datalist care va primi sugestiile. [M6, Tema 11 - DOM / Documentatie suplimentara, lectia exacta nu apare in captura]
    const productNames = new Set(
    // Explicatie: Creează un Set pentru a avea o singură sugestie pentru fiecare nume. [Documentatie suplimentara, lectia exacta nu apare in captura]
        Array.from(document.querySelectorAll(".cards-track .card-title"), function (title) {
        // Explicatie: Găsește toate titlurile și folosește callback-ul din Array.from ca să le transforme în stringuri. [M6, Tema 11 - DOM / M2, Tema 3 - Arrays / M4, Tema 7 - Callback si arrow]
            return title.textContent.trim();
            // Explicatie: Citește textul titlului și elimină spațiile de la capete. [M6, Tema 11 - DOM / M1, Tema 1 - Bazele JS / M2, Tema 4 - Functii]
        }).filter(Boolean)
        // Explicatie: filter(Boolean) scoate stringurile goale din array. [M4, Tema 8 - Metode de array / M1, Tema 1 - Bazele JS]
    );
    // Explicatie: Închide construirea colecției de nume unice. [Documentatie suplimentara, lectia exacta nu apare in captura]

    for (const name of productNames) {
    // Explicatie: Parcurge numele produselor, unul câte unul. [M1, Tema 2 - Ramificatii si iteratii / Documentatie suplimentara, lectia exacta nu apare in captura]
        const option = document.createElement("option");
        // Explicatie: Creează un element option pentru lista de sugestii. [M6, Tema 11 - DOM / Documentatie suplimentara, lectia exacta nu apare in captura]
        option.value = name;
        // Explicatie: Pune numele produsului în valoarea opțiunii. [M6, Tema 11 - DOM]
        suggestions.append(option);
        // Explicatie: Adaugă opțiunea în datalist. [M6, Tema 11 - DOM]
    }
    // Explicatie: Închide bucla de adăugare a sugestiilor. [M1, Tema 2 - Ramificatii si iteratii]
    // Logica blocului: Titlurile deja scrise pe carduri devin automat sugestii. Browserul afișează opțiunile din datalist sub câmp.

    searchBar.addEventListener("input", function () {
    // Explicatie: Ascultă evenimentul input, declanșat când se modifică valoarea câmpului. [M6, Tema 12 - Events / M4, Tema 7 - Callback si arrow]
        if (productNames.has(searchBar.value) || searchBar.value.trim() === "") {
        // Explicatie: Verifică dacă valoarea coincide exact cu un nume din Set sau dacă a fost ștearsă. [M1, Tema 2 - Ramificatii si iteratii / M1, Tema 1 - Bazele JS / Documentatie suplimentara, lectia exacta nu apare in captura]
            runSearch();
            // Explicatie: Pornește filtrarea fără argumentul event, deci fără derulare automată. [M2, Tema 4 - Functii]
        }
        // Explicatie: Închide verificarea valorii din câmp. [M1, Tema 2 - Ramificatii si iteratii]
    });
    // Explicatie: Închide funcția și ascultarea evenimentului input. [M6, Tema 12 - Events]
    // Logica blocului: Alegerea unei sugestii aplică filtrul. Golirea câmpului afișează din nou cardurile.

    function runSearch(event) {
    // Explicatie: Declară funcția de căutare. Poate primi un eveniment de click sau de tastatură. [M2, Tema 4 - Functii / M6, Tema 12 - Events]
        if (event) {
        // Explicatie: Verifică dacă a primit un eveniment. [M1, Tema 2 - Ramificatii si iteratii]
            event.preventDefault();
            // Explicatie: Oprește acțiunea implicită a evenimentului. De exemplu, lupa este un link care altfel ar naviga la #. [M6, Tema 12 - Events]
        }
        // Explicatie: Închide verificarea evenimentului. [M1, Tema 2 - Ramificatii si iteratii]

        if (!searchBar) {
        // Explicatie: Verifică dacă elementul de căutare lipsește. [M1, Tema 2 - Ramificatii si iteratii / M1, Tema 1 - Bazele JS]
            return;
            // Explicatie: Oprește funcția înainte să încerce să citească un element lipsă. [M2, Tema 4 - Functii]
        }
        // Explicatie: Închide verificarea câmpului. [M1, Tema 2 - Ramificatii si iteratii]

        const searchText = normalizeText(
        // Explicatie: Apelează funcția de normalizare și pregătește rezultatul pentru căutare. [M2, Tema 4 - Functii]
            searchBar.value
            // Explicatie: Citește ce a tastat utilizatorul în câmp. [M6, Tema 11 - DOM]
        );
        // Explicatie: Închide apelul normalizeText. [M2, Tema 4 - Functii]

        /*
         * Aceeași căutare este aplicată separat
         * fiecărui carusel.
         */
        let firstMatchSection = null;
        // Explicatie: Pornește cu null fiindcă încă nu a fost aleasă nicio destinație de derulare. [M1, Tema 1 - Bazele JS]
        for (const carousel of carousels) {
        // Explicatie: Parcurge caruselele în ordinea din pagină. [M1, Tema 2 - Ramificatii si iteratii / M2, Tema 3 - Arrays]
            const matchCount = carousel.applyFilter(searchText);
            // Explicatie: Filtrează secțiunea curentă și citește câte produse a găsit. [M2, Tema 4 - Functii / M3, Tema 5 - Obiecte]
            if (matchCount > 0 && !firstMatchSection) {
            // Explicatie: Verifică dacă sunt rezultate și dacă nu a fost reținută deja o secțiune. [M1, Tema 2 - Ramificatii si iteratii / M1, Tema 1 - Bazele JS]
                firstMatchSection = carousel.section;
                // Explicatie: Reține elementul HTML al primei secțiuni cu rezultate. [M3, Tema 5 - Obiecte / M6, Tema 11 - DOM]
            }
            // Explicatie: Închide verificarea destinației. [M1, Tema 2 - Ramificatii si iteratii]
        }
        // Explicatie: Închide bucla. Toate secțiunile au fost filtrate. [M1, Tema 2 - Ramificatii si iteratii]

        if (event && searchText && firstMatchSection) {
        // Explicatie: Derulează numai la o căutare declanșată prin eveniment, cu text și cu rezultate. [M1, Tema 2 - Ramificatii si iteratii / M1, Tema 1 - Bazele JS]
            const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            // Explicatie: matchMedia verifică preferința utilizatorului pentru animații reduse. [Documentatie suplimentara, lectia exacta nu apare in captura]
            firstMatchSection.scrollIntoView({
            // Explicatie: Cere browserului să aducă prima secțiune cu rezultate în zona vizibilă. [M6, Tema 11 - DOM / Documentatie suplimentara, lectia exacta nu apare in captura]
                behavior: reducedMotion ? "instant" : "smooth",
                // Explicatie: Operatorul ternar alege deplasare imediată sau lină, după preferință. [M1, Tema 2 - Ramificatii si iteratii / Documentatie suplimentara, lectia exacta nu apare in captura]
                block: "start"
                // Explicatie: Așază începutul secțiunii în partea de sus a zonei vizibile. [M3, Tema 5 - Obiecte / Documentatie suplimentara, lectia exacta nu apare in captura]
            });
            // Explicatie: Închide opțiunile și apelul de derulare. [M2, Tema 4 - Functii / M3, Tema 5 - Obiecte]
        }
        // Explicatie: Închide condiția de derulare. [M1, Tema 2 - Ramificatii si iteratii]
    }
    // Explicatie: Închide funcția de căutare. [M2, Tema 4 - Functii]
    // Logica blocului: Filtrăm toate secțiunile, dar reținem doar prima destinație. Cu eclair, cafelele au zero rezultate și pagina coboară la deserturi.

    if (searchBtn) {
    // Explicatie: Verifică dacă lupa există înainte să-i adauge comportamentul. [M1, Tema 2 - Ramificatii si iteratii / M6, Tema 11 - DOM]
        searchBtn.addEventListener(
        // Explicatie: Înregistrează un eveniment pe lupă. [M6, Tema 12 - Events]
            "click",
            // Explicatie: Alege click drept evenimentul ascultat. [M6, Tema 12 - Events]
            runSearch
            // Explicatie: Pasează funcția runSearch browserului pentru a fi apelată la click. [M4, Tema 7 - Callback si arrow / M2, Tema 4 - Functii]
        );
        // Explicatie: Închide apelul addEventListener. [M6, Tema 12 - Events]
    }
    // Explicatie: Închide verificarea lupei. [M1, Tema 2 - Ramificatii si iteratii]

    /*
     * Căutarea funcționează și cu tasta Enter.
     */
    if (searchBar) {
    // Explicatie: Verifică dacă inputul există înainte să-i adauge un eveniment. [M1, Tema 2 - Ramificatii si iteratii / M6, Tema 11 - DOM]
        searchBar.addEventListener(
        // Explicatie: Înregistrează evenimentul pe câmp. [M6, Tema 12 - Events]
            "keydown",
            // Explicatie: keydown se declanșează la apăsarea unei taste. [M6, Tema 12 - Events]
            function (event) {
            // Explicatie: Primește obiectul cu informații despre tasta apăsată. [M6, Tema 12 - Events / M4, Tema 7 - Callback si arrow]
                if (event.key === "Enter") {
                // Explicatie: Compară event.key cu valoarea Enter. [M1, Tema 2 - Ramificatii si iteratii / M6, Tema 12 - Events]
                    runSearch(event);
                    // Explicatie: Pornește căutarea și îi transmite evenimentul pentru a permite derularea. [M2, Tema 4 - Functii / M6, Tema 12 - Events]
                }
                // Explicatie: Închide verificarea tastei. [M1, Tema 2 - Ramificatii si iteratii]
            }
            // Explicatie: Închide funcția primită de addEventListener. [M4, Tema 7 - Callback si arrow]
        );
        // Explicatie: Închide apelul addEventListener. [M6, Tema 12 - Events]
    }
    // Explicatie: Închide verificarea existenței câmpului. [M1, Tema 2 - Ramificatii si iteratii]
});
// Explicatie: Închide funcția care pregătește meniul după construirea DOM-ului. [M6, Tema 12 - Events / M4, Tema 7 - Callback si arrow]
// Logica blocului: Lupa și Enter apelează aceeași funcție. Sugestiile și golirea câmpului o folosesc fără a cere derulare.

document.addEventListener("DOMContentLoaded", function () {
// Explicatie: Așteaptă DOM-ul înainte să găsească și să conecteze elementele coșului. [M6, Tema 12 - Events / M4, Tema 7 - Callback si arrow]
    const cart = document.querySelector(".cart");
    // Explicatie: Găsește containerul coșului. [M6, Tema 11 - DOM]
    const toggle = cart.querySelector(".cart-toggle");
    // Explicatie: Găsește butonul de deschidere în container. [M6, Tema 11 - DOM]
    const panel = document.querySelector("#cart-panel");
    // Explicatie: Găsește panoul cu produsele din coș. [M6, Tema 11 - DOM]
    const count = document.querySelector("#cart-count");
    // Explicatie: Găsește elementul care arată numărul total de bucăți. [M6, Tema 11 - DOM]
    const items = document.querySelector("#cart-items");
    // Explicatie: Găsește lista în care vor fi scrise produsele. [M6, Tema 11 - DOM]
    const empty = document.querySelector("#cart-empty");
    // Explicatie: Găsește mesajul pentru coșul gol. [M6, Tema 11 - DOM]
    const status = document.querySelector("#cart-status");
    // Explicatie: Găsește zona care anunță actualizarea coșului tehnologiilor asistive. [M6, Tema 11 - DOM / Documentatie suplimentara, lectia exacta nu apare in captura]
    const dialog = document.querySelector("#quantity-dialog");
    // Explicatie: Găsește dialogul pentru alegerea cantității. [M6, Tema 11 - DOM / Documentatie suplimentara, lectia exacta nu apare in captura]
    const form = document.querySelector("#quantity-form");
    // Explicatie: Găsește formularul din dialog. [M6, Tema 11 - DOM]
    const quantity = document.querySelector("#order-quantity");
    // Explicatie: Găsește inputul numeric. [M6, Tema 11 - DOM]
    const title = document.querySelector("#quantity-title");
    // Explicatie: Găsește titlul dialogului, în care va apărea produsul. [M6, Tema 11 - DOM]
    const orders = new Map();
    // Explicatie: Creează un Map gol cu numele produsului drept cheie și cantitatea drept valoare. [Documentatie suplimentara, lectia exacta nu apare in captura]
    const checkoutLink = document.querySelector("#checkout-link");
    // Explicatie: Găsește linkul spre pagina de checkout. [M6, Tema 11 - DOM]
    checkoutLink.addEventListener("click", function () {
    // Explicatie: La click pe link, pregătește comanda înainte de navigare. [M6, Tema 12 - Events / M4, Tema 7 - Callback si arrow]
        sessionStorage.setItem("caffea-checkout", JSON.stringify(Array.from(orders)));
        // Explicatie: Transformă Map-ul în array de perechi, apoi în text JSON și îl salvează în sesiunea tabului. [M8, Tema 16 - Web Storage / M2, Tema 3 - Arrays]
    });
    // Explicatie: Închide funcția care salvează comanda. [M6, Tema 12 - Events]
    let product = "";
    // Explicatie: Pregătește o variabilă pentru numele produsului ales în dialog. [M1, Tema 1 - Bazele JS]
    // Logica blocului: Coșul lucrează cu un Map cât timp pagina e deschisă. Linkul copiază comanda în sessionStorage ca pagina de checkout s-o poată citi.

    const cartTotal = document.querySelector("#cart-total");
    const cartAmount = document.querySelector("#cart-amount");
    // Găsim rândul totalului și locul unde scriem suma. [M6, Tema 11 - DOM]

    function renderCart() {
        items.replaceChildren();
        // Refacem lista din datele actuale. [M6, Tema 11 - DOM]
        let total = 0;
        let totalPrice = 0;
        // Începem suma de la zero la fiecare actualizare. [M1, Tema 1]

        for (const [name, orderedQuantity] of orders) {
            // Desfacem perechea în nume și cantitate. [M3, Tema 6 - Destructurare]
            const row = document.createElement("li");
            row.className = "cart-row";
            const label = document.createElement("span");
            const linePrice = productPrices[name] * orderedQuantity;
            // Înmulțim prețul unitar cu numărul de bucăți. [M1, Tema 1 / M3, Tema 5]
            label.textContent = name + " · " + formatLei(linePrice);
            totalPrice += linePrice;
            // Adunăm costul acestui produs la costul comenzii. [M1, Tema 1]
            const controls = document.createElement("div");
            controls.className = "cart-row-actions";
            const quantityText = document.createElement("span");
            quantityText.textContent = orderedQuantity;

            for (const [action, caption] of [["decrease", "−"], ["increase", "+"], ["remove", "Remove"]]) {
                const control = document.createElement("button");
                control.type = "button";
                control.textContent = caption;
                control.dataset.action = action;
                control.dataset.product = name;
                control.setAttribute("aria-label", action + " " + name);
                control.disabled = (action === "decrease" && orderedQuantity === 1) ||
                    (action === "increase" && orderedQuantity === 999);
                controls.append(control);
            }
            controls.insertBefore(quantityText, controls.children[1]);
            row.append(label, controls);
            items.append(row);
            total += orderedQuantity;
        }

        count.textContent = total;
        cartAmount.textContent = formatLei(totalPrice);
        cartTotal.hidden = total === 0;
        // Afișăm totalul actualizat când coșul conține produse. [M6, Tema 11 - DOM]
        empty.hidden = total > 0;
        checkoutLink.hidden = total === 0;
        toggle.setAttribute("aria-label", "Shopping cart, " + total + (total === 1 ? " item" : " items"));
    }
    // Logica blocului: după orice editare refacem rândurile, contorul și subtotalul pornind din Map.

    items.addEventListener("click", function (event) {
        const control = event.target.closest("button[data-action]");
        if (!control) return;

        const { product: name, action } = control.dataset;
        const current = orders.get(name);
        if (action === "remove") {
            orders.delete(name);
        } else {
            const next = current + (action === "increase" ? 1 : -1);
            orders.set(name, next);
        }
        renderCart();
        // Căutăm butonul reconstruit ca să păstrăm poziția tastaturii. [M6, Tema 11 - DOM]
        const buttons = Array.from(items.querySelectorAll("button:not(:disabled)"));
        const sameControl = buttons.find(button => button.dataset.product === name && button.dataset.action === action);
        (sameControl || buttons.find(button => button.dataset.product === name) || buttons[0] || toggle).focus();
        status.textContent = action === "remove" ? name + " removed." : name + " quantity updated.";
    });
    // Logica blocului: lista are un singur listener pentru toate butoanele. [M7, Tema 13 - Event Delegation]

    function setCartOpen(open) {
    // Explicatie: Declară funcția care primește true pentru deschidere și false pentru închidere. [M2, Tema 4 - Functii]
        panel.hidden = !open;
        // Explicatie: Ascunde panoul când open este false și îl afișează când open este true. [M6, Tema 11 - DOM / M1, Tema 1 - Bazele JS]
        toggle.setAttribute("aria-expanded", String(open));
        // Explicatie: Actualizează aria-expanded cu valoarea ca text, pentru tehnologiile asistive. [M6, Tema 11 - DOM / Documentatie suplimentara, lectia exacta nu apare in captura]
    }
    // Explicatie: Închide funcția care schimbă vizibilitatea. [M2, Tema 4 - Functii]

    toggle.addEventListener("click", function () {
    // Explicatie: Ascultă clickul pe iconița coșului. [M6, Tema 12 - Events / M4, Tema 7 - Callback si arrow]
        setCartOpen(panel.hidden);
        // Explicatie: Dacă panoul este ascuns, îl deschide. Dacă este vizibil, îl închide. [M6, Tema 11 - DOM / M2, Tema 4 - Functii]
    });
    // Explicatie: Închide ascultarea clickului pe iconiță. [M6, Tema 12 - Events]

    document.addEventListener("click", function (event) {
    // Explicatie: Ascultă clickurile în toată pagina. [M6, Tema 12 - Events / M4, Tema 7 - Callback si arrow]
        if (!cart.contains(event.target)) {
        // Explicatie: Verifică dacă elementul apăsat este în afara containerului coșului. [M1, Tema 2 - Ramificatii si iteratii / M6, Tema 12 - Events / M6, Tema 11 - DOM]
            setCartOpen(false);
            // Explicatie: Închide panoul când clickul este în exterior. [M2, Tema 4 - Functii / M1, Tema 1 - Bazele JS]
        }
        // Explicatie: Închide verificarea locului în care s-a dat click. [M1, Tema 2 - Ramificatii si iteratii]
    });
    // Explicatie: Închide ascultarea clickurilor în pagină. [M6, Tema 12 - Events]

    document.addEventListener("keydown", function (event) {
    // Explicatie: Ascultă apăsarea tastelor în pagină. [M6, Tema 12 - Events / M4, Tema 7 - Callback si arrow]
        if (event.key === "Escape" && !panel.hidden) {
        // Explicatie: Verifică dacă a fost apăsat Escape cât timp panoul este vizibil. [M1, Tema 2 - Ramificatii si iteratii / M6, Tema 12 - Events / M1, Tema 1 - Bazele JS]
            setCartOpen(false);
            // Explicatie: Închide panoul. [M2, Tema 4 - Functii]
            toggle.focus();
            // Explicatie: Mută focusul tastaturii înapoi pe iconița coșului. [M6, Tema 11 - DOM]
        }
        // Explicatie: Închide condiția pentru Escape. [M1, Tema 2 - Ramificatii si iteratii]
    });
    // Explicatie: Închide ascultarea tastaturii. [M6, Tema 12 - Events]
    // Logica blocului: Același ajutor deschide sau închide panoul și actualizează atributul de accesibilitate. Poți închide prin click afară sau Escape.

    for (const button of document.querySelectorAll(".card .btn-cards")) {
        const productName = button.closest(".card").querySelector(".card-title").textContent.trim();
        // Citim titlul pentru a găsi prețul în catalog. [M6, Tema 11 - DOM]
        const price = document.createElement("strong");
        price.textContent = formatLei(productPrices[productName]);
        button.before(price);
        // Logica blocului: adăugăm prețul înaintea butonului fiecărui card. [M6, Tema 11 - DOM]
    // Explicatie: Găsește butoanele Order Now din carduri și le parcurge. [M1, Tema 2 - Ramificatii si iteratii / M6, Tema 11 - DOM]
        button.addEventListener("click", function () {
        // Explicatie: Leagă clickul fiecărui buton de dialogul pentru cantitate. [M6, Tema 12 - Events / M4, Tema 7 - Callback si arrow]
            product = productName;
            // Explicatie: Reține titlul citit din card pentru dialog. [M6, Tema 11 - DOM / M1, Tema 1 - Bazele JS]
            title.textContent = product;
            // Explicatie: Scrie numele produsului în titlul dialogului. [M6, Tema 11 - DOM]
            quantity.value = "1";
            // Explicatie: Pornește cantitatea de la unu. [M6, Tema 11 - DOM]
            dialog.showModal();
            // Explicatie: Deschide dialogul modal deasupra paginii. [Documentatie suplimentara, lectia exacta nu apare in captura]
        });
        // Explicatie: Închide funcția de click a butonului. [M6, Tema 12 - Events]
    }
    // Explicatie: Închide bucla peste butoanele produselor. [M1, Tema 2 - Ramificatii si iteratii]
    // Logica blocului: Toate cardurile folosesc același dialog. Butonul apăsat decide ce produs apare în el.

    document.querySelector(".hero-btn").addEventListener("click", function () {
    // Explicatie: Găsește butonul mare din introducere și ascultă clickul. [M6, Tema 11 - DOM / M6, Tema 12 - Events / M4, Tema 7 - Callback si arrow]
        document.querySelector(".section1").scrollIntoView();
        // Explicatie: Găsește prima secțiune de produse și derulează până la ea. [M6, Tema 11 - DOM / Documentatie suplimentara, lectia exacta nu apare in captura]
    });
    // Explicatie: Închide ascultarea clickului. [M6, Tema 12 - Events]
    // Logica blocului: Butonul din introducere duce utilizatorul la meniu, unde poate alege un produs.

    document.querySelector("#cancel-order").addEventListener("click", function () {
    // Explicatie: Găsește Cancel și leagă clickul de închiderea dialogului. [M6, Tema 11 - DOM / M6, Tema 12 - Events / M4, Tema 7 - Callback si arrow]
        dialog.close();
        // Explicatie: Închide dialogul de cantitate. [Documentatie suplimentara, lectia exacta nu apare in captura]
    });
    // Explicatie: Închide ascultarea clickului pe Cancel. [M6, Tema 12 - Events]
    // Logica blocului: Cancel închide dialogul înainte să modificăm coșul.

    form.addEventListener("submit", function (event) {
    // Explicatie: Ascultă trimiterea formularului de cantitate. [M6, Tema 12 - Events / M4, Tema 7 - Callback si arrow]
        event.preventDefault();
        // Explicatie: Oprește trimiterea implicită și navigarea paginii. [M6, Tema 12 - Events]
        const amount = quantity.valueAsNumber;
        // Explicatie: Citește cantitatea ca număr direct din input. [M6, Tema 11 - DOM / Documentatie suplimentara, lectia exacta nu apare in captura]
        if (!form.reportValidity()) {
        // Explicatie: Cere browserului să verifice regulile câmpului și să afișeze eventualele erori. [M1, Tema 2 - Ramificatii si iteratii / Documentatie suplimentara, lectia exacta nu apare in captura]
            return;
            // Explicatie: Oprește adăugarea dacă formularul nu este valid. [M2, Tema 4 - Functii]
        }
        // Explicatie: Închide verificarea cantității. [M1, Tema 2 - Ramificatii si iteratii]

        orders.set(product, Math.min(999, (orders.get(product) || 0) + amount));
        // Adună la cantitatea existentă, cu limita de 999 bucăți. [M1, Tema 1]
        renderCart();
        // Actualizează lista și contorul după schimbarea datelor. [M2, Tema 4]
        status.textContent = "Added " + amount + " × " + product + " to your cart.";
        // Explicatie: Scrie mesajul care anunță ce produs și ce cantitate au fost adăugate. [M6, Tema 11 - DOM / M1, Tema 1 - Bazele JS / Documentatie suplimentara, lectia exacta nu apare in captura]
        dialog.close();
        // Explicatie: Închide dialogul după actualizarea coșului. [Documentatie suplimentara, lectia exacta nu apare in captura]
    });
    // Explicatie: Închide funcția care tratează trimiterea formularului. [M6, Tema 12 - Events]
    // Logica blocului: Confirmarea actualizează datele din Map, apoi reconstruiește lista și contorul. Două espresso urmate de încă unul devin o singură intrare cu trei bucăți.
});
// Explicatie: Închide funcția care pregătește coșul după construirea DOM-ului. [M6, Tema 12 - Events / M4, Tema 7 - Callback si arrow]
