import News from 'src/infrastructure/models/news';
import NewsRepository from '../../infrastructure/repositories/new.repository';
import mongoose from 'mongoose';
import { NewsDocument } from 'src/infrastructure/models/news';

interface NewsData {
  title: string;
  description: string;
}

interface ImageUploadInput {
  url: string;
}

class NewsService {
  /**
   * Creates a new news entry 
   * @param newsData 
   * @param imagePath 
   * @returns 
   */
  async create(newsData: NewsData, imagePath?: string): Promise<Partial<NewsDocument>> {
    const imageIds: mongoose.Types.ObjectId[] = [];

    if (imagePath) {
      const image = await NewsRepository.uploadImage({ url: imagePath });
      imageIds.push(image._id);
    }

    const newNews = await NewsRepository.create(newsData, imageIds);

    const populatedNews = newNews ? await NewsRepository.findById(newNews._id.toString()) : null;

    return populatedNews?.toJSON() as Partial<NewsDocument>;
  }

  /**
   * Retrieves all news entries with populated image URLs.
   * @returns An array of all news documents.
   */
  async getAllNews(): Promise<Partial<NewsDocument>[]> {
    const newsList = await NewsRepository.findAll();
    return newsList.map((news) => news.toJSON() as Partial<NewsDocument>);
  }

  /**
   * Retrieves a specific news entry by its ID.
   * @param id - The ID of the news entry to retrieve.
   * @returns The news document or null if not found.
   */
  async getNewsById(id: string): Promise<Partial<NewsDocument> | null> {
    const news = await NewsRepository.findById(id);
    return news ? (news.toJSON() as Partial<NewsDocument>) : null;
  }

  /**
   * Updates a specific news entry by its ID.
   * @param id - The ID of the news entry to update.
   * @param newsData - The updated data for the news entry.
   * @returns The updated news document or null if not found.
   */
  async updateNews(id: string, newsData: NewsData): Promise<Partial<NewsDocument> | null> {
    const updatedNews = await NewsRepository.update(id, newsData);
    return updatedNews ? (updatedNews.toJSON() as Partial<NewsDocument>) : null;
  }

  /**
   * Deletes a specific news entry by its ID.
   * @param id - The ID of the news entry to delete.
   * @returns The deleted news document or null if not found.
   */
  async deleteNews(id: string): Promise<Partial<NewsDocument> | null> {
    const deletedNews = await NewsRepository.delete(id);
    return deletedNews ? (deletedNews.toJSON() as Partial<NewsDocument>) : null;
  }
}

export default new NewsService();
