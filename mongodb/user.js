const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/edTech', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});



const User = mongoose.model('User', userSchema);
// const Course = mongoose.model('Course', courseSchema);

// Export the models
module.exports = User;