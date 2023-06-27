const app = require('./server');
const http = require('http');
const { Server } = require('socket.io');
const allowedOrigins = require('./config/allowedOrigins');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: `${allowedOrigins[0]}, ${allowedOrigins[1]}`
    }
});

const shiftController = require('./controllers/shiftController');
const inProcessController = require('./controllers/inProcessController');

const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('message', async (data) => {
        const dataJson = JSON.parse(data);
        console.log(dataJson)
        await shiftController.saveShift(dataJson); // Saves the turn that was created
        const shifts = await shiftController.getShifts(); //ges 7 turns to show

        // emitting
        socket.broadcast.emit('message', shifts); 
        socket.emit('message', shifts); 
    });

    socket.on('delete', async (data) => {
        await inProcessController.deleteProcess(data.area); // deletes a trun in process depending the admin area
        await inProcessController.createInProcess({ // create a turn that is in process
            shift: data.shift,
            number: data.number,
            area: data.area
        });
        console.log(data);
        await shiftController.deleteShift(data._id); // deletes turn that is now in process
        const shifts = await shiftController.getShifts(); //gets 7 turns to show
        const process = await inProcessController.getProcess(); // gets turns in process
        
        // emitting
        socket.broadcast.emit('process', process);
        socket.broadcast.emit('message', shifts);
        socket.emit('process', process);
        socket.emit('message', shifts);
    });

    // an event to show the next turn
    socket.on('call', (data) => {
        console.log(data);
        socket.broadcast.emit('call', data); // emitting
    });

    // resets the data base (the application)
    socket.on('delete-all-shifts', async () => {
        await shiftController.deleteAllShift();
        await inProcessController.deleteAllProcess();
        console.log('All shifts deleted');

        // emitting
        socket.broadcast.emit('delete-all-shifts');
        socket.broadcast.emit('process', []);
        socket.emit('process', []);
        socket.broadcast.emit('message', [])
        socket.emit('message', [])
    });
});

server.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
})