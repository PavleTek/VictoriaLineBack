const express = require('express');
const { authMiddleware } = require('../auth');
const {
  createSeaQuote,
  getSeaQuotes,
  getSeaQuoteById,
  updateSeaQuote,
  deleteSeaQuote,
  createAirQuote,
  getAirQuotes,
  createLandQuote,
  getLandQuotes,
  getDropdownData,
  getVendorUsers,
  getOperatorUsers
} = require('../services/quotationService');

const router = express.Router();

// Get dropdown data for forms
router.get('/quotations/dropdown-data', authMiddleware, async (req, res) => {
  try {
    const data = await getDropdownData();
    res.json(data);
  } catch (error) {
    console.error('Error fetching dropdown data:', error);
    res.status(500).json({ error: 'Failed to fetch dropdown data' });
  }
});

// Get vendor users
router.get('/quotations/vendors', authMiddleware, async (req, res) => {
  try {
    const vendors = await getVendorUsers();
    res.json(vendors);
  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.status(500).json({ error: 'Failed to fetch vendors' });
  }
});

// Get operator users
router.get('/quotations/operators', authMiddleware, async (req, res) => {
  try {
    const operators = await getOperatorUsers();
    res.json(operators);
  } catch (error) {
    console.error('Error fetching operators:', error);
    res.status(500).json({ error: 'Failed to fetch operators' });
  }
});

// SEA QUOTE ROUTES

// Get sea quotes with pagination and filters
router.get('/quotations/sea', authMiddleware, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 15,
      myQuotes = false,
      status,
      clientType,
      clientChileanCompanyId,
      clientContactPersonId,
      designatedVendorId,
      designatedOperatorId
    } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      userId: req.user.id,
      myQuotes: myQuotes === 'true',
      filters: {
        status,
        clientType,
        clientChileanCompanyId,
        clientContactPersonId,
        designatedVendorId,
        designatedOperatorId
      }
    };

    // Remove undefined filters
    Object.keys(options.filters).forEach(key => {
      if (options.filters[key] === undefined || options.filters[key] === '') {
        delete options.filters[key];
      }
    });

    const result = await getSeaQuotes(options);
    res.json(result);
  } catch (error) {
    console.error('Error fetching sea quotes:', error);
    res.status(500).json({ error: 'Failed to fetch sea quotes' });
  }
});

// Get single sea quote
router.get('/quotations/sea/:id', authMiddleware, async (req, res) => {
  try {
    const quote = await getSeaQuoteById(req.params.id);
    if (!quote) {
      return res.status(404).json({ error: 'Sea quote not found' });
    }
    res.json(quote);
  } catch (error) {
    console.error('Error fetching sea quote:', error);
    res.status(500).json({ error: 'Failed to fetch sea quote' });
  }
});

// Create sea quote
router.post('/quotations/sea', authMiddleware, async (req, res) => {
  try {
    const quote = await createSeaQuote(req.body, req.user.id);
    res.status(201).json(quote);
  } catch (error) {
    console.error('Error creating sea quote:', error);
    res.status(400).json({ error: error.message || 'Failed to create sea quote' });
  }
});

// Update sea quote
router.put('/quotations/sea/:id', authMiddleware, async (req, res) => {
  try {
    const quote = await updateSeaQuote(req.params.id, req.body, req.user.id);
    res.json(quote);
  } catch (error) {
    console.error('Error updating sea quote:', error);
    res.status(400).json({ error: error.message || 'Failed to update sea quote' });
  }
});

// Delete sea quote
router.delete('/quotations/sea/:id', authMiddleware, async (req, res) => {
  try {
    const result = await deleteSeaQuote(req.params.id);
    res.json(result);
  } catch (error) {
    console.error('Error deleting sea quote:', error);
    res.status(400).json({ error: error.message || 'Failed to delete sea quote' });
  }
});

// AIR QUOTE ROUTES (Placeholders)

// Get air quotes
router.get('/quotations/air', authMiddleware, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 15,
      myQuotes = false
    } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      userId: req.user.id,
      myQuotes: myQuotes === 'true'
    };

    const result = await getAirQuotes(options);
    res.json(result);
  } catch (error) {
    console.error('Error fetching air quotes:', error);
    res.status(500).json({ error: 'Failed to fetch air quotes' });
  }
});

// Create air quote (placeholder)
router.post('/quotations/air', authMiddleware, async (req, res) => {
  try {
    const quote = await createAirQuote(req.body, req.user.id);
    res.status(201).json(quote);
  } catch (error) {
    console.error('Error creating air quote:', error);
    res.status(400).json({ error: error.message || 'Failed to create air quote' });
  }
});

// LAND QUOTE ROUTES (Placeholders)

// Get land quotes
router.get('/quotations/land', authMiddleware, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 15,
      myQuotes = false
    } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      userId: req.user.id,
      myQuotes: myQuotes === 'true'
    };

    const result = await getLandQuotes(options);
    res.json(result);
  } catch (error) {
    console.error('Error fetching land quotes:', error);
    res.status(500).json({ error: 'Failed to fetch land quotes' });
  }
});

// Create land quote (placeholder)
router.post('/quotations/land', authMiddleware, async (req, res) => {
  try {
    const quote = await createLandQuote(req.body, req.user.id);
    res.status(201).json(quote);
  } catch (error) {
    console.error('Error creating land quote:', error);
    res.status(400).json({ error: error.message || 'Failed to create land quote' });
  }
});

module.exports = router;
