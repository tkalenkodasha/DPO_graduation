import Form from '@/app/ui/students/edit-form';
import Breadcrumbs from '@/app/ui/contracts/breadcrumbs';
import { fetchStudentById, fetchGenders, fetchEducations, fetchCategories, fetchSubcategories } from '@/app/lib/data';
import { notFound } from 'next/navigation';

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
                    { label: 'Students', href: '/dashboard/students' },
                    {
                        label: 'Edit Student',
                        href: `/dashboard/students/${id}/edit`,
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