
const {Router}= require ('express')
const router= Router()
const controller= require('../controllers/noteController')

//?pages
router.get('/addNote',controller.addNotePage)
router.get('/allNotes', controller.allNotes)
router.get('/edit/:id', controller.editPage)

//?CRUD pages
router.post('/addNote', controller.createNote)
router.post('/edit/:id', controller.updateNote)
router.get ('/delete/:id', controller.deleteNote)

//?single note page
router.get('/:id', controller.singleNote)

module.exports= router