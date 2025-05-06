import Form from '@/app/ui/studentsgrid/edit-form';
import Breadcrumbs from '@/app/ui/contracts/breadcrumbs';
import {fetchCategories, fetchEducations, fetchGenders, fetchStudentById, fetchSubcategories} from '@/app/lib/data';
import {notFound} from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const student = await fetchStudentById(id);

    if (!student) {
        notFound();
    }

    const genders = await fetchGenders();
    const educations = await fetchEducations();
    const categories = await fetchCategories();
    const subcategories = await fetchSubcategories();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    {label: 'Студенты', href: '/dashboard/studentsgrid'},
                    {
                        label: 'Редактировать студента',
                        href: `/dashboard/studentsgrid/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form
                student={student}
                genders={genders}
                educations={educations}
                categories={categories}
                subcategories={subcategories}
            />
        </main>
    );
}