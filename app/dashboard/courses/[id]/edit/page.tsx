import Form from '@/app/ui/courses/edit-form';
import Breadcrumbs from '@/app/ui/contracts/breadcrumbs';
import {fetchCourseById, fetchPrograms,} from '@/app/lib/data';
import {notFound} from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const course = await fetchCourseById(id);

    if (!course) {
        notFound();
    }

    const programs = await fetchPrograms();


    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    {label: 'Курсы и программы', href: '/dashboard/courses'},
                    {
                        label: 'Редактировать курс',
                        href: `/dashboard/courses/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form
                course={course}
                programs={programs}

            />
        </main>
    );
}