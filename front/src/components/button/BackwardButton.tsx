import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';

const BackwardButton = () => {
    return (
        <Button>
            <ArrowLeft className="h-4 w-4" />
        </Button>
    );
};

export default BackwardButton;
