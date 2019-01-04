const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

    beforeEach((done) => {

        this.post;
        this.topic;
        sequelize.sync({force: true}).then((res) => {

            Topic.create({
                title: "Expeditions to Alpha Centauri",
                description: "A compilation of reports from recent visits to the star system."
              })
              .then((topic) => {
                this.topic = topic;
        //#3
                Post.create({
                  title: "My first visit to Proxima Centauri b",
                  body: "I saw some rocks.",
        //#4
                  topicId: this.topic.id
                })
                .then((post) => {
                  this.post = post;
                  done();
                });
              })
              .catch((err) => {
                console.log(err);
                done();
                    });
                });

            });

            describe("#create()", () => {

                it("should create a topic object with title and description", (done) => {
                    Topic.create({
                        title: "Anatomy of Xenomorphs",
                        description: "A detailed examination of the xenomorph species",
                        
                    })
                    .then((topic) => {

                        expect(topic.title).toBe("Anatomy of Xenomorphs");
                        expect(topic.description).toBe("A detailed examination of the xenomorph species");
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                });
                it("should not create a topic with a missing title or description", (done) => {
                    Topic.create({
                        title: "Anatomy of Xenomorpohs"
                    })
                    .then((topic) => {

                        done();
                    })
                    .catch((err) => {

                        expect(err.message).toContain("Topic.description cannot be null");
                    
                        done();
                    })
                });
            });

            describe("#getPosts()", () => {

                it("should return a post that has been added to an associated topic", (done) => {
                    Post.create({
                        title: "Test",
                        body: "testing post",
                        topicId: this.topic.id
                    })
                    .then((post) => {
                        this.topic.getPosts()
                        .then((posts) => {
                            expect(this.topic.id).toBe(post.topicId);
                            expect(this.topic.id).toBe(posts[1].topicId);
                            done();
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                });
            });
    });

    