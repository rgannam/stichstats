import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import Input from "@/components/Input.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});

describe("Input.vue", () => {
  it("combines name and designer into a document", () => {
    const name = 'test123';
    const designer = 'test456';
    const wrapper = shallowMount(Input, {
      propsData: {
        patternName: name,
        patternDesigner: designer
      }
    });
    expect((<any>wrapper.vm).patternDocument).toEqual({name: 'test123', designer: 'test456'});
  });
});