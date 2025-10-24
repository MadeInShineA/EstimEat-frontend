import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'dist' directory
app.use(express.static(path.join(process.cwd(), 'dist')));

// Catch-all route to handle other routes, serving the index.html
// Use a regex to handle all routes (except API or other custom routes)
app.get(/^\/(?!api).*$/, (req, res) => {
  res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
