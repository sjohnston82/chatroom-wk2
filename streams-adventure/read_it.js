const content = process.argv[2];

const { Readable } = require("stream");

class ReadableStream extends Readable {
  _read(size) {}
}

const stream = new ReadableStream();
stream.push(content);
stream.pipe(process.stdout);
