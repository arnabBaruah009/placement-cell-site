const Student = require('../models/student_Schema');
const Interview = require('../models/interview_Schema');

module.exports.create = async function(req, res){
    const student = await Student.create(req.body);
    const interview = await Interview.findById(req.body.interview);
    interview.student.push(student.id);
    interview.save();
    return res.redirect('back');
}