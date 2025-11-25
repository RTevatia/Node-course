const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MondoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

async function createCourse() {
  const Course = mongoose.model("Course", courseSchema);
  const course = new Course({
    name: "Angular Course",
    author: "Rahul",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

createCourse();
