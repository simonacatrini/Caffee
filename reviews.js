const reviews = document.querySelector("#customer-reviews");
// Explicatie: Găsește secțiunea unde vor apărea cele trei carduri. [M6, Tema 11 - DOM]
const template = document.querySelector("#review-card");
// Explicatie: Găsește elementul template care păstrează structura unui card. [M6, Tema 11 - DOM / Documentatie suplimentara, lectia exacta nu apare in captura]
const dialog = document.querySelector("#review-dialog");
// Explicatie: Găsește dialogul de recenzie. [M6, Tema 11 - DOM / Documentatie suplimentara, lectia exacta nu apare in captura]
const form = document.querySelector("#review-form");
// Explicatie: Găsește formularul din dialog. [M6, Tema 11 - DOM]
const examples = [
// Explicatie: Începe array-ul cu cele trei recenzii fictive. [M2, Tema 3 - Arrays]
    { name: "Hannah Park", occupation: "Architect", photo: "hannah-park.jpg", rating: 5,
    // Explicatie: Pune numele, ocupația, fișierul pozei și ratingul primei persoane într-un obiect. [M3, Tema 5 - Obiecte]
      text: "The flat white was silky, and the lemon tart had just the right amount of zing." },
      // Explicatie: Adaugă textul primei recenzii și închide obiectul. [M3, Tema 5 - Obiecte / M1, Tema 1 - Bazele JS]
    { name: "Daniel Brooks", occupation: "Music Teacher", photo: "daniel-brooks.jpg", rating: 4,
    // Explicatie: Deschide obiectul pentru Daniel și îi pune datele de profil. [M3, Tema 5 - Obiecte]
      text: "I stopped in after a morning lesson and ordered a cappuccino and a brownie. The coffee was smooth, and the brownie was still a little warm in the middle. It's a lovely spot for a quiet break." },
      // Explicatie: Adaugă textul lui Daniel și închide obiectul. [M3, Tema 5 - Obiecte / M1, Tema 1 - Bazele JS]
    { name: "Sofia Rivera", occupation: "Landscape Designer", photo: "sofia-rivera.jpg", rating: 5,
    // Explicatie: Deschide obiectul pentru Sofia și îi pune datele de profil. [M3, Tema 5 - Obiecte]
      text: "I met a friend here on a rainy Saturday. We ordered a mocha and an americano and shared the mixed berry cheesecake. The berries were tart enough to balance the creamy filling, and the biscuit crust had a satisfying crunch. We stayed for another round and ended up trying the vanilla eclair too. The pastry was light, the filling tasted like vanilla, and the chocolate glaze was just sweet enough. Next time I'm bringing my sketchbook and taking the little table by the window. The staff offered us water and let us take our time even as the room filled up. I appreciated being able to hear my friend without raising my voice. When we left, I picked up an espresso to go. It held up on the walk home, and I was already thinking about what I would order next time." }
      // Explicatie: Adaugă textul mai lung al Sofiei pentru a exemplifica derularea. [M3, Tema 5 - Obiecte / M1, Tema 1 - Bazele JS]
];
// Explicatie: Închide array-ul cu exemple. [M2, Tema 3 - Arrays]

let posted = [];
let firstReview = 0;
// Explicație: indexul primului card vizibil pornește de la zero. [M2, Tema 3 - Arrays]
const visibleReviewCount = examples.length;
const previousReview = document.querySelector("#previous-review");
const nextReview = document.querySelector("#next-review");
const reviewRange = document.querySelector("#review-range");
// Explicație: legăm săgețile și indicatorul de elementele din pagină. [M6, Tema 11 - DOM]
// Explicatie: Pornește array-ul recenziilor utilizatorului gol la fiecare încărcare. [M2, Tema 3 - Arrays / M1, Tema 1 - Bazele JS]
// Logica blocului: Cele trei recenzii inițiale sunt date fixe. Recenziile scrise de utilizator stau doar în memoria paginii, așa că la refresh vedem din nou exemplele.

