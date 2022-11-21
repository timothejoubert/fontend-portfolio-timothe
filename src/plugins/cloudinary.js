import Vue from 'vue';
import Cloudinary, { CldImage, CldVideo, CldTransformation, CldContext } from "cloudinary-vue";

Vue.use(Cloudinary, {
    configuration: { cloudName: "demo" },
    components: {
        CldContext,
        CldImage,
        CldVideo,
        CldTransformation,
    }
});
