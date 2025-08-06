const express = require("express");
const router = express.Router();
const mantenedoresService = require("../services/mantenedoresService");

// Contact Person routes
router.get("/contact-persons", async (req, res) => {
  console.log("this function is being called to get contact persons");
  try {
    const contactPersons = await mantenedoresService.getAllContactPersons();
    console.log("ContactPersons:", contactPersons);
    res.json(contactPersons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/contact-persons/:id", async (req, res) => {
  try {
    const contactPerson = await mantenedoresService.getContactPersonById(
      req.params.id
    );
    res.json(contactPerson);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/contact-persons", async (req, res) => {
  try {
    const contactPerson = await mantenedoresService.createContactPerson(
      req.body
    );
    res.status(201).json(contactPerson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/contact-persons/:id", async (req, res) => {
  try {
    const contactPerson = await mantenedoresService.updateContactPerson(
      req.params.id,
      req.body
    );
    res.json(contactPerson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/contact-persons/:id", async (req, res) => {
  try {
    const result = await mantenedoresService.deleteContactPerson(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Contact Type routes
router.get("/contact-types", async (req, res) => {
  try {
    const contactTypes = await mantenedoresService.getAllContactTypes();
    res.json(contactTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/contact-types/:id", async (req, res) => {
  try {
    const contactType = await mantenedoresService.getContactTypeById(
      req.params.id
    );
    res.json(contactType);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/contact-types", async (req, res) => {
  try {
    const contactType = await mantenedoresService.createContactType(
      req.body
    );
    res.status(201).json(contactType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/contact-types/:id", async (req, res) => {
  try {
    const contactType = await mantenedoresService.updateContactType(
      req.params.id,
      req.body
    );
    res.json(contactType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/contact-types/:id", async (req, res) => {
  try {
    const result = await mantenedoresService.deleteContactType(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Port routes
router.get("/ports", async (req, res) => {
  try {
    const ports = await mantenedoresService.getAllPorts();
    res.json(ports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/ports/:id", async (req, res) => {
  try {
    const port = await mantenedoresService.getPortById(req.params.id);
    res.json(port);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/ports", async (req, res) => {
  try {
    const port = await mantenedoresService.createPort(req.body);
    res.status(201).json(port);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/ports/:id", async (req, res) => {
  try {
    const port = await mantenedoresService.updatePort(
      req.params.id,
      req.body
    );
    res.json(port);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/ports/:id", async (req, res) => {
  try {
    const result = await mantenedoresService.deletePort(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Vessel routes
router.get("/vessels", async (req, res) => {
  try {
    const vessels = await mantenedoresService.getAllVessels();
    res.json(vessels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/vessels/:id", async (req, res) => {
  try {
    const vessel = await mantenedoresService.getVesselById(req.params.id);
    res.json(vessel);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/vessels", async (req, res) => {
  try {
    const vessel = await mantenedoresService.createVessel(req.body);
    res.status(201).json(vessel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/vessels/:id", async (req, res) => {
  try {
    const vessel = await mantenedoresService.updateVessel(
      req.params.id,
      req.body
    );
    res.json(vessel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/vessels/:id", async (req, res) => {
  try {
    const result = await mantenedoresService.deleteVessel(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
