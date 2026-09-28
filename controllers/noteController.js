const mongoose = require ('mongoose')
const Note = require('../model/noteSchema')
const isValid=(id) => mongoose.Types.ObjectId.isValid(id)

//home
exports.home= (req,res)=>{
    res.render('home', {title: "Home"})
}

//add note page
exports.addNotePage= (req, res)=>{
    res.render('noteApp/addNote')
}

//create note
exports.createNote= async(req, res)=>{
    await Note.create(req.body)
    res.redirect('/')
}

//all notes
exports.allNotes= async (req, res)=>{
    const payload= await Note.find().lean()
    res.render('noteApp/allNotes', {payload})
}

//single note
exports.singleNote= async (req, res)=>{

    //validate mongo objectid first
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.redirect('/api/allNotes')
    }
    const payload= await Note.findById(req.params.id).lean()
    res.render('noteApp/singleNotes',{payload})
}

//edit notes
 
exports.editPage= async(req, res)=>{
    if(!isValid(req.params.id)){
        return res.redirect('/api/allNotes')
    }
    const payload= await Note.findById(req.params.id).lean()
    res.render('noteApp/editNotes',{payload})
}

//update note
exports.updateNote= async(req, res)=>{
    if(!isValid(req.params.id)){
        return res.redirect('/api/allNotes')
    }
    await Note.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/api/allNotes')
}

//delete
exports.deleteNote= async(req,res)=>{
    await Note.findByIdAndDelete(req.params.id)
    res.redirect('/api/allNotes')
}
