const { Router } = require("express");
const router = Router();
const { Activity, Country } = require("../db");

router.get("/", async (req, res) => {
  const { name } = req.query;
  let countries = await Country.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt","capital","subregion","area",],
    },
    include: [
      {
        model: Activity,
        attributes: {
          exclude: ["id", "createdAt", "updatedAt",], 
        },
      },
    ],
  });
  try {
    if (name) {
      countries = countries.filter((c) =>
        c.name.toLowerCase().includes(name.toLowerCase())
      );
      if (countries.length === 0) {
        return res.status(404).send("Country not found");
      }
    }
    return res.status(200).send(countries);
  } catch (error) {
    return res.status(400).send("Countries could not load properly");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const countries = await Country.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Activity,
            attributes: {
              exclude: ["id", "createdAt", "updatedAt",], 
            },
          },
        ],
      });
      const countryById = countries.filter((c) =>
        c.id.toLowerCase().includes(id.toLowerCase())
      );
      if (countryById.length === 0) {
        {
          return res.status(404).send("Country not found");
        }
      }
      return res.status(200).send(countryById);
    }
  } catch (error) {
    return res.status(400).send("Country could not load properly");
  }
});

module.exports = router;
