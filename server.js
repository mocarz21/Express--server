const express = require('express');
const { ExpressHandlebars } = require('express-handlebars');
const path = require('path');
const hbs = require('express-handlebars');
const  multer = require('multer')
const upload = multer({dest:'uploads/'})


const app = express();


app.engine('hbs', hbs())
app.set('view engine', 'hbs');
app.use(express.json({extended: false})) //obsługa formularzy jeeli chcemy obsługiwacw formacie Json to wtedy app.use(express.json());


// app.use('/admin',(req, res, next) =>{
//     if(isAdmin()) next();
//     else res.send('go Away!')
// })

// app.use((req, res, next) => {                    /!!! uzywamy render wiec niepotrzebne jest laczenie i dodawanielinku/!!
//     res.show = (name) =>{
//         res.sendFile(path.join(__dirname, `/views/${name}`))
//     };
//     next();
// })
app.use(express.static(path.join(__dirname, '/views/public')));

app.get('/',(req, res) => {
    res.render('index',{layout: 'dark' }) //{layout: false}
    //res.show('index.html');
});
app.get('/podaj/:imie',(req,res) =>{
    res.send(`hello ${req.params.imie}`)
})
app.post('/contact/send-message', upload.single('obraz'), (req, res) => {
    const {author,sender,title,message,obraz} = (req.body);
    if(author && sender && title && message && req.file.originalname){
        res.render('contact',{isSent: true, obraz: req.file.originalname})
    }else{
        res.render('contact',{isError: true})
    }
});

app.get('/hello/:name',(req, res) =>{
    res.render('hello', {layout: false, name: req.params.name});
});
app.get('/about',(req,res) => {  
    res.render('about')
    //res.show('about.html')
});    
app.get('/contact', (req, res) =>{
    res.render('contact')
    //res.show('contact.html')
});
app.get('/info', (req, res) => { 
    res.render('info')
    //res.show('info.html')
});
app.get('/history', (req, res) => {
    res.render('history')
    //res.show('history.html')
});
app.get('/admin/products', (req, res) => {
    res.show('products.html');
});

app.use((req,res) => {
    res.status(404).send('Niema strony')
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});


//Nie chca sie wczytywac obazy i style