const overflowObserver = new ResizeObserver(entries => {
// Explicatie: Creează un ResizeObserver. Browserul îi apelează funcția când se schimbă dimensiunea elementelor urmărite. [M4, Tema 7 - Callback si arrow / Documentatie suplimentara, lectia exacta nu apare in captura]
    for (const { target } of entries) {
    // Explicatie: Parcurge notificările și extrage elementul target din fiecare obiect. [M1, Tema 2 - Ramificatii si iteratii / M3, Tema 6 - Destructurare si spread]
        target.nextElementSibling.hidden = target.scrollHeight <= target.clientHeight;
        // Explicatie: Ascunde butonul de lângă text dacă înălțimea totală a textului încape în zona vizibilă. [M6, Tema 11 - DOM / M1, Tema 1 - Bazele JS / Documentatie suplimentara, lectia exacta nu apare in captura]
    }
    // Explicatie: Închide bucla peste notificări. [M1, Tema 2 - Ramificatii si iteratii]
});
// Explicatie: Închide funcția și crearea observerului. [M4, Tema 7 - Callback si arrow / Documentatie suplimentara, lectia exacta nu apare in captura]
// Logica blocului: Comparăm cât spațiu cere textul cu cât spațiu are. Dacă textul e prea lung, butonul Read more devine vizibil.

