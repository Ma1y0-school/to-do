const express = require("express")
const mongoose = require("mongoose")
const Todo = require("./models/todoModel")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.DB_URI).then(() => console.log("Connected to MongoDB")).catch(console.error)


//Router
app.get("/todos", async (req, res) => {
    try {
        const todos = await Todo.find()

        res.json(todos)
    } catch (error) {
        console.error(error)
    }
})

app.post("/todo/new", async (req, res) => {
    try {
        const todo = new Todo({
            text: req.body.text
        })
    
        await todo.save()
    
        res.json(todo)
    } catch (error) {
        console.error(error)
    }
})

app.delete('/todo/delete/:id', async (req, res) => {
    try {
        const result = await Todo.findByIdAndDelete(req.params.id)

        res.json({result})
    } catch (error) {
        console.error(error)
    }	
})

app.get("/todo/complete/:id", async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)

        todo.complete = !todo.complete
    
        todo.save()
    
        res.json(todo)
    } catch (error) {
        console.error(error)
    }
})

app.put("/todo/update/:id", async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)

        todo.text = req.body.text
    
        todo.save()
    
        res.json(todo)
    } catch (error) {
        console.error(error)
    }
})

app.listen(process.env.PORT, () => console.log(`Server is Listenig on port ${process.env.PORT}`))