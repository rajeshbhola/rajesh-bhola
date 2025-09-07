// Search functionality for Hugo blog
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const mobileSearchInput = document.getElementById('mobile-search-input');
    const searchResults = document.getElementById('search-results');
    let searchIndex = [];
    
    // Fetch search index
    fetch('/index.json')
        .then(response => response.json())
        .then(data => {
            searchIndex = data;
        })
        .catch(error => console.error('Error loading search index:', error));
    
    // Setup search for both desktop and mobile inputs
    [searchInput, mobileSearchInput].forEach(input => {
        if (input) {
            input.addEventListener('input', function(e) {
                const query = e.target.value.toLowerCase().trim();
                performSearch(query);
            });
        }
    });
    
    function performSearch(query) {
        if (query.length < 2) {
            if (searchResults) searchResults.classList.add('hidden');
            return;
        }
        
        const results = searchIndex.filter(item => {
            return item.title.toLowerCase().includes(query) ||
                   item.content.toLowerCase().includes(query) ||
                   (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query))) ||
                   (item.categories && item.categories.some(cat => cat.toLowerCase().includes(query)));
        });
        
        displayResults(results.slice(0, 5));
    }
    
    function displayResults(results) {
        if (!searchResults) return;
        
        if (results.length === 0) {
            searchResults.innerHTML = '<p class="text-gray-400">No results found</p>';
            searchResults.classList.remove('hidden');
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
        
        searchResults.innerHTML = html;
        searchResults.classList.remove('hidden');
    }
    
    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (searchResults && !searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.add('hidden');
        }
    });
    
    function truncate(str, length) {
        if (!str) return '';
        return str.length > length ? str.substring(0, length) + '...' : str;
    }
});

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
    document.querySelectorAll('pre code').forEach(block => {
        const pre = block.parentElement;
        const button = document.createElement('button');
        
        button.className = 'copy-button';
        button.textContent = 'Copy';
        button.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            padding: 4px 8px;
            background: rgba(127, 63, 245, 0.2);
            border: 1px solid rgba(127, 63, 245, 0.3);
            border-radius: 4px;
            color: #a78bfa;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s;
        `;
        
        button.addEventListener('click', async function() {
            await navigator.clipboard.writeText(block.textContent);
            button.textContent = 'Copied!';
            button.style.background = 'rgba(34, 197, 94, 0.2)';
            button.style.borderColor = 'rgba(34, 197, 94, 0.3)';
            button.style.color = '#86efac';
            
            setTimeout(() => {
                button.textContent = 'Copy';
                button.style.background = 'rgba(127, 63, 245, 0.2)';
                button.style.borderColor = 'rgba(127, 63, 245, 0.3)';
                button.style.color = '#a78bfa';
            }, 2000);
        });
        
        pre.style.position = 'relative';
        pre.appendChild(button);
    });
});