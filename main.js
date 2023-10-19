const http = require('http');
const fs = require('fs');
const xml = require ('fast-xml-parser');

const server = http.createServer((req, res) => {
    try { const xmlData = fs.readFileSync('data.xml', 'utf8');
    if (!xmlData) { throw new Error ('Empty file or file not found')};

    const options = {
        attributeNamePrefix: '',
        ignoreAttribute: false,
    };

    const parser = new xml.XMLParser(options);
    const obj = parser.parse(xmlData, options);

    if (obj && obj.auctions && Array.isArray(obj.auctions.auction)){
        const data = obj.auctions.auction;
        const sorted = data.map((item) => ({
            StockCode: itemm.StockCode,
            ValCode: item.ValCode,
            Attraction: item.Attraction,
        }));

        const newObj = {
            data: {auction: sorted,},
        };

        const builder = new xml.XMLBuilder();
        const xmlStr = builder.build(newObj);

        res.writeHead(200, {'Content-Type': 'application/xml'});
        res.end(xmlStr);
    }
}
catch (error){
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end('Error:' +error.message);
}

});

server.listen(8000, () => {
    console.log('Server is running localhost: 8000');
})