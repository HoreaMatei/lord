import StoryblokClient from "storyblok-js-client";

const Storyblok = new StoryblokClient({
  accessToken: "OQ09pa2LLqe7rgabggVtmQtt", // Get this from Storyblok space settings
  cache: {
    clear: "auto",
    type: "memory",
  },
});

export default Storyblok;
