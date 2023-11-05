document.addEventListener('DOMContentLoaded', function(){
    var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if(currentUser){
        document.getElementById('userName').textContent = currentUser.name;
        document.getElementById('userEmail').textContent = currentUser.email;
    } else {
        window.location.href = 'login.html'; // Redirect to login if no session found
    }
});
