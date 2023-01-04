const { Router } = require("express");
const router = Router();
const { Activity, Country } = require("../db");





router.get("/", async (req, res) => {
  const { name } = req.query;
  let activity = await Activity.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt",],
    },
    include: [
      {
        model: Country,
        attributes: {
          exclude: ["id", "createdAt", "updatedAt",], 
        },
      },
    ],
  });
  try {
    if (name) {
      activity = activity.filter((a) =>
        a.name.toLowerCase().includes(name.toLowerCase())
      );
      if (activity.length === 0) {
        return res.status(404).send("Activity not found");
      }
    }
    return res.status(200).send(activity);
  } catch (error) {
    return res.status(400).send("Activities could not load properly");
  }
});






router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const activity = await Activity.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        }
      });
      const activityById = activity.filter((a) =>
        a.id.toLowerCase().includes(id.toLowerCase())
      );
      if (activityById.length === 0) {
        {
          return res.status(404).send("Activity not found");
        }
      }
      return res.status(200).send(activityById);
    }
  } catch (error) {
    return res.status(400).send("Activity could not load properly");
  }
});

router.post("/", async (req, res) => {
  const { name, difficulty, duration, season, countryIDs } = req.body;

  try {
    if (name && difficulty && duration && season && countryIDs) {
      let newActivity = await Activity.create({
        name,
        difficulty,
        duration,
        season,
      });
      await newActivity.addCountries(countryIDs);
      res.status(200).send(newActivity);
    } else {
      res.status(404).send("Not all parameters arrived successfully");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/", async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const activity = await Activity.findByPk(id);
      activity.destroy();
      res.status(200).send(activity);
    } else {
      res.status(404).send("ID not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/", async (req, res) => {
  const { name, difficulty, duration, season, id } = req.body;




  try {
    if (name && difficulty && duration && season && id) {
      let activity = await Activity.findByPk(id);
      await activity.update( 
        {
          name,
          difficulty,
          duration,
          season,
        }
      );


      res.status(200).send(activity);
    } else {
      res.status(404).send("Not all parameters arrived successfully");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
