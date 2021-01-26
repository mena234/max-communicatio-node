const express = require('express');
const { json } = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();

app.use(json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
mongoose.connect('mongodb://localhost:27017/user');

app.get('/api/user', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users)

})

app.post('/api/user', async (req, res) => {
    const { name, country } = req.body;
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        country: country,
        emails: []
    })

    await user.save();
    res.status(200).json(user);
})

app.post('/api/email', async (req, res) => {
    const { usersId, body, subject } = req.body;
    console.log(usersId);
    const email = {
        body,
        subject
    }

    for (const userId of usersId) {
        const user = await User.findOne({_id: userId});
        console.log(user);
        user.emails.push(email);
        await User.updateOne({ _id: userId }, { $set: {emails: user.emails}});
    }

    res.status(200).send("Data Updated Successfuly")
})




app.listen('3000', () => {
    console.log("Listen at 3000");
})