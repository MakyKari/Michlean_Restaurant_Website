function notDoneYet(){
    alert("Sorry this page currently developing :(")
}

var counterOfLikes = 0;

function doYouLikeIt(event){
    let result = confirm("Do you like it?");
    if(!result){
        event.preventDefault();
    }
    else if(counterOfLikes < 3){
        counterOfLikes++;
    }
}

function easterEgg(){
    let hiddenBlock = document.getElementById("hiddenBlock")
    if(counterOfLikes == 3){
        hiddenBlock.style.display == "none" ? hiddenBlock.style.display = "block" : hiddenBlock.style.display = "none"
    }
    else{
        alert("Sorry, you don't passed test, try again:)")
    }
}

function addNewMeals(){
    let meals = [];
    meals.push(First_meal.value)
    meals.push(Second_meal.value)
    meals.push(Third_meal.value)
    let result = "Congratulation! We will consider your changes as fast as possible, your meals are: \n";

    for (let i = 0; i < meals.length; i++) {
        if(meals[i] == ""){
            alert("Empty line")
            return;
        }
        result += (i+1) + ": " + meals[i] + "\n";
    }

    alert(result);
}

showSlides();

function showSlides() {
  const containers = document.querySelectorAll('.slideshow-container');
  
  for (let i = 0; i < containers.length; i++) {
    const slides = containers[i].getElementsByClassName("mySlides");
    const active_slide = containers[i].querySelector('.active');
    let slideIndex = [...active_slide.parentNode.children].indexOf(active_slide) + 1;

    active_slide.classList.remove('active');
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1
    }
    slides[slideIndex - 1].classList.add('active');
  }
  setTimeout(showSlides, 4000);
}

function plusSlides(n){
    const containers = document.querySelectorAll('.slideshow-container');
    for (let i = 0; i < containers.length; i++) {
        const slides = containers[i].getElementsByClassName("mySlides");
        const active_slide = containers[i].querySelector('.active');
        let slideIndex = [...active_slide.parentNode.children].indexOf(active_slide) + 1;
    
        active_slide.classList.remove('active');
        slideIndex+=n;
        if (slideIndex > slides.length) {
          slideIndex = 1
        } else if(slideIndex < 1){
            slideIndex = slides.length
        }
        slides[slideIndex - 1].classList.add('active');
    }
}

const likeButtons = document.querySelectorAll(".likeBtn");
const dislikeButtons = document.querySelectorAll(".dislikeBtn");
const likeCountDisplays = document.querySelectorAll(".likeCount");
const dislikeCountDisplays = document.querySelectorAll(".dislikeCount");

likeButtons.forEach((button, index) => {
    button.addEventListener("click", function() {
        likeCountDisplays[index].textContent = parseInt(likeCountDisplays[index].textContent) + 1;
    });
});

dislikeButtons.forEach((button, index) => {
    button.addEventListener("click", function() {
        dislikeCountDisplays[index].textContent = parseInt(dislikeCountDisplays[index].textContent) + 1;
    });
});

function validateRecieverName(){
    var recieverName = document.getElementById('recieverName').value

    if(recieverName === ''){
        document.getElementById('nameEmptyError').style.display = 'block'
    } else {
        document.getElementById('nameEmptyError').style.display = 'none'
    }

    const nameRegex = /^[a-zA-Z]+$/;

    if(!nameRegex.test(recieverName)){
        document.getElementById('nameError').style.display = 'block'
    } else {
        document.getElementById('nameError').style.display = 'none'
    }
}

function validateRecieverEmail(){
    var recieverEmail = document.getElementById('recieverEmail').value

    if(recieverEmail === ''){
        document.getElementById('emailEmptyError').style.display = 'block'
    } else {
        document.getElementById('emailEmptyError').style.display = 'none'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(recieverEmail)){
        document.getElementById('emailError').style.display = 'block'
    } else {
        document.getElementById('emailError').style.display = 'none'
    }
}

function validateRecieverPhone(){
    var recieverPhone = document.getElementById('recieverPhone').value

    if(recieverPhone === ''){
        document.getElementById('phoneEmptyError').style.display = 'block'
    } else {
        document.getElementById('phoneEmptyError').style.display = 'none'
    }

    const phoneRegex = /^\d{10}$/;

    if(!phoneRegex.test(recieverPhone)){
        document.getElementById('phoneError').style.display = 'block'
    } else {
        document.getElementById('phoneError').style.display = 'none'
    }
}

function validateRecieverCash(){
    var recieverCash = document.getElementById('recieverCash').value

    if(recieverCash === ''){
        document.getElementById('cashEmptyError').style.display = 'block'
    } else {
        document.getElementById('cashEmptyError').style.display = 'none'
    }

    const cashRegex = /^[0-9]*$/

    if(!cashRegex.test(recieverCash)){
        document.getElementById('cashError').style.display = 'block'
    } else {
        document.getElementById('cashError').style.display = 'none'
    }
}


document.getElementById('recieverCash').addEventListener('input', validateRecieverCash)
document.getElementById('recieverPhone').addEventListener('input', validateRecieverPhone)
document.getElementById('recieverName').addEventListener('input', validateRecieverName)
document.getElementById('recieverEmail').addEventListener('input', validateRecieverEmail)



// Yernazar's part

// Add this code to the existing js/javaScript.js file

// Function to handle registration
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var user = {
        name: document.getElementById('registerName').value,
        email: document.getElementById('registerEmail').value,
        password: document.getElementById('registerPassword').value
    };
    localStorage.setItem(user.email, JSON.stringify(user));
    alert('Registration successful!');
    window.location.href = 'login.html';
});

// Function to handle login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;
    var user = JSON.parse(localStorage.getItem(email));

    if(user && user.password === password) {
        alert('Login successful!');
        // Redirect to home page or user dashboard
        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password');
    }
});

// Add this code to the existing js/javaScript.js file

// Function to display user profile information
function displayUserProfile() {
    var userEmail = sessionStorage.getItem('loggedInUserEmail');
    if (userEmail) {
        var user = JSON.parse(localStorage.getItem(userEmail));
        if (user) {
            document.getElementById('userName').textContent = user.name;
            document.getElementById('userEmail').textContent = user.email;
        } else {
            alert('No user data found. Please log in again.');
            window.location.href = 'login.html';
        }
    } else {
        alert('No user is currently logged in.');
        window.location.href = 'login.html';
    }
}

// Call displayUserProfile if we are on the user.html page
if (window.location.pathname.endsWith('user.html')) {
    displayUserProfile();
}
// Function to handle login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;
    var user = JSON.parse(localStorage.getItem(email));

    if(user && user.password === password) {
        alert('Login successful!');
        // Save the logged-in user email in sessionStorage
        sessionStorage.setItem('loggedInUserEmail', email);
        // Redirect to user account page
        window.location.href = 'user.html'; // Redirect to the user profile page
    } else {
        alert('Invalid email or password');
    }
});
