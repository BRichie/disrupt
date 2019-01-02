const request = require("request");
 const server = require("../../src/server");
 const base = "http://localhost:3000/advertisements/";
 const sequelize = require("../../src/db/models/index").sequelize;
 const Advertisement = require("../../src/db/models").Advertisement;
 
  describe("routes : advertisements", () => {
 
    beforeEach((done) => {
     this.advertisement;
     sequelize.sync({force: true}).then((res) => {
       Advertisement.create({
         title: "Test Ad",
         description: "This ad is test only"
       })
       .then((advertisement) => {
         this.advertisement = advertisement;
         done();
       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });
   });
   describe("GET /advertisements", () => {
     it("should return a status code 200 and all advertisements", (done) => {
       request.get(base, (err, res, body) => {
         expect(res.statusCode).toBe(200);
         expect(err).toBeNull();
         expect(body).toContain("Ads");
         expect(body).toContain("Test Ad");
         done();
       });
     });
   });
   describe("GET /advertisements/new", () => {
     it("should render a new advertisement form", (done) => {
       request.get(`${base}new`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("New Ad");
         done();
       });
     });
   });
   describe("POST /advertisements/create", () => {
     const options = {
       url: `${base}create`,
       form: {
         title: "Test Ad #1",
         description: "This is only a test"
       }
     };
     it("should create a new advertisement and redirect", (done) => {
       request.post(options, (err, res, body) => {
         Advertisement.findOne({where: {title: "Test Ad #1"}})
         .then((advertisement) => {
           expect(res.statusCode).toBe(303);
           expect(advertisement.title).toBe("Test Ad #1");
           expect(advertisement.description).toBe("This is only a test");
           done();
         })
         .catch((err) => {
           console.log(err);
           done();
         });
       });
     });
   });
   describe("GET /advertisements/:id", () => {
     it("should render selected advertisement", (done) => {
       request.get(`${base}${this.advertisement.id}`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("Test Ad");
         done();
       });
     });
   });
   describe("POST /advertisements/:id/destroy", () => {
     it("should delete the ad", (done) => {
       Advertisement.all()
       .then((advertisements) => {
         const advertisementsCountBeforeDelete = advertisements.length;
         expect(advertisementsCountBeforeDelete).toBe(1);
         request.post(`${base}${this.advertisement.id}/destroy`, (err, res, body) => {
           Advertisement.all()
           .then((advertisements) => {
             expect(err).toBeNull();
             expect(advertisements.length).toBe(advertisementsCountBeforeDelete - 1);
             done();
           });
         });
       });
     });
   });
   describe("GET /advertisements/:id/edit", () => {
     it("should render a view with an edit advertisement form", (done) => {
       request.get(`${base}${this.advertisement.id}/edit`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("Edit Ad");
         expect(body).toContain("Test Ad");
         done();
       });
     });
   });
   describe("POST /advertisements/:id/udpate", () => {
     it("should update the ad", (done) => {
       const options = {
         url: `${base}${this.advertisement.id}/udpate`,
         form: {
           title: "Test Ad",
           description: "This is a test advertisement"
         }
       };
       request.post(options, (err, res, body) => {
         expect(err).toBeNull();
         Advertisement.findOne({
           where: { id: this.advertisement.id }
         })
         .then((advertisement) => {
           expect(advertisement.title).toBe("Test Ad");
           done();
         });
       });
     });
   });
 }); 