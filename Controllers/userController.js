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

export const updateUserFilter = async (req, res) => {
    try {
        const { telegramId } = req.params;
        const { filter } = req.body;

        const user = await User.findOne({ telegramId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.filter = filter;
        await user.save();
        return res.status(200).json(user);

    } catch (error) {
        console.error("Error updating user filter:", error);
        return res.status(500).json({ message: 'Server error' });
    }
}