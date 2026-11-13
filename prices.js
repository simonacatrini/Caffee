const productPrices = Object.freeze({
    "Espresso": 10,
    "Cappuccino": 14,
    "Latte Macchiato": 16,
    "Flat White": 15,
    "Americano": 11,
    "Mocha": 17,
    "Tiramisu": 24,
    "Mixed Berry Cheesecake": 25,
    "Brownie": 16,
    "Vanilla Eclair": 18,
    "Lemon Tart": 20,
    "Panna Cotta": 22
});
// Explicație: fiecare cheie este titlul produsului, iar valoarea este prețul întreg în lei. [M3, Tema 5 - Obiecte]

function formatLei(amount) {
    return amount + " lei";
    // Explicație: transformă numărul în text cu moneda la final. [M1, Tema 1 - Strings]
}
// Logica blocului: meniul, coșul și checkout-ul folosesc același catalog.
