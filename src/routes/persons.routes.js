import {Router} from "express";
import pool from "../database.js";

const router = Router();

router.get("/add", async (req, res) => {
    res.render("persons/add");
})

router.post("/add", async (req, res) => {
try {
    const {name, lastname, age} = req.body;
    const newPerson = {
        name, lastname, age
    };
    await pool.query("INSERT INTO persons SET ? ", [newPerson]);
    res.redirect("/list");
} catch (error) {
    res.status(500).json({
        message: error.message
    });
}
});

router.get("/list", async(req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM persons");
        res.render("persons/list", {persons: result});
    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    }
})

router.get('/edit/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const [person] = await pool.query('SELECT * FROM persons WHERE id = ?', [id]);
        const personEdit = person[0];
        res.render('persons/edit', {
            person: personEdit
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
})

router.post('/edit/:id', async (req, res) => {
    try {
        const { name, lastname, age } = req.body;
        const {id} = req.params;
        const editPerson = {name, lastname, age};

        await pool.query('UPDATE persons SET ? WHERE id = ?', [editPerson, id]);
      
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
})

router.get('/delete/:id', async (req, res) => {
    try {
        const {id} = req.params;
        await pool.query("DELETE FROM persons WHERE id = ?", [id]);
        res.redirect("/list");

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
})

export default router;