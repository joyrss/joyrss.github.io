const hashtag = 'thepapwedding'; // Replace with your desired hashtag
        const endpoint = `https://www.instagram.com/explore/tags/${hashtag}/?__a=1`;

        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                const posts = data.graphql.hashtag.edge_hashtag_to_media.edges;

                // Iterate through posts and display them
                posts.forEach(post => {
                    const imageUrl = post.node.display_url;
                    const caption = post.node.edge_media_to_caption.edges[0]?.node.text;

                    // Display the image and caption as you like
                    const imageElement = document.createElement('img');
                    imageElement.src = imageUrl;

                    const captionElement = document.createElement('p');
                    captionElement.textContent = caption;

                    document.body.appendChild(imageElement);
                    document.body.appendChild(captionElement);
                });
            })
            .catch(error => console.error('Error fetching Instagram data:', error));