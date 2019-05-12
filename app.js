const bodyParser = require('body-parser'),
 express = require('express'),
 main = require('./routes/main'),
 user = require('./routes/user'),
 path = require('path');
 
const app = express();

const errController = require('./Controllers/404');

// app.engine('hbs', expressHandle({layoutsDir: 'views/Layouts', defaultLayout: 'main-layout.hbs'}));
app.set('view engine', 'ejs');//setting view engine

/*A directory or an array of directories for the application's views. 
  If an array, the views are looked up in the order they occur in the array.*/
app.set('views','views');// In other words, where to look for a file when rendering a particular page....but when set to null it renders the page how??
 
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/admin', main);
app.use(user);
//__dirname gives present directory of file...
app.use(express.static(path.join(__dirname,'public')));//static files that the client can download from server, for this express.static() is used.

app.use('/',errController.error);

// const server = http.createServer(app);

// server.listen(3000);

app.listen(3000); //same operation as above code
