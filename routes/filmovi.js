const express = require("express");
const router = express.Router();
const Film = require("../models/film");
const Zanr = require("../models/zanr");

router.get("/", (req, res) => {
  Film.find({})
    .populate("id_zanra")
    .exec(function (err, filmovi) {
      Zanr.find({}, (err, zanrovi) => {
        if (err) {
          console.log(err);
        } else {
          res.send(filmovi);
        }
      });
    });
});
/* router.get("/dodavanjeFilmova", (req, res) => {
  Zanr.find({}, (err, zanrovi) => {
    if (err) {
      console.log(err);
    } else {
      res.render("addFilm", {
        zanr: zanrovi,
      });
    }
  });
}); */

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  Film.findByIdAndRemove(id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("USPJESNO BRISANJE FILMA " + result.naziv);
    }
  });
});

//Azuriranje filmova
router.post("/edit/:id", (req, res) => {
  const uredjeniFlm = {
    naziv: req.body.naziv,
    opis: req.body.opis,
    redatelj: req.body.redatelj,
    glumci: req.body.glumci,
    trajanje: req.body.trajanje,
    id_zanra: req.body.id_zanra,
  };
  Film.findByIdAndUpdate(req.params.id, uredjeniFlm, (err, uredjeni) => {
    if (err) console.log(err);
    else console.log("Uspjesno azuriran film", uredjeni);
  });

  res.redirect("/filmovi");
});

router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  console.log("ID FILMA JE : " + id);

  Film.findById(id, (err, filmovi) => {
    console.log(filmovi);
    // _id: filmovi.id_zanra
    Zanr.find({}, (err, zanrovi) => {
      if (err) {
        console.log(err);
      } else {
        res.render("editFilm", {
          zanr: zanrovi,
          uredi: filmovi,
        });
      }
    });
  });
});

// DODAVANJE FILMA U BAZU
router.post("/", (req, res) => {
  console.log(req.body);

  const film = new Film({
    naziv: req.body.naziv,
    opis: req.body.opis,
    redatelj: req.body.redatelj,
    glumci: req.body.glumci,
    trajanje: req.body.trajanje,
    id_zanra: req.body.id_zanra,
  });
  film
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
  console.log("Spremljno u bazu");
  res.redirect("/filmovi");
});

module.exports = router;
