import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (error) {
        next(error);
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findOneAndUpdate({ _id: req.params.id},
             req.body , {new: true}
        );
        res.status(200).json({
            updatedHotel,
            message: 'updated successfully!'
        })
    } catch (error) {
        next(error);
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findOneAndDelete({
            _id: req.params.id
        });
        res.status(200).json({
            message: "hotel deleted successfully"
        })
    } catch (error) {
        next(error);
    }
}

export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById({
            _id: req.params.id
        });
        res.status(200).json(hotel);
    } catch (error) {
        next(error);
    }
}

export const getHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    } catch (error) {
        next(error);
    }
}
