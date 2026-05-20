/**
 * testImageUpload.js — run with: node testImageUpload.js
 * Uses ONLY built-in Node.js modules (http, fs, path, crypto).
 */
const http   = require('http');
const fs     = require('fs');
const path   = require('path');
const crypto = require('crypto');

const HOST = 'localhost';
const PORT = 5000;

// Tiny 1x1 red PNG
const PNG_B64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQ' +
  'DwADhQGAWjR9awAAAABJRU5ErkJggg==';

function request(method, urlPath, headers, body) {
  return new Promise((resolve, reject) => {
    const opts = { hostname: HOST, port: PORT, path: urlPath, method, headers };
    const req  = http.request(opts, res => {
      let data = '';
      res.on('data', c => (data += c));
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

function buildMultipart(fields, fileField, filePath, mimeType) {
  const boundary = '----Boundary' + crypto.randomBytes(8).toString('hex');
  const chunks   = [];
  const CRLF     = '\r\n';

  for (const [name, value] of Object.entries(fields)) {
    chunks.push(Buffer.from(
      '--' + boundary + CRLF +
      'Content-Disposition: form-data; name="' + name + '"' + CRLF + CRLF +
      value + CRLF
    ));
  }

  const fileData = fs.readFileSync(filePath);
  const fname    = path.basename(filePath);
  chunks.push(Buffer.from(
    '--' + boundary + CRLF +
    'Content-Disposition: form-data; name="' + fileField + '"; filename="' + fname + '"' + CRLF +
    'Content-Type: ' + mimeType + CRLF + CRLF
  ));
  chunks.push(fileData);
  chunks.push(Buffer.from(CRLF + '--' + boundary + '--' + CRLF));

  const body = Buffer.concat(chunks);
  return { boundary, body };
}

async function run() {
  console.log('\n[1] Logging in...');
  const loginPayload = JSON.stringify({ email: 'admin@cms.com', password: 'admin' });
  const loginRes = await request('POST', '/api/users/login',
    { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(loginPayload) },
    loginPayload
  );

  if (loginRes.status !== 200) {
    console.error('    Login FAILED:', loginRes.body);
    process.exit(1);
  }
  const token = loginRes.body.token;
  console.log('    OK | role:', loginRes.body.user.role);
  console.log('    Token:', token.slice(0, 30) + '...');

  const imgPath = path.join(__dirname, 'uploads', '_test-upload.png');
  fs.writeFileSync(imgPath, Buffer.from(PNG_B64, 'base64'));
  console.log('\n[2] Test image saved:', imgPath, '(' + fs.statSync(imgPath).size + ' bytes)');

  console.log('\n[3] POST /api/posts with image...');
  const { boundary, body } = buildMultipart(
    {
      title:       'Image Upload Test',
      description: 'Uploaded via testImageUpload.js',
      category:    'Technology',
      status:      'published'
    },
    'image', imgPath, 'image/png'
  );

  const uploadRes = await request('POST', '/api/posts', {
    'Authorization':  'Bearer ' + token,
    'Content-Type':   'multipart/form-data; boundary=' + boundary,
    'Content-Length': body.length,
  }, body);

  console.log('    HTTP Status:', uploadRes.status);
  if (uploadRes.status === 201) {
    const p = uploadRes.body.post;
    console.log('    Message:', uploadRes.body.message);
    console.log('    Post ID:', p._id);
    console.log('    Image  :', p.image);
    console.log('    URL    : http://localhost:5000/uploads/' + p.image);
  } else {
    console.error('    FAILED:', JSON.stringify(uploadRes.body));
    process.exit(1);
  }

  console.log('\n[4] GET /api/posts/all...');
  const allRes  = await request('GET', '/api/posts/all', {}, null);
  const posts   = allRes.body;
  const withImg = posts.filter(p => p.image);
  console.log('    Total posts      :', posts.length);
  console.log('    Posts with image :', withImg.length);
  if (withImg[0]) {
    console.log('    Latest: "' + withImg[0].title + '" | image: ' + withImg[0].image);
  }

  fs.unlinkSync(imgPath);
  console.log('\n[5] Temp file removed.');
  console.log('\nImage upload is working correctly!\n');
}

run().catch(err => { console.error('\nERROR:', err.message); process.exit(1); });
