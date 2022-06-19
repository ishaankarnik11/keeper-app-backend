const router = require("express").Router();
const Note = require("../models/note.model");

router.route("/").get((req,res)=>{

    Note.find()
    .then(notes=>res.json(notes))
    .catch(err=>res.status(400).json({"status": "fail"}))

    // res.json({"msg": "hello world"});
});

router.route("/addNote").post((req,res)=>{
    const noteHead = req.body.noteHead;
    const noteBody = req.body.noteBody;

    const newNote = new Note({"noteHead": noteHead, "noteBody": noteBody});
    newNote.save()
    .then(()=>res.json({"status": "note added"}))
    .catch(err=>res.status(400).json({"status": "fail"}))
});

router.route("/:id").delete((req,res)=>{
    const id = req.params.id;
    Note.findByIdAndDelete({"_id": id})
    .then(()=>res.json({"status": "note deleted"}))
    .catch(err=>res.status(400).json({"status": "fail"}));

});

module.exports = router;
