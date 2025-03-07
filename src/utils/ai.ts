import { experimental_generateImage as generateImage, type ImageModel } from 'ai';
import { createVertex } from '@ai-sdk/google-vertex';
// import vertextAIConfigFile from "@/config/vertexai.config.json";

type GeneratedImageParams = {
  prompt: string;
  aspectRatio?: `${number}:${number}`;
}

class AIUtil {

  private model;

  constructor ({ model }: { model: ImageModel }) {

    this.model = model;

  }

  async generateImage ({ prompt, aspectRatio = "3:4" }: GeneratedImageParams) {

    return "https://i.pinimg.com/736x/d9/da/ed/d9daedc6a31558753d4c7b42de0f4cfe.jpg";

    // const { image } = await generateImage({
    //   model: this.model,
    //   prompt,
    //   aspectRatio,
    // });

    // return image;

  }

}

const vertex = createVertex({
  location: "us-central1",
  project: "glass-badge-410718",
  googleAuthOptions: {
    credentials: {
      client_email: process.env.VERTEX_CLIENT_EMAIL,
      private_key: process.env.VERTEX_PRIVATE_KEY      
    }
  },
});

const aiUtil = new AIUtil ({ model: vertex.image('imagen-3.0-generate-001') });

export default aiUtil;