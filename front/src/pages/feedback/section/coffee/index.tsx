import CoffeeView from './CoffeeView';

type CoffeeProps = {
    title: string;
    items: string[];
    buttonLabel: string;
};

const Coffee = ({ title, items, buttonLabel }: CoffeeProps) => {
    return <CoffeeView title={title} items={items} buttonLabel={buttonLabel} />;
};

export default Coffee;
