const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');
let ArePicturesLoaded = true;
let photosArray = [];

// Unsplash API
const picCount = 15;
const apiKey = 'Q-UHH-GOjsTIklxCS6UqnS7BJMhqE75Kuooj5TiQpoo'
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`;

//  Helper function to Set Atributes
setAttributes = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
};

// Create elements For links & photos, Add to DOM
displayPhotos = () => {
    photosArray.map((photo) => {
        let newImageElement = document.createElement('img');
        setAttributes(newImageElement, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
            target: '_blank',
        });

        imageContainer.appendChild(newImageElement);
        let photoLink = photo.links.self;

        // event listeners
        newImageElement.addEventListener('click', () => window.open(photo.links.html));
    });
    ArePicturesLoaded = true;
    loader.hidden = true;
}

// Get photos from Unsplash API
async function getPhotosfromAPI() {
    ArePicturesLoaded = false;
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log('can not retrieve data', JSON.stringify(error))
    }
}

// scrolling listener
window.addEventListener('scroll', () => {
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ArePicturesLoaded === true
        ? getPhotosfromAPI()
        : null
})

// on load
getPhotosfromAPI();