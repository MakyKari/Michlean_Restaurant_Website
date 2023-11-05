document.getElementById('loginForm').addEventListener('submit', function(event){
    event.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var user = JSON.parse(localStorage.getItem(email));
    if(user && user.password === password){
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'index.html';
    } else {
        alert('Invalid Credentials');
    }
});
