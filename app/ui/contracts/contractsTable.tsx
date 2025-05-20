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
import {DeleteContract, UpdateContract} from '@/app/ui/contracts/buttons';
import {ContractsTable} from '@/app/lib/definitions';
import * as XLSX from 'xlsx';
import ContractStatus from '@/app/ui/contracts/status';

ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    RowSelectionModule,
    PaginationModule,
    TextFilterModule,
    NumberFilterModule,
    DateFilterModule,
]);

export default function ContractsTableComponent({
                                                    contracts,
                                                    query,
                                                }: {
    contracts: ContractsTable[];
    query: string;
}) {
    const gridRef = useRef<AgGridReact<ContractsTable>>(null);

    const columnDefs: ColDef<ContractsTable>[] = useMemo(
        () => [
            {
                headerName: '№',
                width: 50,
                pinned: 'left',
                sortable: false,
                filter: false,
                valueGetter: 'node.rowIndex + 1',
            },
            {
                field: 'last_name',
                headerName: 'Фамилия',
                sortable: true,
                filter: true,
                pinned: 'left',
                width: 120,
            },
            {
                field: 'first_name',
                headerName: 'Имя',
                sortable: true,
                filter: true
            },
            {
                field: 'middle_name',
                headerName: 'Отчество',
                sortable: true,
                filter: true
            },
            {
                field: 'email',
                headerName: 'Email',
                sortable: true,
                filter: true
            },
            {
                field: 'number',
                headerName: 'Номер',
                sortable: true,
                filter: true
            },
            {
                field: 'contract_date',
                headerName: 'Дата договора',
                sortable: true,
                filter: true
            },
            {
                field: 'course_name',
                headerName: 'Курс',
                sortable: true,
                filter: true
            },
            {
                field: 'program_name',
                headerName: 'Программа',
                sortable: true,
                filter: true
            },
            {
                field: 'funding_source_name',
                headerName: 'Финансирование',
                sortable: true,
                filter: true
            },
            {
                field: 'contract_type_name',
                headerName: 'Тип договора',
                sortable: true,
                filter: true
            },
            {
                field: 'status',
                headerName: 'Статус',
                cellRenderer: (params: ICellRendererParams<ContractsTable>) => (
                    <ContractStatus status={params.value}/>
                ),
                sortable: true,
                filter: true,
            },
            {
                field: 'other',
                headerName: 'Прочее',
                sortable: true,
                filter: true
            },
            {
                field: 'gender',
                headerName: 'Гендер',
                sortable: true,
                filter: true
            },
            {
                headerName: 'Действия',
                cellRenderer: (params: ICellRendererParams<ContractsTable>) => (
                    <div className="flex justify-end gap-2">
                        <UpdateContract id={params.data!.id}/>
                        <DeleteContract id={params.data!.id}/>
                    </div>
                ),
                pinned: 'right',
                width: 120,
            },
        ],
        []
    );

    const onBtnExport = useCallback(() => {
        const exportData = contracts.map((contract, index) => ({
            '№': index + 1,
            'Фамилия': contract.last_name,
            'Имя': contract.first_name,
            'Отчество': contract.middle_name || '',
            'Email': contract.email || '',
            'Номер договора': contract.number,
            'Дата договора': contract.contract_date,
            'Курс': contract.course_name,
            'Программа': contract.program_name || '',
            'Финансирование': contract.funding_source_name,
            'Тип договора': contract.contract_type_name,
            'Статус': contract.status,
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Договоры');

        XLSX.writeFile(workbook, `Договоры_${new Date().toISOString().split('T')[0]}.xlsx`);
    }, [contracts]);

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
                    rowData={contracts}
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