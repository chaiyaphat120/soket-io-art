const io = require( "socket.io" )();
const socketapi = {
    io: io
};

const socketInfo = {};
io.on( "connection", function( socket ) {
    console.log( "A user connected" );
    socket.emit('booking_request', { data: 'hello-user' })
    socketInfo.socket_id = socket.id;
});

module.exports = {socketapi , socketInfo};