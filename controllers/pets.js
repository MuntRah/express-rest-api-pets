const Pet = require("../models/pet.js");
const express = require("express");
const router = express.Router();

// POST - /pets
router.post("/", async (req, res) => {
  try {
    const newPet = new Pet(req.body);
    const savedPet = await newPet.save();
    res.status(201).json(savedPet);
  } catch (error) {
    res.status(500).json({ error: error.message }); // 500 Internal Server Error
  }
});

// GET - /pets
router.get("/", async (req, res) => {
  try {
    const foundPets = await Pet.find();
    res.status(200).json(foundPets);
  } catch (error) {
    res.status(500).json({ error: error.message }); // 500 Internal Server Error
  }
});

// GET - /pets/:petId
router.get("/:petId", async (req, res) => {
  try {
    const foundPet = await Pet.findById(req.params.petId);
    if (!foundPet) {
      res.status(404);
      throw new Error("Pet not found.");
    }
    res.status(200).json(foundPet);
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});


router.delete("/:petId", async (req, res) => {
  try {
    const foundPet = await Pet.findByIdAndDelete(req.params.petId);
    if (!foundPet) {
      res.status(404).json({ error: "Pet not found." });
      return;
    }
    res.status(204).json({ message: "Pet deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:petId", async (req, res) => {
  try {
    const foundPet = await Pet.findByIdAndUpdate(req.params.petId);
    if (!foundPet) {
      res.status(404).json({ error: "Pet not found." });
      return;
    }
    res.status(200).json({ message: "Pet updated successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
