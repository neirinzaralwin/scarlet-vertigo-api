import { Request, Response } from "express";
import NewsService from "src/domain/services/news/news.service";
import path from "path";

class NewsController {
  async createNews(req: Request, res: Response): Promise<Response> {
    try {
      const { title, description } = req.body;
      const newsData = { title, description };
      const imagePath = req.file
        ? path.join("images", req.file.filename)
        : undefined;

      if (!title || !description) {
        return res
          .status(400)
          .json({ message: "Title and description are required." });
      }

      const news = await NewsService.create(newsData, imagePath);

      return res.status(201).json(news);
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Error creating news", error: error.message });
    }
  }

  async getAllNews(req: Request, res: Response): Promise<void> {
    try {
      const newsList = await NewsService.getAllNews();
      res.status(200).json(newsList);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Failed to retrieve news items",
          error: (error as Error).message,
        });
    }
  }

  async getNewsById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const news = await NewsService.getNewsById(id);
      if (news) {
        res.status(200).json(news);
      } else {
        res.status(404).json({ message: "News item not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Failed to retrieve news item",
          error: (error as Error).message,
        });
    }
  }

  async updateNews(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const updatedNews = await NewsService.updateNews(id, {
        title,
        description,
      });
      if (updatedNews) {
        res.status(200).json(updatedNews);
      } else {
        res.status(404).json({ message: "News item not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Failed to update news item",
          error: (error as Error).message,
        });
    }
  }

  async deleteNews(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedNews = await NewsService.deleteNews(id);
      if (deletedNews) {
        res.status(200).json(deletedNews);
      } else {
        res.status(404).json({ message: "News item not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Failed to delete news item",
          error: (error as Error).message,
        });
    }
  }
}

export default new NewsController();
