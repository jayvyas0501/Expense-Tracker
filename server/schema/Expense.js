import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String,
        required:[true,"Please provide title!"],
        trim:true
    },
    amount: {
      type: Number,
      required: [true, "Please provide an amount"],
      min: [0, "Amount cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
      enum: ["Food", "Travel", "Shopping", "Bills", "Entertainment", "Other"],
      default: "Other",
    },
    date: {
      type: Date,
      required: [true, "Please provide a date"],
    },
},{ timestamps: true })


export default mongoose.model("Expense", expenseSchema);