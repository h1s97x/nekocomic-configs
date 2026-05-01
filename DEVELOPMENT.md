# NekoComic Sources Development Guide

This guide explains how to create comic sources for NekoComic.

## Overview

NekoComic uses JavaScript-based comic sources. Each source is a JavaScript file that implements a set of functions to interact with a comic website or API.

## File Structure

```
sources/
├── sources.json      # List of all sources
├── _template_.js    # Template source file
└── [source].js      # Individual source files
```

## Creating a New Source

### 1. Add to sources.json

First, add your source to `sources.json`:

```json
{
  "sources": [
    {
      "key": "my_source",
      "name": "My Comic Source",
      "language": "en",
      "enabled": true,
      "script": "my_source.js"
    }
  ]
}
```

### 2. Create the Source File

Create a new JavaScript file in the `sources/` directory.

## Required Functions

### getMeta()

Returns metadata about the source:

```javascript
function getMeta() {
  return {
    name: "Source Name",
    version: "1.0.0",
    author: "Author Name",
    description: "Source description"
  };
}
```

### explore()

Returns the explore/home page content:

```javascript
async function explore() {
  return {
    sections: [
      {
        title: "Section Title",
        comics: [
          {
            id: "comic_id",
            title: "Comic Title",
            subTitle: "Author/Subtitle",
            cover: "https://example.com/cover.jpg",
            tags: ["tag1", "tag2"]
          }
        ]
      }
    ]
  };
}
```

### getCategories()

Returns available categories:

```javascript
async function getCategories() {
  return [
    { id: "cat1", name: "Category 1" },
    { id: "cat2", name: "Category 2" }
  ];
}
```

### getCategoryComics(categoryId, page)

Returns comics in a category:

```javascript
async function getCategoryComics(categoryId, page) {
  return {
    comics: [...],
    hasMore: true  // or false if no more pages
  };
}
```

### search(keyword, page)

Searches for comics:

```javascript
async function search(keyword, page) {
  return {
    comics: [...],
    hasMore: true
  };
}
```

### getComic(id)

Returns detailed comic information:

```javascript
async function getComic(id) {
  return {
    id: "comic_id",
    title: "Comic Title",
    subTitle: "Author",
    cover: "https://example.com/cover.jpg",
    tags: ["tag1", "tag2"],
    description: "Comic description...",
    chapters: [
      {
        id: "chapter_id",
        title: "Chapter 1",
        date: "2024-01-01"
      }
    ],
    comments: [
      {
        id: "comment_id",
        user: "username",
        avatar: "https://...",
        content: "Comment text",
        date: "2024-01-01",
        likes: 10
      }
    ]
  };
}
```

### getImages(id, epId)

Returns chapter images:

```javascript
async function getImages(id, epId) {
  return {
    images: [
      {
        url: "https://example.com/page1.jpg",
        width: 1200,
        height: 1800
      }
    ]
  };
}
```

## Optional Functions

### getLoginUrl()

Returns the login URL if authentication is required:

```javascript
function getLoginUrl() {
  return "https://example.com/login";
}
```

### getLoginInfo()

Returns current login information:

```javascript
async function getLoginInfo() {
  return {
    cookies: "session=abc123",
    token: "Bearer xyz"
  };
}
```

### getComments(id, epId, page)

Returns comments for a comic or chapter:

```javascript
async function getComments(id, epId, page) {
  return {
    comments: [...],
    hasMore: true
  };
}
```

### getUserInfo()

Returns current user information:

```javascript
async function getUserInfo() {
  return {
    id: "user_id",
    name: "Username",
    avatar: "https://..."
  };
}
```

## Network API

Available in the JS runtime:

### fetch(url, options)

Make HTTP requests:

```javascript
const response = await fetch("https://api.example.com/data");
const text = await response.text();
const json = JSON.parse(text);
```

### Options

```javascript
await fetch(url, {
  headers: {
    "User-Agent": "NekoComic/1.0",
    "Authorization": "Bearer token"
  },
  cookies: "session=abc",
  method: "POST",
  body: JSON.stringify({ data: "value" })
});
```

## HTML API

For parsing HTML responses:

### Html.parse(html)

Parse HTML string:

```javascript
const doc = Html.parse(html);
```

### Query methods

```javascript
// Get element by selector
const element = doc.query(".classname");
const element = doc.query("#id");
const element = doc.query("div.class");

// Get elements
const elements = doc.queryAll("a");

// Get attribute
const href = element.attr("href");
const src = element.attr("src");

// Get text
const text = element.text();

// Get HTML
const html = element.html();

// Check existence
const exists = element.exists();
```

### DOM Navigation

```javascript
const firstChild = element.firstChild;
const children = element.children;
const parent = element.parent;
const next = element.nextSibling;
const prev = element.prevSibling;
```

## Convert API

For encryption/decryption:

```javascript
// MD5
const md5 = Convert.md5("string");

// SHA
const sha1 = Convert.sha1("string");
const sha256 = Convert.sha256("string");

// AES
const encrypted = Convert.aesEncrypt("text", "key", "iv");
const decrypted = Convert.aesDecrypt("encrypted", "key", "iv");

// Base64
const encoded = Convert.base64Encode("string");
const decoded = Convert.base64Decode("base64string");

// URL Encode
const encoded = Convert.urlEncode("string with spaces");
```

## Best Practices

1. **Error Handling**: Always wrap network requests in try-catch
2. **Pagination**: Implement `hasMore` correctly
3. **Image URLs**: Prefer direct image URLs when possible
4. **Tags**: Use standardized tag names for translation
5. **Date Format**: Use ISO 8601 format (YYYY-MM-DD)
6. **Performance**: Cache responses when appropriate

## Testing

Test your source by:

1. Adding it to `sources.json`
2. Enabling it in the app
3. Testing each function through the app UI

## Examples

See existing sources in the `sources/` directory:

- `wnacg.js` - Simple HTML scraping example
- `_template_.js` - Full template with all functions

## Troubleshooting

### Common Issues

1. **CORS Errors**: Use the built-in fetch which handles CORS
2. **Parse Errors**: Check HTML structure carefully
3. **Login Issues**: Ensure cookies are set correctly

### Debugging

```javascript
// Log to console (viewable in app logs)
console.log("Debug info:", variable);
```

## Submitting Sources

1. Fork this repository
2. Add your source following the guidelines
3. Test thoroughly
4. Submit a pull request

## License

Sources are subject to their respective websites' terms of service.
