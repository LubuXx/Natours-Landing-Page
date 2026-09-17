const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A tour must have a name!'],
            trim: true,
            unique: true,
            minlength: [10, 'A tour name must have more or equal than 10 characters!'],
            maxlength: [40, 'A tour name must have less or equal than 40 characters!']
        },
        slug: String,
        duration: {
            type: Number,
            required: [true, 'A tour must have a duration!']
        },
        maxGroupSize: {
            type: Number,
            required: [true, 'A tour must have a group size!']
        },
        difficulty: {
            type: String,
            required: [true, 'A tour must have a difficulty!'],
            enum: {
                values: ['easy', 'medium', 'difficult'],
                message: 'difficulty is either: easy, medium, or difficult!'
            }
        },
        price: {
            type: Number,
            required: [true, 'A tour must have a price!']
        },
        priceDiscount: {
            type: Number,
            validate: {
                validator: function (val) {
                    return val < this.price;
                },
                message: 'Discounted price ({VALUE}) should be less than regular price!'
            }
        },
        ratingsAverage: {
            type: Number,
            default: 4.5,
            min: [1, 'Rating must be above 1.0!'],
            max: [5, 'Rating must be belov 5.0!'],
            set: val => Math.round(val * 10) / 10
        },
        ratingsQuantity: {
            type: Number,
            default: 0
        },
        summary: {
            type: String,
            trim: true,
            required: [true, 'A tour must have a description!']
        },
        description: {
            type: String,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false
        },
        imageCover: {
            type: String,
            required: [true, 'A tour must have a cover image!']
        },
        images: [String],
        startDates: [Date],
        secretTour: {
            type: Boolean,
            default: false,
        },
        startLocation: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point'
            },
            coordinates: [Number],
            description: String,
            address: String
        },
        locations: [
            {
                type: {
                    type: String,
                    enum: ['Point'],
                    default: 'Point'
                },
                coordinates: [Number],
                day: Number,
                address: String,
                description: String
            }
        ],
        guides: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: '2dsphere' });

tourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7;
});

tourSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'tour',
    localField: '_id'
});

tourSchema.pre('save', function (next) {
    if (isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true});
    };
    next();
});

tourSchema.pre(/^find/, function (next) {
    this.find({secretTour: { $ne: true } });
    this.start = Date.now();
    next();
});

tourSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'guides',
        select: '-__v -passwordChangedAt'
    });
    next();
});

tourSchema.post(/^find/, function (docs, next) {
    console.log(`Query took ${Date.now() - this.start} milliseconds!`);
    next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;