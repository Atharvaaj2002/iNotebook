const mongoose=require('mongoose');
const express = require('express')
const app = express()
const port = 5000
var cors = require('cors')

 
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb://localhost:27017/inotebook", 
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB', err));
app.use(express.json())
//Available routes
app.use('/api/auth', require('./routes/auth'))
//app.use('/api/notes', require('./routes/notes'))

app.use('/api/notes', require('./routes/notes'))
app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`iNotebook app listening at http://localhost:${port}`)
})
