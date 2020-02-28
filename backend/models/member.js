const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100,
    unique: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
});

function validateMember(member) {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(50)
      .trim()
      .required(),
    lastName: Joi.string()
      .min(3)
      .max(50)
      .trim()
      .required(),
    email: Joi.string()
      .min(5)
      .max(100)
      .trim()
      .required()
      .email(),
    eventDate: Joi.date().required(),
  });
  return schema.validate(member);
}

const Member = mongoose.model('Member', memberSchema);

exports.member = memberSchema;
exports.Member = Member;
exports.validateMember = validateMember;
