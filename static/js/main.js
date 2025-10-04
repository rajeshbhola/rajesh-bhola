// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
});

// Search functionality for Hugo blog
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const mobileSearchInput = document.getElementById('mobile-search-input');
    const searchResults = document.getElementById('search-results');
    let searchIndex = [];
    
    // Create mobile search results container if mobile search exists
    if (mobileSearchInput && !document.getElementById('mobile-search-results')) {
        const mobileResults = document.createElement('div');
        mobileResults.id = 'mobile-search-results';
        mobileResults.className = 'hidden mt-2 rounded-lg shadow-2xl max-h-96 overflow-y-auto';
        mobileResults.style.cssText = `
            background: rgba(30, 41, 59, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(127, 63, 245, 0.3);
        `;
        mobileSearchInput.parentElement.appendChild(mobileResults);
    }
    
    // For GitHub Pages or sites with subdirectories, use the site root
    const siteRoot = window.location.pathname.includes('/rajesh-bhola/') ? '/rajesh-bhola/' : '/';
    
    fetch(siteRoot + 'index.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            searchIndex = data;
        })
        .catch(error => {
            console.error('Error loading search index:', error);
            // Try alternative paths
            const fallbackPaths = ['./index.json', '../index.json', '/index.json'];
            
            const tryFallback = (paths) => {
                if (paths.length === 0) {
                    console.error('Failed to load search index from all paths');
                    return;
                }
                
                fetch(paths[0])
                    .then(response => {
                        if (!response.ok) throw new Error('Not found');
                        return response.json();
                    })
                    .then(data => {
                        searchIndex = data;
                    })
                    .catch(() => tryFallback(paths.slice(1)));
            };
            
            tryFallback(fallbackPaths);
        });
    
    // Setup search for both desktop and mobile inputs
    [searchInput, mobileSearchInput].forEach(input => {
        if (input) {
            input.addEventListener('input', function(e) {
                const query = e.target.value.toLowerCase().trim();
                const isMobile = input.id === 'mobile-search-input';
                performSearch(query, isMobile);
            });
        }
    });
    
    function performSearch(query, isMobile = false) {
        const resultsContainer = isMobile ? document.getElementById('mobile-search-results') : searchResults;
        
        if (query.length < 2) {
            if (resultsContainer) resultsContainer.classList.add('hidden');
            return;
        }
        
        // Check if search index is loaded
        if (!searchIndex || searchIndex.length === 0) {
            if (resultsContainer) {
                resultsContainer.innerHTML = '<p class="text-gray-400 p-3">Loading search...</p>';
                resultsContainer.classList.remove('hidden');
            }
            return;
        }
        
        const results = searchIndex.filter(item => {
            if (!item) return false;
            
            // Check title
            const titleMatch = item.title && item.title.toLowerCase().includes(query);
            
            // Check content
            const contentMatch = item.content && item.content.toLowerCase().includes(query);
            
            // Check tags
            const tagMatch = item.tags && Array.isArray(item.tags) && 
                           item.tags.some(tag => tag && tag.toLowerCase().includes(query));
            
            // Check categories
            const categoryMatch = item.categories && Array.isArray(item.categories) && 
                                item.categories.some(cat => cat && cat.toLowerCase().includes(query));
            
            return titleMatch || contentMatch || tagMatch || categoryMatch;
        });
        displayResults(results, resultsContainer, query);
    }

    function displayResults(results, resultsContainer, query) {
        if (!resultsContainer) return;

        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="p-6 text-center">
                    <svg class="w-16 h-16 mx-auto mb-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p class="text-gray-400 font-medium">No results found</p>
                    <p class="text-gray-500 text-sm mt-1">Try different keywords</p>
                </div>
            `;
            resultsContainer.classList.remove('hidden');
            return;
        }

        const html = `
            <div class="p-2">
                <div class="flex items-center justify-between px-3 py-2 mb-2">
                    <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Found ${results.length} result${results.length > 1 ? 's' : ''}
                    </span>
                </div>
                ${results.map((item, index) => `
                    <a href="${item.permalink}" class="search-result-item group block p-4 mb-2 rounded-lg transition-all duration-300" style="
                        background: linear-gradient(135deg, rgba(127, 63, 245, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%);
                        border: 1px solid rgba(127, 63, 245, 0.1);
                    " onmouseover="this.style.background='linear-gradient(135deg, rgba(127, 63, 245, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)'; this.style.borderColor='rgba(127, 63, 245, 0.3)'; this.style.transform='translateX(4px)'" onmouseout="this.style.background='linear-gradient(135deg, rgba(127, 63, 245, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)'; this.style.borderColor='rgba(127, 63, 245, 0.1)'; this.style.transform='translateX(0)'">
                        <div class="flex items-start gap-3">
                            <div class="flex-shrink-0 mt-1">
                                <div class="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm" style="
                                    background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
                                    color: white;
                                ">
                                    ${index + 1}
                                </div>
                            </div>
                            <div class="flex-1 min-w-0">
                                <h3 class="font-bold text-white mb-1 group-hover:text-purple-300 transition-colors line-clamp-2">
                                    ${highlightText(item.title, query)}
                                </h3>
                                <p class="text-sm text-gray-400 line-clamp-2">
                                    ${truncate(stripHtml(item.content), 120)}
                                </p>
                            </div>
                        </div>
                    </a>
                `).join('')}
            </div>
        `;

        resultsContainer.innerHTML = html;
        resultsContainer.classList.remove('hidden');
    }

    function highlightText(text, query) {
        if (!query || !text) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark style="background: rgba(168, 85, 247, 0.3); color: #fff; padding: 2px 4px; border-radius: 3px;">$1</mark>');
    }

    function stripHtml(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }
    
    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        const mobileResults = document.getElementById('mobile-search-results');
        
        // Close desktop search results
        if (searchResults && searchInput && 
            !searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.add('hidden');
        }
        
        // Close mobile search results
        if (mobileResults && mobileSearchInput && 
            !mobileSearchInput.contains(e.target) && !mobileResults.contains(e.target)) {
            mobileResults.classList.add('hidden');
        }
    });
    
    function truncate(str, length) {
        if (!str) return '';
        return str.length > length ? str.substring(0, length) + '...' : str;
    }
});


// Reading progress indicator
document.addEventListener('DOMContentLoaded', function() {
    const readingProgress = document.getElementById('reading-progress');
    
    if (readingProgress) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            readingProgress.style.width = scrolled + '%';
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        observer.observe(card);
    });
});

// Copy code blocks to clipboard
document.addEventListener('DOMContentLoaded', function() {
    // Skip if we're on a single post page (let single.html handle it)
    if (document.querySelector('.post-content')) {
        return;
    }

    document.querySelectorAll('pre code').forEach(block => {
        const pre = block.parentElement;

        // Skip if copy button already exists
        if (pre.querySelector('.copy-button')) {
            return;
        }

        const button = document.createElement('button');

        button.className = 'copy-button';
        button.textContent = 'Copy';
        button.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            padding: 8px 12px;
            background: #7f3ff5;
            color: #ffffff;
            border: none;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            opacity: 0.8;
            z-index: 10;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        `;

        // Add hover effect
        button.addEventListener('mouseenter', function() {
            this.style.background = '#9333ea';
            this.style.transform = 'translateY(-1px)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
            this.style.opacity = '1';
        });

        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('copied')) {
                this.style.background = '#7f3ff5';
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
                this.style.opacity = '0.8';
            }
        });

        button.addEventListener('click', async function() {
            try {
                await navigator.clipboard.writeText(block.textContent);
                this.textContent = 'Copied!';
                this.style.background = '#22c55e';
                this.style.color = '#ffffff';
                this.classList.add('copied');

                setTimeout(() => {
                    this.textContent = 'Copy';
                    this.style.background = '#7f3ff5';
                    this.style.color = '#ffffff';
                    this.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
                this.textContent = 'Failed';
                this.style.background = '#ef4444';
                setTimeout(() => {
                    this.textContent = 'Copy';
                    this.style.background = '#7f3ff5';
                }, 2000);
            }
        });

        pre.style.position = 'relative';
        pre.appendChild(button);
    });
});