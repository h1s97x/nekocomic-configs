# nekocomic-configs

Configuration file repository for NekoComic - A modern comic reader.

## Create a new comic source

1. Download `_template_.js`, put it in the same directory as your other sources
2. Rename `_template_.js` to `your_source_name.js`
3. Edit `your_source_name.js` to implement your comic source
4. Add your source to `sources.json`
5. Test your source with NekoComic app

## Source Structure

```
nekocomic-configs/
├── sources.json           # Source index configuration
├── _template_.js         # Template for creating new sources
├── sources/
│   ├── example.js         # Example comic source
│   └── ...
└── README.md
```

## Source Configuration Format (sources.json)

```json
{
  "sources": [
    {
      "name": "Source Name",
      "fileName": "source_name.js",
      "key": "source_name",
      "version": "1.0.0",
      "description": "Optional description"
    }
  ]
}
```

## JavaScript API

The comic source uses JavaScript with the following API:

### Network API
- `fetch(url, options)` - HTTP request
- `get(url, headers)` - GET request
- `post(url, data, headers)` - POST request

### HTML API
- `Html.parse(html)` - Parse HTML string
- `Html.query(html, selector)` - Query selector
- `Html.queryAll(html, selector)` - Query all elements

### Convert API
- `Convert.md5(text)` - MD5 hash
- `Convert.sha256(text)` - SHA256 hash
- `Convert.aesEncrypt(text, key)` - AES encryption
- `Convert.aesDecrypt(text, key)` - AES decryption
- `Convert.base64Encode(text)` - Base64 encode
- `Convert.base64Decode(text)` - Base64 decode

### Required Functions

Your source must implement these functions:

```javascript
// Get source metadata
function getMeta() {}

// Explore page content
async function explore() {}

// Search comics
async function search(keyword, page) {}

// Get comic details
async function getComic(id) {}

// Get chapter images
async function getImages(id, epId) {}
```

See `_template_.js` for detailed documentation.

## License

See individual source files for their respective licenses.
