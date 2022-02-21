import { Request, Response } from "express";
import Category from "../models/categoryModal";
import { IReqAuth } from "../config/interface";

class APIfeatures{
  query : any;
  queryString : any;
  constructor(query : any, queryString : any){
      this.query = query;
      this.queryString = queryString;
  }
  sorting(){
      this.query = this.query.sort('-createdAt')
      return this;
  }
  paginating(){
      const page = this.queryString.page * 1 || 1
      const limit = this.queryString.limit * 1 || 5
      const skip = (page - 1) * limit
      this.query = this.query.skip(skip).limit(limit)
      return this;
  }
}

const categoryCtrl = {
  createCategory: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication User." });

    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Invalid Authentication Admin." });

    try {
      const name = req.body.name.toLowerCase();
      const user = req.user._id;
      const rows = new Category({ name, user });

      await rows.save();

      res.json({ rows });
    } catch (err: any) {
      let errMsg;

      if (err.code === 11000) {
        errMsg = Object.values(err.keyValue)[0] + " already exists.";
      } else {
        const name = Object.keys(err.errors)[0];
        errMsg = err.errors[`${name}`].message;
      }

      return res.status(500).json({ msg: errMsg });
    }
  },
  getCategories: async (req: Request | any, res: Response) => {
    const { name } = req.query;
    try {
      let query = Category.find();
      const count = await Category.countDocuments();
      if(name){
        query = Category.find({name: { $regex: '.*' + name + '.*' } });
      }
      const features = new APIfeatures(query, req.query).sorting().paginating();

      const categories = await features.query;

      res.json({ rows : categories , count : count });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCategory: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      const _id = req.params.id;
      const category = await Category.findByIdAndUpdate(
        _id,
        { name: req.body.name.toLowerCase() },
        { new: true }
      );

      res.json({ rows: category });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCategory: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      await Category.findByIdAndDelete(req.params.id);

      res.json({ msg: "Delete Success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default categoryCtrl;
