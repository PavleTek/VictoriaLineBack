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

// PurchaseClause routes
router.get("/purchase-clauses", async (req, res) => {
  try {
    const purchaseClauses = await mantenedoresService.getAllPurchaseClauses();
    res.json(purchaseClauses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/purchase-clauses/:id", async (req, res) => {
  try {
    const purchaseClause = await mantenedoresService.getPurchaseClauseById(req.params.id);
    res.json(purchaseClause);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/purchase-clauses", async (req, res) => {
  try {
    const purchaseClause = await mantenedoresService.createPurchaseClause(req.body);
    res.status(201).json(purchaseClause);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/purchase-clauses/:id", async (req, res) => {
  try {
    const purchaseClause = await mantenedoresService.updatePurchaseClause(
      req.params.id,
      req.body
    );
    res.json(purchaseClause);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/purchase-clauses/:id", async (req, res) => {
  try {
    const result = await mantenedoresService.deletePurchaseClause(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// CargoCondition routes
router.get("/cargo-conditions", async (req, res) => {
  try {
    const cargoConditions = await mantenedoresService.getAllCargoConditions();
    res.json(cargoConditions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/cargo-conditions/:id", async (req, res) => {
  try {
    const cargoCondition = await mantenedoresService.getCargoConditionById(req.params.id);
    res.json(cargoCondition);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/cargo-conditions", async (req, res) => {
  try {
    const cargoCondition = await mantenedoresService.createCargoCondition(req.body);
    res.status(201).json(cargoCondition);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/cargo-conditions/:id", async (req, res) => {
  try {
    const cargoCondition = await mantenedoresService.updateCargoCondition(
      req.params.id,
      req.body
    );
    res.json(cargoCondition);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/cargo-conditions/:id", async (req, res) => {
  try {
    const result = await mantenedoresService.deleteCargoCondition(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// FreightCondition routes
router.get("/freight-conditions", async (req, res) => {
  try {
    const freightConditions = await mantenedoresService.getAllFreightConditions();
    res.json(freightConditions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/freight-conditions/:id", async (req, res) => {
  try {
    const freightCondition = await mantenedoresService.getFreightConditionById(req.params.id);
    res.json(freightCondition);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/freight-conditions", async (req, res) => {
  try {
    const freightCondition = await mantenedoresService.createFreightCondition(req.body);
    res.status(201).json(freightCondition);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/freight-conditions/:id", async (req, res) => {
  try {
    const freightCondition = await mantenedoresService.updateFreightCondition(
      req.params.id,
      req.body
    );
    res.json(freightCondition);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/freight-conditions/:id", async (req, res) => {
  try {
    const result = await mantenedoresService.deleteFreightCondition(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// CargoType routes
router.get("/cargo-types", async (req, res) => {
  try {
    const cargoTypes = await mantenedoresService.getAllCargoTypes();
    res.json(cargoTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/cargo-types/:id", async (req, res) => {
  try {
    const cargoType = await mantenedoresService.getCargoTypeById(req.params.id);
    res.json(cargoType);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/cargo-types", async (req, res) => {
  try {
    const cargoType = await mantenedoresService.createCargoType(req.body);
    res.status(201).json(cargoType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/cargo-types/:id", async (req, res) => {
  try {
    const cargoType = await mantenedoresService.updateCargoType(
      req.params.id,
      req.body
    );
    res.json(cargoType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/cargo-types/:id", async (req, res) => {
  try {
    const result = await mantenedoresService.deleteCargoType(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Incoterm routes
router.get("/incoterms", async (req, res) => {
  try {
    const incoterms = await mantenedoresService.getAllIncoterms();
    res.json(incoterms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/incoterms/:id", async (req, res) => {
  try {
    const incoterm = await mantenedoresService.getIncotermById(req.params.id);
    res.json(incoterm);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/incoterms", async (req, res) => {
  try {
    const incoterm = await mantenedoresService.createIncoterm(req.body);
    res.status(201).json(incoterm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/incoterms/:id", async (req, res) => {
  try {
    const incoterm = await mantenedoresService.updateIncoterm(
      req.params.id,
      req.body
    );
    res.json(incoterm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/incoterms/:id", async (req, res) => {
  try {
    const result = await mantenedoresService.deleteIncoterm(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Airport routes
router.get("/airports", async (req, res) => {
  try {
    const airports = await mantenedoresService.getAllAirports();
    res.json(airports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/airports/:id", async (req, res) => {
  try {
    const airport = await mantenedoresService.getAirportById(req.params.id);
    res.json(airport);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/airports", async (req, res) => {
  try {
    const airport = await mantenedoresService.createAirport(req.body);
    res.status(201).json(airport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/airports/:id", async (req, res) => {
  try {
    const airport = await mantenedoresService.updateAirport(
      req.params.id,
      req.body
    );
    res.json(airport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/airports/:id", async (req, res) => {
  try {
    const result = await mantenedoresService.deleteAirport(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Warehouse routes
router.get("/warehouses", async (req, res) => {
  try {
    const warehouses = await mantenedoresService.getAllWarehouses();
    res.json(warehouses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/warehouses/:id", async (req, res) => {
  try {
    const warehouse = await mantenedoresService.getWarehouseById(req.params.id);
    res.json(warehouse);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/warehouses", async (req, res) => {
  try {
    const warehouse = await mantenedoresService.createWarehouse(req.body);
    res.status(201).json(warehouse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/warehouses/:id", async (req, res) => {
  try {
    const warehouse = await mantenedoresService.updateWarehouse(
      req.params.id,
      req.body
    );
    res.json(warehouse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/warehouses/:id", async (req, res) => {
  try {
    const result = await mantenedoresService.deleteWarehouse(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PackageType routes
router.get("/package-types", async (req, res) => {
  try {
    const packageTypes = await mantenedoresService.getAllPackageTypes();
    res.json(packageTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/package-types/:id", async (req, res) => {
  try {
    const packageType = await mantenedoresService.getPackageTypeById(req.params.id);
    res.json(packageType);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/package-types", async (req, res) => {
  try {
    const packageType = await mantenedoresService.createPackageType(req.body);
    res.status(201).json(packageType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/package-types/:id", async (req, res) => {
  try {
    const packageType = await mantenedoresService.updatePackageType(
      req.params.id,
      req.body
    );
    res.json(packageType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/package-types/:id", async (req, res) => {
  try {
    const result = await mantenedoresService.deletePackageType(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
