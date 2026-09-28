
const {Schema , model}= require ('mongoose')

let NoteSchema= new Schema(
    {
        noteId:{
            type:String,
            required:true
        },
        noteName:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true,
            enum:['active','inactive']
        },

    },{
        timestamps:true
    }
)
module.exports= model('noteSchema', NoteSchema, 'noteSchema')