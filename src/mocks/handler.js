import { rest } from "msw";
import { members, news, communities } from "./mockDb";

export const handlers = [
  rest.get("/member", (req, res, context) =>
    res(context.status(200), context.json(members))
  ),
  rest.get("/news", (req, res, context) =>
    res(context.status(200), context.json(news))
  ),
  rest.get("/community", (req, res, context) =>
    res(context.status(200), context.json(communities))
  ),
  rest.post("/community", (req, res, context) => {
    const newCommunity = {
      id: generateCommunityId(communities),
      ...req.body,
    };
    communities.push(newCommunity);
    return res(context.status(201));
  }),
  rest.put("/community/:id", (req, res, context) => {
    const communityId = req.params.id;
    const existingIndex = communities.findIndex(
      (community) => community.id === communityId
    );

    if (existingIndex !== -1) {
      communities[existingIndex] = req.body;
      return res(context.status(200));
    } else {
      return res(
        context.status(404),
        context.json(resMessage("수정하려는 대상이 존재하지 않습니다."))
      );
    }
  }),
  rest.patch("/community/:id", (req, res, context) => {
    const communityId = req.params.id;
    const existingIndex = communities.findIndex(
      (community) => community.id === communityId
    );

    if (existingIndex !== -1) {
      communities[existingIndex] = {
        ...communities[existingIndex],
        ...req.body,
      };
      return res(context.status(200));
    } else {
      return res(
        context.status(404),
        context.json(resMessage("수정하려는 대상이 존재하지 않습니다."))
      );
    }
  }),

  rest.delete("/community/:id", (req, res, context) => {
    const communityId = req.params.id;
    const existingIndex = communities.findIndex(
      (community) => community.id === communityId
    );

    if (existingIndex !== -1) {
      communities.splice(existingIndex, 1);
      return res(context.status(200));
    } else {
      return res(
        context.status(404),
        context.json(resMessage("수정하려는 대상이 존재하지 않습니다."))
      );
    }
  }),
];

const generateId =
  (prefix) =>
  (table = []) => {
    const lastId = table
      .flatMap((record) => record.id)
      .toSorted((lhs, rhs) => lhs - rhs)
      .pop();
    if (lastId === undefined) {
      return prefix + "00001";
    } else {
      return (
        prefix + String(Number(lastId.replace(prefix, "")) + 1).padStart(5, "0")
      );
    }
  };

const generateNewsId = generateId("news");
const generateCommunityId = generateId("community");

const resMessage = (message) => ({ message: message });
