const add = require("../add");
// input -> 测试数据
// output -> 验证的

describe("add", () => {
  it("1 + 1 = 2", () => {
    // 1. given 准备测试数据
    const a = 1;
    const b = 1;

    // 2. when 触发测试动作
    const result = add(a, b);
    // 3. then 验证
    // 匹配器
    expect(result).toBe(2);
  });

  it("1 + 3 = 4", () => {
    // 1. given 准备测试数据
    const a = 1;
    const b = 1;

    // 2. when 触发测试动作
    const result = add(a, b);
    // 3. then 验证
    // 匹配器
    expect(result).toBe(2);
  });
});

describe("string", () => {
  it("contain", () => {
    const str = "abc";
    expect(str).not.toContain("e");
  });
});
