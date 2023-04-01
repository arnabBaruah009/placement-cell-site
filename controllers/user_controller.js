const User = require("../models/user_Schema");
const Student = require("../models/student_Schema");
const Interview = require("../models/interview_Schema");
const ObjectsToCsv = require("objects-to-csv");
const fs = require("fs");

//to download data
module.exports.download = async function (req, res) {
  const students = await Student.find({});

  let data = [];
  for (let student of students) {
    await student.populate("interview");

    let interview_list = [];
    student.interview.forEach((interview) => {
      const interview_data = {
        Interview_date: interview.date.toDateString(),
        Interview_company: interview.company_name,
      };

      interview_list.push(interview_data);
    });

    const stu_data = {
      Student_id: student.id,
      Student_name: student.name,
      Student_college: student.college,
      Student_status: student.status,
      DSAfinalScore: student.dsaFinalScore,
      WebDfinalScore: student.webDFinalScore,
      ReactfinalScore: student.reactFinalScore,
      Student_interview: interview_list,
      Result: student.result,
    };

    data.push(stu_data);
  }

  const csv = new ObjectsToCsv(data);

  // Save to file:
  await csv.toDisk("./test.csv");

  return res.download("./test.csv", () => {
    fs.unlinkSync("./test.csv");
  });
};

//rendering user home page
module.exports.home = async function (req, res) {
  const students = await Student.find({});

  return res.render("user_home", {
    title: "Home",
    userName: req.user.name,
    students,
  });
};

//rendering sign in page
module.exports.signIn = function (req, res) {
  return res.render("signIn", {
    title: "Sign In",
  });
};

//rendering sign up page
module.exports.signUp = function (req, res) {
  return res.render("signUp", {
    title: "Sign Up",
  });
};

//creating user
module.exports.create = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    console.log("Password do not matched");
    return res.redirect("back");
  }

  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    await User.create(req.body);
    console.log("User created");
    return res.redirect("/user/signIn");
  } else {
    console.log("You have already signed up, please login to continue");
    return res.redirect("/user/signIn");
  }
};

//create session
module.exports.createSession = function (req, res) {
  return res.redirect("/user/home");
};

//sign out user
module.exports.destroySession = function (req, res) {
  req.logout(function () {
    console.log("Signed out");
    return res.redirect("/");
  });
};
