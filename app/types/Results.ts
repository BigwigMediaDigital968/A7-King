import { ISatta } from "./Satta";

export interface IResult {
  _id: string;

  areaId: string | ISatta;

  drawDate: string;

  result: string;

  createdAt: string;
  updatedAt: string;
}