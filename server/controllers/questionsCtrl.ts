import { Request, Response } from "express";
import Question from "../models/questionsModal";
import Category from "../models/categoryModal";
import { IReqAuth } from "../config/interface";
import mongoose from 'mongoose'


const QuestionCtrl = {
  createQuestion: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication User." });

    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Invalid Authentication Admin." });

    try {
      const { name, categoryId, answers } = req.body;
      const user = req.user._id;
      const category = await Category.findById(categoryId);
      const categoryItem = {id : category?._id , name : category?.name};

      const rows = new Question({
        name,
        category : categoryItem,
        answers,
        user,
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
  getQuestion: async (req: Request, res: Response) => {
    try {
      const rows = await Question.find().sort("-createdAt");
      res.json({ rows });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getQuestionsByCategory: async (req: Request, res: Response) => {
    try {
      const _id = req.params.id;
      const rows = await Question.aggregate([
        { $match : { "category.id" : mongoose.Types.ObjectId(_id) } }
      ]);

      res.json({ rows });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getDetailQuestion: async (req: Request, res: Response) => {
    try {
      const _id = req.params.id;
      const rows = await Question.findById(_id);
      res.json({ rows });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateQuestion: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication User." });

    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Invalid Authentication Admin." });
    try {
      const id = req.params.id;
      const user = req.user._id;
      const { name, categoryId, answers } = req.body;
      const category = await Category.findById(categoryId);
      const categoryItem = {id : category?._id , name : category?.name};

      const question = await Question.findByIdAndUpdate(
        id,
        {
          name,
          category : categoryItem,
          answers,
          user,
        },
        {new : true}
      )
      res.json({ rows: question });
    } catch (err : any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteQuestion: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      await Question.findByIdAndDelete(req.params.id);

      res.json({ msg: "Delete Success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default QuestionCtrl;
