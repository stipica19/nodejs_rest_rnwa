const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const filmSchema = mongoose.Schema({

    naziv: { type: String },
    opis: { type: String },
    redatelj: String,
    glumci: [{ type: String }],
    trajanje: Number,
    id_zanra: { type: mongoose.Schema.Types.ObjectId, ref: 'Zanr' }
});
module.exports = mongoose.model("Film", filmSchema);
