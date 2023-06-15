const express = require('express');
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const app = express();
const prisma = new PrismaClient();

// Configure multer for handling file uploads

 const storage = multer.diskStorage({
  destination: './upload/image',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
  })

const upload = multer({ storage: storage });


// Route for uploading an image
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { filename, path } = req.file;

    // Save the image details to the database
    const data = await prisma.data.create({
      data: {
        filename,
        Path: path,
        createdon: new Date()
      },
    });

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error uploading image' });
  }
});

// Route for retrieving all images
app.get('/data', async (req, res) => {
  try {
    const data = await prisma.data.findMany();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving images' });
  }
});

// Route for retrieving a single image by ID
app.get('/data/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await prisma.data.findUnique({ where: { id: parseInt(id) } });

    if (!data) {
      res.status(404).json({ error: 'Image not found' });
    } else {
      res.json(data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving image' });
  }
});


// Route for deleting an image by ID
app.delete('/data/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.data.delete({ where: { id: parseInt(id) } });

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting image' });
  }
});

startServer();

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
