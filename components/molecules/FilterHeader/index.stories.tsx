import { ComponentStory, ComponentMeta } from "@storybook/react";

import FilterHeader from "../FilterHeader";

export default {
  title: "Components/FilterHeadr",
  component: FilterHeader,
} as ComponentMeta<typeof FilterHeader>;

const Template: ComponentStory<typeof FilterHeader> = (args) => (
  <FilterHeader {...args} />
);

export const Default = Template.bind({});
