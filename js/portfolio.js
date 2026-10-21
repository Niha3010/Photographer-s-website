const gallery = document.getElementById("gallery");
const filterButtons = document.querySelectorAll(".filter-button");

let activeCategory = "All";

// Step 1: gallery
function renderGallery() {
  gallery.innerHTML = "";

  for (let i = 0; i < photos.length; i++) {
    let photo = photos[i];

    if (activeCategory === "All" || photo.category === activeCategory) {
      // Normal photos link to the details page
      let open = `<a href="details.html?id=${photo.id}" class="photo-item">`;
      let close = "</a>";
      let newBadge = "";

      // Photos added in this session have no details page yet
      if (photo.isNew) {
        open = `<div class="photo-item">`;
        close = "</div>";
        newBadge = `<span class="photo-new">New</span>`;
      }

      gallery.innerHTML += `
        ${open}
          <img src="${photo.image}" alt="${photo.title}">
          <div class="photo-caption">
            <span class="photo-category">${photo.category}</span>
            <h5 class="photo-title">${photo.title}</h5>
          </div>
          ${newBadge}
        ${close}
      `;
    }
  }
}

// Step 2: filter buttons
function setActiveButton() {
  for (let i = 0; i < filterButtons.length; i++) {
    if (filterButtons[i].dataset.category === activeCategory) {
      filterButtons[i].classList.add("active");
    } else {
      filterButtons[i].classList.remove("active");
    }
  }
}

for (let i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function () {
    activeCategory = filterButtons[i].dataset.category;
    setActiveButton();
    renderGallery();
  });
}

renderGallery();

// Step 3: add a picture
const addForm = document.getElementById("addPhotoForm");
const fileInput = document.getElementById("photoFile");
const titleInput = document.getElementById("photoTitle");
const categoryInput = document.getElementById("photoCategory");
const descriptionInput = document.getElementById("photoDescription");
const locationInput = document.getElementById("photoLocation");
const addMessage = document.getElementById("addMessage");

// Show or hide the red error state of one field
function markField(input, isValid) {
  if (isValid) {
    input.classList.remove("is-invalid");
  } else {
    input.classList.add("is-invalid");
  }
}

addForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // A file must be chosen and it must be an image
  let fileOk = false;
  if (
    fileInput.files.length > 0 &&
    fileInput.files[0].type.indexOf("image") === 0
  ) {
    fileOk = true;
  }
  const titleOk = titleInput.value.trim() !== "";
  const categoryOk = categoryInput.value !== "";

  markField(fileInput, fileOk);
  markField(titleInput, titleOk);
  markField(categoryInput, categoryOk);

  if (fileOk === false || titleOk === false || categoryOk === false) {
    return;
  }

  // Find the highest id so the new photo gets a free one
  let highestId = 0;
  for (let i = 0; i < photos.length; i++) {
    if (photos[i].id > highestId) {
      highestId = photos[i].id;
    }
  }

  let description = descriptionInput.value.trim();
  if (description === "") {
    description = "No description yet.";
  }

  photos.push({
    id: highestId + 1,
    title: titleInput.value.trim(),
    category: categoryInput.value,
    image: URL.createObjectURL(fileInput.files[0]),
    description: description,
    location: locationInput.value.trim(),
    date: "",
    isNew: true,
  });

  // Show all photos so the new one is visible at the end
  activeCategory = "All";
  setActiveButton();
  renderGallery();

  addForm.reset();
  bootstrap.Modal.getInstance(document.getElementById("addPhotoModal")).hide();
  addMessage.classList.remove("d-none");
});
