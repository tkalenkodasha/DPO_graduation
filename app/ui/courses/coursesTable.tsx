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
import {DeleteCourse, UpdateCourse} from './buttons';
import {CoursesTableType} from '@/app/lib/definitions';
import * as XLSX from 'xlsx';

ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    RowSelectionModule,
    PaginationModule,
    TextFilterModule,
    NumberFilterModule,
    DateFilterModule,
]);

export default function CoursesTable({
                                          courses,
                                          query,
                                      }: {
    courses: CoursesTableType[];
    query: string;
}) {
    const gridRef = useRef<AgGridReact<CoursesTableType>>(null);

    const columnDefs: ColDef<CoursesTableType>[] = useMemo(
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
            {field: 'name', headerName: 'Наименование курса', sortable: true, filter: true, resizable: true},
            {field: 'academic_hours', headerName: 'Кол-во часов', sortable: true, filter: true, resizable: true},
            {field: 'program_name', headerName: 'Тип программы', sortable: true, filter: true, resizable: true},
            {field: 'description', headerName: 'Описание', sortable: true, filter: true, resizable: true},
            {
                headerName: 'Действия',
                cellRenderer: (params: ICellRendererParams<CoursesTableType>) => (
                    <div className="flex justify-end gap-3">
                        <UpdateCourse id={params.data!.id}/>
                        <DeleteCourse id={params.data!.id}/>
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
        const exportData = courses.map((course, index) => ({
            '№': index + 1,
            'Наименование курса': course.name,
            'Кол-во часов': course.academic_hours,
            'Описание': course.description || '',
            'Тип программы': course.program_name || '',

        }));

        // Создаем рабочий лист
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        // Создаем рабочую книгу
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Курсы');

        // Экспортируем файл
        XLSX.writeFile(workbook, `Курсы_${new Date().toISOString().split('T')[0]}.xlsx`);
    }, [courses]);

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
                    rowData={courses}
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