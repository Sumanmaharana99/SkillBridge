export const sessionAcceptedTemplate = (
  learner,
  mentor,
  skill,
  date
) => {
  return `
Hi ${learner.name},

 Great news!

Your session request has been accepted.

Session Details:

Skill: ${skill}
Mentor: ${mentor.name}
Date: ${new Date(date).toLocaleString()}

Please join the session on time and enjoy learning.

Happy Learning!

Team SkillBridge
`;
};