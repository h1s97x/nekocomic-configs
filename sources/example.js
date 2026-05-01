// Example Comic Source for NekoComic
// This is a template for creating new comic sources

// ============== Metadata ==============

function getMeta() {
  return {
    name: "Example Comic",
    version: "1.0.0",
    author: "NekoComic",
    description: "Example comic source for development reference"
  };
}

// ============== Explore Page ==============

async function explore() {
  // Return explore page content with sections
  // Each section has a title and list of comics
  
  // Example implementation:
  const homeUrl = "https://api.example.com/home";
  
  try {
    const response = await fetch(homeUrl);
    const data = JSON.parse(response);
    
    const sections = [
      {
        title: "Popular",
        comics: data.popular.map(item => ({
          id: item.id,
          title: item.name,
          subTitle: item.author,
          cover: item.cover,
          tags: item.tags || []
        }))
      },
      {
        title: "Latest",
        comics: data.latest.map(item => ({
          id: item.id,
          title: item.name,
          subTitle: item.author,
          cover: item.cover,
          tags: item.tags || []
        }))
      }
    ];
    
    return { sections };
  } catch (e) {
    return { error: e.message };
  }
}

// ============== Categories ==============

async function getCategories() {
  // Return available categories
  
  return [
    { id: "action", name: "Action" },
    { id: "comedy", name: "Comedy" },
    { id: "romance", name: "Romance" },
    { id: "fantasy", name: "Fantasy" },
    { id: "horror", name: "Horror" },
    { id: "sci-fi", name: "Sci-Fi" }
  ];
}

async function getCategoryComics(categoryId, page) {
  // Return comics in a category
  
  const url = `https://api.example.com/category/${categoryId}?page=${page}`;
  
  try {
    const response = await fetch(url);
    const data = JSON.parse(response);
    
    return {
      comics: data.comics.map(item => ({
        id: item.id,
        title: item.name,
        subTitle: item.author,
        cover: item.cover,
        tags: item.tags || []
      })),
      hasMore: data.hasMore
    };
  } catch (e) {
    return { error: e.message };
  }
}

// ============== Search ==============

async function search(keyword, page) {
  // Search for comics by keyword
  
  const url = `https://api.example.com/search?q=${encodeURIComponent(keyword)}&page=${page}`;
  
  try {
    const response = await fetch(url);
    const data = JSON.parse(response);
    
    return {
      comics: data.results.map(item => ({
        id: item.id,
        title: item.name,
        subTitle: item.author,
        cover: item.cover,
        tags: item.tags || []
      })),
      hasMore: data.hasMore
    };
  } catch (e) {
    return { error: e.message };
  }
}

// ============== Comic Details ==============

async function getComic(id) {
  // Get detailed information about a comic
  
  const url = `https://api.example.com/comic/${id}`;
  
  try {
    const response = await fetch(url);
    const data = JSON.parse(response);
    
    return {
      id: data.id,
      title: data.name,
      subTitle: data.author,
      cover: data.cover,
      tags: data.tags || [],
      description: data.description || "",
      chapters: data.chapters.map(ch => ({
        id: ch.id,
        title: ch.name,
        date: ch.updateTime
      })),
      comments: data.comments || []
    };
  } catch (e) {
    return { error: e.message };
  }
}

// ============== Chapter Images ==============

async function getImages(id, epId) {
  // Get images for a chapter
  
  const url = `https://api.example.com/comic/${id}/chapter/${epId}`;
  
  try {
    const response = await fetch(url);
    const data = JSON.parse(response);
    
    return {
      images: data.images.map((img, index) => ({
        url: img.url,
        width: img.width,
        height: img.height
      }))
    };
  } catch (e) {
    return { error: e.message };
  }
}

// ============== Login (Optional) ==============

function getLoginUrl() {
  // Return the URL for login page (if required)
  return null; // or return "https://example.com/login";
}

async function getLoginInfo() {
  // Get current login information
  // Return cookies or token
  return null;
}

// ============== Comments (Optional) ==============

async function getComments(id, epId, page) {
  // Get comments for a comic or chapter
  
  const url = epId 
    ? `https://api.example.com/comic/${id}/chapter/${epId}/comments?page=${page}`
    : `https://api.example.com/comic/${id}/comments?page=${page}`;
  
  try {
    const response = await fetch(url);
    const data = JSON.parse(response);
    
    return {
      comments: data.comments.map(c => ({
        id: c.id,
        user: c.username,
        avatar: c.avatar,
        content: c.content,
        date: c.time,
        likes: c.likes
      })),
      hasMore: data.hasMore
    };
  } catch (e) {
    return { error: e.message };
  }
}

// ============== User Info (Optional) ==============

async function getUserInfo() {
  // Get current user information
  return null;
}
