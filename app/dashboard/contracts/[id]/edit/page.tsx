import Form from '@/app/ui/contracts/edit-form';
import Breadcrumbs from '@/app/ui/contracts/breadcrumbs';
import {fetchContractById, fetchContractTypes, fetchCourses, fetchFundingSources, fetchStudents} from '@/app/lib/data';
import {notFound} from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [contract, students, fundingSources, contractTypes, courses] = await Promise.all([
        fetchContractById(id),
        fetchStudents(),
        fetchFundingSources(),
        fetchContractTypes(),
        fetchCourses(),
    ]);

    if (!contract) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    {label: 'Договоры', href: '/dashboard/contracts'},
                    {label: 'Редактировать договор', href: `/dashboard/contracts/${id}/edit`, active: true},
                ]}
            />
            <Form
                contract={contract}
                students={students}
                fundingSources={fundingSources}
                contractTypes={contractTypes}
                courses={courses}
            />
        </main>
    );
}