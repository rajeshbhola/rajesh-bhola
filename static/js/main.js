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
        mobileResults.className = 'hidden mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-64 overflow-y-auto';
        mobileSearchInput.parentElement.appendChild(mobileResults);
    }
    
    // Fetch search index with absolute path
    const baseURL = window.location.origin + window.location.pathname.split('/').slice(0, -1).join('/') || '/';
    const indexPath = baseURL.endsWith('/') ? baseURL + 'index.json' : baseURL + '/index.json';
    
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
        displayResults(results.slice(0, 5), resultsContainer);
    }
    
    function displayResults(results, resultsContainer) {
        if (!resultsContainer) return;
        
        if (results.length === 0) {
            resultsContainer.innerHTML = '<p class="text-gray-400 p-3">No results found</p>';
            resultsContainer.classList.remove('hidden');
            return;
        }
        
        const html = results.map(item => `
            <a href="${item.permalink}" class="block p-3 hover:bg-purple-900/20 rounded transition">
                <h3 class="font-bold text-purple-400">${item.title}</h3>
                <p class="text-sm text-gray-400 mt-1">${truncate(item.content, 100)}</p>
                <div class="flex gap-2 mt-2">
                    ${item.tags ? item.tags.map(tag => `
                        <span class="text-xs px-2 py-1 bg-purple-900/30 rounded-full">${tag}</span>
                    `).join('') : ''}
                </div>
            </a>
        `).join('');
        
        resultsContainer.innerHTML = html;
        resultsContainer.classList.remove('hidden');
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

// Filter and sort functionality
document.addEventListener('DOMContentLoaded', function() {
    const categoryFilter = document.querySelector('select[name="category"]');
    const tagFilter = document.querySelector('select[name="tag"]');
    const sortFilter = document.querySelector('select[name="sort"]');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterPosts);
    }
    
    if (tagFilter) {
        tagFilter.addEventListener('change', filterPosts);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', sortPosts);
    }
    
    function filterPosts() {
        const selectedCategory = categoryFilter ? categoryFilter.value : 'All Categories';
        const selectedTag = tagFilter ? tagFilter.value : 'All Tags';
        const posts = document.querySelectorAll('.post-card');
        
        posts.forEach(post => {
            const postCategories = post.dataset.categories ? post.dataset.categories.split(',') : [];
            const postTags = post.dataset.tags ? post.dataset.tags.split(',') : [];
            
            const categoryMatch = selectedCategory === 'All Categories' || 
                                 postCategories.some(cat => cat.trim() === selectedCategory);
            const tagMatch = selectedTag === 'All Tags' || 
                           postTags.some(tag => tag.trim() === selectedTag);
            
            if (categoryMatch && tagMatch) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    }
    
    function sortPosts() {
        const sortOrder = sortFilter ? sortFilter.value : 'Newest First';
        const postsContainer = document.querySelector('.posts-grid');
        if (!postsContainer) return;
        
        const posts = Array.from(document.querySelectorAll('.post-card'));
        
        posts.sort((a, b) => {
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            
            if (sortOrder === 'Newest First') {
                return dateB - dateA;
            } else {
                return dateA - dateB;
            }
        });
        
        // Clear and re-append sorted posts
        posts.forEach(post => postsContainer.appendChild(post));
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