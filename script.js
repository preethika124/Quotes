
    const quotes = [
      { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
      { text: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi" },
      { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
      { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
      { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
      { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
      { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
      { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
      { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
      { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" }
    ];

    const quoteBox = document.getElementById("quote-box");
    const quoteEl = document.getElementById("quote");
    const authorEl = document.getElementById("author");
    const newQuoteBtn = document.getElementById("new-quote");
    const saveQuoteBtn = document.getElementById("save-quote");
    const favoritesList = document.getElementById("favorites-list");
    const favoritesToggle = document.getElementById("favorites-toggle");
    const favoritesSection = document.getElementById("favorites");

    let currentQuote = null;
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    function renderQuote(quoteObj) {
      quoteBox.style.opacity = 0;
      setTimeout(() => {
        quoteEl.textContent = quoteObj.text;
        authorEl.textContent = `– ${quoteObj.author}`;
        quoteBox.style.opacity = 1;
        updateSaveButton();
      }, 300);
    }

    function newQuote() {
      const random = quotes[Math.floor(Math.random() * quotes.length)];
      currentQuote = random;
      renderQuote(currentQuote);
    }

    function updateSaveButton() {
      const exists = favorites.some(q => q.text === currentQuote.text);
      saveQuoteBtn.textContent = exists ? "❤️ Saved" : "♡ Save";
      saveQuoteBtn.classList.toggle("saved", exists);
    }

    function toggleFavorite() {
      const exists = favorites.some(q => q.text === currentQuote.text);
      if (!exists) {
        favorites.push(currentQuote);
        launchConfetti();
      } else {
        favorites = favorites.filter(q => q.text !== currentQuote.text);
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
      updateSaveButton();
      renderFavorites();
    }

    function renderFavorites() {
      favoritesList.innerHTML = "";
      favorites.forEach(q => {
        const li = document.createElement("li");
        li.textContent = `"${q.text}" – ${q.author}`;
        favoritesList.appendChild(li);
      });
    }

    function launchConfetti() {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    }

    function toggleFavorites() {
      favoritesSection.style.display =
        favoritesSection.style.display === "none" ? "block" : "none";
    }

    function createBalloons(count = 15) {
      const container = document.getElementById("balloons");
      for (let i = 0; i < count; i++) {
        const balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.style.left = Math.random() * 100 + "%";
        balloon.style.animationDuration = 5 + Math.random() * 10 + "s";
        balloon.style.background = `radial-gradient(circle at 30% 30%, hsl(${Math.random() * 360}, 100%, 70%), hsl(${Math.random() * 360}, 100%, 40%))`;
        container.appendChild(balloon);
      }
    }

    newQuote();
    renderFavorites();
    createBalloons();

    newQuoteBtn.addEventListener("click", newQuote);
    saveQuoteBtn.addEventListener("click", toggleFavorite);
    favoritesToggle.addEventListener("click", toggleFavorites);
 
