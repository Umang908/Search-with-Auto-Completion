const pool = require("../config/db");
const redis = require("../config/redis");

exports.getSearchSuggestions = async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: "Query is required" });

  const cachedResults = await redis.get(query);
  if (cachedResults) {
    let returnData = {
        "status" : 200,
        "data" : JSON.parse(cachedResults),
        "message" : "Ok"
      }
    
    return res.json((returnData));
  }

  const [rows] = await pool.execute(
    "SELECT term FROM search_terms WHERE term LIKE ? ORDER BY frequency DESC LIMIT 10",
    [`${query}%`]
  );

  const results = rows.map((row) => row.term);
  redis.setex(query, 3600, JSON.stringify(results));
  let returnData = {
    "status" : 200,
    "data" : results,
    "message" : "Ok"
  }

  res.json(returnData);
};

exports.trackSearchTerm = async (req, res) => {
  const { term } = req.body;
  if (!term) return res.status(400).json({ error: "Search term is required" });

  const [rows] = await pool.execute("SELECT * FROM search_terms WHERE term = ?", [term]);

  if (rows.length > 0) {
    await pool.execute("UPDATE search_terms SET frequency = frequency + 1 WHERE term = ?", [term]);
  } else {
    await pool.execute("INSERT INTO search_terms (term, frequency) VALUES (?, 1)", [term]);
  }

  res.json({ message: "Search term recorded" });
};