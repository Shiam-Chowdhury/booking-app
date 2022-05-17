import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send("this is auth get route");
});

// module.exports = router;

export default router;