const express = require('express');
const app = express()
const mongoose = require("mongoose");
const dotenv = require(`dotenv`);
const cors = require("cors");

dotenv.config({ path: './.env' });

const DB = process.env.MONGOURL;

mongoose.connect(DB)
.then(() => {
    console.log(`connection succesful`)
})
.catch((err) => {
    console.log(`no connection`)
})

const PORT = process.env.PORT;

app.use(cors())
require('./models/model')
require('./models/post')
app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/createPost"))
app.use(require("./routes/user"))

app.get("/*", function (req, res) {
    res.sendFile(
        path.join(__dirname, "../client/build/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    )
})

app.listen(PORT, () => {
    console.log("server is running on port" + " " + PORT)

})