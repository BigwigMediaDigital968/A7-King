import { ISatta } from "./Satta";

export interface IResult {
  _id: string;
  sattaId: string | ISatta;
  drawDate: string;
  result: string;
  status: "draft" | "published";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}