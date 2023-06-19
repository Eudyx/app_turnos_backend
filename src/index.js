const Shift = require('./models/shiftModel');
const app = require('./server');
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});

const PORT = process.env.PORT || 3000;

const saveShift = async (data) => {
    try {
        await Shift.create({
            shift: data
        })
    } catch (err) {
        console.error(err);
    }
}

io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
    socket.on('message', (data) => {
        saveShift(data);
        socket.emit('message', data);
        socket.broadcast.emit('message', data);
    })
});

server.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
})