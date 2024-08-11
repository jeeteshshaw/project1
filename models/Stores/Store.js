const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const LocationCoordinate = new Schema({
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
})


const RetailerStoreSchema = new Schema({
    store_name: { type: String, required: true },
    store_description: { type: String, required: true },
    location: { type: String, required: true },
    location_coordinate: LocationCoordinate,
    store_image: { type: String, required: true },
    owner_name: { type: String, required: true },
    verified: { type: Boolean, default: false },
    admin_approved: { type: Boolean, default: false },
    store_created_by: { type: Schema.Types.ObjectId, required: true, ref:"RetailerUsers" },
}, { timestamps: true });



const RetailerStoreModal = mongoose.model("Stores", RetailerStoreSchema);

module.exports = RetailerStoreModal;