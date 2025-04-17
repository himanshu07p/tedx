document.addEventListener('quotesLoaded', () => {
    const quotes = [
        {
            text: "The power of ideas to change attitudes, lives and ultimately, the world.",
            attribution: "TEDx Mission"
        },
        {
            text: "Ideas are the currency of the 21st century.",
            attribution: "TED Curator"
        },
        {
            text: "Your time is limited, so don't waste it living someone else's life.",
            attribution: "Steve Jobs"
        },
        {
            text: "The only way to do great work is to love what you do.",
            attribution: "Steve Jobs"
        }
        // Add more quotes as needed
    ];

    let currentQuoteIndex = 0;
    const quoteTextElement = document.getElementById('quote-text-display');
    const quoteAttributionElement = document.getElementById('quote-attribution-display');
    // const prevButton = document.getElementById('prev-quote'); // Uncomment if using nav
    // const nextButton = document.getElementById('next-quote'); // Uncomment if using nav

    function displayQuote(index) {
        if (!quoteTextElement || !quoteAttributionElement) return;

        // Fade out current quote
        quoteTextElement.style.opacity = 0;
        quoteAttributionElement.style.opacity = 0;

        setTimeout(() => {
            // Update text and attribution
            quoteTextElement.textContent = `"${quotes[index].text}"`;
            quoteAttributionElement.textContent = quotes[index].attribution;

            // Fade in new quote
            quoteTextElement.style.opacity = 1;
            quoteAttributionElement.style.opacity = 1;
        }, 300); // Match transition duration
    }

    // Initial display
    if (quoteTextElement && quoteAttributionElement) {
         // Add transition style
        quoteTextElement.style.transition = 'opacity 0.3s ease-in-out';
        quoteAttributionElement.style.transition = 'opacity 0.3s ease-in-out';
        displayQuote(currentQuoteIndex);
    }


    // --- Optional: Automatic Cycling ---
    setInterval(() => {
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        displayQuote(currentQuoteIndex);
    }, 7000); // Change quote every 7 seconds

    // --- Optional: Navigation Button Logic ---
    // if (prevButton && nextButton) {
    //     prevButton.addEventListener('click', () => {
    //         currentQuoteIndex = (currentQuoteIndex - 1 + quotes.length) % quotes.length;
    //         displayQuote(currentQuoteIndex);
    //     });

    //     nextButton.addEventListener('click', () => {
    //         currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    //         displayQuote(currentQuoteIndex);
    //     });
    // }
});

// Fallback if the custom event doesn't fire correctly
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('quote-text-display') && !document.getElementById('quote-text-display').style.transition) {
         // Manually trigger if needed, checking if already initialized
         const event = new CustomEvent('quotesLoaded');
         document.dispatchEvent(event);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Initialize quotes functionality if needed (e.g., slider)
    console.log("Quotes component script loaded.");
    
    // Example: If you plan to have multiple quotes later
    // const quotes = [
    //     { text: "Quote 1...", author: "Author 1" },
    //     { text: "Quote 2...", author: "Author 2" }
    // ];
    // let currentQuoteIndex = 0;
    // const quoteTextElement = document.getElementById('quote-text-display');
    // const quoteAttrElement = document.getElementById('quote-attribution-display');

    // function displayQuote(index) {
    //     if (!quoteTextElement || !quoteAttrElement) return;
    //     quoteTextElement.textContent = `"${quotes[index].text}"`;
    //     quoteAttrElement.textContent = `— ${quotes[index].author}`;
    // }

    // Initial display (if using dynamic quotes)
    // displayQuote(currentQuoteIndex);

    // Add event listeners for next/prev buttons if they exist
    // const prevBtn = document.getElementById('prev-quote');
    // const nextBtn = document.getElementById('next-quote');
    // if (prevBtn && nextBtn) {
    //     prevBtn.addEventListener('click', () => { /* logic */ });
    //     nextBtn.addEventListener('click', () => { /* logic */ });
    // }
});

// Handle dynamic loading
document.addEventListener('quotesLoaded', () => {
    console.log("Quotes component dynamically loaded.");
    // Re-run initialization if necessary
});
