import http from 'node:http';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const port = Number(process.env.PORT ?? 3000);
const distDir = path.resolve(process.cwd(), 'dist');

const contentTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.map', 'application/json; charset=utf-8'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.svg', 'image/svg+xml; charset=utf-8'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.webp', 'image/webp'],
  ['.woff2', 'font/woff2'],
  ['.woff', 'font/woff'],
  ['.ttf', 'font/ttf'],
]);

function toSafeRelativePath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath.split('?')[0] ?? '/');
  const normalizedPath = decodedPath.replaceAll('\\', '/');
  const withoutLeadingSlash = normalizedPath.startsWith('/') ? normalizedPath.slice(1) : normalizedPath;
  const safePath = path.posix.normalize(withoutLeadingSlash);

  if (safePath.startsWith('..')) return null;
  return safePath;
}

async function fileExists(filePath) {
  try {
    const stat = await fs.stat(filePath);
    return stat.isFile();
  } catch {
    return false;
  }
}

async function resolveFilePath(urlPath) {
  const safeRelPath = toSafeRelativePath(urlPath);
  if (safeRelPath === null) return null;

  const absolute = path.resolve(distDir, safeRelPath);
  if (!absolute.startsWith(distDir + path.sep) && absolute !== distDir) return null;

  if (await fileExists(absolute)) return absolute;

  if (urlPath.endsWith('/')) {
    const indexPath = path.join(absolute, 'index.html');
    if (await fileExists(indexPath)) return indexPath;
  } else {
    const indexPath = path.join(absolute, 'index.html');
    if (await fileExists(indexPath)) return indexPath;
  }

  const notFoundPath = path.join(distDir, '404.html');
  if (await fileExists(notFoundPath)) return notFoundPath;

  return null;
}

const server = http.createServer(async (req, res) => {
  const method = req.method ?? 'GET';
  if (method !== 'GET' && method !== 'HEAD') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Method Not Allowed');
    return;
  }

  const urlPath = req.url ?? '/';
  const filePath = await resolveFilePath(urlPath);

  if (!filePath) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = contentTypes.get(ext) ?? 'application/octet-stream';
  const is404 = path.basename(filePath) === '404.html';

  res.statusCode = is404 ? 404 : 200;
  res.setHeader('Content-Type', contentType);

  if (method === 'HEAD') {
    res.end();
    return;
  }

  const data = await fs.readFile(filePath);
  res.end(data);
});

server.listen(port, () => {
  console.log(`Serving ${distDir} on http://localhost:${port}`);
});
