// Express.js route
app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send('User not found');
    }
    // Generate reset token
    const resetToken = generateResetToken();
    user.resetToken = resetToken;
    await user.save();

    // Send reset email
    sendPasswordResetEmail(user.email, resetToken);
    res.send('Password reset link sent to your email');
});
