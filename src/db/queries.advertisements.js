const Advertisement = require("./models").Advertisement

module.exports = {
  getAllAdvertisements(callback) {
    return Advertisement.all()
    .then((advertisements) => {
      callback(null, advertisements);
    })
    .catch((err) => {
      callback(err);
    });
  },
  getAds(id, callback) {
    return Advertisement.findById(id)
    .then((advertisement) => {
      callback(null, advertisement);
    })
    .catch((err) => {
      callback(err);
    });
  },
  addAdvertisement(newAd, callback) {
    return Advertisement.create({
      title: newAd.title,
      description: newAd.description
    })
    .then((advertisement) => {
      callback(null, advertisement);
    })
    .catch((err) => {
      callback(err);
    });
  },
  deleteAd(id, callback) {
    return Advertisement.destroy({
      where: {id}
    })
    .then((advertisement) => {
      callback(null, advertisement);
    })
    .catch((err) => {
      callback(err);
    });
  },
  updateAds(id, updateAd, callback) {
    return Advertisement.findById(id)
    .then((advertisement) => {
      if(!advertisement) {
        return callback("No ad located");
      }
      advertisement.update(updateAd, {
        fields: Object.keys(updateAd)
      })
      .then(() => {
        callback(null, advertisement);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }
} 