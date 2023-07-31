// noinspection DuplicatedCode

import { describe, expect, test } from "@jest/globals";

describe("Mock 서버 generateId 테스트", () => {
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
          prefix +
          String(Number(lastId.replace(prefix, "")) + 1).padStart(5, "0")
        );
      }
    };

  const generateNewsId = generateId("news");
  const generateCommunityId = generateId("community");

  describe("news 의 id 생성 테스트", () => {
    test("initial id", () => {
      const news = [];
      expect(generateNewsId(news)).toBe("news00001");
    });

    test("next id", () => {
      const news = [
        {
          id: "news00001",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus, illum. Cupiditate dolorum iste non omnis quibusdam quod totam voluptatibus! Ad dolor eos fugiat illum incidunt minus molestiae tempora vitae!",
        },
        {
          id: "news00002",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet architecto dignissimos dolorem doloribus ex incidunt ipsum laborum molestias nam natus necessitatibus, neque nobis nulla omnis sequi, soluta velit vitae voluptate.",
        },
        {
          id: "news00003",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis corporis cum dolor eius excepturi expedita explicabo harum itaque molestiae mollitia numquam, obcaecati odio optio pariatur reiciendis reprehenderit sunt veritatis voluptatem!",
        },
        {
          id: "news00004",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad aliquam, aspernatur commodi delectus harum ipsum nulla, quasi quisquam, sint soluta voluptatem voluptates? Aliquid amet blanditiis doloribus possimus quaerat rerum.",
        },
      ];
      expect(generateNewsId(news)).toBe("news00005");
    });
  });

  describe("communities 의 id 생성 테스트", () => {
    test("initial id", () => {
      const communities = [];
      expect(generateCommunityId(communities)).toBe("community00001");
    });

    test("next id", () => {
      const communities = [
        {
          id: "community00001",
          title: "안녕하세요",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          id: "community00002",
          title: "반갑습니다.",
          content:
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          id: "community00003",
          title: "날씨가 덥네요",
          content:
            "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi",
        },
        {
          id: "community00004",
          title: "잘 다녀갑니다.",
          content:
            " No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.",
        },
        {
          id: "community00005",
          title: "좋은 하루 되세요",
          content:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi",
        },
      ];
      expect(generateCommunityId(communities)).toBe("community00006");
    });
  });
});
