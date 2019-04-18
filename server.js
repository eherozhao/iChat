const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const logger = require('morgan');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.static(__dirname + '/angular-src/dist/'));

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

require('./socket/moments')(io);
require('./socket/private')(io);

const dbConfig = require('./config/secret');
const auth = require('./routes/authRoutes');
const posts = require('./routes/postRoutes');
const users = require('./routes/userRoutes');
const friends = require('./routes/friendsRoutes');
const message = require('./routes/messageRoutes');
const image = require('./routes/imageRoutes');
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'DELETE', 'PUT');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   next();
// });

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
// app.use(logger('dev'));

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, { useMongoClient: true });

app.use('/api/ichat', auth);
app.use('/api/ichat', posts);
app.use('/api/ichat', users);
app.use('/api/ichat', friends);
app.use('/api/ichat', message);
app.use('/api/ichat', image);

app.use(express.static(path.join(__dirname, 'angular-src/dist/ichat')));


app.get('/', (req, res) => {
  res.send('invaild endpoint');
});
app.get('*', (req, res) => {
  // res.sendFile(path.join(__dirname + '/angular-src/dist/ichat/index.html'));
  res.redirect('/');
});

server.listen(PORT, () => {
  console.log('Listening on port 3000');
});