function renderReviews() {
// Explicatie: Declară funcția care reconstruiește zona de recenzii. [M2, Tema 4 - Functii]
    overflowObserver.disconnect();
    // Explicatie: Oprește urmărirea textelor din cardurile vechi. [Documentatie suplimentara, lectia exacta nu apare in captura]
    reviews.replaceChildren();
    // Explicatie: Șterge din DOM cardurile vechi. [M6, Tema 11 - DOM]
    const allReviews = [...examples, ...posted];
    // Explicație: păstrează exemplele în față și recenziile noi la final. [M3, Tema 6 - Spread]
    const lastStart = allReviews.length - visibleReviewCount;
    const visible = allReviews.slice(firstReview, firstReview + visibleReviewCount);
    // Explicație: ia trei carduri începând de la indexul curent. [M2, Tema 3 - Arrays]
    previousReview.disabled = firstReview === 0;
    nextReview.disabled = firstReview === lastStart;
    reviewRange.textContent = (firstReview + 1) + "–" + (firstReview + visible.length) + " of " + allReviews.length;
    // Logica blocului: fereastra se mută prin toate recenziile fără să schimbe ordinea lor. [M6, Tema 11 - DOM]

    visible.forEach((review, index) => {
    // Explicatie: Parcurge recenziile afișate. Callback-ul primește recenzia și indexul ei. [M4, Tema 8 - Metode de array / M4, Tema 7 - Callback si arrow]
        const card = template.content.firstElementChild.cloneNode(true);
        // Explicatie: Copiază elementul din template împreună cu toți copiii lui. [M6, Tema 11 - DOM / Documentatie suplimentara, lectia exacta nu apare in captura]
        const photo = card.querySelector(".section4-photo");
        // Explicatie: Găsește imaginea din copia cardului. [M6, Tema 11 - DOM]
        photo.src = "./images/" + (examples.includes(review) ? review.photo : "review-avatar.svg");
        // Explicatie: Alege fotografia exemplului sau avatarul implicit și construiește calea imaginii. [M6, Tema 11 - DOM / M2, Tema 3 - Arrays / M1, Tema 2 - Ramificatii si iteratii]
        card.querySelector(".section4-name").textContent = review.name;
        // Explicatie: Scrie numele în elementul cu clasa section4-name. [M6, Tema 11 - DOM / M3, Tema 5 - Obiecte]
        card.querySelector(".section4-first-text").textContent = review.occupation;
        // Explicatie: Scrie ocupația în elementul destinat ei. [M6, Tema 11 - DOM / M3, Tema 5 - Obiecte]
        const text = card.querySelector(".section4-second-text");
        // Explicatie: Găsește paragraful recenziei în cardul copiat. [M6, Tema 11 - DOM]
        const more = card.querySelector(".review-more");
        // Explicatie: Găsește butonul Read more din același card. [M6, Tema 11 - DOM]
        text.id = "review-text-" + index;
        // Explicatie: Construiește un ID distinct pentru text, folosind poziția cardului. [M6, Tema 11 - DOM / M1, Tema 1 - Bazele JS]
        text.textContent = review.text;
        // Explicatie: Pune textul recenziei în paragraf ca text simplu. [M6, Tema 11 - DOM / M3, Tema 5 - Obiecte]
        more.setAttribute("aria-controls", text.id);
        // Explicatie: Leagă butonul de paragraful pe care îl controlează prin ID. [M6, Tema 11 - DOM / Documentatie suplimentara, lectia exacta nu apare in captura]
        more.addEventListener("click", () => {
        // Explicatie: Ascultă clickul pe butonul Read more. [M6, Tema 12 - Events / M4, Tema 7 - Callback si arrow]
            const expanded = text.classList.toggle("review-scroll");
            // Explicatie: Adaugă sau scoate clasa review-scroll. toggle întoarce true dacă a adăugat clasa. [M6, Tema 11 - DOM / Documentatie suplimentara, lectia exacta nu apare in captura]
            text.tabIndex = expanded ? 0 : -1;
            // Explicatie: Permite accesul la paragraf cu Tab când derularea este activată. [M6, Tema 11 - DOM / M1, Tema 2 - Ramificatii si iteratii / Documentatie suplimentara, lectia exacta nu apare in captura]
            if (!expanded) text.scrollTop = 0;
            // Explicatie: Când închide derularea, mută textul înapoi la început. [M1, Tema 2 - Ramificatii si iteratii / M6, Tema 11 - DOM]
            more.setAttribute("aria-expanded", String(expanded));
            // Explicatie: Actualizează aria-expanded pentru tehnologiile asistive. [M6, Tema 11 - DOM / Documentatie suplimentara, lectia exacta nu apare in captura]
            more.textContent = expanded ? "Read less" : "Read more";
            // Explicatie: Schimbă eticheta butonului în Read less sau Read more. [M6, Tema 11 - DOM / M1, Tema 2 - Ramificatii si iteratii]
        });
        // Explicatie: Închide funcția de click. [M6, Tema 12 - Events]
        // Logica blocului: Pornim sau oprim derularea doar în zona de text printr-o clasă CSS. Dimensiunea cardului rămâne fixă.

        const stars = card.querySelector(".star-icons");
        // Explicatie: Găsește containerul stelelor în card. [M6, Tema 11 - DOM]
        stars.setAttribute("role", "img");
        // Explicatie: Marchează grupul de stele drept un singur element vizual accesibil. [M6, Tema 11 - DOM / Documentatie suplimentara, lectia exacta nu apare in captura]
        stars.setAttribute("aria-label", review.rating + " out of 5 stars");
        // Explicatie: Scrie ratingul în eticheta grupului, de exemplu 4 out of 5 stars. [M6, Tema 11 - DOM / M1, Tema 1 - Bazele JS / Documentatie suplimentara, lectia exacta nu apare in captura]
        for (let star = 0; star < 5; star++) {
        // Explicatie: Rulează de cinci ori, câte o dată pentru fiecare poziție de stea. [M1, Tema 2 - Ramificatii si iteratii / M1, Tema 1 - Bazele JS]
            const icon = document.createElement("img");
            // Explicatie: Creează un element de imagine pentru stea. [M6, Tema 11 - DOM]
            icon.alt = "";
            // Explicatie: Lasă textul alternativ gol fiindcă ratingul e deja descris pe grup. [M6, Tema 11 - DOM / Documentatie suplimentara, lectia exacta nu apare in captura]
            icon.src = star < review.rating ? "./images/star-section4.svg" : "./images/section4-star-empty.svg";
            // Explicatie: Alege o stea plină când indexul este sub rating și o stea goală în rest. [M6, Tema 11 - DOM / M1, Tema 2 - Ramificatii si iteratii]
            stars.append(icon);
            // Explicatie: Adaugă imaginea în grupul de stele. [M6, Tema 11 - DOM]
        }
        // Explicatie: Închide bucla celor cinci stele. [M1, Tema 2 - Ramificatii si iteratii]
        reviews.append(card);
        // Explicatie: Inserează cardul complet în pagină. [M6, Tema 11 - DOM]
        overflowObserver.observe(text);
        // Explicatie: Începe să urmărească dimensiunea zonei de text din card. [Documentatie suplimentara, lectia exacta nu apare in captura]
    });
    // Explicatie: Închide funcția care construiește fiecare card și apelul forEach. [M4, Tema 8 - Metode de array / M4, Tema 7 - Callback si arrow]
}
// Explicatie: Închide funcția de afișare a recenziilor. [M2, Tema 4 - Functii]
// Logica blocului: Construim cele trei carduri din grupul curent folosind același model. Săgețile schimbă grupul.

previousReview.addEventListener("click", () => {
    firstReview--;
    renderReviews();
    if (previousReview.disabled) nextReview.focus();
});
nextReview.addEventListener("click", () => {
    firstReview++;
    renderReviews();
    if (nextReview.disabled) previousReview.focus();
});
// Logica blocului: fiecare click mută lista cu o poziție, iar la capăt mutăm focusul pe săgeata disponibilă. [M6, Tema 12 - Events]

