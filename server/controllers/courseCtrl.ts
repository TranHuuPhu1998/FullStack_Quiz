import { Request, Response } from "express";
import Course from "../models/courseModal";
import Category from "../models/categoryModal";
import { IReqAuth } from "../config/interface";

const Pagination = (req: IReqAuth) => {
  let page = Number(req.query.page) * 1 || 1;
  let limit = Number(req.query.limit) * 1 || 8;
  let skip = (page - 1) * limit;

  return { page, limit, skip };
};

const courseCtrl = {
  createCourse: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      const name = req.body.name.toLowerCase();
      const { categoryId, released, descriptions, imageBanner } = req.body;

      const rows = new Course({
        user: req.user._id,
        createBy: req.user.name,
        name: name,
        categoryId: categoryId,
        released: released,
        descriptions: descriptions,
        imageBanner: imageBanner,
      });

      await rows.save();

      res.json({ rows });
    } catch (err: any) {
      let errMsg;

      if (err.code === 11000) {
        errMsg = Object.values(err.keyValue)[0] + " already exists.";
      } else {
        let name = Object.keys(err.errors)[0];
        errMsg = err.errors[`${name}`].message;
      }

      return res.status(500).json({ msg: errMsg });
    }
  },
  getCourses: async (req: Request, res: Response) => {
    try {
      const { limit, page } = Pagination(req);
      const options = {
        page: page,
        limit: limit,
        sort: { _id: 1, createdAt: -1 },
      };
      const query = [];
      if (req.query.name) {
        query.push({
          name: { $regex: `.*${req.query.name}.*`, $options: "i" },
        });
      } else {
        query.push({ _id: { $exists: true } });
      }

      const condition = Category.aggregate([
        { $match: { $and: query } },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user_detail",
          },
        },
        {
          $addFields: {
            user_detail: { $arrayElemAt: ["$user_detail", 0] },
          },
        },
        { $unset: ["user_detail.password", "user_detail.account"] },
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category_name",
          },
        },
        {
          $addFields: {
            category_name: { $arrayElemAt: ["$category_name.name", 0] },
          },
        },
      ]);

      const rows = await Course.aggregatePaginate(condition, options);

      res.json({ rows });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getDetailCourses: async (req: Request, res: Response) => {
    try {
      const _id = req.params.id;
      const rows = await Course.findById(_id);
      res.json({ rows });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCourse: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      let _id = req.params.id;

      const name = req.body.name.toLowerCase();
      const { categoryId, released, descriptions, imageBanner } = req.body;

      await Course.findByIdAndUpdate(
        _id,
        {
          user: req.user._id,
          name: name,
          categoryId: categoryId,
          released: released,
          descriptions: descriptions,
          imageBanner: imageBanner,
        },
        { new: true }
      );

      res.json({ msg: "Update Success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCourse: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      await Course.findByIdAndDelete(req.params.id);

      res.json({ msg: "Delete Success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default courseCtrl;
