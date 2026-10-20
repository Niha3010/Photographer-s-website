const detailsContainer = document.getElementById("detailsContainer");

// Step 1: read the id from the address
const address = window.location.search;
let photoId = 1; // used when there is no id in the address

if (address !== "") {
  photoId = Number(address.replace("?id=", ""));
}

// Step 2: find the photo with this id
let photo = null;
for (let i = 0; i < photos.length; i++) {
  if (photos[i].id === photoId) {
    photo = photos[i];
  }
}

// Step 3: show it
if (photo) {
  detailsContainer.innerHTML = `
    <a href="portfolio.html" class="btn btn-outline-dark mb-4">&larr; Back to Portfolio</a>

    <div class="row g-4">
      <div class="col-lg-8">
        <img src="${photo.image}" class="details-img rounded shadow" alt="${photo.title}">
      </div>
      <div class="col-lg-4">
        <span class="badge bg-dark mb-2">${photo.category}</span>
        <h1 class="h2">${photo.title}</h1>
        <p class="lead">${photo.description}</p>
        <p class="mb-1"><strong>Location:</strong> ${photo.location}</p>
        <p><strong>Date:</strong> ${photo.date}</p>
      </div>
    </div>
  `;
} else {
  detailsContainer.innerHTML = `
    <div class="alert alert-warning">This photo could not be found.</div>
    <a href="portfolio.html" class="btn btn-outline-dark">&larr; Back to Portfolio</a>
  `;
}
