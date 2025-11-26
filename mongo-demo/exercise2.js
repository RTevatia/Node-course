const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  return await Course
    // .find({ isPublished: true, tags: { $in: ["backend", "frontend"]} })
    .find({ isPublished: true})
    .or([{ tags: 'backend' }, { tags: 'frontend' }])
    // .sort({ price: -1 })
    .sort('-price')
    // .select({ name: 1, author: 1, price: 1 })
    .select('name author price');
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
