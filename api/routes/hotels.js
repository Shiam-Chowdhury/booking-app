import express from 'express';
import Hotel from "../models/Hotel.js";
import { createError } from '../utils/error.js';

const router = express.Router();

router.get('/:id', async (req, res, next) => {
    // const failed = true;

    // if(failed){
    //     return next(createError(404, 'create error'));
    // }
    
    try {
        const hotel = await Hotel.findById({
            _id: req.params.id
        });

        res.status(200).json(hotel);
        
    } catch (error) {
        // res.status(500).json(error);
        next(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const hotels = await Hotel.find();

        res.status(200).json(hotels);
        
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const newHotel = new Hotel(req.body);
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedHotel = await Hotel.findOneAndUpdate({ _id: req.params.id},
             req.body , {new: true}
        );

        res.status(200).json({
            updatedHotel,
            message: 'updated successfully!'
        })
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Hotel.findOneAndDelete({
            _id: req.params.id
        })

        res.status(200).json({
            message: "hotel deleted successfully"
        })
    } catch (error) {
        res.status(500).json(error);
    }
})

export default router;
