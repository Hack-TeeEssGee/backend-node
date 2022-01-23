const subject_mail = "Report for Blog";

const message = (title, author) => {
    return (
        `Dear Admin, \n\n` +
        "The following blog has been reported by a number of students,Kindly take a look: \n\n" +
        `Title:${title}\n` +
        `Author: ${author}\n\n` +
        "This is a auto-generated email. Please do not reply to this email.\n\n" +
        "Regards\n" +
        "KGPverse\n\n"
    );
};

module.exports = {subject_mail, message};
