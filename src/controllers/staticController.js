module.exports = {
    index(req, re, next){
        res.render("static/index", {title: "Welcome to Bloccit"});
    }
}