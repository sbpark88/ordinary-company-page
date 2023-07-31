export default class CommunityDTO {
  constructor({ id, title, comment }) {
    if (id !== undefined && !this.testId(id)) {
      throw Error("ID 가 올바르지 않습니다.");
    }
    this._id = id;
    this.title = title;
    this.comment = comment;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    if (id !== undefined && !this.testId(id)) {
      throw Error("ID 가 올바르지 않습니다.");
    }
    this._id = id;
  }

  testId(id) {
    const validFormat = /^community\d{5}$/;
    return validFormat.test(id);
  }

  // COMMENT: `toJSON()` 이라는 특수한 메서드가 `JSON.stringify()` 메서드가 호출될 때 자동으로 사용된다.
  //          이 `toJSON()` 메서드를 정의하지 않으면 private properties 를 가져오지 않는다.
  //          `toJson()`으로 적지 않도록 철자에 유의할 것‼️
  toJSON() {
    return {
      id: this._id,
      title: this.title,
      comment: this.comment,
    };
  }
}
