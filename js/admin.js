document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
});

function loadUsers() {
    let usersList = document.getElementById('usersList');
    usersList.innerHTML = ''; // Clear the list first
    Object.keys(localStorage).forEach(function(key){
        let user = JSON.parse(localStorage.getItem(key));
        let row = usersList.insertRow(-1); // Insert a row at the end of the table
        row.insertCell(0).innerText = usersList.rows.length; // Insert serial number
        row.insertCell(1).innerText = user.name; // Insert user name
        row.insertCell(2).innerText = user.email; // Insert user email
        row.insertCell(3).innerText = user.password; // Insert user password
        let deleteCell = row.insertCell(4);
        let deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            if(confirm('Are you sure you want to delete this user?')) {
                localStorage.removeItem(user.email);
                loadUsers(); // Refresh the list
            }
        };
        deleteCell.appendChild(deleteButton);
    });
}
// Function to handle blog form submission
document.getElementById('blogForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let editingIndex = document.getElementById('editingIndex').value;
    let title = document.getElementById('blogTitle').value;
    let content = document.getElementById('blogContent').value;
    let blogImage = document.getElementById('blogImage').files[0];
    let blogPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    let currentDate = new Date().toISOString();

    function savePost(imageUrl) {
        let blogPost = { title, content, image: imageUrl, date: currentDate };
        if (editingIndex !== '') {
            // Update existing blog post
            blogPosts[editingIndex] = blogPost;
        } else {
            // Add new blog post
            blogPosts.push(blogPost);
        }
        localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
        clearBlogForm();
        loadBlogs();
    }

    if (blogImage) {
        let reader = new FileReader();
        reader.onload = function(e) {
            savePost(e.target.result); // Save post with image as Base64
        };
        reader.readAsDataURL(blogImage);
    } else if (editingIndex !== '') {
        // When editing, if no new image is provided, use the old one
        savePost(blogPosts[editingIndex].image);
    } else {
        savePost(''); // Save post without an image
    }
});

function clearBlogForm() {
    document.getElementById('blogTitle').value = '';
    document.getElementById('blogContent').value = '';
    document.getElementById('blogImage').value = '';
    document.getElementById('editingIndex').value = '';
}

function loadBlogs() {
    let blogsContainer = document.getElementById('blogsContainer');
    blogsContainer.innerHTML = '';
    let blogPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');

    let blogsHTML = '<div class="row">'; // Start the row outside the loop

    blogPosts.forEach(function(post, index) {
        blogsHTML += `
            <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div class="card h-100">
                    <img src="${post.image || 'placeholder-image.jpg'}" class="card-img-top" alt="Blog image">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.content}</p>
                        <small class="text-muted">Posted on: ${new Date(post.date).toLocaleDateString()}</small>
                    </div>
                    <div class="card-footer">
                        <button onclick="editBlog(${index})" class="btn btn-info">Edit</button>
                        <button onclick="deleteBlog(${index})" class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        `;

        if ((index + 1) % 3 === 0 && index + 1 !== blogPosts.length) {
            blogsHTML += '</div><div class="row">';
        }
    });

    blogsHTML += '</div>';
    blogsContainer.innerHTML = blogsHTML;
}

function editBlog(index) {
    let blogPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    let post = blogPosts[index];
    document.getElementById('blogTitle').value = post.title;
    document.getElementById('blogContent').value = post.content;
    document.getElementById('editingIndex').value = index;
    // If there's an image, show a preview or some placeholder
    // ... (You may add an image preview functionality here if needed)
}

function deleteBlog(index) {
    let blogPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    if (confirm('Are you sure you want to delete this blog post?')) {
        blogPosts.splice(index, 1);
        localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
        loadBlogs();
    }
}

// Call these functions on page load to display existing data
document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
    loadBlogs();
});
