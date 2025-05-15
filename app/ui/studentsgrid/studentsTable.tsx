'use client';
import {
    ClientSideRowModelModule,
    ColDef,
    DateFilterModule,
    ICellRendererParams,
    ModuleRegistry,
    NumberFilterModule,
    PaginationModule,
    RowSelectionModule,
    TextFilterModule,
} from 'ag-grid-community';
import {useCallback, useMemo, useRef} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {DeleteStudent, UpdateStudent} from './buttons';
import {StudentsTableType} from '@/app/lib/definitions';
import * as XLSX from 'xlsx';

ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    RowSelectionModule,
    PaginationModule,
    TextFilterModule,
    NumberFilterModule,
    DateFilterModule,
]);

export default function StudentsTable({
                                          students,
                                          query,
                                      }: {
    students: StudentsTableType[];
    query: string;
}) {
    const gridRef = useRef<AgGridReact<StudentsTableType>>(null);

    const columnDefs: ColDef<StudentsTableType>[] = useMemo(
        () => [
            {
                headerName: '№',
                width: 50,
                pinned: 'left',
                sortable: false,
                filter: false,
                resizable: true,
                valueGetter: 'node.rowIndex + 1',
            },
            {
                field: 'last_name',
                headerName: 'Фамилия',
                sortable: true,
                filter: true,
                resizable: true,
                pinned: 'left',
                width: 120,
            },
            {field: 'first_name', headerName: 'Имя', sortable: true, filter: true, resizable: true},
            {field: 'middle_name', headerName: 'Отчество', sortable: true, filter: true, resizable: true},
            {field: 'email', headerName: 'Email', sortable: true, filter: true, resizable: true},
            {field: 'phone', headerName: 'Телефон', sortable: true, filter: true, resizable: true},
            {field: 'date_of_birth', headerName: 'Дата рождения', sortable: true, filter: true, resizable: true},
            {field: 'gender_name', headerName: 'Пол', sortable: true, filter: true, resizable: true},
            {field: 'education_name', headerName: 'Образование', sortable: true, filter: true, resizable: true},
            {field: 'category_name', headerName: 'Категория', sortable: true, filter: true, resizable: true},
            {field: 'subcategory_name', headerName: 'Подкатегория', sortable: true, filter: true, resizable: true},
            {field: 'passport_series', headerName: 'Серия паспорта', sortable: true, filter: true, resizable: true},
            {field: 'passport_number', headerName: 'Номер паспорта', sortable: true, filter: true, resizable: true},
            {field: 'issued_by', headerName: 'Кем выдан', sortable: true, filter: true, resizable: true},
            {field: 'issue_date', headerName: 'Дата выдачи', sortable: true, filter: true, resizable: true},
            {field: 'inn', headerName: 'ИНН', sortable: true, filter: true, resizable: true},
            {field: 'snils', headerName: 'СНИЛС', sortable: true, filter: true, resizable: true},
            {field: 'address', headerName: 'Адрес', sortable: true, filter: true, resizable: true},
            {field: 'postal_code', headerName: 'Почтовый индекс', sortable: true, filter: true, resizable: true},
            {field: 'workplace', headerName: 'Место работы', sortable: true, filter: true, resizable: true},
            {field: 'university', headerName: 'Университет', sortable: true, filter: true, resizable: true},
            {field: 'position', headerName: 'Должность', sortable: true, filter: true, resizable: true},
            {
                headerName: 'Действия',
                cellRenderer: (params: ICellRendererParams<StudentsTableType>) => (
                    <div className="flex justify-end gap-3">
                        <UpdateStudent id={params.data!.id}/>
                        <DeleteStudent id={params.data!.id}/>
                    </div>
                ),
                pinned: 'right',
                width: 120,
                resizable: false,
            },
        ],
        []
    );

    const onBtnExport = useCallback(() => {
        // Преобразуем данные в массив объектов для Excel
        const exportData = students.map((student, index) => ({
            '№': index + 1,
            'Фамилия': student.last_name,
            'Имя': student.first_name,
            'Отчество': student.middle_name || '',
            'Email': student.email || '',
            'Телефон': student.phone || '',
            'Дата рождения': student.date_of_birth,
            'Пол': student.gender_name,
            'Образование': student.education_name,
            'Категория': student.category_name || '',
            'Подкатегория': student.subcategory_name || '',
            'Серия паспорта': student.passport_series || '',
            'Номер паспорта': student.passport_number || '',
            'Кем выдан': student.issued_by || '',
            'Дата выдачи': student.issue_date || '',
            'ИНН': student.inn || '',
            'СНИЛС': student.snils || '',
            'Адрес': student.address || '',
            'Почтовый индекс': student.postal_code || '',
            'Место работы': student.workplace || '',
            'Университет': student.university || '',
            'Должность': student.position || '',
            'URL фото': student.photo_url || '',
        }));

        // Создаем рабочий лист
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        // Создаем рабочую книгу
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Студенты');

        // Экспортируем файл
        XLSX.writeFile(workbook, `Студенты_${new Date().toISOString().split('T')[0]}.xlsx`);
    }, [students]);

    return (
        <div className="mt-6">
            <button
                onClick={onBtnExport}
                className="mb-4 flex h-10 items-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-500"
            >
                Экспорт в Excel
            </button>
            <div
                className="ag-theme-alpine"
                style={{
                    height: 'calc(100vh - 200px)',
                    width: '100%',
                    overflow: 'auto',
                }}
            >
                <AgGridReact
                    ref={gridRef}
                    columnDefs={columnDefs}
                    rowData={students}
                    defaultColDef={{
                        flex: 1,
                        minWidth: 100,
                        sortable: true,
                        filter: true,
                        resizable: true,
                        suppressMovable: false,
                    }}
                    rowSelection="multiple"
                    animateRows={true}
                    pagination={false}
                    paginationPageSize={1000}
                    headerHeight={40}
                    rowHeight={50}
                    overlayLoadingTemplate={'<span class="ag-overlay-loading-center">Загрузка данных...</span>'}
                    overlayNoRowsTemplate={'<span class="ag-overlay-loading-center">Нет данных для отображения</span>'}
                />
            </div>
        </div>
    );
}