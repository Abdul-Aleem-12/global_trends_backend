import Data from '../models/Data.js';

export const getAllData = async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
export const filterData = async (req, res) => {
  try {
    const query = {};

    // Dynamically build query based on provided query params
    if (req.query.topic) query.topic = req.query.topic;
    if (req.query.region) query.region = req.query.region;
    if (req.query.sector) query.sector = req.query.sector;
    if (req.query.pestle) query.pestle = req.query.pestle;
    if (req.query.source) query.source = req.query.source;
    if (req.query.country) query.country = req.query.country;
    if (req.query.city) query.city = req.query.city;
    if (req.query.swot) query.swot = req.query.swot;
    if (req.query.start_year) query.start_year = Number(req.query.start_year);
    if (req.query.end_year) query.end_year = req.query.end_year;

    const data = await Data.find(query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const getSummary = async(req,res) => {
    
};
