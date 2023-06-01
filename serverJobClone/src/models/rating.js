import mongoose, { Schema } from "mongoose";

const ratingSchema = new Schema({

    email: {
        required: true,
        type: String,
    } ,
    rating: Number,
    major: {
        required: true,
        type: String,
    } ,
    fname:{
        required: true,
        type: String,
    },
    lname:{
        required: true,
        type: String,
    }

});

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;