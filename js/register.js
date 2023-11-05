document.getElementById('registerForm').addEventListener('submit', function(event){
    event.preventDefault();
    var user = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };
    localStorage.setItem(user.email, JSON.stringify(user));
    alert('Registration Successful!');
    window.location.href = 'login.html';
});
