import Form from '@/app/ui/courses/create-form';
import Breadcrumbs from '@/app/ui/contracts/breadcrumbs';
import {Metadata} from 'next';
import {fetchPrograms} from '@/app/lib/data';

export const metadata: Metadata = {
    title: 'Создать курс',
};

export default async function Page() {
    const programs = await fetchPrograms();


    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    {label: 'Курсы и программы', href: '/dashboard/courses'},
                    {
                        label: 'Создать курс',
                        href: '/dashboard/courses/create',
                        active: true,
                    },
                ]}
            />
            <Form
                programs={programs}
            />
        </main>
    );
}