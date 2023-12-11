const net = require('node:net');
const fs = require('node:fs');

const PORT = 3000;
const server = net.createServer((socket) => {
    console.log('Client connected');
    socket.write('Welcome to the server!\nhttps://github.com/rcs-ctf/news-room-server\n');

    socket.on('data', (data) => {
        try {
            // Extremely Dangerous: Executing user input as a system command
            const input = data.toString().trim();
            console.log(`Received: ${input}`);

            // WhiteList of commands that are allowed inside docker container
            const whiteList = [
                "read",
                "edit",
            ];
            
            const isWhiteListed = whiteList.some((command) => input.startsWith(command));
            if (!isWhiteListed) {
                socket.write('Error: Command not allowed\n');
                return;
            }

            if(input == 'read'){
                // Read contents of all files in news directory
                const files = fs.readdirSync('./news');
                let content = ''
                // Send contents of each file to client
                files.forEach((file) => {
                    const contents = fs.readFileSync(`./news/${file}`, 'utf8');
                    let [date, message] = contents.split('@');
                    date=eval(date);
                    content = content + `\n${file}\n`;
                    content = content +`----------------\n`;
                    content = content +`${date}\n`;
                    content = content +`${message}\n`;
                });
                socket.write(content);
            }
            else if(input.startsWith('edit')){
                // Edit a file in the news directory
                const fileName = input.split(' ')[1];
                const contents = input.split(' ').slice(2).join(' ');
                fs.writeFileSync(`./news/${fileName}`, contents);
                socket.write('File edited successfully\n');
            }
        } catch(err) {
            socket.write('Error: Something went wrong\n');
            console.log(err);
        }
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
