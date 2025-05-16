'use client';
import * as XLSX from 'xlsx';
import { lusitana } from '@/app/ui/fonts';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type AgeGroup = 'under_25' | '25_29' | '30_34' | '35_39' | '40_44' | '45_49' | '50_54' | '55_59' | '60_and_above';

interface ReportData {
    gender: string;
    program_type: string;
    count: number;
    age_group: AgeGroup;
}

interface ExportButtonProps {
    reportData: ReportData[];
    reportYear: number;
}

export default function ExportButton({ reportData, reportYear: initialReportYear }: ExportButtonProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [reportYear, setReportYear] = useState<number>(initialReportYear);

    // Синхронизация reportYear с searchParams при загрузке
    useEffect(() => {
        const yearFromParams = searchParams.get('reportYear');
        if (yearFromParams) {
            setReportYear(parseInt(yearFromParams, 10));
        }
    }, [searchParams]);

    // Обработчик изменения года
    const handleYearChange = (year: number) => {
        setReportYear(year);
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('reportYear', year.toString());
        router.push(`?${newParams.toString()}`);
    };

    const processReportData = () => {
        const result = {
            total: { all: 0, under_25: 0, '25_29': 0, '30_34': 0, '35_39': 0, '40_44': 0, '45_49': 0, '50_54': 0, '55_59': 0 },
            women: { all: 0, under_25: 0, '25_29': 0, '30_34': 0, '35_39': 0, '40_44': 0, '45_49': 0, '50_54': 0, '55_59': 0 },
            qualification: { all: 0, under_25: 0, '25_29': 0, '30_34': 0, '35_39': 0, '40_44': 0, '45_49': 0, '50_54': 0, '55_59': 0 },
            women_qualification: { all: 0, under_25: 0, '25_29': 0, '30_34': 0, '35_39': 0, '40_44': 0, '45_49': 0, '50_54': 0, '55_59': 0 },
            retraining: { all: 0, under_25: 0, '25_29': 0, '30_34': 0, '35_39': 0, '40_44': 0, '45_49': 0, '50_54': 0, '55_59': 0 },
            women_retraining: { all: 0, under_25: 0, '25_29': 0, '30_34': 0, '35_39': 0, '40_44': 0, '45_49': 0, '50_54': 0, '55_59': 0 },
        };

        reportData.forEach((row) => {
            const count = row.count;
            const ageGroup = row.age_group;
            const isWomen = row.gender.toLowerCase().includes('жен');
            const isQualification = row.program_type.toLowerCase().includes('программа повышения квалификации');
            const isRetraining = row.program_type.toLowerCase().includes('программа профессиональной переподготовки');

            result.total.all += count;
            if (ageGroup !== '60_and_above') result.total[ageGroup] += count;

            if (isWomen) {
                result.women.all += count;
                if (ageGroup !== '60_and_above') result.women[ageGroup] += count;
            }

            if (isQualification) {
                result.qualification.all += count;
                if (ageGroup !== '60_and_above') result.qualification[ageGroup] += count;
                if (isWomen) {
                    result.women_qualification.all += count;
                    if (ageGroup !== '60_and_above') result.women_qualification[ageGroup] += count;
                }
            }

            if (isRetraining) {
                result.retraining.all += count;
                if (ageGroup !== '60_and_above') result.retraining[ageGroup] += count;
                if (isWomen) {
                    result.women_retraining.all += count;
                    if (ageGroup !== '60_and_above') result.women_retraining[ageGroup] += count;
                }
            }
        });

        return [
            {
                '№ строки': 1,
                'Наименование показателей': 'Численность слушателей – всего (сумма строк 03,05)',
                'Всего': result.total.all,
                'моложе 25 лет': result.total.under_25,
                '25–29': result.total['25_29'],
                '30–34': result.total['30_34'],
                '35–39': result.total['35_39'],
                '40–44': result.total['40_44'],
                '45–49': result.total['45_49'],
                '50–54': result.total['50_54'],
                '55–59': result.total['55_59'],
            },
            {
                '№ строки': 2,
                'Наименование показателей': 'из них женщины – всего (сумма строк 04,06)',
                'Всего': result.women.all,
                'моложе 25 лет': result.women.under_25,
                '25–29': result.women['25_29'],
                '30–34': result.women['30_34'],
                '35–39': result.women['35_39'],
                '40–44': result.women['40_44'],
                '45–49': result.women['45_49'],
                '50–54': result.women['50_54'],
                '55–59': result.women['55_59'],
            },
            {
                '№ строки': 3,
                'Наименование показателей': 'в том числе обученных по программам: повышения квалификации',
                'Всего': result.qualification.all,
                'моложе 25 лет': result.qualification.under_25,
                '25–29': result.qualification['25_29'],
                '30–34': result.qualification['30_34'],
                '35–39': result.qualification['35_39'],
                '40–44': result.qualification['40_44'],
                '45–49': result.qualification['45_49'],
                '50–54': result.qualification['50_54'],
                '55–59': result.qualification['55_59'],
            },
            {
                '№ строки': 4,
                'Наименование показателей': 'из них женщины',
                'Всего': result.women_qualification.all,
                'моложе 25 лет': result.women_qualification.under_25,
                '25–29': result.women_qualification['25_29'],
                '30–34': result.women_qualification['30_34'],
                '35–39': result.women_qualification['35_39'],
                '40–44': result.women_qualification['40_44'],
                '45–49': result.women_qualification['45_49'],
                '50–54': result.women_qualification['50_54'],
                '55–59': result.women_qualification['55_59'],
            },
            {
                '№ строки': 5,
                'Наименование показателей': 'профессиональной переподготовки',
                'Всего': result.retraining.all,
                'моложе 25 лет': result.retraining.under_25,
                '25–29': result.retraining['25_29'],
                '30–34': result.retraining['30_34'],
                '35–39': result.retraining['35_39'],
                '40–44': result.retraining['40_44'],
                '45–49': result.retraining['45_49'],
                '50–54': result.retraining['50_54'],
                '55–59': result.retraining['55_59'],
            },
            {
                '№ строки': 6,
                'Наименование показателей': 'из них женщины',
                'Всего': result.women_retraining.all,
                'моложе 25 лет': result.women_retraining.under_25,
                '25–29': result.women_retraining['25_29'],
                '30–34': result.women_retraining['30_34'],
                '35–39': result.women_retraining['35_39'],
                '40–44': result.women_retraining['40_44'],
                '45–49': result.women_retraining['45_49'],
                '50–54': result.women_retraining['50_54'],
                '55–59': result.women_retraining['55_59'],
            },
        ];
    };

    const handleExport = () => {
        const exportData = processReportData();
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Раздел 2.4');
        XLSX.writeFile(workbook, `Отчет_Раздел_2.4_${reportYear}.xlsx`);
    };

    return (
        <div className="flex flex-col items-start space-y-4">
            <div className="flex items-center space-x-2">
                <label htmlFor="reportYear" className={`${lusitana.className} text-lg font-medium`}>
                    Год отчета:
                </label>
                <input
                    id="reportYear"
                    type="number"
                    value={reportYear}
                    onChange={(e) => handleYearChange(Number(e.target.value))}
                    className="w-24 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                />
            </div>
            <button
                onClick={handleExport}
                className="flex h-10 items-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-500"
            >
                Скачать отчет в Excel
            </button>
        </div>
    );
}