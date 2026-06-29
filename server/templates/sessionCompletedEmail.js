export const sessionCompletedTemplate = (
  learner,
  mentor,
  skill
) => {
  return `
Hi ${learner.name},

Congratulations!

Your learning session has been completed successfully.

Session Summary

Skill: ${skill}
Mentor: ${mentor.name}

We hope you gained valuable knowledge from this session.

Don't forget to leave a review for your mentor and continue your learning journey on SkillBridge.

Happy Learning!

Best Regards,
Team SkillBridge
`;
};