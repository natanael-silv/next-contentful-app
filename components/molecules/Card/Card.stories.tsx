import { ComponentStory, ComponentMeta } from '@storybook/react';


import Card from "./Card"

export default {
    title: 'Components/Card',
    component: Card,

}as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />

export const Default = Template.bind({});
Default.args = {
    title: 'Modern family',
    image: '/images/modernFam.jpg',
    genre: ['comedy']
};




