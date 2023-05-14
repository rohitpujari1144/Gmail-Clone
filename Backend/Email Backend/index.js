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
        await db.collection('All Emails').findOneAndReplace({_id:mongodb.ObjectId(req.params.emailObjectId)}, req.body)
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

// pushing email to sent email collection after sending email
app.post('/sentEmail', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        await db.collection('Sent Emails').insertOne(req.body)
        res.status(201).send({ message: 'Email added into sent emails collection', data: req.body })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// getting all sent emails of a particlar user from sent email collection
app.get('/allSentEmails/:emailFrom', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        let allSentEmails = await db.collection('Sent Emails').find({ emailFrom:req.params.emailFrom }).toArray()
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

// deleting particular email from sent email collection
app.delete('/deleteSentEmail/:emailId', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Gmail_Clone')
        let deletedSentEmail = await db.collection('Sent Emails').deleteOne({ _id: mongodb.ObjectId(req.params.emailId) })
        res.status(200).send({ message: 'Email deleted successfully', data: deletedSentEmail })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// // updating emails in All Emails collection
// app.put('/updateEmailInfo/:emailId', async (req, res) => {
//     const client = await MongoClient.connect(dbUrl)
//     try {
//         const db = await client.db('Gmail_Clone')
//         await db.collection('All Emails').updateOne({ _id: mongodb.ObjectId(req.params.emailId) }, { $set: req.body })
//         res.status(201).send({ message: 'Email updated', data: req.body })
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).send({ message: 'Internal server error', error })
//     }
//     finally {
//         client.close()
//     }
// })

// // sending new email to All Emails and Unread Emails collection
// app.post('/newEmail', async (req, res) => {
//     const client = await MongoClient.connect(dbUrl)
//     try {
//         const db = await client.db('Gmail_Clone')
//         await db.collection('Unread Emails').insertOne(req.body)
//         await db.collection('All Emails').insertOne(req.body)
//         res.status(201).send({ message: 'New Email sent', data: req.body })
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).send({ message: 'Internal server error', error })
//     }
//     finally {
//         client.close()
//     }
// })

// // getting emails from Unread Emails collection
// app.get('/getUnreadEmails', async (req, res) => {
//     const client = await MongoClient.connect(dbUrl)
//     try {
//         const db = await client.db('Gmail_Clone')
//         let allUnreadEmails = await db.collection('Unread Emails').find().toArray()
//         res.status(200).send(allUnreadEmails)
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).send({ message: 'Internal server error', error })
//     }
//     finally {
//         client.close()
//     }
// })

// // removing email from Unread Emails collection after reading it
// app.delete('/removeEmail/:emailId', async (req, res) => {
//     const client = await MongoClient.connect(dbUrl)
//     try {
//         const db = await client.db('Gmail_Clone')
//         let removedEmail = await db.collection('Unread Emails').deleteOne({ _id: mongodb.ObjectId(req.params.emailId) })
//         res.status(200).send({ message: 'Email removed successfully', data: removedEmail })
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).send({ message: 'Internal server error', error })
//     }
//     finally {
//         client.close()
//     }
// })

// // removing email from read Emails collection after clicking mark as unread
// app.delete('/markUnread/:emailId', async (req, res) => {
//     const client = await MongoClient.connect(dbUrl)
//     try {
//         const db = await client.db('Gmail_Clone')
//         let removedEmail = await db.collection('Read Emails').deleteOne({ _id: mongodb.ObjectId(req.params.emailId) })
//         res.status(200).send({ message: 'Email removed successfully', data: removedEmail })
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).send({ message: 'Internal server error', error })
//     }
//     finally {
//         client.close()
//     }
// })


// // sending email to read email collection
// app.post('/readEmail', async (req, res) => {
//     const client = await MongoClient.connect(dbUrl)
//     try {
//         const db = await client.db('Gmail_Clone')
//         await db.collection('Read Emails').insertOne(req.body)
//         res.status(201).send({ message: 'Email sent to Read Emails', data: req.body })
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).send({ message: 'Internal server error', error })
//     }
//     finally {
//         client.close()
//     }
// })


// // getting all read emails
// app.get('/allReadEmails', async (req, res) => {
//     const client = await MongoClient.connect(dbUrl)
//     try {
//         const db = await client.db('Gmail_Clone')
//         let allReadEmails = await db.collection('Read Emails').find().toArray()
//         res.status(200).send(allReadEmails)
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).send({ message: 'Internal server error', error })
//     }
//     finally {
//         client.close()
//     }
// })

