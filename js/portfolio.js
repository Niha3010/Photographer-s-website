const gallery = document.getElementById("gallery");
const filterButtons = document.querySelectorAll(".filter-button");

function showPhotos(category) {
  gallery.innerHTML = "";

  for (let i = 0; i < photos.length; i++) {
    let photo = photos[i];

    if (category === "All" || photo.category === category) {
      gallery.innerHTML += `
        <a href="details.html?id=${photo.id}" class="photo-item">
          <img src="${photo.image}" alt="${photo.title}">
          <div class="photo-caption">
            <span class="photo-category">${photo.category}</span>
            <h5 class="photo-title">${photo.title}</h5>
          </div>
        </a>
      `;
    }
  }
}

for (let i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function () {
    for (let j = 0; j < filterButtons.length; j++) {
      filterButtons[j].classList.remove("active");
    }

    this.classList.add("active");
    showPhotos(this.dataset.category);
  });
}

showPhotos("All");
