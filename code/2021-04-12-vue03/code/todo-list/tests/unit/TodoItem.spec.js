import { mount } from "@vue/test-utils";
import TodoItem from "@/components/TodoItem.vue";

describe("HelloWorld.vue", () => {
  it("input -> props  output-> view", () => {
    // given
    const propsData = {
      item: {
        title: "heihei",
      },
    };

    // when
    const wrapper = mount(TodoItem, {
      propsData,
    });

    //then
    expect(wrapper.text()).toContain("heihei");
  });

  it("input -> click output -> event name remove", () => {
    // given
    const propsData = {
      item: {
        title: "heihei",
        id: 1,
      },
    };

    // when
    const wrapper = mount(TodoItem, {
      propsData,
    });

    // 先找到对应的按钮
    wrapper.get("#remove").trigger("click");

    // console.log(wrapper.emitted("remove")).toBeTruthy()
    //then
    expect(wrapper.emitted("remove")).toBeTruthy();
    expect(wrapper.emitted("remove")[0]).toEqual([1]);
  });

  it("slot", () => {
    const propsData = {
      item: {
        title: "heihei",
        id: 1,
      },
    };

    const wrapper = mount(TodoItem, {
      propsData,

      // name -> default
      slots: {
        default: "haha",
      },
    });

    expect(wrapper.text()).toContain("haha");
  });
});
