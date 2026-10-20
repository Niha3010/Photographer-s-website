const reviewsContainer = document.getElementById("reviewsContainer");
const averageText = document.getElementById("averageText");
const clientsContainer = document.getElementById("clientsContainer");

let reviews = [
  {
    name: "Anna & Markus",
    role: "Wedding clients",
    rating: 5,
    text: "Niha and Damjan captured our wedding day perfectly. We still look at the photos every week and relive the moment.",
  },
  {
    name: "Julia Reiter",
    role: "Marketing Manager, Café Sonnenschein",
    rating: 5,
    text: "Professional, punctual and creative. Our new brand photos exceeded all expectations.",
  },
  {
    name: "Thomas Huber",
    role: "Birthday party client",
    rating: 4,
    text: "Great atmosphere during the shoot and beautiful pictures. The delivery took a few days longer than planned, but it was worth the wait.",
  },
  {
    name: "Sophie Lang",
    role: "Portrait session",
    rating: 5,
    text: "I am usually shy in front of a camera, but they made me feel comfortable. The portraits look natural and really like me.",
  },
  {
    name: "Mehmet Yilmaz",
    role: "Event Organizer, Wiener Kulturverein",
    rating: 5,
    text: "We booked them for our annual gala. Fast, discreet, and the pictures captured every important moment.",
  },
];

let clients = [
  "Café Sonnenschein",
  "Wiener Kulturverein",
  "Alpine Weddings",
  "Hotel Donaublick",
  "Studio Lichtblick",
  "Salzburg Events",
];

// Stars Rating
function getStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += "★";
    } else {
      stars += "☆";
    }
  }
  return stars;
}

// Step 1: show the reviews and the average rating
function renderReviews() {
  reviewsContainer.innerHTML = "";
  let total = 0;

  for (let i = 0; i < reviews.length; i++) {
    let review = reviews[i];
    total += review.rating;

    // Role and comment are optional
    let role = "";
    if (review.role) {
      role = `<div class="review-role">${review.role}</div>`;
    }
    let text = "";
    if (review.text) {
      text = `<p class="review-text">&ldquo;${review.text}&rdquo;</p>`;
    }

    reviewsContainer.innerHTML += `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card review-card h-100 p-4">
          <div class="d-flex align-items-center mb-3">
            <div class="review-avatar">${review.name.charAt(0)}</div>
            <div class="ms-3">
              <h5 class="mb-0">${review.name}</h5>
              ${role}
            </div>
          </div>
          <div class="review-stars mb-2">${getStars(review.rating)}</div>
          ${text}
        </div>
      </div>
    `;
  }

  if (reviews.length > 0) {
    let average = Math.round((total / reviews.length) * 10) / 10;
    averageText.textContent =
      average + " / 5 from " + reviews.length + " reviews";
  }
}

// Step 2: show the clients
function renderClients() {
  clientsContainer.innerHTML = "";

  for (let i = 0; i < clients.length; i++) {
    clientsContainer.innerHTML += `
      <div class="col-6 col-md-4">
        <div class="client-box">${clients[i]}</div>
      </div>
    `;
  }
}

renderReviews();
renderClients();

// Step 3: star rating in the form
const starButtons = document.querySelectorAll(".star-btn");
const ratingText = document.getElementById("ratingText");
let selectedRating = 0;

function showStars() {
  for (let i = 0; i < starButtons.length; i++) {
    if (i < selectedRating) {
      starButtons[i].classList.add("filled");
    } else {
      starButtons[i].classList.remove("filled");
    }
  }
  ratingText.textContent = selectedRating + " / 5";
}

for (let i = 0; i < starButtons.length; i++) {
  starButtons[i].addEventListener("click", function () {
    selectedRating = i + 1;
    showStars();
  });
}

document.getElementById("resetStars").addEventListener("click", function () {
  selectedRating = 0;
  showStars();
});

// Step 4: submit the form
const reviewForm = document.getElementById("reviewForm");
const nameInput = document.getElementById("name");
const bookingInput = document.getElementById("bookingNumber");
const commentInput = document.getElementById("comment");
const successMessage = document.getElementById("successMessage");

reviewForm.addEventListener("submit", function (event) {
  event.preventDefault();
  successMessage.classList.add("d-none");

  const name = nameInput.value.trim();
  const booking = bookingInput.value.trim();
  let valid = true;

  if (name === "") {
    nameInput.classList.add("is-invalid");
    valid = false;
  } else {
    nameInput.classList.remove("is-invalid");
  }

  if (booking.length < 4) {
    bookingInput.classList.add("is-invalid");
    valid = false;
  } else {
    bookingInput.classList.remove("is-invalid");
  }

  if (valid === false) {
    return;
  }

  // Add the new review at the front of the list
  reviews.unshift({
    name: name,
    role: "",
    rating: selectedRating,
    text: commentInput.value.trim(),
  });

  renderReviews();
  reviewForm.reset();
  selectedRating = 0;
  showStars();
  successMessage.classList.remove("d-none");
});
