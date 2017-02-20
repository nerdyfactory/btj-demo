var express = require('express');
var router = express.Router();
var multer  = require('multer');
const exec = require('child_process').exec;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "." + file.mimetype.split('/').pop())
  }
})

var upload = multer({ storage: storage })

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'BTJ demo' });
});

// image upload
router.post('/upload', upload.single('file1'), (req, res, next) => {
	console.log(req.file)
	res.redirect('/modify/' + req.file.filename);
})

// modify page
router.get('/modify/:filename', (req, res, next) => {
  res.render('modify', {filename: req.params.filename});
});

// modify request
router.post('/modify/:filename', (req, res, next) => {
  var cmd = [
    './bin/process',
    req.params.filename,
    `'${JSON.stringify(req.body)}'`,
  ].join(' ');
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.log("error: ----------------------------");
      console.log(error);
      console.log(stderr);
      return res.status(500).send(stderr);
    }
    console.log("stdout: ----------------------------");
    console.log(stdout);
	  res.redirect('/result/' + req.params.filename);
  })
});

// show result
router.get('/result/:filename', (req, res, next) => {
  res.render('result', {filename: req.params.filename});
});

module.exports = router;
