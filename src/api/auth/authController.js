const { compareSync } = require("bcrypt");
const { authenticate } = require("./authModel");
const jwt = require('jsonwebtoken');

module.exports = {
    login: (req, res) => {
        const body = req.body;
        if (!body.email) return res.status(400).json({ message: 'Email is Required.' })
        if (!body.password) return res.status(400).json({ message: 'Password is Required.' })
        authenticate(body.email, (err, result) => {
            if (err) return res.status(400).json({
                message: err
            })
            if (!result) return res.status(400).json({
                message: 'Invalid Email Or Password.'
            })
            const results = compareSync(body.password, result.password)
            if (result) {
                if (results === false) {
                    return res.status(400).json({
                        message: 'Invalid Email Or Password.'
                    })
                } else {
                    result.password = undefined;
                    const token = jwt.sign({ result: results }, process.env.Jwt_SECRET, { expiresIn: '1h' },)
                    return res.status(200).json({
                        message: 'Logged In Successfully',
                        token: token,
                        token_type: 'Bearer'
                    })
                }
            }
        })
    }
}