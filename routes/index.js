var express = require('express');
var router = express.Router();
var fs = require('fs');

var folderName = "uploads";

/* GET home page. */
router.get('/', function (req, res) {
  fs.readdir("./uploads", { withFileTypes: true }, function (err, data) {
    var arr = [];

    data.forEach(function (val) {
      arr.push({ name: val.name, isFolder: val.isDirectory() })
    })

    // console.log(arr);

    res.render("index", { files: arr, foldername: folderName })
  })
});

router.get("/file/:some", function (req, res) {
  fs.readdir("./uploads", { withFileTypes: true }, function (err, data) {
    fs.readFile(`./${folderName}/${req.params.some}`, "utf8", function (err, fdata) {
      var arr = [];

      data.forEach(function (val) {
        arr.push({ name: val.name, isFolder: val.isDirectory() })
      })

      res.render("file", { files: arr, foldername: folderName, fname: req.params.some, fdata: fdata })
    })
  })
})


// router.get("/delete/:something/:check", function (req, res) {
//   if (req.params.check == 0) {
//     fs.unlink(`./${folderName}/${req.params.something}`, function (err) {
//       if (err) console.log(err)
//       else {
//         res.redirect("/")
//       }
//     })
//   } else {
//     fs.rm(`./${folderName}/${req.params.something}`, { force: true, recursive: true }, function (err) {
//       if (err) console.log(err)
//       else {
//         res.redirect("/")
//       }
//     })
//   }
// });


router.get("/createfile", function (req, res) {
  fs.writeFile(`./${folderName}/${req.query.filename}`, "", function (err) {
    if (err) console.log(err);
    else {
      res.redirect("/");
    }
  })
});


router.get("/createfolder", function (req, res) {
  fs.mkdir(`./${folderName}/${req.query.foldername}`, function (err) {
    if (err) throw err;
    res.redirect("/");
  })
});

router.get("/closefile", function (req, res) {
  res.redirect("/");
})
router.post("/save/:jomnkre", function (req, res) {
  fs.writeFile(`./${folderName}/${req.params.jomnkre}`, req.body.txtsave, function (err) {
    if (err) throw err
    res.redirect("back")
  })
})






module.exports = router;
