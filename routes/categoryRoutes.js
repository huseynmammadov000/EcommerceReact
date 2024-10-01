const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const categories = [
    {
      name: "Books",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/8832/8832880.png"
    },
    {
      name: "Clothing",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/4804/4804045.png"
    },
    {
      name: "Technology",
      imageUrl: "https://e7.pngegg.com/pngimages/3/490/png-clipart-information-technology-computer-icons-technology-technology-computer-icons-thumbnail.png"
    },
    {
      name: "Game",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/8002/8002111.png"
    },
    {
      name: "Toy",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/3082/3082060.png"
    }
  ];
router.get('/', async (req, res) => {
    try {
        console.log(categories)
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;