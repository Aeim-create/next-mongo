import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true }
});

const Supplier = mongoose.models.supplier || mongoose.model("supplier", supplierSchema);

export default Supplier;
