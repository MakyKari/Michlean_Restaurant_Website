document.addEventListener('DOMContentLoaded', function() {
    loadBlogPosts();
});

function loadBlogPosts() {
    let blogPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    displayBlogPosts(blogPosts);
}

function displayBlogPosts(blogPosts) {
    let blogPostsContainer = document.getElementById('blogPostsContainer');
    blogPostsContainer.innerHTML = '';
    let row = document.createElement('div');
    row.className = 'row';
    blogPosts.forEach(function(post, index) {
        let col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6 col-sm-12 mb-4';
        let card = document.createElement('div');
        card.className = 'card h-100';
        card.innerHTML = `
            <img src="${post.image}" class="card-img-top" alt="Blog image">
            <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${post.content}</p>
            </div>
            <div class="card-footer text-muted">
                Posted on ${new Date(post.date).toLocaleDateString()}
            </div>
        `;
        col.appendChild(card);
        row.appendChild(col);
    });
    blogPostsContainer.appendChild(row);
}

function searchBlogs() {
    let input = document.getElementById('searchInput');
    let filter = input.value.toUpperCase();
    let blogPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    let filteredPosts = blogPosts.filter(post => {
        return post.title.toUpperCase().includes(filter) || post.content.toUpperCase().includes(filter);
    });
    displayBlogPosts(filteredPosts);
}

function sortBlogs() {
    let sortValue = document.getElementById('sortSelect').value;
    let blogPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');

    blogPosts.sort(function(a, b) {
        let dateA = new Date(a.date), dateB = new Date(b.date);
        return (sortValue === 'newest') ? (dateB - dateA) : (dateA - dateB);
    });

    displayBlogPosts(blogPosts);
}
