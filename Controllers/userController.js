import User from '../Models/userModel.js';

export const createUser = async (req, res) => {
    try {
        const { telegramId, telegramUsername, filter } = req.body;

        const existingUser = await User.findOne({ telegramId });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            telegramId,
            telegramUsername: telegramUsername || "",
            filter: filter || { title: "", tags: [], location: "" }
        });

        await newUser.save();
        return res.status(201).json(newUser);

    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: 'Server error' });
    }
}
