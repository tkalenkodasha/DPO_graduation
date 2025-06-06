import {Suspense} from 'react';
import Search from '@/app/ui/search';
import StudentsTable from '@/app/ui/studentsgrid/studentsTable';
import {CreateStudent} from '@/app/ui/studentsgrid/buttons';
import {lusitana} from '@/app/ui/fonts';
import {StudentsGridTableSkeleton} from '@/app/ui/skeletons';
import {fetchFilteredStudents} from '@/app/lib/data';

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const students = await fetchFilteredStudents(query, currentPage);
    console.log('StudentsTable: Number of students:', students.length);
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Слушатели</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Поиск слушателей..."/>
                <CreateStudent/>
            </div>
            <Suspense key={query + currentPage} fallback={<StudentsGridTableSkeleton/>}>
                <StudentsTable students={students} query={query}/>
            </Suspense>

        </div>
    );
}