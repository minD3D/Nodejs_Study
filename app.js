var express = require('express');
var app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', './views');
let fs =require('fs');

app.get('/posts/new',(req,res)=>{
  res.render('posts/new');
});

app.post('/posts', (req,res)=>{
  let title = req.body.title;
  let content = req.body.content;
  fs.readFile('posts.json','utf-8', (err,data)=>{
    if(err) throw err;
    let post = JSON.parse(data);
    post.recent+=1;
    post.list[post.recent].title=title;
    post.list[post.recent].content=content;
    fs.writeFile('posts.json',JSON.stringify(post,null,2),'utf-8',(err)=>{
      if(err) throw err;
    });
  });
  res.redirect('/posts/new');
});

app.get('/posts',(req,res)=>{
  fs.readFile('posts.json', 'utf-8',(err,data)=>{
    if(err) throw err;
    let posts = JSON.parse(data);
    res.render('posts/index',{posts:posts.list});
  });
});

app.listen(3000, function(){
  console.log('Conneted 3000 port!');
});

// app.use(bodyParser.urlencoded({ extended: true }));
// // post 방식으로 보내는 폼
// app.get('/post', (req, res) => {
//   let form =`
//   <form action="/post_receive" method="post">
//   <p><input type="text" name="title"></p>
//   <p><textarea name="content"></textarea></p>
//   <p><input type="submit"></p>
//   </form>`
//   res.send(form);
// });

// // post 방식으로 받음
// app.post('/post_receive', (req, res) => {
//   res.send('title: ' + req.body.title + '<br>'
//                   + 'content: ' + req.body.content + '<br>'
//                   + req.method);
// });

// app.locals.pretty = true;
// app.set('view engine', 'jade');
// app.set('views', './views');
// app.use(express.static('public'));

// app.get('/form', function(req, res){
//   res.render('form');
// });
// app.get('/form_receiver', function(req, res){
//   var title = req.query.title;
//   var description = req.query.description;
//   res.send(title+','+description);
// });
// app.post('/form_receiver', function(req, res){
//   var title = req.body.title;
//   var description = req.body.description;
//   res.send(title+','+description);
// });
// app.get('/topic/:id', function(req, res){
//   var topics = [
//     'Javascript is....',
//     'Nodejs is...',
//     'Express is...'
//   ];
//   var output = `
//   <a href="/topic?id=0">JavaScript</a><br>
//   <a href="/topic?id=1">Nodejs</a><br>
//   <a href="/topic?id=2">Express</a><br><br>
//   ${topics[req.params.id]}
//   `
//   res.send(output);
// })
// app.get('/topic/:id/:mode', function(req, res){
//   res.send(req.params.id+','+req.params.mode)
// })
// app.get('/template', function(req, res){
//   res.render('temp', {time:Date(), title:'Jade'});
// })
// app.get('/', function(req, res){
//     res.send('Hello home page');;
// });
// app.get('/dynamic', function(req, res){
//   var lis = '';
//   for(var i=0; i<5; i++){
//     lis = lis + '<li>coding</li>';
//   }
//   var time = Date();
//   var output = `
//   <!DOCTYPE html>
//   <html>
//     <head>
//       <meta charset="utf-8">
//       <title></title>
//     </head>
//     <body>
//         Hello, Dynamic!
//         <ul>
//           ${lis}
//         </ul>
//         ${time}
//     </body>
//   </html>`;
//   res.send(output);
// });
// app.get('/route', function(req, res){
//     res.send('Hello Router, <img src="/route.png">')
// })
// app.get('/login', function(req, res){
//     res.send('<h1>Login please</h1>');
// });
