(() => {
    const API_URL = 'https://dummyjson.com/quotes';
    const searchInput = document.getElementById('searchInput');
    const quoteList    = document.getElementById('quoteList');
    const errorDiv     = document.getElementById('errorMessage');
  
    let allQuotes = []; 
  
    
    const fetchQuotes = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        allQuotes = data.quotes;  
        renderQuotes(allQuotes);
      } catch (err) {
        showError(`Failed to load quotes: ${err.message}`);
      }
    };
  
    const renderQuotes = (quotes) => {
      quoteList.innerHTML = ''; 
      if (quotes.length === 0) {
        quoteList.innerHTML = `<li>No quotes found.</li>`;
        return;
      }
      quotes.forEach(({ quote }) => {
        const li = document.createElement('li');
        li.textContent = quote;
        quoteList.appendChild(li);
      });
    };
  
    const filterQuotes = (query) => {
      const normalized = query.trim().toLowerCase();
      if (!normalized) {
        renderQuotes(allQuotes);
        return;
      }
      const filtered = allQuotes.filter(({ quote }) =>
        quote.toLowerCase().includes(normalized)
      );
      renderQuotes(filtered);
    };
  
    const showError = (message) => {
      errorDiv.textContent = message;
      errorDiv.hidden = false;
    };
  
    const init = () => {
      fetchQuotes();
      searchInput.addEventListener('input', (e) =>
        filterQuotes(e.target.value)
      );
    };
  
    document.addEventListener('DOMContentLoaded', init);
  })();
  