import {Card} from '@/app/ui/dashboard/cards';
import LatestContracts from '@/app/ui/dashboard/latest-contracts';
import LatestStudents from '@/app/ui/dashboard/latest-students';
import {lusitana} from '@/app/ui/fonts';
import {fetchCardData, fetchLatestContracts, fetchLatestStudents} from "@/app/lib/data";


export default async function Page() {

    const latestContracts = await fetchLatestContracts();
    const latestStudents = await fetchLatestStudents();
    const {
        numberOfStudents,
        numberOfCourses,
        numberOfContracts,
    } = await fetchCardData();
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card title="Всего программ" value={numberOfCourses} type="programs"/>
                <Card title="Всего слушателей" value={numberOfStudents} type="students"/>
                <Card title="Всего договоров" value={numberOfContracts} type="contracts"/>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <LatestContracts latestContracts={latestContracts}/>
                <LatestStudents latestStudents={latestStudents}/>
            </div>
        </main>
    );
}