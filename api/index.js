// const express = require("express");
// const cors = require("cors");
// require("dotenv").config(); //this pkg require to load links from .env file
// const mongoose = require("mongoose");
// const User = require("./models/User");
// const Place = require("./models/Place");
// const Booking = require('./models/Booking');
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const imageDownloader = require("image-downloader");
// const multer = require("multer");
// const fs = require("fs");
// // The node:fs module enables interacting with the file system in a way modeled on standard POSIX functions.

// const cookieParser = require("cookie-parser");

// const bcryptSalt = bcrypt.genSaltSync(10); // Used for encrypt the password
// const jwtsecret = "fhgefgefgiehfoirhoeiho";

// const app = express();
// app.use(express.json());
// app.use(cookieParser());
// app.use("/uploads", express.static(__dirname + "/uploads"));

// app.use(
//   cors({
//     credentials: true,
//     origin: ["http://localhost:5173", "https://vacation-villa.onrender.com"], // Add your deployed frontend URL here
//     // origin: "http://127.0.0.1:5173", //for communicate with api
//   })
// );


// // console.log(process.env.MONGO_URL)
// mongoose.connect(process.env.MONGO_URL);
// // pass-ofHUOpZMBzVCuaiC

// function getUserDataFromReq(req) {
//   return new Promise((resolve, reject) => {
//     jwt.verify(req.cookies.token, jwtsecret, {}, async (err, userData) => {
//       if(err) throw err;
//       resolve(userData);
//     });
//   });
// }

// app.get("/test", (req, res) => {
//   res.json("All Okay ROHAN !!!");
// });

// app.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const userDoc = await User.create({
//       name,
//       email,
//       password: bcrypt.hashSync(password, bcryptSalt),
//     });

//     res.json(userDoc);
//   } catch (e) {
//     res.status(422).json(e);
//   }
// });

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const userDoc = await User.findOne({ email: email });

//   if (userDoc) {
//     const passOk = bcrypt.compareSync(password, userDoc.password);
//     if (passOk) {
//       jwt.sign(
//         { email: userDoc.email, id: userDoc._id },
//         jwtsecret,
//         {},
//         (err, token) => {
//           if (err) throw err;
//           res.cookie("token", token).json(userDoc);
//         }
//       ); // jwt.sign({payload, secretorPrivateKey, options, callback})
//     } else {
//       res.status(422).json("pass not ok");
//     }
//   } else {
//     res.json("Not found");
//   }
// });

// app.get("/profile", (req, res) => {
//   const { token } = req.cookies;
//   if (token) {
//     jwt.verify(token, jwtsecret, {}, async (err, userData) => {
//       if (err) throw err;
//       const { name, email, _id } = await User.findById(userData.id);
//       res.json({ name, email, _id });
//     });
//   } else {
//     res.json(null);
//   }
// });

// app.post("/logout", (req, res) => {
//   res.cookie("token", "").json(true);
// });

// // console.log(__dirname);
// app.post("/upload-by-link", async (req, res) => {
//   const { link } = req.body;
//   const newName = "photo" + Date.now() + ".jpg";

//   await imageDownloader.image({
//     url: link,
//     dest: __dirname + "/uploads/" + newName,
//   });
//   res.json(newName);
// });

// const photoMiddleware = multer({ dest: "uploads/" });
// app.post("/upload", photoMiddleware.array("photos", 100), (req, res) => {
//   const uploadedFiles = [];
//   for (let i = 0; i < req.files.length; i++) {
//     const { path, originalname } = req.files[i];
//     const parts = originalname.split(".");
//     const ext = parts[parts.length - 1];
//     const newPath = path + "." + ext;
//     fs.renameSync(path, newPath);
//     uploadedFiles.push(newPath.replace("uploads", ""));
//   }
//   res.json(uploadedFiles);
// });

// app.post("/places", (req, res) => {
//   const { token } = req.cookies;
//   const {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price, } = req.body;
//   jwt.verify(token, jwtsecret, {}, async (err, userData) => {
//     if (err) throw err;
//     const placeDoc = await Place.create({
//       owner: userData.id, 
//       title, address, photos: addedPhotos, description, perks, 
//       extraInfo, checkIn, checkOut, maxGuests, price,
//     });
//     res.json(placeDoc);
//   });
// });

// app.get("/user-places", (req, res) => {
//   const { token } = req.cookies;
//   jwt.verify(token, jwtsecret, {}, async (err, userData) => {
//     const {id} = userData;
//     res.json(await Place.find({owner: id}));
//   })

// })

// app.get('/places/:id', async (req, res) => {
//   // res.json(req.params)
//   const {id} = req.params;
//   res.json(await Place.findById(id));
// });

// // app.put('/places', async (req, res) => {
// //   const { token } = req.cookies;
// //   const {id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price,} = req.body;
// //   jwt.verify(token, jwtsecret, {}, async (err, userData) => {
// //     if (err) throw err;
// //     const placeDoc = await Place.findById(id);
    
