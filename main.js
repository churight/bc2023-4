const http = require('http'); //connect http module
const fs = require('fs'); //connect file system module
const xml = require ('fast-xml-parser'); // connect xml module

const server = http.createServer((req, res) => { //create server
    const xmlData = fs.readFileSync('data.xml', 'utf8'); // reade data.xml
    const parser = new xml.XMLParser(); //create parser
    const obj = parser.parse(xmlData); // making xml data into string
    let data = obj.auctions.auction;// adress sub-elements of auction element
    if (!Array.isArray(data)){ //hightlight neccessary sub-elements 
       data = [data];
    }
        const newObj = {
            data: {
                auction: data.map((item) => ({ //map creates an array of results of calling this function
                    StockCode: item.StockCode, 
                    ValCode: item.ValCode,
                    Attraction: item.Attraction,
                }))}, //output
        };

        const builder = new xml.XMLBuilder(); //create builder
        const xmlStr = builder.build(newObj); //make newObj bach to xml

        res.writeHead(200, {'Content-Type': 'application/xml'});
        res.end(xmlStr);
});

const host = "localhost"; //create host
server.listen(8000, () => { // male the server listen to port 8000
    console.log('Server is running localhost: 8000'); //output
})