// // sending email to star
// app.post('/startEmail', async (req, res) => {
//     const client = await MongoClient.connect(dbUrl)
//     try {
//         const db = await client.db('Gmail_Clone')
//         await db.collection('Star Emails').insertOne(req.body)
//         res.status(201).send({ message: 'Email sent to star', data: req.body })
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).send({ message: 'Internal server error', error })
//     }
//     finally {
//         client.close()
//     }
// })

// // getting all star emails
// app.get('/allStarEmails', async (req, res) => {
//     const client = await MongoClient.connect(dbUrl)
//     try {
//         const db = await client.db('Gmail_Clone')
//         let allStarEmails = await db.collection('Star Emails').find().toArray()
//         res.status(200).send(allStarEmails)
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).send({ message: 'Internal server error', error })
//     }
//     finally {
//         client.close()
//     }
// })

// // sending email to important
// app.post('/importantEmail', async (req, res) => {
//     const client = await MongoClient.connect(dbUrl)
//     try {
//         const db = await client.db('Gmail_Clone')
//         await db.collection('Important Emails').insertOne(req.body)
//         res.status(201).send({ message: 'Email sent to important', data: req.body })
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).send({ message: 'Internal server error', error })
//     }
//     finally {
//         client.close()
//     }
// })

// // getting all important emails
// app.get('/allImportantEmails', async (req, res) => {
//     const client = await MongoClient.connect(dbUrl)
//     try {
//         const db = await client.db('Gmail_Clone')
//         let allImportantEmails = await db.collection('Important Emails').find().toArray()
//         res.status(200).send(allImportantEmails)
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).send({ message: 'Internal server error', error })
//     }
//     finally {
//         client.close()
//     }
// })

// // sending email to draft
// app.post('/draftEmail', async (req, res) => {
//     const client = await MongoClient.connect(dbUrl)
//     try {
//         const db = await client.db('Gmail_Clone')
//         await db.collection('Draft Emails').insertOne(req.body)
//         res.status(201).send({ message: 'Email sent to draft', data: req.body })
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).send({ message: 'Internal server error', error })
//     }
//     finally {
//         client.close()
//     }
// })

// // getting all draft emails
// app.get('/allDraftEmails', async (req, res) => {
//     const client = await MongoClient.connect(dbUrl)
//     try {
//         const db = await client.db('Gmail_Clone')
//         let allDraftEmails = await db.collection('Draft Emails').find().toArray()
//         res.status(200).send(allDraftEmails)
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).send({ message: 'Internal server error', error })
//     }
//     finally {
//         client.close()
//     }
// })

// // sending email to trash after deleting
// app.post('/trashEmail', async (req, res) => {
//     const client = await MongoClient.connect(dbUrl)
//     try {
//         const db = await client.db('Gmail_Clone')
//         await db.collection('Trash Emails').insertOne(req.body)
//         res.status(201).send({ message: 'Email sent to trash', data: req.body })
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).send({ message: 'Internal server error', error })
//     }
//     finally {
//         client.close()
//     }
// })

// // getting all trash emails
// app.get('/allTrashEmails', async (req, res) => {
//     const client = await MongoClient.connect(dbUrl)
//     try {
//         const db = await client.db('Gmail_Clone')
//         let allTrashEmails = await db.collection('Trash Emails').find().toArray()
//         res.status(200).send(allTrashEmails)
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).send({ message: 'Internal server error', error })
//     }
//     finally {
//         client.close()
//     }
// })

// // sending email to spam
// app.post('/spamEmail', async (req, res) => {
//     const client = await MongoClient.connect(dbUrl)
//     try {
//         const db = await client.db('Gmail_Clone')
//         await db.collection('Spam Emails').insertOne(req.body)
//         res.status(201).send({ message: 'Email sent to spam', data: req.body })
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).send({ message: 'Internal server error', error })
//     }
//     finally {
//         client.close()
//     }
// })

// // getting all spam emails
// app.get('/allSpamEmails', async (req, res) => {
//     const client = await MongoClient.connect(dbUrl)
//     try {
//         const db = await client.db('Gmail_Clone')
//         let allSpamEmails = await db.collection('Spam Emails').find().toArray()
//         res.status(200).send(allSpamEmails)
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).send({ message: 'Internal server error', error })
//     }
//     finally {
//         client.close()
//     }
// })


app.listen(port, () => { console.log(`App listening on ${port}`) })
