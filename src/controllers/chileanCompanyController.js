const express = require('express');
const { authMiddleware } = require('../auth');
const {
  getAllChileanCompanies,
  getChileanCompanyById,
  getChileanCompanyByRut,
  createChileanCompany,
  updateChileanCompany,
  deleteChileanCompany,
  searchChileanCompanies
} = require('../services/chileanCompanyService');

const router = express.Router();

// Get all Chilean companies
router.get('/chilean-companies', authMiddleware, async (req, res) => {
  try {
    const companies = await getAllChileanCompanies();
    res.json(companies);
  } catch (error) {
    console.error('Error fetching Chilean companies:', error);
    res.status(500).json({ error: 'Failed to fetch Chilean companies' });
  }
});

// Get a single Chilean company by ID
router.get('/chilean-companies/:id', authMiddleware, async (req, res) => {
  try {
    const company = await getChileanCompanyById(req.params.id);
    if (!company) {
      return res.status(404).json({ error: 'Chilean company not found' });
    }
    res.json(company);
  } catch (error) {
    console.error('Error fetching Chilean company:', error);
    res.status(500).json({ error: 'Failed to fetch Chilean company' });
  }
});

// Get a Chilean company by RUT
router.get('/chilean-companies/rut/:rut', authMiddleware, async (req, res) => {
  try {
    const company = await getChileanCompanyByRut(req.params.rut);
    if (!company) {
      return res.status(404).json({ error: 'Chilean company not found' });
    }
    res.json(company);
  } catch (error) {
    console.error('Error fetching Chilean company by RUT:', error);
    res.status(500).json({ error: 'Failed to fetch Chilean company' });
  }
});

// Search Chilean companies
router.get('/chilean-companies/search/:term', authMiddleware, async (req, res) => {
  try {
    const companies = await searchChileanCompanies(req.params.term);
    res.json(companies);
  } catch (error) {
    console.error('Error searching Chilean companies:', error);
    res.status(500).json({ error: 'Failed to search Chilean companies' });
  }
});

// Create a new Chilean company
router.post('/chilean-companies', authMiddleware, async (req, res) => {
  try {
    const { name, rut, iataCode, siiResolutionNumber, siiResolutionDate, electronicInvoiceEnabled, socialReason, address, field, email, phoneNumber } = req.body;

    // Validate required fields
    if (!name || !rut) {
      return res.status(400).json({ error: 'Name and RUT are required' });
    }

    // Validate RUT format (9 characters, can end with K)
    const rutRegex = /^[0-9]{8}[0-9K]$/;
    if (!rutRegex.test(rut)) {
      return res.status(400).json({ error: 'RUT must be 9 characters long and can end with K' });
    }

    // Check if company with this RUT already exists
    const existingCompany = await getChileanCompanyByRut(rut);
    if (existingCompany) {
      return res.status(409).json({ error: 'A company with this RUT already exists' });
    }

    const company = await createChileanCompany({
      name,
      rut,
      iataCode,
      siiResolutionNumber,
      siiResolutionDate,
      electronicInvoiceEnabled,
      socialReason,
      address,
      field,
      email,
      phoneNumber
    });

    res.status(201).json(company);
  } catch (error) {
    console.error('Error creating Chilean company:', error);
    res.status(500).json({ error: 'Failed to create Chilean company' });
  }
});

// Update a Chilean company
router.put('/chilean-companies/:id', authMiddleware, async (req, res) => {
  try {
    const { name, rut, iataCode, siiResolutionNumber, siiResolutionDate, electronicInvoiceEnabled, socialReason, address, field, email, phoneNumber } = req.body;

    // Validate required fields
    if (!name || !rut) {
      return res.status(400).json({ error: 'Name and RUT are required' });
    }

    // Validate RUT format
    const rutRegex = /^[0-9]{8}[0-9K]$/;
    if (!rutRegex.test(rut)) {
      return res.status(400).json({ error: 'RUT must be 9 characters long and can end with K' });
    }

    // Check if company exists
    const existingCompany = await getChileanCompanyById(req.params.id);
    if (!existingCompany) {
      return res.status(404).json({ error: 'Chilean company not found' });
    }

    // Check if RUT is being changed and if it conflicts with another company
    if (rut !== existingCompany.rut) {
      const companyWithRut = await getChileanCompanyByRut(rut);
      if (companyWithRut) {
        return res.status(409).json({ error: 'A company with this RUT already exists' });
      }
    }

    const company = await updateChileanCompany(req.params.id, {
      name,
      rut,
      iataCode,
      siiResolutionNumber,
      siiResolutionDate,
      electronicInvoiceEnabled,
      socialReason,
      address,
      field,
      email,
      phoneNumber
    });

    res.json(company);
  } catch (error) {
    console.error('Error updating Chilean company:', error);
    res.status(500).json({ error: 'Failed to update Chilean company' });
  }
});

// Delete a Chilean company
router.delete('/chilean-companies/:id', authMiddleware, async (req, res) => {
  try {
    // Check if company exists
    const existingCompany = await getChileanCompanyById(req.params.id);
    if (!existingCompany) {
      return res.status(404).json({ error: 'Chilean company not found' });
    }

    await deleteChileanCompany(req.params.id);
    res.json({ message: 'Chilean company deleted successfully' });
  } catch (error) {
    console.error('Error deleting Chilean company:', error);
    res.status(500).json({ error: 'Failed to delete Chilean company' });
  }
});

module.exports = router; 