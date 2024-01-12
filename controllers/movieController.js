const movieModel = require("../models/data");
const fs = require("fs");
const path = require("path");

const viewMovie = async (req, res) => {
  try {
    let record = await movieModel.find({});
    return res.render("index", {
      record,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

// const viewMovie = async (req, res) => {
//     try {
//       let record = await movieModel.find({});
//       let single = null; // Initialize single to null
  
//       // Check if query parameter 'id' is present and try to find the movie
//       if (req.query.id) {
//         single = await movieModel.findById(req.query.id);
  
//         // Check if the movie with the given ID exists
//         if (!single) {
//           return res.status(404).send('Movie not found');
//         }
//       }
  
//       return res.render("index", {
//         record,
//         single
//       });
//     } catch (err) {
//       console.log(err);
//       return res.status(500).send("Internal Server Error");
//     }
//   };
  
const addMovie = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!name || !description || !price) {
      console.log("All fields are required for add data");
      return res.status(400).send("All fields are required");
    }

    let movieAdd = await movieModel.create({
      name,
      description,
      price,
      img: req.file.path,
    });

    if (movieAdd) {
      return res.redirect("/");
    } else {
      return res.status(500).send("Internal Server Error");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const deleteMovie = async (req, res) => {
  try {
    let deleterecord = await movieModel.findById(req.query.id);

    fs.unlinkSync(deleterecord.img);

    let deleteMovies = await movieModel.findByIdAndDelete(req.query.id);
    return res.redirect("back");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};


// const editData = async (req, res) => {
//     try {
//         let id = req.query.id;
//         let single = await movieModel.findById(id);

//         // Check if the movie with the given ID exists
//         if (!single) {
//             return res.status(404).send('Movie not found');
//         }

//         return res.render('index', { record: [single] }); // Pass the movie as a single-element array
//     } catch (err) {
//         console.log(err);
//         return res.status(500).send('Internal Server Error');
//     }
// };

const editData = async(req,res) => {
    try{
        let id=  req.query.id;
        let single = await movieModel.findById(id);
        return res.render('edit',{single});
    }catch(err){
        console.log(err);
        return false;
    }
}
const updateRecord = async (req, res) => {
    try {
        let updateFields = {
            name: req.body.name,
            phone: req.body.phone,
            description: req.body.description,
            price: req.body.price,
        };

        if (req.file) {
            let old = await movieModel.findById(req.body.id);
            fs.unlinkSync(old.img);
            updateFields.img = req.file.path;
        }

        let up = await movieModel.findByIdAndUpdate(req.body.id, updateFields);

        if (up) {
            console.log("Record update");
            return res.redirect('/');
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

// const updateRecord = async(req,res) => {
//     try{
//         if(req.file){
//             let old = await movieModel.findById(req.body.id);
//             fs.unlinkSync(old.img);
//             let up = await movieModel.findByIdAndUpdate(req.body.id,{
//                 name : req.body.name,
//                 img : req.file.path,
//                 phone : req.body.phone,
//                 description : req.body.description,
//                 price : req.body.price,
//             });
//             console.log(up);
//             if(up){
//                 console.log("record update");
//                 return res.redirect('/');
//             }
//         }else{

//         }
//     }catch(err){
//         console.log(err);
//         return false;
//     }
// }

module.exports = {
  viewMovie,
  addMovie,
  deleteMovie,
  editData,
  updateRecord,
};
