import Form from '@/app/ui/contracts/create-form';
import Breadcrumbs from '@/app/ui/contracts/breadcrumbs';
import {fetchContractTypes, fetchCourses, fetchFundingSources, fetchStudents} from '@/app/lib/data';

export default async function Page() {
    const [students, fundingSources, contractTypes, courses] = await Promise.all([
        fetchStudents(),
        fetchFundingSources(),
        fetchContractTypes(),
        fetchCourses(),
    ]);

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    {label: 'Договоры', href: '/dashboard/contracts'},
                    {label: 'Создать договор', href: '/dashboard/contracts/create', active: true},
                ]}
            />
            <Form students={students} fundingSources={fundingSources} contractTypes={contractTypes} courses={courses}/>
        </main>
    );
}