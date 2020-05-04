let exp = require('express'),
express = exp(),
bodyParser = require('body-parser'),
consign = require('consign'),
cors = require('cors'),
fs = require('fs');



//express.use(bodyParser.urlencoded({extended: true}));
express.use(bodyParser.json());

express.use(cors());
// consign().include('/routes')
// .then('/controllers')
// .then('database.js')
// .into(express);

express.listen(8081, function(service){
	console.log("Servidor online.");
});

// express.post('/cabinet', (req, res) => { // ok
     
// })

const options = {
    method: 'GET',
    mode: 'no-cors'
  };

  fetch('teste.html', options).then(console.log);

read_file = async () => {
    
    return await fs.readFile('teste.html', function(err,data){
        if(err) {
            console.error("Could not open file: %s", err);
            process.exit(1);
        }
        
        return data.toString('utf8');
    });
    
}
let texto = [];
//let test = await read_file();

console.log(test);
