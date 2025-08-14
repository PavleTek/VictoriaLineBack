const express = require("express");
const { authMiddleware } = require("../auth");
const {
  getAllChileanCompanies,
  getChileanCompanyById,
  getChileanCompanyByRut,
  createChileanCompany,
  updateChileanCompany,
  deleteChileanCompany,
  getUserDesignatedCompanies,
  searchChileanCompanies,
} = require("../services/chileanCompanyService");
const { getAllUsers } = require("../services/userService");

const router = express.Router();

// Get users for company assignment (vendors and operators)
router.get("/chilean-companies/assignable-users", authMiddleware, async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error fetching assignable users:", error);
    res.status(500).json({ error: "Failed to fetch assignable users" });
  }
});

// Get all Chilean companies
router.get("/chilean-companies", authMiddleware, async (req, res) => {
  try {
    const companies = await getAllChileanCompanies();
    res.json(companies);
  } catch (error) {
    console.error("Error fetching Chilean companies:", error);
    res.status(500).json({ error: "Failed to fetch Chilean companies" });
  }
});

// Get user's designated companies
router.get(
  "/chilean-companies/my-companies",
  authMiddleware,
  async (req, res) => {
    try {
      const companies = await getUserDesignatedCompanies(req.user.id);
      res.json(companies);
    } catch (error) {
      console.error("Error fetching user designated companies:", error);
      res
        .status(500)
        .json({ error: "Failed to fetch user designated companies" });
    }
  }
);

// Get a single Chilean company by ID
router.get("/chilean-companies/:id", authMiddleware, async (req, res) => {
  try {
    const company = await getChileanCompanyById(req.params.id);
    if (!company) {
      return res.status(404).json({ error: "Chilean company not found" });
    }
    res.json(company);
  } catch (error) {
    console.error("Error fetching Chilean company:", error);
    res.status(500).json({ error: "Failed to fetch Chilean company" });
  }
});

// Get a Chilean company by RUT
router.get("/chilean-companies/rut/:rut", authMiddleware, async (req, res) => {
  try {
    const company = await getChileanCompanyByRut(req.params.rut);
    if (!company) {
      return res.status(404).json({ error: "Chilean company not found" });
    }
    res.json(company);
  } catch (error) {
    console.error("Error fetching Chilean company by RUT:", error);
    res.status(500).json({ error: "Failed to fetch Chilean company" });
  }
});

// Search Chilean companies
router.get(
  "/chilean-companies/search/:term",
  authMiddleware,
  async (req, res) => {
    try {
      const companies = await searchChileanCompanies(req.params.term);
      res.json(companies);
    } catch (error) {
      console.error("Error searching Chilean companies:", error);
      res.status(500).json({ error: "Failed to search Chilean companies" });
    }
  }
);

// Create a new Chilean company
router.post("/chilean-companies", authMiddleware, async (req, res) => {
  try {
    const companyData = req.body;

    // Basic validation - at least one identifier should be provided
    if (!companyData.name && !companyData.rut) {
      return res
        .status(400)
        .json({ error: "Either name or RUT must be provided" });
    }

    // Check for duplicate RUT only if RUT is provided and not empty
    if (companyData.rut && companyData.rut.trim() !== '') {
      const existingCompany = await getChileanCompanyByRut(companyData.rut);
      if (existingCompany) {
        return res
          .status(409)
          .json({ error: "A company with this RUT already exists" });
      }
    }

    const company = await createChileanCompany(companyData);
    res.status(201).json(company);
  } catch (error) {
    console.error("Error creating Chilean company:", error);
    res.status(500).json({ error: "Failed to create Chilean company" });
  }
});

// Update a Chilean company
router.put("/chilean-companies/:id", authMiddleware, async (req, res) => {
  try {
    console.log("trying to update company");
    const companyData = req.body;

    // Basic validation - at least one identifier should be provided
    if (!companyData.name && !companyData.rut) {
      return res
        .status(400)
        .json({ error: "Either name or RUT must be provided" });
    }

    // Check if company exists
    const existingCompany = await getChileanCompanyById(req.params.id);
    if (!existingCompany) {
      return res.status(404).json({ error: "Chilean company not found" });
    }

    // Check for duplicate RUT only if RUT is provided, not empty, and being changed
    if (companyData.rut && companyData.rut.trim() !== '' && companyData.rut !== existingCompany.rut) {
      const companyWithRut = await getChileanCompanyByRut(companyData.rut);
      if (companyWithRut) {
        return res
          .status(409)
          .json({ error: "A company with this RUT already exists" });
      }
    }

    const company = await updateChileanCompany(req.params.id, companyData);
    res.json(company);
  } catch (error) {
    console.error("Error updating Chilean company:", error);
    res.status(500).json({ error: "Failed to update Chilean company" });
  }
});

// Delete a Chilean company
router.delete("/chilean-companies/:id", authMiddleware, async (req, res) => {
  try {
    // Check if company exists
    const existingCompany = await getChileanCompanyById(req.params.id);
    if (!existingCompany) {
      return res.status(404).json({ error: "Chilean company not found" });
    }

    await deleteChileanCompany(req.params.id);
    res.json({ message: "Chilean company deleted successfully" });
  } catch (error) {
    console.error("Error deleting Chilean company:", error);
    res.status(500).json({ error: "Failed to delete Chilean company" });
  }
});

module.exports = router;
