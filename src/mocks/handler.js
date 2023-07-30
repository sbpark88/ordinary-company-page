import { rest } from "msw";
import { members, news } from "./mockDb";

export const handlers = [
  rest.get("/member", (req, res, context) =>
    res(context.status(200), context.json(members))
  ),
  rest.get("/news", (req, res, context) =>
    res(context.status(200), context.json(news))
  ),
];
