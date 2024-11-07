import Image from '../../infrastructure/models/image';

class ImageService {
  async create(imageData: { url: string }) {
    const image = new Image(imageData);
    return await image.save();
  }
}

export default new ImageService();
