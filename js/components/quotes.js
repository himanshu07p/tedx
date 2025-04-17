document.addEventListener('quotesLoaded', () => {
    const quotes = [
        {
            text: "The power of ideas to change attitudes, lives and ultimately, the world.",
            attribution: "— TEDx Mission"
        },
        {
            text: "Ideas are the currency of the 21st century.",
            attribution: "— TED Curator"
        },
        {
            text: "Your time is limited, so don't waste it living someone else's life.",
            attribution: "— Steve Jobs"
        },
        {
            text: "The only way to do great work is to love what you do.",
            attribution: "— Steve Jobs"
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
