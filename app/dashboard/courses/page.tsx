import {Suspense} from 'react';
import Search from '@/app/ui/search';
import CoursesTable from '@/app/ui/courses/coursesTable';
import {CreateCourse} from '@/app/ui/courses/buttons';
import {lusitana} from '@/app/ui/fonts';
import {StudentsGridTableSkeleton} from '@/app/ui/skeletons';
import {fetchFilteredCourses} from '@/app/lib/data';

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const courses = await fetchFilteredCourses(query, currentPage);
    console.log('StudentsTable: Number of students:', courses.length);
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Курсы и программы</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Поиск по курсам..."/>
                <CreateCourse/>
            </div>
            <Suspense key={query + currentPage} fallback={<StudentsGridTableSkeleton/>}>
                <CoursesTable courses={courses} query={query}/>
            </Suspense>

        </div>
    );
}