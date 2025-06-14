'use server';
import { fetchReportSection24 } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';
import ExportButton from './ExportButton';

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {

    const params = await searchParams;

    const reportYear = parseInt((params.reportYear as string) || '2023', 10);
    const reportData = await fetchReportSection24(reportYear);

    return (
        <div className="w-full p-6">
            <h1 className={`${lusitana.className} text-2xl mb-4`}>Отчеты</h1>
            <h2 className="text-xl mb-4">Раздел 2.4: Распределение слушателей по возрасту, полу и программам</h2>
            <ExportButton reportData={reportData} reportYear={reportYear} />
            <h1 className={`${lusitana.className} text-2xl mb-4`}></h1>
            <h2 className="text-xl mb-4">Раздел 2.5: Распределение слушателей по видам деятельности</h2>
            <ExportButton reportData={reportData} reportYear={reportYear} />
            <h1 className={`${lusitana.className} text-2xl mb-4`}></h1>
            <h2 className="text-xl mb-4">Раздел 2.4: Сводная ведомость</h2>
            <ExportButton reportData={reportData} reportYear={reportYear} />
        </div>
    );
}