document.querySelector("#write-review").addEventListener("click", () => dialog.showModal());
// Explicatie: La click pe Write a review, deschide formularul în dialog. [M6, Tema 11 - DOM / M6, Tema 12 - Events / M4, Tema 7 - Callback si arrow / Documentatie suplimentara, lectia exacta nu apare in captura]
document.querySelector("#cancel-review").addEventListener("click", () => dialog.close());
// Explicatie: La click pe Cancel, închide dialogul. [M6, Tema 11 - DOM / M6, Tema 12 - Events / M4, Tema 7 - Callback si arrow / Documentatie suplimentara, lectia exacta nu apare in captura]
form.addEventListener("submit", event => {
// Explicatie: Ascultă trimiterea formularului. [M6, Tema 12 - Events / M4, Tema 7 - Callback si arrow]
    event.preventDefault();
    // Explicatie: Oprește trimiterea implicită și navigarea. [M6, Tema 12 - Events]
    const data = new FormData(form);
    // Explicatie: Citește câmpurile formularului după atributul name prin FormData. [Documentatie suplimentara, lectia exacta nu apare in captura]
    const name = data.get("reviewer").trim();
    // Explicatie: Ia numele și elimină spațiile de la capete. [M1, Tema 1 - Bazele JS / Documentatie suplimentara, lectia exacta nu apare in captura]
    const text = data.get("review").trim();
    // Explicatie: Ia textul recenziei și elimină spațiile de la capete. [M1, Tema 1 - Bazele JS / Documentatie suplimentara, lectia exacta nu apare in captura]
    if (!name || !text) {
    // Explicatie: Verifică dacă numele sau recenzia sunt goale după eliminarea spațiilor. [M1, Tema 2 - Ramificatii si iteratii / M1, Tema 1 - Bazele JS]
        form.elements[name ? "review" : "reviewer"].focus();
        // Explicatie: Mută focusul pe primul câmp obligatoriu rămas gol. [M6, Tema 11 - DOM / M1, Tema 2 - Ramificatii si iteratii / Documentatie suplimentara, lectia exacta nu apare in captura]
        return;
        // Explicatie: Oprește publicarea până când câmpul este completat. [M2, Tema 4 - Functii]
    }
    // Explicatie: Închide verificarea câmpurilor. [M1, Tema 2 - Ramificatii si iteratii]
    posted = [...posted, {
    // Explicatie: Copiază recenziile existente cu spread și începe obiectul noii recenzii. [M2, Tema 3 - Arrays / M3, Tema 6 - Destructurare si spread / M3, Tema 5 - Obiecte]
        name,
        // Explicatie: Folosește prescurtarea name pentru proprietatea name cu valoarea variabilei name. [M3, Tema 5 - Obiecte]
        occupation: data.get("occupation").trim(),
        // Explicatie: Salvează ocupația citită din formular, fără spații la capete. [M3, Tema 5 - Obiecte / M1, Tema 1 - Bazele JS / Documentatie suplimentara, lectia exacta nu apare in captura]
        text,
        // Explicatie: Pune textul recenziei în obiect. [M3, Tema 5 - Obiecte]
        rating: Number(data.get("rating"))
        // Explicatie: Transformă valoarea ratingului, citită ca string, în număr. [M3, Tema 5 - Obiecte / M1, Tema 1 - Bazele JS / Documentatie suplimentara, lectia exacta nu apare in captura]
    }];
    // Explicație: păstrăm toate recenziile adăugate în sesiunea curentă. [M2, Tema 3 - Arrays]
    firstReview = posted.length;
    // Explicație: deschidem ultimul grup de trei ca recenzia nouă să fie vizibilă. [M2, Tema 3 - Arrays]
    renderReviews();
    // Explicatie: Reafișează cardurile în noua ordine. [M2, Tema 4 - Functii]
    form.reset();
    // Explicatie: Readuce câmpurile formularului la valorile inițiale. [Documentatie suplimentara, lectia exacta nu apare in captura]
    dialog.close();
    // Explicatie: Închide dialogul după publicare. [Documentatie suplimentara, lectia exacta nu apare in captura]
});
// Explicatie: Închide funcția de trimitere a recenziei. [M6, Tema 12 - Events / M4, Tema 7 - Callback si arrow]
// Logica blocului: Validăm numele și textul, apoi punem recenzia nouă în dreapta. La o nouă trimitere, cea anterioară se mută spre stânga.
renderReviews();
// Explicatie: Afișează recenziile la încărcarea scriptului. [M2, Tema 4 - Functii]
