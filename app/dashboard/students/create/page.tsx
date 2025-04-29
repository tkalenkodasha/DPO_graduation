import Form from '@/app/ui/students/create-form';
import Breadcrumbs from '@/app/ui/contracts/breadcrumbs';
import { Metadata } from 'next';
import { fetchGenders, fetchEducations, fetchCategories, fetchSubcategories } from '@/app/lib/data';

export const metadata: Metadata = {
    title: 'Создать студента',
};

export default async function Page() {
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
                        label: 'Создать студента',
                        href: '/dashboard/students/create',
                        active: true,
                    },
                ]}
            />
            <Form
                genders={genders}
                educations={educations}
                categories={categories}
                subcategories={subcategories}
            />
        </main>
    );
}