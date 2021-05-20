module.exports.signUpErrors = (err) => {
    let errors = { userName: "", email: "", password: "" };

    if (err.message.includes("userName")) {
        errors.userName = "Invalid user name ";
    }
    if (err.message.includes("email")) {
        errors.email = "Invalid email";
    }
    if (err.message.includes("password")) {
        errors.password = "Password too short (at least 6 characters)";
    }
    if (err.code == 11000 && Object.keys(err.keyValue)[0].includes("userName")) {
        errors.userName = "This user name is not available";
    }
    if (err.code == 11000 && Object.keys(err.keyValue)[0].includes("email")) {
        errors.email = "An account already exist for this email";
    }

    return errors;
}

module.exports.signInErrors = (err) => {
    let errors = { email: "", password: "" };
    if (err.message.includes("email")) {
        errors.email = "Unknown email";
    }
    if (err.message.includes("password")) {
        errors.password = "Wrong password";
    }

    return errors;
}