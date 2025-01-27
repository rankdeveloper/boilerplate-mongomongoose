const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  favoriteFoods: [String],
});


let Person = mongoose.model('Person', personSchema)

const createAndSavePerson = (done) => {
  const newPerson = new Person({ name: "Freecodecamp", age: 22, favoriteFoods: ["Rajma", "Fish"] })

  newPerson.save((err, data) => {
    if (err) return console.error(err)
    done(null, data);
  })

};
const arrayOfPeople = [
  { name: "Person1", age: 21, favoriteFoods: ["Rajma Chawal"] },
  { name: "Person2", age: 22, favoriteFoods: ["roast chicken"] },
  { name: "Person3", age: 21, favoriteFoods: ["Curi"] }
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople)
    .then((data) => {
      done(null, data);
      console.log("created new person , ", data)
    })
    .catch((err) => {
      console.error(err)
    })


};

const findPeopleByName = (personName, done) => {

  Person.find({ name: personName }, (err, data) => {
    if (err) {

      return done(err);
    }

    done(null, data);
  });
};



const findOneByFood = (food, done) => {

  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) {

      return done(err);
    }

    done(null, data);
  });
};



const findPersonById = (personId, done) => {
  console.log('Person ID:', personId);
  console.log('Done Function:', done);
  Person.findById(personId, (err, data) => {
    if (err) {
      return console.error('Error:', err);

    }
    console.log('Data Found:', data);
    done(null, data);
  });
};



const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  Person.findById(personId, (err, person) => {
    if (err) {
      return done(err);
    }

    if (!person) {
      return done(new Error('Person not found'));
    }

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) {
        return done(err);
      }
      done(null, updatedPerson);
    });
  });
};



const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, updatedPerson) => {
    if (err) {
      return done(err);
    }
    done(null, updatedPerson);
  })


};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) {

      return done(err);
    }

    console.log("Deleted:", data);

    done(null, data);
  });
};


const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  console.log("Attempting to remove people named:", nameToRemove);
  Person.remove({ name: nameToRemove }, (err, res) => {
    if (err) {
      console.error("Error during removal:", err);
      return done(err);
    }
    console.log("Removal successful:", res);
    done(null, res);
  });
};


const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ name: 1, favoriteFoods: 1 })
    .exec((error, res) => {
      if (error) {
        return done(error);
      }

      done(null, res);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
