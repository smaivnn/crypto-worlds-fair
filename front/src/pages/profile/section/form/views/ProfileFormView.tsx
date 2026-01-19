import { TaavahCard } from '@/components/card';
import { Divider } from '@/components/divider';
import { cn } from '@/lib/utils';
import InformationView from './InformationView';
import FormView from './FormView';

interface ProfileFormViewProps {
    form: any;
    options: any;
    labels: any;
    ui: any;
    copy: any;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    onClear: () => void;
}
const ProfileFormView = ({
    form,
    options,
    labels,
    ui,
    copy,
    onSubmit,
    onClear,
}: ProfileFormViewProps) => {
    return (
        <section className={cn('w-full')}>
            <TaavahCard className="p-4">
                <InformationView copy={copy} />
                <Divider className="my-4" />
                <FormView
                    form={form}
                    options={options}
                    labels={labels}
                    ui={ui}
                    onSubmit={onSubmit}
                    onClear={onClear}
                    copy={copy}
                />
            </TaavahCard>
        </section>
    );
};

export default ProfileFormView;
