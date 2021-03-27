const User = require("../models/user")

exports.insert = async (req, res, next) => {
    try {
        const { name } = req.body
        console.log(name)
        const user = new User({
            name,
        })
        await user.save()
        req.io.emit('user-10', { data: user })
        res.status(200).json({
            data: user,
        })
    } catch (error) {
        res.status(400).json({
            error,
        })
    }
}

exports.find = async (req, res, next) => {
    try {
        const user = await User.find()
        res.status(200).json({
            data: user,
        })
    } catch (error) {
        res.status(400).json({ error })
    }
}
