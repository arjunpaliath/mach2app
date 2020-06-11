const express = require('express');
const app = new express();
const port = 3000;
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response){
    response.sendFile('./public/auth_form.html', { root: __dirname });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))