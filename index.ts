import udp from "dgram"

// -------------------- UDP LISTENER ----------------

// creating a udp server
let listener = udp.createSocket("udp4")

// emits when any error occurs
listener.on("error", function (error) {
    console.log("Error: " + error);
    listener.close();
});

// emits on new datagram msg
listener.on("message", function (msg, info) {
    console.log("Data received from client : " + msg.toString());
    console.log("Received %d bytes from %s:%d\n", msg.length, info.address, info.port);

    //sending msg
    listener.send(msg, info.port, "localhost", function (error) {
        if (error) {
            client.close();
        } else {
            console.log("Data sent !!!");
        }

    });

});


//emits when socket is ready and listening for datagram msgs
listener.on("listening", function () {
    var address = listener.address();
    var port = address.port;
    var family = address.family;
    var ipaddr = address.address;
    console.log("Server is listening at port" + port);
    console.log("Server ip :" + ipaddr);
    console.log("Server is IP4/IP6 : " + family);
});


//emits after the socket is closed using socket.close();
listener.on("close", function () {
    console.log("Socket is closed !");
});


listener.bind(5000);

setTimeout(function () {
    listener.close();
}, 8000);



// -------------------- UDP SENDER ----------------

 
// creating a client socket
let client = udp.createSocket("udp4");

//buffer msg
let data = Buffer.from("9005055984592|100");

client.on("message", function (msg, info) {
    console.log("Data received from server : " + msg.toString());
    console.log("Received %d bytes from %s:%d\n", msg.length, info.address, info.port);
});


//sending msg
client.send(data, 5870, "localhost", function (error) {
    if (error) {
        client.close();
    } else {
        console.log("Data sent !!!");
    }
});

/*
var data1 = Buffer.from("hello");
var data2 = Buffer.from("world");
//sending multiple msg
client.send([data1, data2], 5000, "localhost", function (error) {
    if (error) {
        client.close();
    } else {
        console.log("Data sent !!!");
    }
});
*/