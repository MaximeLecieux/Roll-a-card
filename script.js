// Liste des 107 cartes (ici représentées par des numéros de 1 à 107)
const cards = Array.from({ length: 107 }, (v, k) => k + 1);
let drawnCards = [];

// Charger l'état du jeu depuis le localStorage
function loadGame() {
    const savedDrawnCards = localStorage.getItem('drawnCards');
    if (savedDrawnCards) {
        drawnCards = JSON.parse(savedDrawnCards);
        document.getElementById('cardDisplay').innerText = "Reprise de la partie en cours. Cliquez pour tirer une carte.";
    }
    updateCardsRemaining();
}

// Sauvegarder l'état du jeu dans le localStorage
function saveGame() {
    localStorage.setItem('drawnCards', JSON.stringify(drawnCards));
}

// Fonction pour mettre à jour le compteur de cartes restantes
function updateCardsRemaining() {
    const cardsRemaining = cards.length - drawnCards.length;
    document.getElementById('cardsRemaining').innerText = `Cartes restantes : ${cardsRemaining}`;
}

// Fonction pour tirer une carte aléatoire
function drawCard() {
    if (drawnCards.length >= cards.length) {
        document.getElementById('cardDisplay').innerText = "Toutes les cartes ont été tirées !";
        return;
    }

    let card;
    do {
        card = cards[Math.floor(Math.random() * cards.length)];
    } while (drawnCards.includes(card));

    drawnCards.push(card);
    document.getElementById('cardDisplay').innerText = `Vous avez tiré la carte : ${card}`;

    // Afficher l'image correspondante
    const cardImage = document.getElementById('cardImage');
    cardImage.src = `images/Carte café entrepreneur verso-${card}-page-00001.jpg`;
    cardImage.style.display = 'block';

    saveGame();
    updateCardsRemaining();
}

// Fonction pour réinitialiser le jeu
function resetGame() {
    drawnCards = [];
    localStorage.removeItem('drawnCards');
    document.getElementById('cardDisplay').innerText = "Cliquez sur le bouton pour tirer une carte";
    document.getElementById('cardImage').style.display = 'none';
    updateCardsRemaining();
}

// Charger le jeu lors du chargement de la page
window.onload = loadGame;