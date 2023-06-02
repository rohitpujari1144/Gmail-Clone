const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const mongodb = require('mongodb')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const dbUrl = 'mongodb+srv://rohit10231:rohitkaranpujari@cluster0.kjynvxt.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(dbUrl)
const port = 6000

// getting all users information
app.get('/', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        let users = await db.collection('All Users').find().toArray()
        res.status(200).send(users)
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// creating new user
app.post('/signup', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        await db.collection('All Users').insertOne(req.body)
        res.status(201).send({ message: 'User Registartion Successful', data: req.body })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// updating user information
app.put('/updateUser/:username', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        let user = await db.collection('All Users').findOne({ username: req.params.username })
        if (user) {
            let user = await db.collection('All Users').updateOne({ username: req.params.username }, { $set: req.body })
            res.status(200).send({ message: 'User info updated successfully' })
        }
        else {
            res.status(400).send({ message: `User not found with email ${req.params.username}` })
        }
    }
    catch (error) {
        res.status(400).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// deleting user account
app.delete('/deleteUser/:email', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        if (req.params.email) {
            const db = await client.db('Gmail_Clone')
            let user = await db.collection('All Users').findOne({ email: req.params.email })
            if (user) {
                let user = await db.collection('All Users').deleteOne({ email: req.params.email })
                res.status(200).send({ message: 'User deleted successfully' })
            }
            else {
                res.status(400).send({ message: `User not found with email ${req.params.email}` })
            }
        }
        else {
            res.status(400).send({ message: 'email is mandatory' })
        }
    }
    catch (error) {
        res.status(400).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// get one user info
app.get('/getUser/:username', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        let user = await db.collection('All Users').findOne({username:req.params.username})
        res.status(200).send(user)
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})


app.listen(port, () => { console.log(`App listening on ${port}`) })