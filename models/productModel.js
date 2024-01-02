import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
    default: function () {
      return this.cost * this.quantity;
    },
  },
  price: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: function () {
      return this.price * this.quantity;
    },
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

productSchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate();
  this.set({
    totalCost: update.cost * update.quantity,
    totalPrice: update.price * update.quantity,
  });
});

const Product = models.Product || model("Product", productSchema);

export default Product;