// //     if(userData.id === placeDoc.owner.toString()) {
// //       placeDoc.set({
// //         title, address, photos:addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price,
// //       });
// //       await placeDoc.save();
// //       res.json('ok')
// //     }
// //   })
// // })

// app.put('/places', async (req, res) => {
//   const { token } = req.cookies;
//   const { id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
//   jwt.verify(token, jwtsecret, {}, async (err, userData) => {
//     if (err) throw err;
//     const placeDoc = await Place.findById(id);
    
//     if (userData.id === placeDoc.owner.toString()) {
//       placeDoc.set({
//         title, address, photos: addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price,
//       });
//       await placeDoc.save();
//       res.json('ok');
//     }
//   });
// });

// app.post('/bookings', async (req, res) => {
//   const userData = await getUserDataFromReq(req);
//   const {
//     place, checkIn, checkOut, numOfGuests, name, phone, price, user,
//   } = req.body;
//   Booking.create({
//     place, checkIn, checkOut, numOfGuests, name, phone, price, user,
//   }).then((doc) => {
//     res.json(doc);
//   }).catch((err) => {
//     throw err;
//   });
// });

// app.get('/bookings', async (req, res) => {
//   const userData = await getUserDataFromReq(req);
//   res.json(await Booking.find({user: userData.id}).populate('place'));
// })

// app.get('/places', async (req, res) => {
//   res.json(await Place.find());
// });

// app.listen(4000); 

const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");
const User = require("./models/User");
const Place = require("./models/Place");
const Booking = require('./models/Booking');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const cookieParser = require("cookie-parser");

const bcryptSalt = bcrypt.genSaltSync(10); // Used for encrypting the password
const jwtsecret = process.env.JWT_SECRET || "default_jwt_secret"; // Use environment variable or default

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://vacation-villa.onrender.com"], // Add your deployed frontend URL here
  })
);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    const token = req.cookies.token;
    if (!token) {
      return reject("Token not provided");
    }

    jwt.verify(token, jwtsecret, {}, (err, userData) => {
      if (err) {
        return reject("Invalid token");
      }
      resolve(userData);
    });
  });
}

app.get("/test", (req, res) => {
  res.json("All Okay ROHAN !!!");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email: email });

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtsecret,
        {},
        (err, token) => {
          if (err) return res.status(500).json({ message: "Internal server error" });
          res.cookie("token", token, { httpOnly: true, sameSite: 'None', secure: true }).json(userDoc);
        }
      ); // jwt.sign({payload, secretOrPrivateKey, options, callback})
    } else {
      res.status(422).json("Incorrect password");
    }
  } else {
    res.status(404).json("User not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  jwt.verify(token, jwtsecret, {}, async (err, userData) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    try {
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    } catch (e) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "", { expires: new Date(0), httpOnly: true, sameSite: 'None', secure: true }).json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";

  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photoMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photoMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads", ""));
  }
  res.json(uploadedFiles);
});

app.post("/places", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  jwt.verify(token, jwtsecret, {}, async (err, userData) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
    try {
      const placeDoc = await Place.create({
        owner: userData.id,
        title, address, photos: addedPhotos, description, perks,
        extraInfo, checkIn, checkOut, maxGuests, price,
      });
      res.json(placeDoc);
    } catch (e) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
});

app.get("/user-places", (req, res) => {
  getUserDataFromReq(req)
    .then(async (userData) => {
      const { id } = userData;
      res.json(await Place.find({ owner: id }));
    })
    .catch((err) => {
      res.status(401).json({ message: err });
    });
});

app.get('/places/:id', async (req, res) => {
  const { id } = req.params;
  try {
    res.json(await Place.findById(id));
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put('/places', async (req, res) => {
  const { token } = req.cookies;
  const { id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  jwt.verify(token, jwtsecret, {}, async (err, userData) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    try {
      const placeDoc = await Place.findById(req.body.id);
      if (userData.id === placeDoc.owner.toString()) {
        placeDoc.set({
          title, address, photos: req.body.addedPhotos, description, perks,
          extraInfo, checkIn, checkOut, maxGuests, price,
        });
        await placeDoc.save();
        res.json('ok');
      } else {
        res.status(403).json({ message: "Unauthorized" });
      }
    } catch (e) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
});

app.post('/bookings', async (req, res) => {
  getUserDataFromReq(req)
    .then(async (userData) => {
      const { place, checkIn, checkOut, numOfGuests, name, phone, price } = req.body;
      try {
        const bookingDoc = await Booking.create({
          place, checkIn, checkOut, numOfGuests, name, phone, price, user: userData.id,
        });
        res.json(bookingDoc);
      } catch (e) {
        res.status(500).json({ message: "Internal server error" });
      }
    })
    .catch((err) => {
      res.status(401).json({ message: err });
    });
});

app.get('/bookings', async (req, res) => {
  getUserDataFromReq(req)
    .then(async (userData) => {
      res.json(await Booking.find({ user: userData.id }).populate('place'));
    })
    .catch((err) => {
      res.status(401).json({ message: err });
    });
});

app.get('/places', async (req, res) => { 
  try {
    res.json(await Place.find());
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});