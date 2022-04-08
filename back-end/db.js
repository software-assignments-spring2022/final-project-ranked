const mongoose = require('mongoose'),
URLSlugs = require('mongoose-url-slugs');
//passportLocalMongoose = require('passport-local-mongoose');

mongoose.pluralize(null);

const User = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String},
  likedPost:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  likedComment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const Megathread = new mongoose.Schema({ 
	megathreadID: {type: Number, required: true},
	posts: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
}, {
	_id: true
});

const Post = new mongoose.Schema({
    game_id: {type: Number, required: true},
    user_id: {type: String, required: true},
    post_id: {type: Number, requireed: true},
    title: {type: String},
    body: {type: String},
    tags: [{type: String}],
    time: {type: String},
    likes: {type: Number},
    likedUsers: [],
    image: {type: String},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
  });


const Comment = new mongoose.Schema({ 
    comment_id: {type: String, required: true},
    user_id: {type: String, required: true},
    text: {type: String, requireed: true},
    time: {type: String},
    likes: {type: Number},
    likedUsers: [{type: String}],
    image: {type: String},
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});


//User.plugin(passportLocalMongoose);

mongoose.model('User', User);
mongoose.model('Comment', Comment);
mongoose.model('Post', Post);
mongoose.model('Megathread', Megathread);


/*
mongoose.connect('mongodb://localhost:3000/ranked', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to database'); 
    
  }
});
*/