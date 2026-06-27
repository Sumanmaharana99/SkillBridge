export const bookingTemplate = (
    learner,
    mentor,
    skill,
    date
) => {

return `
Hi ${learner.name},

Your learning session has been booked successfully.

Skill: ${skill}
 Mentor: ${mentor.name}
Date: ${new Date(date).toLocaleString()}

Your mentor will review your request shortly.

Thank you for using SkillBridge!

Team SkillBridge
`;

}