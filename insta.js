// Replace 'YOUR_ACCESS_TOKEN' with your actual Instagram Graph API Access Token
const accessToken = 'IGQWRNNURIRUh6a1RQZAVk4NU5LcUtsc3FKOGlUUF9rMjU4S3V0ZAFo2QlZAQT1ZAMWERlZAkpHVWo0Um93UjhldW9FLUVnVFpsZAk1PU0tFN2xNd2dpVlJuRC1ybGx1djRDQjJHSzBWWkVwTG0yUmEwTE5wUGUzR2U1dmcZD';
// Replace 'YOUR_HASHTAG' with the hashtag you want to display
const hashtag = 'thepapwedding';

// Instagram Graph API endpoint for hashtag search
const apiEndpoint = `https://graph.instagram.com/v13.0/ig_hashtag_search?q=${hashtag}&access_token=${accessToken}`;

// Function to get recent posts for a hashtag
function getHashtagPosts(hashtagId) {
    const postsEndpoint = `https://graph.instagram.com/v13.0/${hashtagId}/recent_media?access_token=${accessToken}`;
    $.get(postsEndpoint, (data) => {
        displayPosts(data.data);
    });
}

// Function to display Instagram posts
function displayPosts(posts) {
    const galleryContainer = $('#instagram-gallery');
    
    // Loop through each post and display its image
    posts.forEach(post => {
        const imageUrl = post.media_url;
        const imageElement = `<img src="${imageUrl}" alt="Instagram Post" style="width: 200px; height: 200px; margin: 5px;">`;
        galleryContainer.append(imageElement);
    });
}

// Function to initialize the Instagram hashtag gallery
function initInstagramGallery() {
    // Get the hashtag ID
    $.get(apiEndpoint, (data) => {
        if (data.data.length > 0) {
            const hashtagId = data.data[0].id;
            getHashtagPosts(hashtagId);
        } else {
            console.error('Hashtag not found.');
        }
    });
}

// Call the function to initialize the Instagram gallery
initInstagramGallery();
