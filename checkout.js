const summary = document.querySelector("#checkout-items");
// Explicatie: Găsește lista pentru sumarul comenzii. [M6, Tema 11 - DOM]
const form = document.querySelector("#payment-form");
// Explicatie: Găsește formularul demonstrativ de plată. [M6, Tema 11 - DOM]
const empty = document.querySelector("#checkout-empty");
// Explicatie: Găsește mesajul de coș gol. [M6, Tema 11 - DOM]
const status = document.querySelector("#payment-status");
// Explicatie: Găsește locul unde va apărea confirmarea. [M6, Tema 11 - DOM]
let order = [];
// Explicatie: Pornește comanda cu un array gol. [M2, Tema 3 - Arrays / M1, Tema 1 - Bazele JS]

try {
// Explicatie: Începe blocul try, fiindcă citirea sau interpretarea datelor poate da o eroare. [Documentatie suplimentara, lectia exacta nu apare in captura]
    order = JSON.parse(sessionStorage.getItem("caffea-checkout")) || [];
    // Explicatie: Citește comanda salvată în tab și convertește JSON-ul în array. Dacă lipsește, folosește []. [M8, Tema 16 - Web Storage / M1, Tema 1 - Bazele JS]
} catch {
// Explicatie: Intră în catch dacă citirea sau conversia aruncă o eroare. [Documentatie suplimentara, lectia exacta nu apare in captura]
    order = [];
    // Explicatie: Revine la un array gol, ca pagina să poată continua. [M2, Tema 3 - Arrays]
}
// Explicatie: Închide tratarea erorii. [Documentatie suplimentara, lectia exacta nu apare in captura]
// Logica blocului: Checkout citește lista de produse și cantități pe care a lăsat-o coșul în sessionStorage. O comandă lipsă sau un JSON invalid este tratat ca un coș gol.

let totalPrice = 0;
for (const [product, quantity] of order) {
// Explicatie: Parcurge perechile din comandă și scoate produsul și cantitatea prin destructurare. [M1, Tema 2 - Ramificatii si iteratii / M3, Tema 6 - Destructurare si spread]
    const item = document.createElement("li");
    // Explicatie: Creează un rând li pentru produs. [M6, Tema 11 - DOM]
    const linePrice = productPrices[product] * quantity;
    totalPrice += linePrice;
    // Adunăm prețul fiecărei linii. [M1, Tema 1 / M3, Tema 5]
    item.textContent = product + " × " + quantity + " · " + formatLei(linePrice);
    // Explicatie: Scrie numele și cantitatea în rând. [M6, Tema 11 - DOM / M1, Tema 1 - Bazele JS]
    summary.append(item);
    // Explicatie: Adaugă rândul în lista sumarului. [M6, Tema 11 - DOM]
}
// Explicatie: Închide bucla de afișare. [M1, Tema 2 - Ramificatii si iteratii]

document.querySelector("#checkout-amount").textContent = formatLei(totalPrice);
document.querySelector("#checkout-total").hidden = order.length === 0;
// Logica blocului: sumarul recalculează totalul din catalog și cantități, la fel ca în coș.
form.hidden = order.length === 0;
// Explicatie: Ascunde formularul dacă nu sunt produse în comandă. [M6, Tema 11 - DOM / M2, Tema 3 - Arrays / M1, Tema 1 - Bazele JS]
empty.hidden = order.length > 0;
// Explicatie: Ascunde mesajul de coș gol când există produse. [M6, Tema 11 - DOM / M2, Tema 3 - Arrays / M1, Tema 1 - Bazele JS]
// Logica blocului: Construim sumarul din array. Utilizatorul vede formularul când are produse și mesajul de coș gol când lista este goală.

form.addEventListener("submit", function (event) {
// Explicatie: Ascultă trimiterea formularului de plată demonstrativă. [M6, Tema 12 - Events / M4, Tema 7 - Callback si arrow]
    event.preventDefault();
    // Explicatie: Oprește trimiterea implicită. Browserul nu trimite câmpurile formularului. [M6, Tema 12 - Events]
    form.reset();
    // Explicatie: Golește câmpurile formularului prin reset. [Documentatie suplimentara, lectia exacta nu apare in captura]
    form.hidden = true;
    // Explicatie: Ascunde formularul după simulare. [M6, Tema 11 - DOM]
    sessionStorage.removeItem("caffea-checkout");
    // Explicatie: Șterge lista comenzii din sessionStorage. [M8, Tema 16 - Web Storage]
    status.textContent = "Demo payment complete. No charge was made.";
    // Explicatie: Scrie mesajul de confirmare a simulării. [M6, Tema 11 - DOM]
});
// Explicatie: Închide funcția de trimitere și înregistrarea evenimentului. [M6, Tema 12 - Events / M4, Tema 7 - Callback si arrow]
// Logica blocului: Butonul simulează plata local. Formularul este resetat și rămâne confirmarea. Numărul cardului și codul de securitate nu intră în stocare.
