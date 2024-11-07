import News, { NewsDocument } from '../models/news';
import Image, { IImage } from '../models/image';
import mongoose from 'mongoose';

interface NewsData {
  title: string;
  description: string;
}

interface ImageUploadInput {
  url: string;
}

class NewsRepository {
  async create(newsData: NewsData, imageIds: mongoose.Types.ObjectId[]): Promise<NewsDocument> {
    const news = new News({
      ...newsData,
      imageIds,
    });
    return await news.save();
  }

  async findAll(): Promise<NewsDocument[]> {
    return await News.find().populate('imageIds', 'url');
  }

  async findById(id: string): Promise<NewsDocument | null> {
    return await News.findById(id).populate('imageIds', 'url');
  }

  async update(id: string, newsData: NewsData): Promise<NewsDocument | null> {
    return await News.findByIdAndUpdate(id, newsData, { new: true }).populate('imageIds', 'url');
  }

  async delete(id: string): Promise<NewsDocument | null> {
    const news = await News.findById(id).populate('imageIds', 'url');
    if (news) {
      await News.findByIdAndDelete(id);
    }
    return news;
  }

  async uploadImage(imageData: ImageUploadInput): Promise<IImage> {
    const { url } = imageData;
    const newsImage = new Image({ url });
    return await newsImage.save();
  }
}

export default new NewsRepository();
