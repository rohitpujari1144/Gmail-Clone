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

// getting all emails of a particular user
app.get('/getEmails/:userEmail', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        let usersEmails = await db.collection('All Emails').find({emailTo:req.params.userEmail}).toArray()
        res.status(200).send(usersEmails)
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// sending new email to All Emails collection
app.post('/newEmail', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        await db.collection('All Emails').insertOne(req.body)
        res.status(201).send({ message: 'New Email sent to all emails collection', data: req.body })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// updating emails in All Emails collection
app.put('/updateEmailInfo/:emailId', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        await db.collection('All Emails').updateOne({ _id: mongodb.ObjectId(req.params.emailId) }, { $set: req.body })
        res.status(201).send({ message: 'Email updated', data: req.body })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// getting all spam emails
app.get('/allSpamEmails', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        let allSpamEmails = await db.collection('Spam Emails').find().toArray()
        res.status(200).send(allSpamEmails)
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
app.delete('/emptySpam', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        let removedEmails = await db.collection('All Emails').deleteMany({ spam:true })
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

// sending email to spam emails collection
app.post('/spamEmail', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        await db.collection('Spam Emails').insertOne(req.body)
        res.status(201).send({ message: 'Email sent to spam emails collection', data: req.body })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// deleteing particular from spam emails collection
app.delete('/deleteSpamEmail/:emailId', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        let removedSpamEmail = await db.collection('Spam Emails').deleteOne({ _id: mongodb.ObjectId(req.params.emailId) })
        res.status(200).send({ message: 'Spam Email deleted successfully', data: removedSpamEmail })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// deleting email from all Emails collection
app.delete('/deleteEmail/:emailId', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        let removedEmail = await db.collection('All Emails').deleteOne({ _id: mongodb.ObjectId(req.params.emailId) })
        res.status(200).send({ message: 'Email deleted successfully', data: removedEmail })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// getting all trash emails
app.get('/allTrashEmails', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        let allTrashEmails = await db.collection('Trash Emails').find().toArray()
        res.status(200).send(allTrashEmails)
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
app.delete('/emptyTrash', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        let removedEmails = await db.collection('All Emails').deleteMany({ isTrash:true })
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

// sending email to trash
app.post('/trashEmail', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        await db.collection('Trash Emails').insertOne(req.body)
        res.status(201).send({ message: 'Email added into trash emails collection', data: req.body })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// send email to trash after clicking delete email
app.put('/trashEmail/:emailObjectId', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        await db.collection('All Emails').findOneAndReplace({_id:mongodb.ObjectId(req.params.emailObjectId)}, {$set:{new:req.body}})
        res.status(201).send({ message: 'Email updated as trash email', data: req.body })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})


// deleting email from trash email collection after sending it inbox
app.delete('/deleteTrashEmail/:emailId', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        let deletedTrashEmail = await db.collection('Trash Emails').deleteOne({ _id: mongodb.ObjectId(req.params.emailId) })
        res.status(200).send({ message: 'Email deleted successfully', data: deletedTrashEmail })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// sending email to draft
app.post('/draftEmail', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        await db.collection('Draft Emails').insertOne(req.body)
        res.status(201).send({ message: 'Email added into draft emails collection', data: req.body })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// deleting email in draft collection
app.delete('/deleteDraftEmail/:emailId', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        let deletedDraftEmail = await db.collection('Draft Emails').deleteOne({ _id: mongodb.ObjectId(req.params.emailId) })
        res.status(200).send({ message: 'Email deleted successfully', data: deletedDraftEmail })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// getting all draft emails
app.get('/allDraftEmails', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        let allDraftEmails = await db.collection('Draft Emails').find().toArray()
        res.status(200).send(allDraftEmails)
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// getting all sent emails of a particlar user from All Emails collection
app.get('/allSentEmails/:emailFrom', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        let allSentEmails = await db.collection('All Emails').find({isSent:true, emailFrom:req.params.emailFrom} ).toArray()
        res.status(200).send(allSentEmails)
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// updating sent email details in All Emails collection
app.put('/updateSentEmail/:emailObjectId', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        await db.collection('All Emails').findOneAndUpdate({_id:mongodb.ObjectId(req.params.emailObjectId)}, {$set:req.body})
        res.status(201).send({ message: 'Email updated', data: req.body })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// deleting sent email from All Emails collection 
app.delete('/deleteSentEmail/:emailObjectId', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        await db.collection('All Emails').findOneAndDelete({_id:mongodb.ObjectId(req.params.emailObjectId)})
        res.status(201).send({ message: 'Email deleted', data: req.body })
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
