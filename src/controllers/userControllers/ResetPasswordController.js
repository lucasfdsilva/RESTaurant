const User = require('../../models/User');
const bcrypt = require('bcryptjs');

module.exports = {

    async reset(req, res) {
        const { email, token, password } = req.body;

        try {

            if (!email || !token || !password) {
                res.status(400).json({ message: "ERROR: Missing Required Information from Request" });
            }

            let userFromDB = await User.findOne({ email: email.toLowerCase() });

            if (!userFromDB) {
                return res.status(400).send({ message: 'User Not Found' });
            }

            if (token !== userFromDB.passwordResetToken) {
                return res.status(400).send({ message: 'Invalid Token' });
            }

            const now = new Date();
            if (now > userFromDB.passwordResetExpires) {
                return res.status(400).send({ message: 'Expired Token. Please generate a new token' });
            }

            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            userFromDB.password = hashedPassword;

            await userFromDB.save()
                .then(() => {
                    console.log('User password updated succesfully');
                    res.status(200).send({ message: 'User password updated succesfully' });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).send({ message: 'Password NOT updated, please check error' });
                });

        } catch {
            res.status(400).send({ message: 'Cannot reset password, try again' });
        }

    }
};