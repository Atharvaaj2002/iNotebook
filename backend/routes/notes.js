const express = require('express');
const router = express.Router();
const Fetchuser=require('../middleware/Fetchuser');
const Note =require("../models/Note");
const { body, validationResult } = require('express-validator');

// ROUTE-1 get all the Notes using:GET "/api/notes/getuser". login required
router.get('/fetchallnotes',Fetchuser,async (req,res)=>{
  try {
    const notes = await Note.find({user: req.user.id });
    res.json(notes)
    
  } catch (error) {
   
        // Log and handle any unexpected errors
        console.error(error.message);
        res.status(500).send("Internal Server error occurred");
      }
  
   
})
// ROUTE-2 Add a new note using:GET "/api/notes/addnote". login required

router.post('/addnotes',Fetchuser, [
   
    //body('title', 'Enter a valid title').isLength({ min: 3 }),
   // body('description', 'description must have a minimum of 5 characters').isLength({ min: 5 }),
  ], async (req, res) => { 
    try {
        console.log(req.body)
    const {title,description,tag,} = req.body;
    // Check for validation errors in the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
     const note= new Note({
        title, description, tag, user: req.user.id
     })
    const savedNote = await note.save()
  console.log(savedNote)

    res.json(savedNote)
} catch (error) {
  
        // Log and handle any unexpected errors
        console.error(error.message);
        res.status(500).send("Internal Server error occurred");
      }  

  })
// ROUTE-3 update existing note note using:GET "/api/notes/updatenote". login required
router.put('/updatenote/:id',Fetchuser, async (req, res) => {
const {title, description ,tag}=req.body;
try{
//create a newNote object
const newNote = {};
if(title){newNote.title= title};
if(description){newNote.description=description};
if(tag){newNote.tag = tag};

//find the note to be updated and update it
let note= await Note.findById(req.params.id);
  if(!note){return res.status(404).send("not found")}
 console.log(note)

  if(note.user.toString() !==req.user.id){
    return res.status(401).send("Not Allowed");
  }
   console.log(note.user.toString() ,req.user.id)
  note = await Note.findByIdAndUpdate(req.params.id,  newNote, {new:true})
  res.json({note});
}catch (error) {
   
  // Log and handle any unexpected errors
  console.error(error.message);
  res.status(500).send("Internal Server error occurred");
}


})
// ROUTE-4 Delete existing note  using:DELETE "/api/notes/deletenotes". login required
router.delete('/deletenote/:id',Fetchuser, async (req, res) => {
try{
  //find the note to be delete and delete it
  let note= await Note.findById(req.params.id);
    if(!note){return res.status(404).send("not found")}
  // allow deletion only if user owns this note
    if(note.user.toString() !==req.user.id){
      return res.status(401).send("Not Allowed");
    }
  
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted", note:note});
  }catch (error) {
   
    // Log and handle any unexpected errors
    console.error(error.message);
    res.status(500).send("Internal Server error occurred");
  }
  
  })
  
module.exports = router