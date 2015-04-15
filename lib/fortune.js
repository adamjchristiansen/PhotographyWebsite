var fortunes = [ 
    "conquer your fears or they will conquer you", 
    "do not fear what you don't know", 
    "you will win a million dollars",
    "you will have a scarry dream tonight"
];

exports.getFortune = function() {
    return fortunes[Math.floor(Math.random() * fortunes.length)];
};