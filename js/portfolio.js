const gallery = document.getElementById("gallery");

for (let i = 0; i < photos.length; i++) {
  let photo = photos[i];
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
