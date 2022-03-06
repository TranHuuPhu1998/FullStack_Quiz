import { Request, Response } from 'express';
import HistoryExercise from '../models/historyExerciseModal';
import { IReqAuth } from "../config/interface";

const Pagination = (req: IReqAuth) => {
  let page = Number(req.query.page) * 1 || 1;
  let limit = Number(req.query.limit) * 1 || 4;
  let skip = (page - 1) * limit;

  return { page, limit, skip };
};

const historyExerciseCtrl = {
  createExercise: async (req: IReqAuth, res: Response) => {
    if(!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });
    try {
      console.log(req.body);
      const {
        categoryId,
        courseId,
        score,
        lengthYourAnswer,
        lengthQuestion,
      } = req.body;
      
      let status = 0; // fail
      if(lengthYourAnswer === lengthQuestion){
        status = 1; // success
      }
      const rows = new HistoryExercise({
        userId: req.user._id,
        categoryId: categoryId,
        courseId: courseId,
        score: score,
        status: status,
        lengthYourAnswer: lengthYourAnswer,
        lengthQuestion: lengthQuestion,
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
  getHistoryExercises: async (req: IReqAuth, res: Response) => {
    try {
      const { limit, page } = Pagination(req);
      const options = {
        page: page,
        limit: limit,
        sort: { _id: 1, createdAt: 1 },
      };
      const condition = HistoryExercise.aggregate([
        { $lookup: { from: "courses", localField: "courseId", foreignField: "_id", as: "courseName" } },
        { $addFields: { courseName: { $arrayElemAt: ["$courseName.name", 0] } } },
        { $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "categoryName" } },
        { $addFields: { categoryName: { $arrayElemAt: ["$categoryName.name", 0] } } },
        { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "userName" } },
        { $addFields: { userName: { $arrayElemAt: ["$userName.name", 0] } } },
      ]);

      const HistoryExercises = await HistoryExercise.aggregatePaginate(condition, options);
    
      res.json({ rows :HistoryExercises });
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
  }
}

export default historyExerciseCtrl;