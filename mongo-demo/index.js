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

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Rahul",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  const courses = await Course.find({ author: "Rahul", isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    // .select({ name: 1, tags: 1 });
    .countDocuments();

  console.log(courses);
}

// Query-first update
// async function updateCourse(id) {
//   const course = await Course.findById(id);
//   if (!course) return;

//   course.isPublished = true;
//   course.author = "Another Author";

//   // or use 'set' method
//   //   course.set({
//   //     isPublished: true,
//   //     author: "Another Author",
//   //   });
//   const result = await course.save();
//   console.log(result);
// }

// Update-first update
// async function updateCourse(id) {
//   const result = await Course.updateOne(
//     { _id: id },
//     {
//       $set: {
//         author: "Mosh",
//         isPublished: false,
//       },
//     }
//   );

//   console.log(result);
// }

// Both Query and Update method combined
async function updateCourse(id) {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Jason",
        isPublished: true,
      },
    },
    { new: true }
  );

  console.log(result);
}

// Remove
async function removeCourse(id) {
  // const result = await Course.deleteOne({ _id: id});
  const course = await Course.findByIdAndDelete({ id });
  console.log(course);
}

updateCourse("6925c091f9f3e4c2b4fd84c5");

// createCourse();
// getCourses();
