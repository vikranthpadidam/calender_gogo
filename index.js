const cors = require('cors');
const express = require("express")
const {google} = require('googleapis')
const {axios} =require ('axios');
const {uuid}=require("uuid");


require('dotenv').config()

const app=express()
app.use(cors());
app.use(express.json())

const calendar=google.calendar({
  version:"v3",
  auth:process.env.API_KEY
})

const PORT=process.env.NODE_ENV || 8000

// console.log(process.env.REDIRECT_URL);

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
  );

  // generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
    'https://www.googleapis.com/auth/calendar'
  ];

 
app.get('/google',(req,res)=>{

    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes
      });
      // console.log(req.query);
    res.redirect(url);
});


app.get('/google/redirect',async (req,res)=>{

  const code=req.query.code;
  const {tokens}=await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  res.redirect('http://localhost:3000/events');
});

app.post('/eventForm', async (req, res) => {
  try {
    const { summary, description, startDateTime, endDateTime, attendeeEmail } = req.body;

    // Create the event
    const event = {
      summary,
      description,
      start: {
        dateTime: startDateTime,
        timeZone: 'Asia/Dhaka', // Set your desired time zone
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'Asia/Dhaka',
      },
      attendees: [
        { email: attendeeEmail },
      ],
    };

    // Insert the event
    await calendar.events.insert({
      calendarId: 'primary',
      conferenceDataVersion: 1,
      requestBody: event,
    });

    res.status(200).json({ msg: 'Event created successfully' });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});
app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});


app.listen(PORT,()=>{
    console.log("server started on port",PORT)
})
