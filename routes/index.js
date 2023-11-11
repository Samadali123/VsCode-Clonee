const { error } = require('console');
var express = require('express');
var router = express.Router();
const fs = require(`fs`);



router.get(`/`, function(req, res){
  fs.readdir(`./files`, {withFileTypes: true},  function(err,data){
    res.render(`index`,  {data})
  })
})


router.post(`/filecreate`, function(req, res){
    fs.writeFile(`./files/${req.body.filename}`, "", function(err){
     res.redirect(`/`);
    })
})


router.post(`/foldercreate`, function(req, res){
  fs.mkdir(`./files/${req.body.foldername}`, function(err){

   res.redirect(`/`);
  })
})


router.get(`/files/open/:name`,  function(req, res){
  fs.readdir(`./files`, {withFileTypes:true}, function(err,data){
    fs.readFile(`./files/${req.params.name}`,  "utf8", function(err, content){
      res.render(`fileopen`, {data, name:req.params.name, content})
    })
  })
})



router.get(`/files/delete/folder/:foldername`, function(req, res){
  fs.rmdir(`./files/${req.params.foldername}`,  function(err){
    res.redirect(`/`)
  })
})


router.get(`/files/delete/file/:foldername`, function(req, res){
  fs.unlink(`./files/${req.params.foldername}`,  function(err){
    res.redirect(`/`)
  })
})


router.get(`/close`, function(req, res){
  res.redirect(`/`);
})



router.post(`/change/:oldname`, function(req, res){
fs.rename(`./files/${req.params.oldname}`,  `./files/${req.body.filename}`,  function(err){
  res.redirect(`/`);
})

})  




module.exports = router;

