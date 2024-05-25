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


const courseSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
});


const course = mongoose.model('course', courseSchema);
// const Course = mongoose.model('Course', courseSchema);

// Export the models
module.exports =course;