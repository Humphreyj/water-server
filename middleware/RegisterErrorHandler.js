function registerErrorHandler(type = 'client'){
    return (req, res, next) =>{
        
        if(!Object.keys(req.body).length) return res.status(400).json('Request must include valid information.')

        const {display_name,email, location, password, confirm_password} = req.body;
        // Regular expresion that tests if the password is strong enough
        // ^ = String starts
        // (?=.*[a-z]) contains any lowercase alphabetical char from a-z
        // (?=.*[A-Z]) containps any uppercase alphabetical char from A-Z
        // (?=.*[0-9]) contains any number
        // (?=.*[!@#\$%\^&\*]) contains any special character
        // (?=.{8,}) string length of at lest 8 characters (You can add a second number to have the length be between those)
        const passRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        // All of this could probably move to a middleware later. Checking required fields are there,
        // Checking if passwords match, checking if pass is strong enough. We could have Detailed error messages
        // and do password checks for each field.
        switch(display_name,email, location, password, confirm_password){
            case !display_name:
                return res.status(400).json("First name is a required field.");
            case !email: 
                return res.status(400).json("Email is a required field.");
            case !password: 
                return res.status(400).json("Password is a required field.");
            case !confirm_password: 
                return res.status(400).json("Please confirm your password.");
            case confirm_password !== password: 
                return res.status(400).json("The passwords you entered don't match.");
            case !passRegex.test(password): 
                return res.status(400).json("Password must contain at least 8 characters, one upper case alphabetical character, a special character, and a number.");
            default:
                break;
        }
        next()
    }
}

module.exports = registerErrorHandler;
