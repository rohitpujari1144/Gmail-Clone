const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const mongodb = require('mongodb')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const dbUrl = 'mongodb+srv://rohit10231:rohitkaranpujari@cluster0.kjynvxt.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(dbUrl)
const port = 6500

// getting all emails from all emails collection
app.get('/', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        let allEmails = await db.collection('All Emails').find().toArray()
        res.status(200).send(allEmails)
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// getting all emails of a user
app.get('/getEmails/:email', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        let usersEmails = await db.collection('All Emails').aggregate([{ $match: { emailTo: req.params.email } }]).toArray()
        if (usersEmails.length !== 0) {
            res.status(200).send(usersEmails)
        }
        else {
            res.send({ message: 'No emails found' })
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

// sending new email to user
app.post('/newEmail', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        await db.collection('All Emails').insertOne(req.body)
        res.status(201).send({ message: 'email sent', data: req.body })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// updating email status
app.put('/updateEmailInfo/:id', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        await db.collection('All Emails').updateOne({ _id: mongodb.ObjectId(req.params.id) }, { $set: req.body })
        res.status(201).send({ message: 'Email status updated', data: req.body })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// deleteing all spam emails in one click
app.delete('/deleteAllSpamEmails/:email', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        let removedEmails = await db.collection('All Emails').deleteMany({ spam: true, emailTo: req.params.email })
        res.status(200).send({ message: 'All spam emails deleted successfully', data: removedEmails })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// deleting all trash emails in one click
app.delete('/deleteAllTrashEmails/:email', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        let removedEmails = await db.collection('All Emails').deleteMany({ trash: true, emailTo: req.params.email })
        res.status(200).send({ message: 'All trash emails deleted successfully', data: removedEmails })
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
