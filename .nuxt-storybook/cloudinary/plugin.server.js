import { ServerApi } from "~cloudinary/server";

const configuration = {
  "privateCdn": false,
  "cloudName": "duiyjc3zu",
  "apiKey": "165339578982617",
  "apiSecret": "UQYTzimPgVnh6eNfUEQ2HzvARRk",
  "useComponent": true,
  "secure": true
}

export default function(context, inject) {
  const cloudinary = new ServerApi(configuration);

  context.$cloudinary = cloudinary;
  inject("cloudinary", cloudinary);
}