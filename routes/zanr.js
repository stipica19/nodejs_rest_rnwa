const express = require("express");
const router = express.Router();
const Film = require("../models/film");
const Zanr = require("../models/zanr");

router.get("/", (req, res) => {
  Zanr.find({}, (err, sviZanrovi) => {
    if (err) console.log(err);
    else res.send(sviZanrovi);
  });
});

//DODAVANJE ZANRA U BAZU
router.post("/", (req, res) => {
  Zanr.create({
    naziv: req.body.naziv,
  }).then((result) => {
    res.send(result);
  });
});

router.delete("/delete/:id", (req, res, next) => {
  console.log("BRISEMO ZANR S ID-om : " + req.params.id);
  Film.count({ id_zanra: req.params.id }, (err, ress) => {
    if (err) {
      console.log(err);
    } else {
      if (ress > 0) {
        //console.log("FILM S TIM ZANROM POSTOJI");
        res.send("FILM S TIM ZANROM POSTOJI : " + req.params.id);
      } else
        Zanr.findByIdAndRemove(req.params.id, (err, res) => {
          if (err) {
            console.log(err);
          } else console.log("Zanr izbrisan ");
        });
    }
  });
});

/* router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  console.log("ID ZANRA JE : " + id);

  Zanr.findById(id, (err, zanrovi) => {
    if (err) {
      console.log(err);
    } else {
      res.send(zanrovi);
    }
  });
}); */

//Azuriranje zanra
router.post("/edit/:id", (req, res) => {
  Zanr.findByIdAndUpdate(req.params.id, req.body, (err, uredjeni) => {
    if (err) console.log(err);
    else console.log("Uspjesno azuriran zanr", uredjeni);
  });

  res.send("USPJESNO");
});

module.exports = router;
