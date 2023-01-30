import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    pic: {
      type: String,
      required: true,
      default:
        "https://airnfts.s3.amazonaws.com/nft-images/20210909/Elon_Musk_1631224271078.png",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
