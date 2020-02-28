const express = require('express');
const router = express.Router();
const { validateMember } = require('../models/member');

//add new member
router.post('/', async (req, res) => {
  const Member = res.locals.models.member;
  const { error } = validateMember(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let member = new Member(req.body);
  await member.save();
  console.log('[MongoDB] New member added');
  res.send(member);
});

//get all members
router.get('/', async (req, res) => {
  const Member = res.locals.models.member;
  const member = await Member.find();
  res.send(member);
});

module.exports = router;
