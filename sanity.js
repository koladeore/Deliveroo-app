import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = sanityClient({
    projectId: "f96isrsv",
    dataset: "production",
    useCdn: true,
    apiVersion: "2021-10-21"
});
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
export default client;

// Run to add exception for localhost 19006
// sanity cors add http://localhost:19006