const express = require('express')
const fs = require('fs')
const path = require('path')


const app = express()

app.use(express.json());
app.get('/:fileName', (req, res) => {
  const tempDir = 'temp';
  const fileName = req.params.fileName;
  const filePath = path.join(tempDir, fileName);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err}`);
      res.status(500).send('Error reading file');
      return;
    }

    res.status(200).send(data);
  });
});
app.post('/', (req, res) => {
  const tempDir = 'temp';
  console.log(req.body)
  const { fileName, fileContent} = req.body;
  const filePath = path.join(tempDir, fileName);

  fs.mkdir(tempDir, { recursive: true }, (err) => {
    if (err) {
      console.error(`Error creating directory: ${err}`);
      res.status(500).send('Error creating directory');
      return;
    }

    fs.writeFile(filePath, fileContent, (err) => {
      if (err) {
        console.error(`Error writing file: ${err}`);
        res.status(500).send('Error writing file');
        return;
      }
      
      res.status(200).send('File created successfully');
    });
  });
});

app.listen(3000)