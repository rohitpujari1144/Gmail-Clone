const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const mongodb = require('mongodb')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const dbUrl = 'mongodb+srv://rohit10231:rohitkaranpujari@cluster0.kjynvxt.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(dbUrl)
const port = 4000
const bcrypt = require('bcrypt')

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

// user login
app.get('/login/:email', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        let user = await db.collection('All Users').aggregate([{ $match: { username: req.params.email } }]).toArray()
        if (user.length !== 0 || user.length !== 0) {
            res.status(200).send({ message: "user found", data: user })
        }
        else {
            res.send({ message: "user not found" })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// get user info for forgot email flow
app.get('/user/:firstName/:lastName/:securityKey', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')

        // for forgot email flow
        let user = await db.collection('All Users').aggregate([{ $match: { firstName: req.params.firstName, lastName: req.params.lastName, securityKey: req.params.securityKey } }]).toArray()
        if (user.length !== 0) {
            res.status(200).send({ message: "user found", data: user })
        }
        else {
            res.send({ message: "user not found" })
        }
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
        // const salt = await bcrypt.genSalt(10)
        // const secPassword = await bcrypt.hash(req.body.password, salt)
        // req.body.password = secPassword
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

// updating user information for password reset
app.put('/updateUser/:email/:securityKey', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        let user = await db.collection('All Users').aggregate([{ $match: { username: req.params.email, securityKey: req.params.securityKey } }]).toArray()
        if (user.length !== 0) {
            await res.status(200).send({ message: 'user found' })
            let user = await db.collection('All Users').updateOne({ username: req.params.email }, { $set: req.body })
            await res.status(200).send({ message: 'password updated' })
        }
        else {
            res.send({ message: `user not found` })
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
        let user = await db.collection('All Users').findOne({ username: req.params.username })
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
