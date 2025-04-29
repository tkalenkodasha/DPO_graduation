import Form from '@/app/ui/studentsgrid/create-form';
import Breadcrumbs from '@/app/ui/contracts/breadcrumbs';
import {Metadata} from 'next';
import {fetchCategories, fetchEducations, fetchGenders, fetchSubcategories} from '@/app/lib/data';

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
                    {label: 'Студенты', href: '/dashboard/studentsgrid'},
                    {
                        label: 'Создать студента',
                        href: '/dashboard/studentsgrid/create',
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