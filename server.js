const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const { loadContact, findContact } = require("./utils/contacts");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(morgan("dev"));

//Built-in middleware
app.use(express.static("public"));

//Application level middleware
app.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

app.get("/", (req, res) => {
  res.status(200);
  const mahasiswa = [
    {
      nama: "Beni",
      email: "beni@gmail.com",
    },

    {
      nama: "Budi",
      email: "budi@gmail.com",
    },
  ];

  res.render("index", {
    nama: "Rifky Zaini Faroj",
    title: "Halaman Index",
    layout: "index",
    mahasiswa: mahasiswa,
  });
  // res.sendFile('./index.html',{root: __dirname})
});

app.get("/about", (req, res) => {
  res.status(200);
  res.render("about", {
    layout: "about",
    title: "Halaman About",
  });
  // res.sendFile('./about.html',{root: __dirname})
});

app.get("/contact", (req, res) => {
  res.status(200);
  const contacts = loadContact();
  res.render("contact", {
    layout: "contact",
    title: "Halaman Contact",
    contacts,
  });
  // res.sendFile('./contact.html',{root: __dirname})
});

app.get("/contact/:nama", (req, res) => {
  res.status(200);
  const contact = findContact(req.params.nama);
  res.render("detail", {
    layout: "detail",
    title: "Halaman Detail",
    contact,
  });
  // res.sendFile('./contact.html',{root: __dirname})
});

app.get("/product/:id", (req, res) => {
  res.send(
    `Product ID: ${req.params.id} and Label Product: ${req.query.label}`
  );
});

app.get("/product/:id/category/:idCat", (req, res) => {
  res.send(`Product ID: ${req.params.id} and Category ID: ${req.params.idCat}`);
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
